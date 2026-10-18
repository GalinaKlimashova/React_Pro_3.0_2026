import { type FC, type PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router';

import type { UseAuthStrategy } from '6-shared/model/auth';

interface Props {
    useAuthStrategy: UseAuthStrategy;
}

export const ProtectionWrapper: FC<PropsWithChildren<Props>> = ({ children, useAuthStrategy }) => {
    const { isAuthenticated, isReady } = useAuthStrategy();
    const location = useLocation();

    if (!isReady) return null;

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

    return children;
};
