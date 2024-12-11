'use client'

import React, { useContext } from 'react'
import { BookOpenText, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { UserContext } from '@/context/UserContext';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '@/firebase'
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { getUser } from '@/db/actions';

export default function Header() {

    const { user, login, logout } = useContext(UserContext);

    const signIn = async () => {
        const result = await signInWithPopup(auth, provider)
        const newUser = await getUser({
            displayPictureUrl: result.user.photoURL as string,
            name: result.user.displayName as string,
            email: result.user.email as string,
        });

        console.log(newUser)

        login({
            displayPictureUrl: newUser.displayPictureUrl,
            name: newUser.name,
            email: newUser.email,
        })
    }

    const loggingOut = async () => {
        await signOut(auth)
        logout()

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
                {user ?
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarImage src={user.displayPictureUrl} />
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuItem>
                                <span>{user.name}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={loggingOut}>
                                <LogOut />
                                <span>Log out</span>

                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    : <Button onClick={signIn}>Sign in</Button>}
            </nav>
        </header>
    )
}
