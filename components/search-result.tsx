"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface SearchResultProps {
  summary: string
  isLoading: boolean
}

export function SearchResult({ summary, isLoading }: SearchResultProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current && !isLoading) {
      contentRef.current.innerHTML = summary
    }
  }, [summary, isLoading])

  if (isLoading) {
    return (
      <div className="p-6 rounded-lg border bg-card">
        <div className="space-y-4 animate-pulse">
          <div className="h-6 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="p-6 rounded-lg border bg-card text-card-foreground"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div 
        ref={contentRef}
        className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-a:text-primary prose-headings:text-foreground prose-strong:text-foreground"
      />
    </motion.div>
  )
}