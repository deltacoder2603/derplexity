"use client"

import { useState, useEffect, useMemo, useRef, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { BookOpenText } from "lucide-react"
import { motion } from "framer-motion"
import { v4 as uuidv4 } from "uuid"
import Image from "next/image"

import { ModeToggle } from "@/components/mode-toggle"
import { SearchBox } from "@/components/search-box"
import { SourceCard } from "@/components/source-card"
import { SearchResult } from "@/components/search-result"
import { FollowUpForm } from "@/components/follow-up-form"
import { SearchResponse, Source } from "@/lib/types"
import { Skeleton } from "@/components/skeleton"

function SearchLoading() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-background hover:bg-muted transition-colors"
          >
            <Image src="/logo.png" width={110} height={110} alt="Logo" />
            <span className="sr-only">Back to home</span>
          </Link>

          <div className="flex-1">
            <Skeleton className="h-10 w-full" />
          </div>
          <ModeToggle />
        </div>

        <Skeleton className="h-8 w-1/3 mb-8" />

        {/* Sources Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <BookOpenText className="h-5 w-5" />
            <span className="font-medium">Sources</span>
          </div>

          <div className="grid relative z-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full" />
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <div className="space-y-4 mb-6">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Follow-up Form */}
        <div className="mt-6 space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  )
}

// Component that uses useSearchParams
function SearchContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = useMemo(() => searchParams.get("q") || "", [searchParams])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<SearchResponse | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const sessionIdRef = useRef(uuidv4())

  useEffect(() => {
    if (!query) {
      router.push("/")
      return
    }

    const handler = setTimeout(() => {
      fetchSearchResults(query)
    }, 300)

    return () => {
      clearTimeout(handler)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [query, router])

  const fetchSearchResults = async (searchQuery: string) => {
    setLoading(true)
    setError(null)

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery, sessionId: sessionIdRef.current }),
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === "AbortError") return
        console.error(err)
      }
      setError("Failed to fetch search results")
    } finally {
      setLoading(false)
    }
  }

  const handleFollowUp = async (followUpQuery: string) => {
    setLoading(true)
    setError(null)

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: followUpQuery, sessionId: sessionIdRef.current }),
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === "AbortError") return
        console.error(err)
      }
      setError("Failed to fetch follow-up response")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-background hover:bg-muted transition-colors"
          >
            <Image src="/logo.png" width={110} height={110} alt="Logo" />
            <span className="sr-only">Back to home</span>
          </Link>

          <div className="flex-1">
            <SearchBox variant="results" initialQuery={query} />
          </div>
          <ModeToggle />
        </div>

        <motion.h1
          className="text-2xl md:text-3xl font-medium mb-8 text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          &quot;{query}&quot;
        </motion.h1>

        {/* Sources Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-primary ">
            <BookOpenText className="h-5 w-5" />
            <span className="font-medium">Sources</span>
          </div>

          <div className="grid relative z-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-28 w-full" />
              ))
            ) : error ? (
              <div className="col-span-full text-destructive">{error}</div>
            ) : (
              data?.sources.map((source: Source, index: number) => (
                <SourceCard
                  key={`${source.url}-${index}`}
                  title={source.title}
                  url={source.url}
                  snippet={source.snippet}
                  index={index}
                />
              ))
            )}
          </div>
        </div>

        {/* Summary Section */}
        {loading ? (
          <div className="space-y-4 mb-6">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : (
          <SearchResult summary={data?.summary || ""} isLoading={loading} />
        )}

        {/* Follow-up Form */}
        {loading ? (
          <div className="mt-6 space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        ) : (
          <FollowUpForm onSubmit={handleFollowUp} isLoading={loading} />
        )}
      </div>
    </div>
  )
}

export default function Search() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  )
}
