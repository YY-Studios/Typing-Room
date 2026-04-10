'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { inputStyles } from './Input.styles';

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  variant?: 'primary' | 'surface';
  type?: 'text' | 'password' | 'email' | 'search' | 'number';
  error?: boolean;
  errorMsg?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = 'primary',
      type = 'text',
      error = false,
      errorMsg,
      icon,
      rightIcon,
      disabled = false,
      ...rest
    },
    ref,
  ) => {
    const {
      container,
      input,
      iconWrapper,
      rightIconWrapper,
      errorMsg: errorClass,
    } = inputStyles({
      variant,
      error,
      hasIcon: !!icon,
      hasRightIcon: !!rightIcon,
    });

    return (
      <div className={container()}>
        {icon && <div className={iconWrapper()}>{icon}</div>}
        {rightIcon && <div className={rightIconWrapper()}>{rightIcon}</div>}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={cn(input(), className)}
          {...rest}
        />
        {error && errorMsg && <span className={errorClass()}>{errorMsg}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
