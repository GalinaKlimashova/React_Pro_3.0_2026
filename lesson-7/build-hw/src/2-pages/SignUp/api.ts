import { useCallback, useState } from 'react';

import { signUpRequest, type SignUpRequest } from '6-shared/api';

export function useSignUpApi() {
    const [isPending, setIsPending] = useState(false);

    const mutateAsync = useCallback(async (params: SignUpRequest) => {
        setIsPending(true);
        try {
            return await signUpRequest(params);
        } finally {
            setIsPending(false);
        }
    }, []);

    return { mutateAsync, isPending };
}
