import { useEffect, type FC } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useAuthContext } from '6-shared/lib/authContext';

export const SignOut: FC = () => {
    const navigate = useNavigate();
    const { logout, userId } = useAuthContext();
    useEffect(() => {
        logout();

        toast.info('Вы вышли из системы');

        navigate('/');
    }, [logout, navigate, userId]);

    return null;
};
