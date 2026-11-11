import React from 'react';
import Link from 'next/link';
import { ArrowIcon } from './ArrowIcon';

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ArrowLink({ href, children, className = '', onClick }: ArrowLinkProps) {
  const isAnchor = href.startsWith('#');
  const combinedClass = `arrow-link ${className}`.trim();

  if (isAnchor) {
    return (
      <a href={href} className={combinedClass} onClick={onClick}>
        <span>{children}</span>
        <ArrowIcon size={11} />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={combinedClass}
      onClick={onClick}
    >
      <span>{children}</span>
      <ArrowIcon size={11} />
    </Link>
  );
}
