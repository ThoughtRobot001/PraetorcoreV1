import React from 'react';

interface PillProps {
  children: React.ReactNode;
  className?: string;
}

export function Pill({ children, className = '' }: PillProps) {
  return (
    <span className={`pill-badge ${className}`.trim()}>
      {children}
    </span>
  );
}
