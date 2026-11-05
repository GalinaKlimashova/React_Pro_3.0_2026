import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './1-app/routing';

// Применить фон из localStorage (без реактивности — это baseline)
try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.style.backgroundColor = '#121212';
    }
} catch {
    // eslint-disable-next-line no-console
    console.log('Не удалось ===вспомнить=== предыдущую тему');
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
