import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

interface VisibilityToggleProps {
  children: React.ReactNode
  className?: string
}

export function VisibilityToggle({ children, className }: VisibilityToggleProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={className}>
      <div className="flex items-center justify-between w-full min-w-0 h-4">
        <div className="flex-1 min-w-0 overflow-hidden text-zinc-400 text-ellipsis whitespace-nowrap mr-10">
          {isVisible ? children : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••'}
        </div>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="flex-shrink-0 ml-2 active:border-none flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 active:scale-110 cursor-pointer"
        >
          {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  )
} 