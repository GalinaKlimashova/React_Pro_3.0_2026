export const routes = {
    home: () => import('2-pages/SignIn/SignIn'),
    login: () => import('2-pages/SignIn/SignIn'),
    signup: () => import('2-pages/SignUp/SignUp'),
    notFound: () => import('2-pages/NotFound/NotFound'),
};

export type RouteFactory = () => Promise<Record<string, unknown>>;
export type RouteMap = Record<string, RouteFactory>;
