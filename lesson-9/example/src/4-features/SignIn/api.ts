import { useMutation } from '@tanstack/react-query';
import { signInRequest, type SignInRequest } from '6-shared/api';

export const useSignInApi = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: (params: SignInRequest) => signInRequest(params),
    });

    return { mutateAsync, isPending };
};
