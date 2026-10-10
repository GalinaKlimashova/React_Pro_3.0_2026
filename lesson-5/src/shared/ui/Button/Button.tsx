import type { ComponentProps } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary';
}

export const Button = ({ variant = 'primary', className = '', ...props }: ButtonProps) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

  return (
    <button
      {...props}
      className={buttonClass}
    />
  );
};