import type { ComponentType, FC } from 'react';
import { Navigate, useLocation } from 'react-router';

export type UseAuthStrategy = () => {
    isAuthenticated: boolean;
    isReady: boolean;
};

export const withProtection = <P extends object>(
    WrappedComponent: ComponentType<P>,
    useAuthStrategy: UseAuthStrategy,
) => {
    const EnhancedComponent: FC<P> = (props) => {
        console.log('from lib protection');

        const { isAuthenticated, isReady } = useAuthStrategy();

        const location = useLocation();

        if (!isReady) {
            return <div>Loading...</div>;
        }

        if (!isAuthenticated) {
            return (
                <Navigate
                    to={'/signIn'}
                    state={{
                        fromUrl: location.pathname,
                    }}
                    replace={true}
                />
            );
        }

        return <WrappedComponent {...props} />;
    };

    EnhancedComponent.displayName = `withProtection${WrappedComponent.displayName}`;

    return EnhancedComponent;
};
