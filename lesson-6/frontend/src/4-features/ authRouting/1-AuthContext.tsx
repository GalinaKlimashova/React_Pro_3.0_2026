import { AuthContext } from '6-shared/lib/authContext';
import type { AuthInfo } from '6-shared/model-auth/auth';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

const TOKEN_KEY = 'auth_token';

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
            accessToken: authInfo?.accessToken ?? '',
            refreshToken: authInfo?.refreshToken ?? '',
            userId: authInfo?.userId ?? '',
            name: authInfo?.name,
            isAuthenticated: !!authInfo,
            login,
            logout,
        }),
        [authInfo, login, logout],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
