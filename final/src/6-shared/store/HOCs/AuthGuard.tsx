import { FC } from 'react';
import { useAuth } from '@features/auth/model/AuthProvider';
import { SignInPage } from '@pages/SignInPage';
import { HomePage } from '@pages/HomePage';

export const AuthGuard: FC = () => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <SignInPage />;
	}

	return <HomePage />;
};
