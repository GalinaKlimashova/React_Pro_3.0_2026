import { signInRequest, type SignInRequest } from '6-shared/api';
import { useCallback, useState } from 'react';

export function useSignInApi() {
    const [isPending, setIsPending] = useState(false);

    const getResponse = useCallback(async (params: SignInRequest) => {
        setIsPending(true);
        try {
            return await signInRequest(params);
        } finally {
            setIsPending(false);
        }
    }, []);

    return { getResponse, isPending };
}
