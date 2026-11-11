import React from 'react';

interface SectionHeadingProps {
  level?: 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function SectionHeading({
  level = 'h2',
  children,
  className = '',
  style,
}: SectionHeadingProps) {
  const Component = level;
  return <Component className={className} style={style}>{children}</Component>;
}
