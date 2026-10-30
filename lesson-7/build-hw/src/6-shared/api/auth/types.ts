export interface SignUpRequest {
    email: string;
    name?: string;
    password: string;
    avatarPath?: string;
    about?: string;
    phone?: string;
}

export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignResponseSuccess {
    user: {
        id: string;
        email: string;
        name?: string;
        about?: string;
        avatarPath?: string;
        favoritesPost?: string[];
        likes?: string[];
        phone?: string;
        roles?: ['USER'];
    };
    accessToken: string;
}

export interface SignResponseError {
    statusCode: number;
    message: string[];
    error: string;
}

export type SignResponse = SignResponseSuccess | SignResponseError;

export interface UserMeResponse {
    user: {
        id: string;
        email: string;

        name?: string;
        about?: string;
        avatarPath?: string;
        favoritesPost?: string[];
        likes?: string[];
        phone?: string;
        roles?: ['USER'];
    };
}
