'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends ImageProps {
  fallbackClassName?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  style,
  fill,
  onError,
  ...rest
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    // Neutral tile in the same aspect ratio using cream/border tokens with no alt text visible
    return (
      <div
        className={`bg-[var(--cream)] border border-[var(--border)] rounded-[var(--radius)] ${
          fill ? 'absolute inset-0 w-full h-full' : ''
        } ${fallbackClassName || className}`}
        style={style}
        role="presentation"
        aria-hidden="true"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      style={style}
      fill={fill}
      onError={(e) => {
        setHasError(true);
        if (onError) onError(e);
      }}
      {...rest}
    />
  );
}
