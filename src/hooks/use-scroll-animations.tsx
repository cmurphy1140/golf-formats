'use client';

import React, { useEffect } from 'react';

export function useScrollAnimations() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation class when element comes into view
          entry.target.classList.add('animate-in');
          
          // Optional: Stop observing after animation
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    const scrollElements = document.querySelectorAll('.scroll-reveal, .scroll-fade, .scroll-slide');
    scrollElements.forEach((el) => observer.observe(el));

    // Cleanup
    return () => {
      scrollElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

export function ScrollAnimation({ 
  children, 
  className = '',
  delay = 0,
  animation = 'fade'
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade' | 'slide' | 'scale';
}) {
  const animationClass = `scroll-${animation}`;
  
  return (
    <div 
      className={`${animationClass} ${className}`}
      style={{ '--scroll-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}