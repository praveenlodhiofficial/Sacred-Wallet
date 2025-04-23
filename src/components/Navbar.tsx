import React from 'react'
import { ModeToggle } from './ToggleTheme'
import Image from 'next/image'

const Navbar = () => {
    return (
        <div className='flex w-full items-center justify-between my-10'>
            <div className='flex items-center gap-3'>
                <Image src="/shuttle-logo.png" alt="Sacred Wallet" className='invert-0 dark:invert-100' width={25} height={25} />
                <h1 className='text-2xl font-bold'>Sacred Wallet</h1>
            </div>
            <ModeToggle />
        </div>
    )
}

export default Navbar