import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext } from '6-shared/lib/authContext';

export const SignOut = () => {
    const { logout } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        logout();

        navigate('/');
    }, [logout, navigate]);

    return null;
};
