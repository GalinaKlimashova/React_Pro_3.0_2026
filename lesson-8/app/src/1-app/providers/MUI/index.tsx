import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import type { ComponentType } from 'react';
import { theme } from './theme';

export const withTheme = (WrappedComponent: ComponentType) => () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <WrappedComponent />
    </ThemeProvider>
);
