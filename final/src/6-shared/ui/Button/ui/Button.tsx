import { FC, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import s from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	full?: boolean;
}

export const Button: FC<ButtonProps> = ({
	variant = 'primary',
	full = false,
	className,
	children,
	disabled,
	...props
}) => {
	return (
		<button
			className={classNames(
				s['button'],
				variant && s[`button_type_${variant}`],
				full && s['button_full'],
				className
			)}
			disabled={disabled}
			{...props}>
			{children}
		</button>
	);
};
