import { AuthContext } from '6-shared/lib/authContext';
import { useContext } from 'react';

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('Нет контекста');
    }

    return context;
};
