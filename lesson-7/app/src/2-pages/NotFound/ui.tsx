import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Container, Link, Typography, useTheme } from '@mui/material';
import type { FC } from 'react';

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
            {/* Анимированный контейнер (если используешь framer-motion) */}
            <div>
                {/* Иконка ошибки */}
                <Box sx={{ mb: 3 }}>
                    <ErrorOutlineIcon
                        sx={{
                            fontSize: { xs: 80, sm: 100 },
                            color: theme.palette.warning.main,
                        }}
                    />
                </Box>

                {/* Заголовок */}
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
                    404
                </Typography>

                {/* Подзаголовок */}
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                        fontWeight: 500,
                        color: theme.palette.text.secondary,
                        mb: 3,
                    }}
                >
                    Страница не найдена
                </Typography>

                {/* Описание */}
                <Typography
                    variant="body1"
                    sx={{
                        color: theme.palette.text.secondary,
                        maxWidth: 600,
                        mx: 'auto',
                        mb: 4,
                    }}
                >
                    Кажется, вы забрели туда, где ничего нет. Не переживайте — это случается со всеми.
                </Typography>

                {/* Кнопка возврата */}
                <Link href="/">Вернуться на главную</Link>
            </div>
        </Container>
    );
};
