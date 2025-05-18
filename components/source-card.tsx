"use client"

import { motion } from "framer-motion"
import { ExternalLinkIcon } from "lucide-react"

interface SourceProps {
  title: string
  url: string
  snippet: string
  index: number
}

export function SourceCard({ title, url, snippet, index }: SourceProps) {
  const hostname = new URL(url).hostname.replace('www.', '')
  
  return (
    <motion.div 
      className="relative p-4 rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary/70 hover:text-primary transition-colors"
          aria-label={`Visit ${hostname}`}
        >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-primary truncate mr-6">
          {title.split(".")[0]}
        </h3>
          <ExternalLinkIcon className="h-4 w-4" />
      </div>
      <p className="text-sm text-foreground/80 line-clamp-2 mb-2">{snippet}</p>
      <p className="text-xs text-muted-foreground mt-1">{hostname}</p>
      
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </a>
    </motion.div>
  )
}