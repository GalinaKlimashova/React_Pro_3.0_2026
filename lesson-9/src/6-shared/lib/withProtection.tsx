import type { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router';
import type { UseAuthStrategy } from '../model/auth';

export const withProtection = <P extends object>(
    WrappedComponent: ComponentType<P>,
    useAuthStrategy: UseAuthStrategy,
) => {
    function UpgradedComponent(props: P) {
        const { isAuthenticated, isReady } = useAuthStrategy();
        // Объект location на понадобиться для задания состояния при redirect'e
        const location = useLocation();

        if (!isReady) return null;

        // Если токен пустой, то нужно отправить пользователя на странице входа в систему
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
    }

    UpgradedComponent.displayName = `withProtection${WrappedComponent.displayName}`;

    return UpgradedComponent;
};
