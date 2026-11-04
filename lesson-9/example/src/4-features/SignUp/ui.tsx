import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import type { FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useAuthContext } from '6-shared/lib/authContext';
import { getMessageFromError } from '6-shared/lib/common';
import { useSignUpApi } from './api';
import { signUpSchema } from './model';
import type { SignUpFormValues } from './model';

export const SignUp: FC = () => {
    const navigate = useNavigate();

    const { login } = useAuthContext();

    const form = useForm<SignUpFormValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
        mode: 'onChange',
        resolver: zodResolver(signUpSchema),
    });

    const { mutateAsync, isPending } = useSignUpApi();

    const {
        formState: { errors, isValid, isSubmitted },
        control,
        handleSubmit,
    } = form;

    const submitHandler = async (formValues: SignUpFormValues) => {
        try {
            const response = await mutateAsync(formValues);

            if ('user' in response) {
                toast.success('Вы успешно зарегистрировались в системе');
                login({
                    refreshToken: '',
                    userId: response.user.id,
                    accessToken: response.accessToken,
                    name: '',
                });
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
                    SignUp Form
                </Typography>
                <Container sx={{ display: 'flex', flexFlow: 'column', justifyContent: 'center' }} maxWidth="sm">
                    <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                label="Name"
                                sx={{ mb: 2 }}
                            />
                        )}
                    />
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
