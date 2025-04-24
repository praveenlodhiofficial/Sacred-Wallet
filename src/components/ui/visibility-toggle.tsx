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
      <div className="flex items-center gap-2 justify-between h-5 text-zinc-400">
      {isVisible ? children : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••'}
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="active:border-none flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 active:scale-110 cursor-pointer"
        >
          {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  )
} 