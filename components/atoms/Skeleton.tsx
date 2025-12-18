
import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rectangular' }) => {
  const baseStyles = "animate-pulse bg-gray-200";
  const roundedStyles = variant === 'circular' ? 'rounded-full' : variant === 'text' ? 'rounded' : 'rounded-xl';
  
  return (
    <div className={`${baseStyles} ${roundedStyles} ${className}`} />
  );
};
