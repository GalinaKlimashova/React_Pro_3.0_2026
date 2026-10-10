import type { ComponentProps } from 'react';
import styles from './Input.module.css';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
}

export const Input = ({ label, ref, className = '', ...props }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        ref={ref}
        {...props}
        className={`${styles.input} ${className}`}
      />
    </div>
  );
};