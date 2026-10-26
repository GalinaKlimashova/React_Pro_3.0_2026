import { Navigate, Outlet } from 'react-router';
import { useAuth } from './2-useAuth';
import { loginUrl } from '6-shared/config/urls';

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={loginUrl} replace />;
    }

    return <Outlet />;
};
