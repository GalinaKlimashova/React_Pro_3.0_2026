import type { SignInRequest, SignUpRequest, SignResponse, UserMeResponse } from './types';

const BASE_URL = 'https://api.v2.react-learning.ru';

export const signUp = async (params: SignUpRequest): Promise<SignResponse> => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
    });
    return response.json();
};

export const signIn = async (params: SignInRequest): Promise<SignResponse> => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
    });
    return response.json();
};

export const getUserMe = async (): Promise<UserMeResponse> => {
    const response = await fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `${localStorage.getItem('auth_token') ? JSON.parse(localStorage.getItem('auth_token')!).accessToken : ''}`,
        },
    });
    return response.json();
};
