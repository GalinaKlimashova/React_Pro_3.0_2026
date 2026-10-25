import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import type { FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useAuthContext } from '6-shared/lib/authContext';
import { parseErrorWithZod } from '6-shared/lib/common';
import { useSignInApi } from './api';
import { signInSchema } from './model';
import type { SignInFormValues } from './model';

export const SignIn: FC = () => {
    const form = useForm<SignInFormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
        resolver: zodResolver(signInSchema),
    });

    const {
        formState: { errors, isValid, isSubmitted },
        control,
        handleSubmit,
    } = form;

    const { mutateAsync, isPending } = useSignInApi();

    const navigate = useNavigate();

    const { login } = useAuthContext();

    const location = useLocation();

    const submitHandler = async (formValues: SignInFormValues) => {
        try {
            const response = await mutateAsync(formValues);

            if ('user' in response) {
                login({
                    userId: response.user.id,
                    name: '',
                    accessToken: response.accessToken,
                    refreshToken: '',
                });
                toast.success('Вы успешно вошли в систему');
                navigate(location.state.from || '/');
            }
        } catch (error) {
            toast.error(parseErrorWithZod(error, 'Неизвестная ошибка при входе в систему'));
        }
    };

    return (
        <FormProvider {...form}>
            <Box component="form" onSubmit={handleSubmit(submitHandler)}>
                <Typography variant="h2" align="center" sx={{ mb: 6 }}>
                    SignIn Form
                </Typography>
                <Container sx={{ display: 'flex', flexFlow: 'column', justifyContent: 'center' }} maxWidth="sm">
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                type="email"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                label="Email"
                                sx={{ mb: 2 }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                type="password"
                                autoComplete="current-password"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                label="Password"
                                sx={{ mb: 2 }}
                            />
                        )}
                    />
                    <Button loading={isPending} disabled={isSubmitted && !isValid} type="submit" variant="contained">
                        Submit
                    </Button>
                </Container>
            </Box>
        </FormProvider>
    );
};
