export function Logo() {
    return (
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <svg 
              className="h-6 w-6 text-primary" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                fill="currentColor" 
                stroke="currentColor" 
                strokeWidth="0.5"
              />
            </svg>
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-indigo-500" />
        </div>
      </div>
    )
  }