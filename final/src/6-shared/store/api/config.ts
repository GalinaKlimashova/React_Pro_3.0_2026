import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { AnyAction } from '@reduxjs/toolkit';

const BASE_URL = 'https://api.v2.react-learning.ru';
const AUTH_STATE_KEY = 'auth_state';

interface AppStore {
	getState: () => unknown;
	dispatch: (action: AnyAction) => AnyAction;
}

let globalStore: AppStore | null = null;

export const setApiStore = (store: AppStore) => {
	globalStore = store;
};

export const customBaseQuery = fetchBaseQuery({
	baseUrl: process.env.API_URL || BASE_URL,
	prepareHeaders: (headers) => {
		let accessToken = '';
		try {
			const raw = localStorage.getItem(AUTH_STATE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				if (parsed?.accessToken) {
					accessToken = parsed.accessToken;
				}
			}
		} catch {}

		if (!accessToken && globalStore) {
			try {
				const state = globalStore.getState();
				const userState = state as Record<
					string,
					Record<string, unknown> | undefined
				>;
				accessToken = (userState?.user?.accessToken as string) || '';
			} catch {}
		}

		if (accessToken) {
			headers.set('authorization', `Bearer ${accessToken}`);
		}
		return headers;
	},
});
