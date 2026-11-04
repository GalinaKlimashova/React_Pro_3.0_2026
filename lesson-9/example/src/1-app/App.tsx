import { Box, Container } from '@mui/material';
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
                <Container maxWidth="md" sx={{ py: 8 }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </Suspense>
                </Container>
            </Box>
        </>
    );
});
