import React from 'react';
import Link from 'next/link';
import { ArrowIcon } from './ArrowIcon';

export type ButtonVariant = 'primary' | 'outline' | 'dark';

interface BaseButtonProps {
  variant?: ButtonVariant;
  showArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface LinkButtonProps extends BaseButtonProps {
  href: string;
  onClick?: () => void;
  type?: never;
  disabled?: boolean;
}

interface ActionButtonProps extends BaseButtonProps {
  href?: never;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export type ButtonProps = LinkButtonProps | ActionButtonProps;

export function Button({
  variant = 'primary',
  showArrow,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const variantClass =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'outline'
      ? 'btn-outline'
      : 'btn-dark';

  const combinedClass = `btn ${variantClass} ${className}`.trim();
  const shouldShowArrow = showArrow !== undefined ? showArrow : variant !== 'outline';

  if ('href' in props && props.href) {
    const isAnchor = props.href.startsWith('#');
    if (isAnchor) {
      return (
        <a href={props.href} className={combinedClass} onClick={props.onClick}>
          <span>{children}</span>
          {shouldShowArrow && <ArrowIcon />}
        </a>
      );
    }

    return (
      <Link href={props.href} className={combinedClass} onClick={props.onClick}>
        <span>{children}</span>
        {shouldShowArrow && <ArrowIcon />}
      </Link>
    );
  }

  const { type = 'button', onClick, disabled } = props as ActionButtonProps;

  return (
    <button
      type={type}
      className={combinedClass}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
      {shouldShowArrow && <ArrowIcon />}
    </button>
  );
}
