import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router';
import { signInRequest } from '6-shared/api';
import { parseErrorWithZod } from '6-shared/lib/common';
import { useAuth } from './2-useAuth';

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const form = useForm<LoginFormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
        resolver: zodResolver(loginSchema),
    });

    const {
        formState: { errors, isValid, isSubmitted },
        handleSubmit,
        reset,
    } = form;

    const onSubmit = async (formValues: LoginFormValues) => {
        try {
            const response = await signInRequest(formValues);

            if ('accessToken' in response && response.accessToken) {
                login({
                    accessToken: response.accessToken,
                    refreshToken: '',
                    userId: response.user?.id ?? '',
                    name: '',
                });

                toast.success('Вы успешно вошли в систему');
                reset();
                navigate('/profile');
            }
        } catch (error) {
            toast.error(parseErrorWithZod(error, 'Неизвестная ошибка при входе в систему'));
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Вход в систему
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    {...form.register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    autoComplete="current-password"
                    {...form.register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{ mb: 3 }}
                />
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={isSubmitted && !isValid}
                >
                    Войти
                </Button>
            </Box>
        </Container>
    );
};
