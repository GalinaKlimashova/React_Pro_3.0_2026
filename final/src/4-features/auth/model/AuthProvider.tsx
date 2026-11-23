import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import type { ReactNode } from 'react';

const AUTH_STATE_KEY = 'auth_state';

interface AuthState {
	accessToken: string;
	refreshToken: string;
	userId: string;
	name?: string;
}

const parseStoredToken = (): AuthState | null => {
	try {
		const raw = localStorage.getItem(AUTH_STATE_KEY);
		if (!raw) return null;
		const parsed: AuthState = JSON.parse(raw);
		return parsed;
	} catch {
		return null;
	}
};

interface AuthContextModel extends AuthState {
	isAuthenticated: boolean;
	login: (state: AuthState) => void;
	logout: () => void;
	userId: string;
}

const defaultContext: AuthContextModel = {
	accessToken: '',
	refreshToken: '',
	userId: '',
	isAuthenticated: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	login: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	logout: () => {},
};

export const AuthContext = createContext<AuthContextModel>(defaultContext);

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [authState, setAuthState] = useState<AuthState | null>(() => {
		try {
			return parseStoredToken();
		} catch {
			return null;
		}
	});

	const login = useCallback((info: AuthState) => {
		setAuthState(info);
		localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(info));
	}, []);

	const logout = useCallback(() => {
		setAuthState(null);
		localStorage.removeItem(AUTH_STATE_KEY);
	}, []);

	const userId = authState?.userId ?? '';

	const value = useMemo(
		() => ({
			accessToken: authState?.accessToken ?? '',
			refreshToken: authState?.refreshToken ?? '',
			userId,
			isAuthenticated: !!authState,
			login,
			logout,
		}),
		[authState, login, logout, userId]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
