import { Footer } from '@widgets/Footer';
import { Header } from '@widgets/Header';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

export const AppRouter = () => (
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
