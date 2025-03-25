import type {PropsWithChildren} from 'react';

import {createContext, useMemo, useState} from 'react';

import type {User} from '@server/models';

interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => {},
});

export const UserProvider = ({children}: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const value = useMemo(() => ({user, setUser}), [user, setUser]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
