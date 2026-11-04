import { useMutation } from '@tanstack/react-query';
import { signUpRequest, type SignUpRequest } from '6-shared/api';

export const useSignUpApi = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: (params: SignUpRequest) => signUpRequest(params),
    });

    return { mutateAsync, isPending };
};
