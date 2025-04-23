"use client"

import { CopyButton } from "@/components/ui/copy-button"

interface MnemonicDisplayProps {
    words: string[]
}

export function MnemonicDisplay({ words }: MnemonicDisplayProps) {
    return (
        <div className="space-y-6">
            <div className='flex items-center justify-between'>
                <h1 className="text-3xl font-bold tracking-tight">Your Secret Phrase</h1>
                <CopyButton text={words.join(' ')} />
            </div>

            <div className="grid grid-cols-3 gap-4">
                {words.map((word, index) => (
                    <div
                        key={index}
                        className="relative group bg-accent/50 hover:border-zinc-500 dark:card hover:bg-accent/50 transition-colors rounded-lg p-3"
                    >
                        <p className="text-center text-lg font-medium">{word}</p>
                    </div>
                ))}
            </div>
        </div>
    )
} 