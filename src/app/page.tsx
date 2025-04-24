'use client'

import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MnemonicDisplay } from '@/components/MnemonicDisplay'
import { VisibilityToggle } from '@/components/ui/visibility-toggle'
import React, { useState } from 'react'
import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl"
import { CopyButton } from '@/components/ui/copy-button'
import { AnimatePresence } from 'framer-motion'
import { AnimatedMain, AnimatedDiv, AnimatedSlide, AnimatedStaggered } from '@/components/motion/motion-variants'

export default function Home() {
  const [mnemonic, setMnemonic] = useState('')
  const [userInput, setUserInput] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);
  const [privateKeys, setPrivateKeys] = useState<string[]>([]);

  const mnemonicWords = mnemonic ? mnemonic.split(' ') : []

  return (
    <>
      <Navbar />

      <div className='flex flex-col gap-10 m-10 lg:mx-60'>

        <AnimatedMain className='flex flex-col gap-2 font-bold'>
          <h1 className='text-3xl lg:text-5xl font-bold'>Secret Recovery Phrase</h1>
          <p className='text-sm lg:text-lg text-zinc-500'>Save this phrase in a safe place.</p>
        </AnimatedMain>

        <AnimatedDiv delay={0.2} className="flex gap-2">
          {/* ---------------------------------- GENERATE SEED INPUT ---------------------------------- */}
          <Input
            type="text"
            placeholder='Enter your secret phase (or leave blank to generate)'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className='border-zinc-200 dark:border-zinc-800'
          />

          {/* ---------------------------------- GENERATE SEED BUTTON ---------------------------------- */}
          <Button
            className='cursor-pointer'
            onClick={async () => {
              const words = userInput || generateMnemonic();
              setMnemonic(words)
              setUserInput('')
            }}
          >
            Generate Seed
          </Button>
        </AnimatedDiv>

        <AnimatePresence>
          {mnemonic && (
            <AnimatedSlide>
              <MnemonicDisplay words={mnemonicWords} />
            </AnimatedSlide>
          )}
        </AnimatePresence>

        <AnimatedDiv delay={0.4} className='flex flex-col justify-between pt-10 gap-10'>

          <div className='flex gap-2 justify-between items-center'>
            <h1 className='text-3xl lg:text-5xl font-bold'>Solana Wallet</h1>
            <div className='flex gap-2'>

              {/* ---------------------------------- ADD WALLET ---------------------------------- */}
              <Button
                className='cursor-pointer'
                onClick={() => {
                  if (!mnemonic) {
                    alert('Please generate a mnemonic first');
                    return;
                  }
                  const seed = mnemonicToSeed(mnemonic);
                  const path = `m/44'/501'/${currentIndex}'/0'`;
                  const derivedSeed = derivePath(path, seed.toString()).key;
                  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
                  const keypair = Keypair.fromSecretKey(secret);
                  setCurrentIndex(currentIndex + 1);
                  setPublicKeys([...publicKeys, keypair.publicKey]);
                  setPrivateKeys([...privateKeys, Buffer.from(keypair.secretKey).toString('hex')]);
                }}
              >
                Add Wallet
              </Button>

              {/* ---------------------------------- CLEAR WALLET ---------------------------------- */}
              <Button
                className='cursor-pointer bg-red-600 hover:bg-red-700 transition-all duration-200 text-white'
                onClick={() => {
                  setPublicKeys([]);
                  setPrivateKeys([]);
                  setCurrentIndex(0);
                }}
              >
                Clear Wallet
              </Button>

            </div>
          </div>

          {/* ---------------------------------- WALLET LIST ---------------------------------- */}
          <AnimatePresence>
            {publicKeys.map((publicKey, index) => (
              <AnimatedStaggered key={publicKey.toBase58()} index={index} className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl">
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight p-5">
                  Wallet {String(index + 1).padStart(2, '0')}
                </h1>
                <div className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-xl flex flex-col p-5 gap-10">

                  {/* ---------------------------------- PUBLIC KEY ---------------------------------- */}
                  <div className="flex flex-col gap-2">
                    <h1 className='text-lg lg:text-xl font-bold'>Public Key</h1>
                    <p className='text-xs text-zinc-400 tracking-widest overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex items-center gap-10 justify-between'>
                      {publicKey.toBase58()}
                      <CopyButton text={publicKey.toBase58()} />
                    </p>
                  </div>

                  {/* ---------------------------------- PRIVATE KEY ---------------------------------- */}
                  <div className="flex flex-col gap-2">
                    <h1 className='text-lg lg:text-xl font-bold '>Private Key</h1>
                    <VisibilityToggle>
                      <p className='text-xs text-zinc-400 tracking-widest overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                        {privateKeys[index]}
                      </p>
                    </VisibilityToggle>

                  </div>
                </div>
              </AnimatedStaggered>
            ))}
          </AnimatePresence>

        </AnimatedDiv>

      </div>
    </>
  )
}
