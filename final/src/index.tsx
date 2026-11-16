import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@shared/providers/router';
import { Provider } from 'react-redux';
import { store } from '@shared/store/store';
import { AuthProvider } from '@features/auth/model/AuthProvider';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<StrictMode>
		<Provider store={store}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</Provider>
	</StrictMode>
);
