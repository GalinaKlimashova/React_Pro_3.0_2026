import type { UserMeResponse } from '6-shared/api';
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { getUserMe } from '6-shared/api/auth/queries';
import {
    BTN_LOGOUT,
    BTN_REFRESH,
    BTN_RETRY,
    TITLE_PROFILE,
    TOAST_ERROR_PROFILE,
    TOAST_SIGN_OUT_SUCCESS,
} from '6-shared/config/constants';
import { useAuth } from './2-useAuth';
import styles from './authRouting.module.css';
import { loginUrl } from '6-shared/config/urls';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [user, setUser] = useState<UserMeResponse['user'] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = async () => {
        setIsLoading(true);
        setError(null);

        try {
            getUserMe()
                .then((data) => {
                    setUser(data as unknown as UserMeResponse['user']);
                })
                .catch((error) => {
                    toast.error(error);
                });
        } catch {
            setError(TOAST_ERROR_PROFILE);
            toast.error(TOAST_ERROR_PROFILE);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleLogout = () => {
        logout();
        navigate(loginUrl, { replace: true });
        toast.success(TOAST_SIGN_OUT_SUCCESS);
    };

    return (
        <Container className={styles.formContainer} maxWidth="sm" sx={{ mt: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
                {TITLE_PROFILE}
            </Typography>

            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Box sx={{ my: 4 }}>
                    <Typography color="error" align="center">
                        {error}
                    </Typography>
                    <Button variant="outlined" onClick={fetchUser} sx={{ mt: 2 }}>
                        {BTN_RETRY}
                    </Button>
                </Box>
            )}

            {user && !isLoading && (
                <Box sx={{ textAlign: 'center', my: 4 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        <img src={user.avatarPath} height="36px" />
                        <div></div>
                        Avatar url: {user.avatarPath}
                        <div></div>
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                        {user.about}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        ID: {user.id}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Name:{user.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Phone: {user.phone}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Email: {user.email}
                    </Typography>

                    <Button disabled={isLoading} variant="outlined" onClick={fetchUser} sx={{ mt: 3, mx: 1 }}>
                        {BTN_REFRESH}
                    </Button>
                    <Button variant="contained" color="error" onClick={handleLogout} sx={{ mt: 3, mx: 1 }}>
                        {BTN_LOGOUT}
                    </Button>
                </Box>
            )}
        </Container>
    );
};
