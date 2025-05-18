import { NextRequest, NextResponse } from "next/server";
import { model } from "@/lib/gemini";
import { formatResponseToMarkdown } from "@/lib/formatMarkdown";
import { GroundingChunk, GroundingMetadata, GroundingSupport } from "@google/generative-ai";

const sessionStore = new Map<string, ReturnType<typeof model.startChat>>();

export async function POST(req: NextRequest) {
  const { sessionId, query } = await req.json();

  if (!sessionId || !query) {
    return NextResponse.json({ message: "Missing sessionId or query" }, { status: 400 });
  }

  let chat = sessionStore.get(sessionId);
  if (!chat) {
    chat = model.startChat({
      tools: [
        {
          // @ts-ignore – not typed in SDK
          google_search: {},
        },
      ],
    });
    sessionStore.set(sessionId, chat);
  }

  const result = await chat.sendMessage(query);
  const response = await result.response;
  const text = response.text();
  const formatted = await formatResponseToMarkdown(text);

  const metadata = response.candidates?.[0]?.groundingMetadata as GroundingMetadata;

  const sourceMap = new Map<string, { title: string; url: string; snippet: string }>();

  if (metadata?.groundingChunks && metadata?.groundingSupports) {
    const { groundingChunks, groundingSupports } = metadata;

    groundingChunks.forEach((chunk: GroundingChunk, index: number) => {
      const url = chunk.web?.uri;
      const title = chunk.web?.title;

      if (url && title && !sourceMap.has(url)) {
        const snippets = groundingSupports
          .filter((support: GroundingSupport) =>
            support.groundingChunckIndices?.includes(index)
          )
          .map((support) => support.segment || "")
          .join(" ");

        sourceMap.set(url, {
          title,
          url,
          snippet: snippets,
        });
      }
    });
  }

  return NextResponse.json({
    summary: formatted,
    sources: Array.from(sourceMap.values()),
  });
}