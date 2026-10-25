import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthInfo } from '6-shared/model/auth';

const TOKEN_KEY = 'auth_token';

export interface AuthContextModel {
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (info: AuthInfo) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextModel>({
    accessToken: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});

const parseStoredToken = (): AuthInfo | null => {
    try {
        const raw = localStorage.getItem(TOKEN_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as AuthInfo;
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authInfo, setAuthInfo] = useState<AuthInfo | null>(parseStoredToken);

    useEffect(() => {
        if (authInfo) {
            localStorage.setItem(TOKEN_KEY, JSON.stringify(authInfo));
        } else {
            localStorage.removeItem(TOKEN_KEY);
        }
    }, [authInfo]);

    const login = useCallback((info: AuthInfo) => {
        setAuthInfo(info);
    }, []);

    const logout = useCallback(() => {
        setAuthInfo(null);
    }, []);

    const value = useMemo(
        () => ({
            accessToken: authInfo?.accessToken ?? null,
            isAuthenticated: !!authInfo,
            login,
            logout,
        }),
        [authInfo, login, logout],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
