import { loginUrl, profileUrl, publicUrl, signUpUrl } from '6-shared/config/urls';
import type { HeaderLink } from './model';

export const AUTHORIZED_LINKS: HeaderLink[] = [
    { href: profileUrl, title: 'Профиль (Profile)' },
    { href: publicUrl, title: 'Открытая страница (PublicPage)' },
];

export const UNAUTHORIZED_LINKS: HeaderLink[] = [
    { href: publicUrl, title: 'Открытая страница (PublicPage)' },
    { href: signUpUrl, title: 'Регистрация (SignUp)' },
    { href: loginUrl, title: 'Вход (SignIn)' },
];
