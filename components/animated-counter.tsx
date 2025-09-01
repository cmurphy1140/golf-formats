'use client';

import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export default function AnimatedCounter({
  value,
  duration = 500,
  className = '',
  prefix = '',
  suffix = ''
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const startValue = displayValue;
    const endValue = value;
    const difference = endValue - startValue;
    
    if (difference === 0) return;
    
    setIsAnimating(true);
    const startTime = Date.now();
    const steps = Math.abs(difference) > 10 ? 30 : Math.abs(difference);
    const stepDuration = duration / steps;
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (difference * easeOutQuart);
      
      setDisplayValue(Math.round(currentValue));
      
      if (progress >= 1) {
        clearInterval(timer);
        setDisplayValue(endValue);
        setIsAnimating(false);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className={`${className} ${isAnimating ? 'scale-110' : ''} transition-transform duration-200`}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}