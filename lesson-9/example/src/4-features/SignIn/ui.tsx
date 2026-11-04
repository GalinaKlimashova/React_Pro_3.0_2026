import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useThrottle } from '@zh2s/react-utils';
import type { FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useAuthContext } from '6-shared/lib/authContext';
import { getMessageFromError } from '6-shared/lib/common';

import { useSignInApi } from './api';
import type { SignInFormValues } from './model';
import { signInSchema } from './model';

export const SignIn: FC = () => {
    const { login } = useAuthContext();
    const navigate = useNavigate();
    const form = useForm<SignInFormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
        resolver: zodResolver(signInSchema),
    });

    const { mutateAsync, isPending } = useSignInApi();

    const {
        formState: { errors, isValid, isSubmitted },
        control,
        handleSubmit,
        watch,
    } = form;

    // eslint-disable-next-line react-hooks/incompatible-library
    const { email } = watch();

    const throttledEmail = useThrottle(email, 1e3);

    console.log({ throttledEmail });

    const location = useLocation();

    const submitHandler = async (formValues: SignInFormValues) => {
        try {
            const response = await mutateAsync(formValues);

            if ('user' in response) {
                toast.success('Вы успешно вошли в систему');

                login({
                    refreshToken: '',
                    userId: response.user.id,
                    accessToken: response.accessToken,
                    name: '',
                });

                if (location.state?.from) {
                    return navigate(location.state.from);
                }
            }

            navigate('/');
        } catch (error) {
            toast.error(getMessageFromError(error));
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
