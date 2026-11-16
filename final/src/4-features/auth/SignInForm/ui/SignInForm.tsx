import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FormValues } from '../../shared/utils/types';
import { formSchema } from '../../shared/utils/validator';
import { useSignInMutation } from '@shared/store/api/authApi';
import { getMessageFromError } from '@shared/utils';
import { Form } from '@features/auth/shared/Form';
import { useAuth } from '../../model/AuthProvider';

export const SignInForm: FC = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [signInRequestFn] = useSignInMutation();

	const submitHandler: SubmitHandler<FormValues> = async (values) => {
		try {
			const response = await signInRequestFn(values).unwrap();

			login({
				accessToken: response.accessToken,
				refreshToken: '',
				userId: response.user.id,
			});

			toast.success('Вы успешно авторизованы!');
			navigate('/', { replace: true });
		} catch (error) {
			toast.error(
				getMessageFromError(
					error,
					'Не известная ошибка при авторизации пользователя'
				)
			);
		}
	};

	return (
		<Form
			title='Sign In (Я форма логина)'
			buttonText='Sign IN'
			linkText='SIGN UP'
			linkTo='/signup'
			schema={formSchema}
			onSubmit={submitHandler}
			formBoxSx={{ my: 1 }}
		/>
	);
};
