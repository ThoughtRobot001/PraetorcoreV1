import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({ children, className = '', as: Component = 'div' }: ContainerProps) {
  return (
    <Component className={`container-custom ${className}`.trim()}>
      {children}
    </Component>
  );
}
