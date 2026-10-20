import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { WebSocketLogger } from '@/features/refExamples/WebSocketLogger';
import { AppLayout } from '../App';
import { ClickTimer } from '@/features/refExamples/ClickTimer';
import { PreviousInput } from '@/features/refExamples/PreviousInput/index';
import { FocusTracker } from '@/features/refExamples/FocusTracker';
import { DebouncedLogger } from '@/features/refExamples/DebouncedLogger';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/click-timer" replace /> },
      { path: 'click-timer', element: <ClickTimer /> },
      { path: 'previous-input', element: <PreviousInput /> },
      { path: 'focus-tracker', element: <FocusTracker /> },
      { path: 'debounced-logger', element: <DebouncedLogger /> },
      { path: 'web-socket-logger', element: <WebSocketLogger /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;