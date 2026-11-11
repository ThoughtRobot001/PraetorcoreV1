import React from 'react';

interface ArrowIconProps {
  className?: string;
  size?: number;
}

export function ArrowIcon({ className, size = 13.2 }: ArrowIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M2 10 10 2M4 2h6v6" />
    </svg>
  );
}
