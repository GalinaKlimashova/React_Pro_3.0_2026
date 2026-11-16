import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
	user: Partial<User> | null;
	accessToken: string;
	likedProductIds: string[];
}

const TOKEN_KEY = 'auth_token';

const parseStoredToken = (): UserState | null => {
	try {
		const raw = localStorage.getItem(TOKEN_KEY);
		if (!raw) return null;
		const parsed: {
			user?: Partial<User>;
			accessToken?: string;
			likedProductIds?: string[];
		} = JSON.parse(raw);
		return parsed
			? {
					user: parsed.user ?? null,
					accessToken: parsed.accessToken ?? '',
					likedProductIds: parsed.likedProductIds ?? [],
			  }
			: null;
	} catch {
		return null;
	}
};

const stored = parseStoredToken();

export const userSlice = createSlice({
	name: 'user',
	initialState: stored ?? { user: null, accessToken: '', likedProductIds: [] },
	reducers: {
		setAccessToken(state, action: PayloadAction<Pick<Token, 'accessToken'>>) {
			state.accessToken = action.payload.accessToken;
			localStorage.setItem(TOKEN_KEY, JSON.stringify(state));
		},
		clearUser() {
			localStorage.removeItem(TOKEN_KEY);
			return { user: null, accessToken: '', likedProductIds: [] };
		},
		setUser: (state, action: PayloadAction<UserState['user']>) => {
			state.user = action.payload;
			localStorage.setItem(
				TOKEN_KEY,
				JSON.stringify({ ...state, user: action.payload })
			);
		},
		syncLikedIds(state, action: PayloadAction<string[]>) {
			state.likedProductIds = action.payload;
		},
		addLikeId(state, action: PayloadAction<string>) {
			if (!state.likedProductIds.includes(action.payload)) {
				state.likedProductIds.push(action.payload);
				localStorage.setItem(TOKEN_KEY, JSON.stringify(state));
			}
		},
		removeLikeId(state, action: PayloadAction<string>) {
			state.likedProductIds = state.likedProductIds.filter(
				(id) => id !== action.payload
			);
			localStorage.setItem(TOKEN_KEY, JSON.stringify(state));
		},
	},
	selectors: {
		getUser: (state: UserState) => state.user,
		getAccessToken: (state: Token) => state.accessToken,
		getLikedProductIds: (state: UserState) => state.likedProductIds,
	},
});

export const userActions = { ...userSlice.actions };
export const userSelectors = userSlice.selectors;
