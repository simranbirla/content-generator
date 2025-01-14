'use client'

import { TUser } from '@/types/user';
import { createContext, useState } from 'react';

type TUserContext = {
    user: null | TUser,
    login: (value: TUser) => void,
    logout: () => void,
}

export const UserContext = createContext<TUserContext>({
    user: null,
    login: function (): void { },
    logout: function (): void { }
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<TUser | null>(null);


    const login = (value: TUser) => {
        setUser(value)
        localStorage.setItem("userEmail", value.email)
        localStorage.setItem("userId", value.id?.toString() as string)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("userEmail")
        localStorage.removeItem("userId")
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

