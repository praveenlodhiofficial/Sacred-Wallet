'use client'

import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MnemonicDisplay } from '@/components/MnemonicDisplay'
import React, { useState } from 'react'
import { generateMnemonic } from 'bip39';

const page = () => {
  const [mnemonic, setMnemonic] = useState('')
  const [userInput, setUserInput] = useState('')

  const mnemonicWords = mnemonic ? mnemonic.split(' ') : []

  return (
    <div className='flex flex-col gap-10 mx-10 lg:mx-40'>

      <Navbar />

      <main className='flex flex-col gap-2 font-bold'>
        <h1 className='text-5xl font-bold'>Secret Recovery Phrase</h1>
        <p className='text-lg text-zinc-500'>Save this phrase in a safe place.</p>
      </main>

      {/* generate Wallet */}
      <div className="flex gap-2">
        <Input 
          type="text" 
          placeholder='Enter your secret phase (or leave blank to generate)' 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Button
          className='cursor-pointer'
          onClick={async () => {
            const words = userInput || generateMnemonic();
            setMnemonic(words)
            setUserInput('')
          }}
        >
          Generate Wallet
        </Button>
      </div>

      {mnemonic && <MnemonicDisplay words={mnemonicWords} />}

    </div>
  )
}

export default page