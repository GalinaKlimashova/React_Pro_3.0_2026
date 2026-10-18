import type { ComponentProps } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button = ({
  variant = 'primary',
  className = '',
  disabled = false,
  ...props }: ButtonProps) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

  return (
    <button
      {...props}
      className={buttonClass}
      disabled
    />
  );
};