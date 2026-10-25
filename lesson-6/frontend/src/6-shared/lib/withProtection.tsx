import { Box, CircularProgress } from '@mui/material';
import type { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router';
import type { UseAuthStrategy } from '6-shared/model-auth/auth';

export const withProtection = <P extends object>(
    WrappedComponent: ComponentType<P>,
    useAuthStrategy: UseAuthStrategy,
) => {
    const UpgradedComponent = (props: P) => {
        const { isReady, isAuthenticated } = useAuthStrategy();

        const location = useLocation();

        if (!isReady)
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress aria-label="Loading…" />
                </Box>
            );

        if (!isAuthenticated) {
            return (
                <Navigate
                    to="/signin"
                    // при этом мы передаем состояние, в котором указываем, какую
                    // страницу хотел посетить пользователь. И если он в дальнейшем
                    // войдет в систему, то мы его автоматически перебросим на желаемую страницу
                    replace={true}
                    state={{
                        from: location.pathname,
                    }}
                />
            );
        }

        return <WrappedComponent {...props} />;
    };

    return UpgradedComponent;
};
