import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './config';
import { FormValues } from '@features/auth/shared/utils/types';

type SignUpResponse = {
	user: Pick<User, 'id' | 'email'>;
	accessToken: Token['accessToken'];
};

type SignInResponse = {
	user: Pick<User, 'id' | 'email'>;
	accessToken: Token['accessToken'];
};

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		signUp: builder.mutation<SignUpResponse, FormValues>({
			query: (signUpFormValues) => ({
				url: '/auth/register',
				method: 'POST',
				body: signUpFormValues,
			}),
		}),
		signIn: builder.mutation<SignInResponse, FormValues>({
			query: (signInFormValues) => ({
				url: '/auth/login',
				method: 'POST',
				body: signInFormValues,
			}),
		}),
	}),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
