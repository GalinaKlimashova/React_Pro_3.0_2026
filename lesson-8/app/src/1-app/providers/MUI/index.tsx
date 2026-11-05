import { ThemeProvider, CssBaseline } from '@mui/material';
import type { ComponentType } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { createMuiTheme } from './theme';

function getThemeMode(): 'light' | 'dark' {
    try {
        return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    } catch {
        return 'light';
    }
}

export const withMUITheme = (WrappedComponent: ComponentType) => () => {
    const [mode, setMode] = useState<'light' | 'dark'>(getThemeMode);

    const applyTheme = useCallback(() => {
        const currentMode = getThemeMode();
        setMode((prev) => {
            if (prev !== currentMode) {
                document.documentElement.dataset.theme = currentMode;
                document.body.style.backgroundColor = currentMode === 'dark' ? '#121212' : '#ffffff';
            }
            return currentMode;
        });
    }, []);

    const muiTheme = useMemo(() => createMuiTheme(mode), [mode]);

    useEffect(() => {
        applyTheme();

        const handler = (e: StorageEvent) => {
            if (e.key === 'theme') applyTheme();
        };
        window.addEventListener('storage', handler);

        const reactHandler = () => applyTheme();
        window.addEventListener('theme-change', reactHandler);

        return () => {
            window.removeEventListener('storage', handler);
            window.removeEventListener('theme-change', reactHandler);
        };
    }, [applyTheme]);

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <WrappedComponent />
        </ThemeProvider>
    );
};
