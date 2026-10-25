import type { HeaderLink } from './model';

export const AUTHORIZED_LINKS: HeaderLink[] = [
    {
        href: '/profile',
        title: 'Profile',
    },
    {
        href: '/signOut',
        title: 'SignOut',
    },
];

export const UNAUTHORIZED_LINKS: HeaderLink[] = [
    {
        href: '/signUp',
        title: 'SignUp',
    },
    {
        href: '/signIn',
        title: 'SignIn',
    },
];
