import { api } from '../base';
import type { SignInRequest, SignUpRequest, SignResponse } from './types';

const authApi = api.extend((options) => ({ prefixUrl: `${options.prefixUrl}/auth` }));

export const signUp = (params: SignUpRequest) =>
    authApi
        .post<SignResponse>('register', {
            json: params,
        })
        .json();

export const signIn = (params: SignInRequest) =>
    authApi
        .post<SignResponse>('login', {
            json: params,
        })
        .json();
