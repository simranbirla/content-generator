import { createContext, useContext, useState } from 'react';

const UserContext = createContext({
    user: null
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);


    const login = (value: any) => {
        setUser(value)
        localStorage.setItem("userEmail", value)
    }

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
}

