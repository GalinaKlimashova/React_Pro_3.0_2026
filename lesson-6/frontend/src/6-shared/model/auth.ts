export interface AuthInfo {
    accessToken: string;
    refreshToken: string;
    userId: string;
    name?: string;
}

export interface AuthMethods {
    login: (authInfo: AuthInfo) => void;
    logout: () => void;
}

export type AuthContextModel = AuthInfo & AuthMethods;

export type UseAuthStrategy = () => {
    isAuthenticated: boolean;
    isReady: boolean;
};
