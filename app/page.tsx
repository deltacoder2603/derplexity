"use client";

import { SearchBox } from "@/components/search-box"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="fixed top-2 left-5 text-cyan-400 text-4xl ">Derplexity</div>
      <div className="fixed top-2 right-4"><ModeToggle /></div>
      
      <div className="flex flex-col items-center max-w-md w-full space-y-8">
        <Image 
         src="/logo.png" 
         width={80} 
         height={80} 
         alt="Logo" 
        />
        
        <h2 className="text-4xl md:text-4xl font-medium text-center">
          What do you want to know?
        </h2>
        
        <SearchBox variant="home" />
        
        <div className="flex flex-col items-center space-y-1 text-sm text-muted-foreground mt-8">
          <p>Powered by Gemini 2.0</p>
          <div className="flex items-center space-x-1">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            <a 
              href="https://github.com/deltacoder2603" 
              className="hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Star My Repos on GitHub
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
