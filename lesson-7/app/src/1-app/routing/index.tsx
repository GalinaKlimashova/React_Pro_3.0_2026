import { withProtection } from '@zh2s/react-utils';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import { MainPage } from '2-pages/Main';
import { NotFoundPage } from '2-pages/NotFound';
import { SignInPage } from '2-pages/SignIn';
import { SignOutPage } from '2-pages/SignOut';
import { SignUpPage } from '2-pages/SignUp';

import { useContextAuthStrategy } from '6-shared/lib/useContextAuthStrategy';
import { App } from '../App';

const ProfilePage = lazy(() => import('2-pages/Profile').then((module) => ({ default: module.ProfilePage })));
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
