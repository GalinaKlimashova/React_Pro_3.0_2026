import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@features/auth/model/AuthProvider';

export const RedirectOnAuth = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		navigate(isAuthenticated ? '/' : '/signin', { replace: true });
	}, [isAuthenticated, navigate]);

	return null;
};
