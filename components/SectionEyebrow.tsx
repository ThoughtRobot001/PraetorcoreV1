import React from 'react';

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function SectionEyebrow({ children, className = '', style }: SectionEyebrowProps) {
  return (
    <p className={`eyebrow-text ${className}`.trim()} style={style}>
      {children}
    </p>
  );
}
