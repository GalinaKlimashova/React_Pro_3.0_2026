import { Outlet } from 'react-router';
import { AuthProvider } from './1-AuthContext';
import { LoginPage } from './4-LoginPage';
import { ProtectedRoute } from './3-ProtectedRoute';
import { PublicPage } from './6-PublicPage';

// Placeholder for the profile page — see 5-ProfilePage.tsx
const ProfilePagePlaceholder = () => null;

const AppRoutes = () => (
    <Outlet />
);

export const router = () => {
    const route = {
        element: (
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        ),
        children: [
            {
                path: '/',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <PublicPage />,
                    },
                    {
                        path: 'login',
                        element: <LoginPage />,
                    },
                    {
                        element: <ProtectedRoute />,
                        children: [
                            {
                                path: 'profile',
                                element: <ProfilePagePlaceholder />,
                            },
                        ],
                    },
                ],
            },
        ],
    };

    return route;
};

