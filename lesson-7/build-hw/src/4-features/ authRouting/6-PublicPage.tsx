import { Box, Container, Typography } from '@mui/material';
import { TITLE_PUBLIC_PAGE, TITLE_PUBLIC_PAGE_DESCRIPTION } from '6-shared/config/constants';

export const PublicPage = () => {
    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    {TITLE_PUBLIC_PAGE}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {TITLE_PUBLIC_PAGE_DESCRIPTION}
                </Typography>
            </Box>
        </Container>
    );
};
