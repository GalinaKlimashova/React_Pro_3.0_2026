import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Container, Link, Typography, useTheme } from '@mui/material';
import type { FC } from 'react';
import { DESCRIPTION_NOT_FOUND, LINK_GO_HOME, STATUS_CODE_404, TITLE_NOT_FOUND } from '6-shared/config/constants';

export const NotFound: FC = () => {
    const theme = useTheme();

    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: theme.palette.background.default,
                textAlign: 'center',
                px: 2,
            }}
        >
            <div>
                <Box sx={{ mb: 3 }}>
                    <ErrorOutlineIcon
                        sx={{
                            fontSize: { xs: 80, sm: 100 },
                            color: theme.palette.warning.main,
                        }}
                    />
                </Box>

                <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                        fontSize: { xs: '4rem', sm: '6rem' },
                        fontWeight: 700,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1,
                    }}
                >
                    {STATUS_CODE_404}
                </Typography>

                <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                        fontWeight: 500,
                        color: theme.palette.text.secondary,
                        mb: 3,
                    }}
                >
                    {TITLE_NOT_FOUND}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: theme.palette.text.secondary,
                        maxWidth: 600,
                        mx: 'auto',
                        mb: 4,
                    }}
                >
                    {DESCRIPTION_NOT_FOUND}
                </Typography>

                <Link href="/">{LINK_GO_HOME}</Link>
            </div>
        </Container>
    );
};
