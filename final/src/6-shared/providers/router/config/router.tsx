import { createBrowserRouter } from 'react-router-dom';

import { ProductPage } from '@pages/ProductPage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { ProfilePage } from '@pages/ProfilePage';
import { FavoritesPage } from '@pages/FavoritesPage';
import { App } from '@app';
import { SignUpPage } from '@pages/SignUpPage';
import { SignInPage } from '@pages/SignInPage';
import { CartPage } from '@features/cart/CartPage';
import ProtectedRoute from '@shared/store/HOCs/ProtectedRoute';
import { AuthGuard } from '@shared/store/HOCs/AuthGuard';

export enum AppRoutes {
	HOME = 'home',
	FAVORITES = 'favorites',
	PRODUCTS = 'products',
	PROFILE = 'profile',
	CART = 'cart',
	SIGNUP = 'signup',
	SIGNIN = 'signin',
	NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, `/${string}` | '*'> = {
	[AppRoutes.HOME]: '/',
	[AppRoutes.FAVORITES]: '/favorites',
	[AppRoutes.PRODUCTS]: '/products/:productId',
	[AppRoutes.PROFILE]: '/profile',
	[AppRoutes.CART]: '/cart',
	[AppRoutes.SIGNUP]: '/signup',
	[AppRoutes.SIGNIN]: '/signin',
	[AppRoutes.NOT_FOUND]: '*',
};

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <AuthGuard />,
			},
			{
				path: RoutePath[AppRoutes.FAVORITES],
				element: (
					<ProtectedRoute>
						<FavoritesPage />
					</ProtectedRoute>
				),
			},
			{
				path: RoutePath[AppRoutes.PRODUCTS],
				element: (
					<ProtectedRoute>
						<ProductPage />
					</ProtectedRoute>
				),
			},
			{
				path: RoutePath[AppRoutes.PROFILE],
				element: (
					<ProtectedRoute>
						<ProfilePage />
					</ProtectedRoute>
				),
			},
			{
				path: RoutePath[AppRoutes.CART],
				element: (
					<ProtectedRoute>
						<CartPage />
					</ProtectedRoute>
				),
			},
			{
				path: RoutePath[AppRoutes.SIGNUP],
				element: <SignUpPage />,
			},
			{
				path: RoutePath[AppRoutes.SIGNIN],
				element: <SignInPage />,
			},
			// last route
			{
				path: RoutePath[AppRoutes.NOT_FOUND],
				element: <NotFoundPage />,
			},
		],
	},
]);
