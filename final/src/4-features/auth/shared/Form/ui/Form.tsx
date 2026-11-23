import type { AnyObjectSchema } from 'yup';
import { FC, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	Avatar,
	Box,
	Container,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';

export interface FormValues {
	email: string;
	password: string;
}

export interface FormProps {
	/** Заголовок формы */
	title: string;
	/** Текст на кнопке отправки */
	buttonText: string;
	/** Текст ссылки (SIGN UP / SIGN IN) */
	linkText: string;
	/** Путь в ссылке */
	linkTo: string;
	/** Схема валидации yup */
	schema: AnyObjectSchema;
	/** Обработчик отправки формы */
	onSubmit: SubmitHandler<FormValues>;
	/** Стили контейнера формы (Box) */
	formBoxSx?: Record<string, unknown>;
}

export const Form: FC<FormProps> = ({
	title,
	buttonText,
	linkText,
	linkTo,
	schema,
	onSubmit,
	formBoxSx,
}) => {
	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<FormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema),
	});

	const emailInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		emailInputRef.current?.focus();
	}, []);

	return (
		<Container component='main' maxWidth='xs'>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					{title}
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					sx={formBoxSx}>
					<Controller
						name='email'
						control={control}
						render={({ field }) => (
							<TextField
								margin='normal'
								label='Email Address'
								type='email'
								fullWidth
								required
								autoComplete='email'
								error={!!errors.email?.message}
								helperText={errors.email?.message}
								inputRef={emailInputRef}
								{...field}
							/>
						)}
					/>
					<Controller
						name='password'
						control={control}
						render={({ field }) => (
							<TextField
								label='Password'
								type='password'
								error={!!errors.password?.message}
								helperText={errors.password?.message}
								margin='normal'
								fullWidth
								required
								{...field}
							/>
						)}
					/>

					<LoadingButton
						type='submit'
						disabled={isSubmitted && (!isValid || isSubmitting)}
						loading={isSubmitting}
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}>
						{buttonText}
					</LoadingButton>
					<Box display='flex' justifyContent='center' flexGrow={1}>
						<Link component={RouterLink} to={linkTo}>
							{linkText}
						</Link>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};
