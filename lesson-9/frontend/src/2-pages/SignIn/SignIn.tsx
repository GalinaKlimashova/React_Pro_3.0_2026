import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import type { FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { useAuthContext } from '6-shared/lib/authContext';
import { parseErrorWithZod } from '6-shared/lib/common';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useSignInApi } from './api';

import {
    BTN_SUBMIT,
    LABEL_EMAIL,
    LABEL_PASSWORD,
    TITLE_SIGN_IN_FORM,
    TOAST_ERROR_SIGN_IN,
} from '6-shared/config/constants';
import { emailField, userField } from '6-shared/config/form-fields';
import { userSchema, type ProjectFormValues } from '6-shared/model-validator';

export const SignIn: FC = () => {
    const form = useForm<ProjectFormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
        resolver: zodResolver(userSchema),
    });

    const {
        formState: { errors, isValid, isSubmitted },
        control,
        handleSubmit,
    } = form;

    const { getResponse, isPending } = useSignInApi();

    const navigate = useNavigate();

    const { login } = useAuthContext();

    const location = useLocation();

    const submitHandler = async (formValues: ProjectFormValues) => {
        try {
            const response = await getResponse(formValues);

            if (userField in response) {
                login({
                    userId: response.user.id,
                    name: '',
                    accessToken: response.accessToken,
                    refreshToken: '',
                });
                navigate(location.state.from || '/');
            }
        } catch (error) {
            toast.error(parseErrorWithZod(error, TOAST_ERROR_SIGN_IN));
        }
    };

    return (
        <FormProvider {...form}>
            <Box component="form" onSubmit={handleSubmit(submitHandler)}>
                <Typography variant="h2" align="center" sx={{ mb: 6 }}>
                    {TITLE_SIGN_IN_FORM}
                </Typography>
                <Container
                    sx={{
                        display: 'flex',
                        flexFlow: 'column',
                        justifyContent: 'center',
                    }}
                    maxWidth="sm"
                >
                    <Controller
                        control={control}
                        name={emailField}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                type={emailField}
                                error={!!errors[emailField]}
                                helperText={errors[emailField]?.message}
                                label={LABEL_EMAIL}
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
                                label={LABEL_PASSWORD}
                                sx={{ mb: 2 }}
                            />
                        )}
                    />
                    <Button loading={isPending} disabled={isSubmitted && !isValid} type="submit" variant="contained">
                        {BTN_SUBMIT}
                    </Button>
                </Container>
            </Box>
        </FormProvider>
    );
};
