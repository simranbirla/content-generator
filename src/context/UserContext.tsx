'use client'

import { createContext, useState } from 'react';

type TUserContext = {
    user: null | TUser,
    login: (value: any) => void,
    logout: () => void,
}

type TUser = {
    name: string,
    email: string,
    displayPictureUrl: string,
    id?: string,
}

type TLoginValues = {
    displayPictureUrl: string,
    email: string,
    name: string
}

export const UserContext = createContext<TUserContext>({
    user: null,
    login: function (value: TLoginValues): void { },
    logout: function (): void { }
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);


    const login = (value: TLoginValues) => {
        setUser(value)
        localStorage.setItem("userEmail", value.email)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("userEmail")
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

