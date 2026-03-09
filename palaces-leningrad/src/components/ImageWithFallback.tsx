'use client';

import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/** Изображение с градиентным fallback при ошибке загрузки */
export function ImageWithFallback({
  src,
  alt,
  fill = false,
  className = '',
  sizes,
  priority = false,
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`${fill ? 'absolute inset-0 w-full h-full' : ''} bg-gradient-to-br from-sand via-sage-green/30 to-charcoal/20 ${className}`}
        style={fill ? {} : { minHeight: 200 }}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`${fill ? 'absolute inset-0 w-full h-full object-cover' : ''} ${className}`}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setError(true)}
    />
  );
}
