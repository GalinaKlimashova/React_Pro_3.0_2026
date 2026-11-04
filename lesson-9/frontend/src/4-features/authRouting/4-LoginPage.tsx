import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { signInRequest } from '6-shared/api';
import {
    BTN_SIGN_IN,
    LABEL_EMAIL,
    LABEL_PASSWORD,
    TITLE_LOGIN_PAGE,
    TOAST_ERROR_LOGIN,
    TOAST_SIGN_IN_SUCCESS,
} from '6-shared/config/constants';
import { parseErrorWithZod } from '6-shared/lib/common';
import { userSchema, type ProjectFormValues } from '6-shared/model-validator';
import { useNavigate } from 'react-router';
import { useAuth } from './2-useAuth';
import { profileUrl } from '6-shared/config/urls';
import { emailField, passwordField } from '6-shared/config/form-fields';

export const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

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
        handleSubmit,
        reset,
    } = form;

    const onSubmit = async (formValues: ProjectFormValues) => {
        try {
            const response = await signInRequest(formValues);

            if ('accessToken' in response && response.accessToken) {
                login({
                    accessToken: response.accessToken,
                    refreshToken: '',
                    userId: response.user?.id ?? '',
                    name: '',
                });

                toast.success(TOAST_SIGN_IN_SUCCESS);
                reset();
                navigate(profileUrl);
            }
        } catch (error) {
            toast.error(parseErrorWithZod(error, TOAST_ERROR_LOGIN));
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
                {TITLE_LOGIN_PAGE}
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    type={emailField}
                    label={LABEL_EMAIL}
                    {...form.register(emailField)}
                    error={!!errors[emailField]}
                    helperText={errors[emailField]?.message}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    type={passwordField}
                    label={LABEL_PASSWORD}
                    autoComplete="current-password"
                    {...form.register(passwordField)}
                    error={!!errors[passwordField]}
                    helperText={errors[passwordField]?.message}
                    sx={{ mb: 3 }}
                />
                <Button fullWidth type="submit" variant="contained" disabled={isSubmitted && !isValid}>
                    {BTN_SIGN_IN}
                </Button>
            </Box>
        </Container>
    );
};
