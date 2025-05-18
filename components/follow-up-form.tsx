"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FollowUpFormProps {
  onSubmit: (query: string) => Promise<void>
  isLoading: boolean
}

export function FollowUpForm({ onSubmit, isLoading }: FollowUpFormProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim() || isLoading) return
    
    await onSubmit(query)
    setQuery("")
  }

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mt-8">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a follow-up question..."
        className="pr-14 py-6 text-base"
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full"
        disabled={isLoading || !query.trim()}
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Send</span>
      </Button>
    </form>
  )
}