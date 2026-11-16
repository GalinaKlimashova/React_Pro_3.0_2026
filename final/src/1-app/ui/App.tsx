import { Footer } from '@widgets/Footer';
import { Header } from '@widgets/Header';
import { Outlet } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/normalize.css';
import '../styles/styles.css';
import { useAppDispatch } from '@shared/store/utils';
import { userActions } from '@shared/store/slices/user';
import { useEffect, useRef } from 'react';
import { useAuth } from '@features/auth/model/AuthProvider';

export const App = () => {
	const dispatch = useAppDispatch();
	const userId = useAuth().userId;
	const hasSynced = useRef(false);

	useEffect(() => {
		if (!userId || hasSynced.current) return;
		hasSynced.current = true;

		fetch('https://api.v2.react-learning.ru/products?perPage=1000')
			.then((res) => res.json())
			.then((data) => {
				if (!data?.products) return;
				const synced: string[] = [];
				for (const product of data.products) {
					if (
						product.likes?.some((l: { userId?: string }) => l.userId === userId)
					) {
						synced.push(product.id);
					}
				}
				const pending =
					JSON.parse(localStorage.getItem('auth_token') ?? '{}')
						?.likedProductIds ?? [];
				const syncedSet = new Set(synced);
				for (const id of pending) {
					if (!syncedSet.has(id)) {
						synced.push(id);
					}
				}
				if (synced.length > 0) {
					dispatch(userActions.syncLikedIds(synced));
				}
			})
			.catch((error) => {
				toast.error(error);
			});
	}, [userId, dispatch]);

	return (
		<div className='app-layout'>
			<Header />
			<main className='main'>
				<Outlet />
			</main>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				pauseOnHover
				theme='colored'
			/>
			<Footer />
		</div>
	);
};
