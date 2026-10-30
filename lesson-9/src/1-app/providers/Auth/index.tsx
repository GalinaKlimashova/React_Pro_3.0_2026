import { useCallback, useMemo, useState, type ComponentType } from 'react';
import type { SignResponseSuccess } from '6-shared/api/auth';
import { JWT_ACCESS_LS_KEY, JWT_LS_KEY, JWT_REFRESH_LS_KEY, USER_INFO_LS_KEY } from '6-shared/config/constants';
import { AuthContext } from '6-shared/lib/authContext';
import { clearLS, loadFromLS, saveToLocaleStorage } from '6-shared/lib/localStorage';
import type { AuthContextModel, AuthInfo, AuthMethods } from '6-shared/model/auth';

export const withAuthProvider = (WrappedComponent: ComponentType) => () => {
    const [authInfo, setAuthInfo] = useState<Omit<AuthInfo, 'login' | 'logout'>>(() => {
        const accessToken = loadFromLS<string>({ key: JWT_LS_KEY, subTitle: JWT_ACCESS_LS_KEY });
        const userInfo = loadFromLS<SignResponseSuccess['user']>({ key: USER_INFO_LS_KEY });

        return {
            accessToken: accessToken || '',
            refreshToken: '',
            userId: userInfo?.id || '',
            name: userInfo?.email,
        };
    });

    const login: AuthMethods['login'] = useCallback(
        (authInfo) => {
            setAuthInfo(authInfo);

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
        },
        [setAuthInfo],
    );

    const logout: AuthMethods['logout'] = useCallback(() => {
        clearLS({ key: JWT_LS_KEY });
        clearLS({ key: USER_INFO_LS_KEY });
        setAuthInfo({
            accessToken: '',
            refreshToken: '',
            userId: '',
            name: '',
        });
    }, [setAuthInfo]);

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
