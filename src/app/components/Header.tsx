'use client'

import React, { useContext } from 'react'
import { BookOpenText } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { UserContext } from '@/context/UserContext';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/firebase'

export default function Header() {

    const { user, login } = useContext(UserContext);

    const signIn = async () => {
        const result = await signInWithPopup(auth, provider)
        login({
            displayPictureUrl: result.user.photoURL,
            name: result.user.displayName,
            email: result.user.email,
        })
    }


    return (
        <header className='flex justify-between px-10 md:px-3 sm:px-0 py-10'>
            <Link href={'/'} className='flex gap-2 text-xl items-center font-bold text-white'>
                <div><BookOpenText /></div>
                <span >Creatify AI</span>
            </Link>
            <nav className='flex gap-10 items-center'>
                <Link href={'/generate'}>Generate</Link>
                <Link href={'/github'}>Github</Link>
                {user ? <Avatar>
                    <AvatarImage src={user.displayPictureUrl} />
                </Avatar> : <Button onClick={signIn}>Sign in</Button>}
            </nav>
        </header>
    )
}
