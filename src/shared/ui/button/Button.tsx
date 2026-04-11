'use client';

import Link, { type LinkProps } from 'next/link';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { buttonStyles } from './Button.styles';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** tab 버튼 전용: 활성 상태 */
  isTab?: boolean;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
}

interface ButtonAsButton
  extends
    Omit<ComponentPropsWithoutRef<'button'>, 'children'>,
    BaseButtonProps {
  as?: 'button';
  href?: never;
}

interface ButtonAsLink extends BaseButtonProps, LinkProps {
  as: 'link';
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isTab = false,
  isActive,
  disabled = false,
  className,
  as = 'button',
  ...props
}: ButtonProps) => {
  const styles = isTab
    ? buttonStyles({ size, isActive, class: className })
    : buttonStyles({ variant, size, class: className });

  if (as === 'link') {
    const { href, onClick, ...rest } = props as ButtonAsLink;
    return (
      <Link
        role="button"
        href={href}
        className={styles}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const { type = 'button', ...rest } =
    props as ComponentPropsWithoutRef<'button'>;
  return (
    <button type={type} disabled={disabled} className={styles} {...rest}>
      {children}
    </button>
  );
};

export default Button;
