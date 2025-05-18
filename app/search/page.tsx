"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BookOpenText } from "lucide-react"
import { motion } from "framer-motion"
import { SourceCard } from "@/components/source-card"
import { SearchResult } from "@/components/search-result"
import { FollowUpForm } from "@/components/follow-up-form"
import { SearchResponse, Source } from "@/lib/types"
import { ModeToggle } from "@/components/mode-toggle"
import { SearchBox } from "@/components/search-box"

export default function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<SearchResponse | null>(null)
  const [sessionId] = useState<string>(() => crypto.randomUUID())

  useEffect(() => {
    if (!query) {
      router.push("/")
      return
    }

    fetchSearchResults(query)
  }, [query])

  const fetchSearchResults = async (searchQuery: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, query: searchQuery }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error(err)
      setError("Failed to fetch search results")
    } finally {
      setLoading(false)
    }
  }

  const handleFollowUp = async (followUpQuery: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, query: followUpQuery }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error(err)
      setError("Failed to fetch follow-up response")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <ModeToggle />
      
      <div className="max-w-6xl mx-auto">
        {/* Header with back button and search */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-background hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to home</span>
          </Link>

          <div className="flex-1">
            <SearchBox variant="results" initialQuery={query} />
          </div>
        </div>

        {/* Query display */}
        <motion.h1 
          className="text-2xl md:text-3xl font-medium mb-8 text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          "{query}"
        </motion.h1>

        {/* Sources section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-primary">
            <BookOpenText className="h-5 w-5" />
            <span className="font-medium">Sources</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-28 rounded-lg border bg-card/60 animate-pulse" />
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

        {/* Main content */}
        <SearchResult 
          summary={data?.summary || ""} 
          isLoading={loading} 
        />

        {/* Follow-up form */}
        <FollowUpForm 
          onSubmit={handleFollowUp} 
          isLoading={loading} 
        />
      </div>
    </div>
  )
}
