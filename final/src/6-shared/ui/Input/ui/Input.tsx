import { FC, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';
import s from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
}

export const Input: FC<InputProps> = ({
	className,
	error,
	type = 'text',
	...props
}) => {
	return (
		<input
			type={type}
			className={classNames(s['input'], error && s['input_error'], className)}
			{...props}
		/>
	);
};

export interface TextareaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: string;
}

export const Textarea: FC<TextareaProps> = ({ className, error, ...props }) => {
	return (
		<textarea
			className={classNames(
				s['textarea'],
				error && s['textarea_error'],
				className
			)}
			{...props}
		/>
	);
};
