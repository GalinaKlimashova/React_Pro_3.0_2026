export interface AuthInfo {
    accessToken: string;
    refreshToken?: string;
    userId: string;
    name?: string;
}

export interface AuthMethods {
    login: (authInfo: AuthInfo) => void;
    logout: () => void;
}

export type AuthContextModelOld = AuthInfo & AuthMethods;

export type AuthContextModel = AuthInfo & AuthMethods & { isAuthenticated: boolean };

export type UseAuthStrategy = () => {
    isAuthenticated: boolean;
    isReady: boolean;
};
