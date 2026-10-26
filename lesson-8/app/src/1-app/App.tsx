import { Box, CircularProgress, Container } from '@mui/material';
import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Header } from '3-widgets/Header';
import { withProviders } from './providers';

export const App = withProviders(() => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <Header />
                <Container maxWidth="lg" sx={{ py: 8 }}>
                    <Suspense
                        fallback={
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress color="error" aria-label="Loading…" />
                            </Box>
                        }
                    >
                        <Outlet />
                    </Suspense>
                </Container>
            </Box>
        </>
    );
});
