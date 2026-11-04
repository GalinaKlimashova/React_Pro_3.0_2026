import { useEffect, useState } from 'react';
import type { UseAuthStrategy } from '../model/auth';
import { useAuthContext } from './authContext';

export const useContextAuthStrategy: UseAuthStrategy = () => {
    const [state, setState] = useState(false);

    const { accessToken } = useAuthContext();

    useEffect(() => {
        setTimeout(() => setState(true), 5e2);
    }, []);

    return {
        isAuthenticated: !!accessToken,
        isReady: state,
    };
};
