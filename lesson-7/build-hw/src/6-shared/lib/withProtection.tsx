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
