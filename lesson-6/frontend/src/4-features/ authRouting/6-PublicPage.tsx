import { Box, Container, Typography } from '@mui/material';

export const PublicPage = () => {
    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Публичная страница
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Эта страница доступна всем пользователям без авторизации.
                </Typography>
            </Box>
        </Container>
    );
};
