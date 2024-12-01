// context/UserContext.js
import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState(''); // Add email state

    return (
        <UserContext.Provider value={{ userName, setUserName, userEmail, setUserEmail }}>
            {children}
        </UserContext.Provider>
    );
}
