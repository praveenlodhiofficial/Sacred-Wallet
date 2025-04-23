import { Copy, CopyCheck } from 'lucide-react'
import React, { useState } from 'react'

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all active:scale-120 cursor-pointer"
        >
            {copied ? <CopyCheck size={16}/> : <Copy size={16} />}
        </button>
    )
}