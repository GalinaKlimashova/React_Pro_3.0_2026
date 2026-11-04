import { withProtection } from '@zh2s/react-utils';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import { ActivityPage } from '2-pages/Activity';
import { MainPage } from '2-pages/Main';
import { NotFoundPage } from '2-pages/NotFound';
import { SignOutPage } from '2-pages/SignOut';
import { SignUpPage } from '2-pages/SignUp';
import { UseEffectEventPage } from '2-pages/UseEffectEvent';
import { UseOptimisticPage } from '2-pages/UseOptimistic';
import { UseTransitionPage } from '2-pages/UseTransition';
import { useContextAuthStrategy } from '6-shared/lib/useContextAuthStrategy';
import { App } from '../App';

const ProfilePage = lazy(() => import('2-pages/Profile').then((module) => ({ default: module.ProfilePage })));

const SignInPage = lazy(async () => {
    const component = await import('2-pages/SignIn');

    return { default: component.SignInPage };
});

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
                path: 'activity',
                element: <ActivityPage />,
            },
            {
                path: 'useEffectEvent',
                element: <UseEffectEventPage />,
            },
            {
                path: 'useTransition',
                element: <UseTransitionPage />,
            },

            {
                path: 'useOptimistic',
                element: <UseOptimisticPage />,
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
