import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { FormValues } from '../../shared/utils/types';
import { formSchema } from '../../shared/utils/validator';
import { getMessageFromError } from '@shared/utils';
import { useSignUpMutation } from '@shared/store/api/authApi';
import { Form } from '@features/auth/shared/Form';
import { useAuth } from '../../model/AuthProvider';

export const SignUpForm: FC = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [signUpRequestFn] = useSignUpMutation();

	const submitHandler: SubmitHandler<FormValues> = async (values) => {
		try {
			const response = await signUpRequestFn(values).unwrap();

			login({
				accessToken: response.accessToken,
				refreshToken: '',
				userId: response.user.id,
			});

			toast.success('Вы успешно зарегистрированы!');
			navigate('/');
		} catch (error) {
			console.log({ error });
			toast.error(
				getMessageFromError(
					error,
					'Не известная ошибка при регистрации пользователя'
				)
			);
		}
	};

	return (
		<Form
			title='Sign Up (Я форма регистрации)'
			buttonText='Sign Up'
			linkText='SIGN IN'
			linkTo='/signin'
			schema={formSchema}
			onSubmit={submitHandler}
			formBoxSx={{ mt: 1 }}
		/>
	);
};
