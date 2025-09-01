'use client';

import { useEffect, useState } from 'react';

interface DynamicSkeletonProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function DynamicSkeleton({ 
  isLoading, 
  children, 
  className = '',
  delay = 0 
}: DynamicSkeletonProps) {
  const [showContent, setShowContent] = useState(!isLoading);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowContent(true), delay);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isLoading, delay]);

  if (showContent) {
    return (
      <div className={`animate-in fade-in duration-500 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="animate-pulse">
        <div className="space-y-4">
          <div className="h-4 bg-gradient-to-r from-masters-stone/20 via-masters-stone/10 to-masters-stone/20 rounded animate-shimmer" />
          <div className="h-4 bg-gradient-to-r from-masters-stone/20 via-masters-stone/10 to-masters-stone/20 rounded animate-shimmer animation-delay-150" />
          <div className="h-4 bg-gradient-to-r from-masters-stone/20 via-masters-stone/10 to-masters-stone/20 rounded w-3/4 animate-shimmer animation-delay-300" />
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-24 bg-gradient-to-r from-masters-stone/20 via-masters-stone/10 to-masters-stone/20 rounded animate-shimmer" />
        <div className="h-6 w-6 bg-masters-stone/20 rounded-full" />
      </div>
      <div className="space-y-3">
        <div className="h-6 bg-gradient-to-r from-masters-stone/20 via-masters-stone/10 to-masters-stone/20 rounded animate-shimmer animation-delay-150" />
        <div className="h-4 bg-gradient-to-r from-masters-stone/20 via-masters-stone/10 to-masters-stone/20 rounded animate-shimmer animation-delay-300" />
        <div className="h-4 bg-gradient-to-r from-masters-stone/20 via-masters-stone/10 to-masters-stone/20 rounded w-2/3 animate-shimmer animation-delay-450" />
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-4">
          <div className="h-4 w-16 bg-masters-stone/20 rounded" />
          <div className="h-4 w-16 bg-masters-stone/20 rounded" />
        </div>
        <div className="h-5 w-5 bg-masters-stone/20 rounded" />
      </div>
    </div>
  );
}