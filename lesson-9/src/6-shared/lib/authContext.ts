import { createContext, useContext } from 'react';
import type { AuthContextModel } from '../model/auth';

export const AuthContext = createContext<AuthContextModel>({
    accessToken: '',
    refreshToken: '',
    userId: '',
    name: '',
    login: () => {},
    logout: () => {},
});

export const useAuthContext = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('useAuthContext должен использоваться только внутри AuthProvider');
    }

    return authContext;
};
