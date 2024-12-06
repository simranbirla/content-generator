import React from 'react'
import { BookOpenText } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

export default function Header() {
    return (
        <header className='flex justify-between px-10 md:px-3 sm:px-0 py-10'>
            <Link href={'/'} className='flex gap-2 text-xl items-center font-bold text-white'>
                <div><BookOpenText /></div>
                <span >Creatify AI</span>
            </Link>
            <nav className='flex gap-10 items-center'>
                <Link href={'/generate'}>Generate</Link>
                <Link href={'/github'}>Github</Link>
                <Button color='pink'>Sign in</Button>
            </nav>
        </header>
    )
}
