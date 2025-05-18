"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBoxProps {
  variant?: "home" | "results"
  initialQuery?: string
  className?: string
}

export function SearchBox({ variant = "home", initialQuery = "", className }: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (query.trim()) {
      setLoading(true)
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form 
      onSubmit={handleSearch} 
      className={cn(
        "w-full transition-all duration-300 ease-in-out",
        variant === "home" ? "max-w-2xl" : "max-w-full",
        className
      )}
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={variant === "home" ? "Ask anything..." : "Search..."}
          className={cn(
            "w-full border transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/30",
            "placeholder:text-muted-foreground/70",
            variant === "home" 
              ? "py-4 px-6 pr-12 text-lg rounded-full shadow-sm" 
              : "py-3 px-4 pr-10 text-base rounded-md"
          )}
          disabled={loading}
        />
        <button
          type="submit"
          className={cn(
            "absolute transform -translate-y-1/2 text-primary",
            "hover:text-primary/80 transition-colors duration-200",
            variant === "home" 
              ? "right-5 top-1/2" 
              : "right-3 top-1/2"
          )}
          disabled={loading}
          aria-label="Search"
        >
          <SearchIcon className={variant === "home" ? "h-6 w-6" : "h-5 w-5"} />
        </button>
      </div>
    </form>
  )
}