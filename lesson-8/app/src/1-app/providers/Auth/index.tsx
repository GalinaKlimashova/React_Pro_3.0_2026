import { useCallback, useMemo, useState, type ComponentType } from 'react';
import { JWT_ACCESS_LS_KEY, JWT_LS_KEY, JWT_REFRESH_LS_KEY, USER_INFO_LS_KEY } from '6-shared/config/constants';
import { AuthContext } from '6-shared/lib/authContext';
import { clearLS, loadFromLS, saveToLocaleStorage } from '6-shared/lib/localStorage';
import type { AuthContextModel, AuthInfo, AuthMethods } from '6-shared/model/auth';

export const withAuthContext = (WrappedComponent: ComponentType) => () => {
    const [authInfo, setAuthInfo] = useState<AuthInfo>(() => {
        const accessToken = loadFromLS<string>({ key: JWT_LS_KEY, subTitle: JWT_ACCESS_LS_KEY });

        const refreshToken = loadFromLS<string>({ key: JWT_LS_KEY, subTitle: JWT_REFRESH_LS_KEY });

        const userInfo = loadFromLS<Pick<AuthInfo, 'name' | 'userId'>>({ key: USER_INFO_LS_KEY });

        return {
            accessToken: accessToken || '',
            refreshToken: refreshToken || '',
            userId: userInfo?.userId || '',
            name: userInfo?.name || '',
        };
    });

    const login: AuthMethods['login'] = useCallback((authInfo) => {
        const { accessToken, refreshToken, ...user } = authInfo;

        saveToLocaleStorage({
            key: JWT_LS_KEY,
            subTitle: JWT_ACCESS_LS_KEY,
            state: accessToken,
        });

        saveToLocaleStorage({
            key: JWT_LS_KEY,
            subTitle: JWT_REFRESH_LS_KEY,
            state: refreshToken,
        });

        saveToLocaleStorage({
            key: USER_INFO_LS_KEY,
            state: user,
        });

        setAuthInfo(authInfo);
    }, []);

    const logout: AuthMethods['logout'] = useCallback(() => {
        clearLS({ key: JWT_LS_KEY });
        clearLS({ key: USER_INFO_LS_KEY });
        setAuthInfo({
            accessToken: '',
            refreshToken: '',
            userId: '',
            name: '',
        });
    }, []);

    const contextValue: AuthContextModel = useMemo(
        () => ({
            ...authInfo,
            login,
            logout,
        }),
        [authInfo, login, logout],
    );

    return (
        <AuthContext.Provider value={contextValue}>
            <WrappedComponent />
        </AuthContext.Provider>
    );
};
