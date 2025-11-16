'use client';

import { useState, CSSProperties } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  fallbackSrc?: string;
  style?: CSSProperties;
}

export default function SafeImage({
  src,
  alt,
  className = '',
  width,
  height,
  objectFit = 'cover',
  priority = false,
  fallbackSrc = 'https://placehold.co/400x300/eee/ccc?text=Image',
  style
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && imgSrc !== fallbackSrc) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={handleError}
      loading={priority ? 'eager' : 'lazy'}
      style={{ objectFit, ...style }}
    />
  );
}

