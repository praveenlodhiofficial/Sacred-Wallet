'use client'

import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MnemonicDisplay } from '@/components/MnemonicDisplay'
import { VisibilityToggle } from '@/components/ui/visibility-toggle'
import React, { useState } from 'react'
import { generateMnemonic } from 'bip39';

export default function Home() {
  const [mnemonic, setMnemonic] = useState('')
  const [userInput, setUserInput] = useState('')

  const mnemonicWords = mnemonic ? mnemonic.split(' ') : []

  return (
    <>
      <Navbar />

      <div className='flex flex-col gap-10 m-10 lg:mx-60'>

        <main className='flex flex-col gap-2 font-bold'>
          <h1 className='text-3xl lg:text-5xl font-bold'>Secret Recovery Phrase</h1>
          <p className='text-sm lg:text-lg text-zinc-500'>Save this phrase in a safe place.</p>
        </main>

        {/* generate */}
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder='Enter your secret phase (or leave blank to generate)'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className='border-zinc-200 dark:border-zinc-800'
          />
          <Button
            className='cursor-pointer'
            onClick={async () => {
              const words = userInput || generateMnemonic();
              setMnemonic(words)
              setUserInput('')
            }}
          >
            Generate
          </Button>
        </div>

        {mnemonic && <MnemonicDisplay words={mnemonicWords} />}

        <div className='flex flex-col justify-between pt-10 gap-10'>
          
          <div className='flex gap-2 justify-between items-center'>
            <h1 className='text-3xl lg:text-5xl font-bold'>Solana Wallet</h1>
            <div className='flex gap-2'>
              <Button className='cursor-pointer'>Add Wallet</Button>
              <Button className='cursor-pointer bg-red-600 hover:bg-red-700 transition-all duration-200 text-white'>Clear Wallet</Button>
            </div>
          </div>

          <div className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl">

            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight p-5">Wallet 01</h1>
            <div className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-xl flex flex-col p-5 gap-10">

              {/* public key */}
              <div className="flex flex-col gap-2">
                <h1 className='text-lg lg:text-xl font-bold'>Public Key</h1>
                <p className='text-sm text-zinc-400 tracking-widest'>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
              </div>

              {/* private key */}
              <div className="flex flex-col gap-2">
                <h1 className='text-lg lg:text-xl font-bold'>Private Key</h1>
                <VisibilityToggle>
                  <p className='text-sm text-zinc-400 tracking-widest'>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
                </VisibilityToggle>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  )
}
