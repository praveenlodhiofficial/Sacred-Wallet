import React from 'react'
import { ModeToggle } from './ToggleTheme'
import Image from 'next/image'

const Navbar = () => {
    return (
        <div className='flex w-full items-center justify-between px-10 lg:px-60 py-5 lg:py-10 border-b lg:border-none border-zinc-200 dark:border-zinc-800'>
            <div className='flex items-center gap-3'>
                <Image src="/shuttle-logo.png" alt="Sacred Wallet" className='invert-0 dark:invert-100' width={25} height={25} />
                <h1 className='text-2xl font-bold'>Sacred Wallet</h1>
            </div>
            <ModeToggle />
        </div>
    )
}

export default Navbar