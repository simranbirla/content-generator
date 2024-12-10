'use client'

import { createContext, useState } from 'react';

type TUserContext = {
    user: null,
    login: (value: any) => void,
    logout: () => void,
}

export const UserContext = createContext<TUserContext>({
    user: null,
    login: function (value: any): void { },
    logout: function (): void { }
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);


    const login = (value: any) => {
        setUser(value)
        localStorage.setItem("userEmail", value)
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

