import { createBrowserRouter } from 'react-router';
import { MainPage } from '2-pages/Main';
import { NotFoundPage } from '2-pages/NotFound';
import { ProfilePage } from '2-pages/Profile';
import { SignInPage } from '2-pages/SignIn';
import { SignOutPage } from '2-pages/SignOut';
import { SignUpPage } from '2-pages/SignUp';

import { useContextAuthStrategy } from '6-shared/lib/useContextAuthStrategy';
import { withProtection } from '6-shared/lib/withProtection';
import { App } from '../App';

const ProfilePageWithProtection = withProtection(ProfilePage, useContextAuthStrategy);

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: 'profile',
                element: <ProfilePageWithProtection />,
            },
            {
                path: 'signUp',
                element: <SignUpPage />,
            },
            {
                path: 'signIn',
                element: <SignInPage />,
            },
            {
                path: 'signOut',
                element: <SignOutPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);
