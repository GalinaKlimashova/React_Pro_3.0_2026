import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import type { FC } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { useAuthContext } from '6-shared/lib/authContext';
import { parseErrorWithZod } from '6-shared/lib/common';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useSignUpApi } from './api';
import {
    TITLE_SIGN_UP_FORM,
    TITLE_SIGN_UP_SUBTITLE,
    LABEL_EMAIL,
    LABEL_PASSWORD,
    BTN_SUBMIT,
    TOAST_ERROR_REGISTER,
} from '6-shared/config/constants';
import { userSchema, type ProjectFormValues } from '6-shared/model-validator';
import { profileUrl } from '6-shared/config/urls';
import { emailField, passwordField, userField } from '6-shared/config/form-fields';

export const SignUp: FC = () => {
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

    const { mutateAsync, isPending } = useSignUpApi();

    const navigate = useNavigate();

    const { login } = useAuthContext();

    const submitHandler = async (formValues: ProjectFormValues) => {
        try {
            const response = await mutateAsync(formValues);

            if (userField in response) {
                login({
                    userId: response.user.id,
                    accessToken: response.accessToken,
                });
                navigate(profileUrl);
            } else if (response.error) {
                toast.error(parseErrorWithZod(response, TOAST_ERROR_REGISTER));
            }
        } catch (error) {
            toast.error(parseErrorWithZod(error, TOAST_ERROR_REGISTER));
        }
    };

    return (
        <FormProvider {...form}>
            <Box component="form" onSubmit={handleSubmit(submitHandler)}>
                <Typography variant="h2" align="center" sx={{ mb: 0.5 }}>
                    {TITLE_SIGN_UP_FORM}
                </Typography>
                <Typography variant="subtitle1" align="center" sx={{ mb: 1 }}>
                    {TITLE_SIGN_UP_SUBTITLE}
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
                        name={passwordField}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                type={passwordField}
                                autoComplete="current-password"
                                error={!!errors[passwordField]}
                                helperText={errors[passwordField]?.message}
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
