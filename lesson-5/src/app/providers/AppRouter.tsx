import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ClickTrackerPage } from '@/pages/ClickTrackerPage';
import { PreviousValuePage } from '@pages/PreviousValuePage';
import { InputFocusPage } from '@pages/InputFocusPage';
import { SearchDelayPage } from '@pages/SearchDelayPage';
import { ChatConnectionPage } from '@pages/ChatConnectionPage';
import { AppLayout } from '../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/click-tracker" replace /> },
      { path: 'click-tracker', element: <ClickTrackerPage /> },
      { path: 'previous-value', element: <PreviousValuePage /> },
      { path: 'input-focus', element: <InputFocusPage /> },
      { path: 'search-delay', element: <SearchDelayPage /> },
      { path: 'chat-connection', element: <ChatConnectionPage /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;