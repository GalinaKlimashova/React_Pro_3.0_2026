export interface SignUpRequest {
    email: string;
    name: string;
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
    };
    accessToken: string;
}

export interface SignResponseError {
    statusCode: number;
    message: string[];
    error: string;
}

export type SignResponse = SignResponseSuccess | SignResponseError;
