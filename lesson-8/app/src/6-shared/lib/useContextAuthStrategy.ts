import { useEffect, useState } from 'react';
import type { UseAuthStrategy } from '../model/auth';
import { useAuthContext } from './authContext';

export const useContextAuthStrategy: UseAuthStrategy = () => {
    const [_state, setState] = useState(false);

    useEffect(() => {
        setTimeout(() => setState(true), 5e3);
    }, []);

    const { accessToken } = useAuthContext();

    return {
        isAuthenticated: !!accessToken,
        isReady: true,
    };
};
