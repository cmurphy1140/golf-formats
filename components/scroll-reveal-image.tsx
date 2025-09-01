'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ScrollRevealImageProps {
  src: string;
  alt: string;
  className?: string;
  parallax?: boolean;
  scale?: boolean;
}

export default function ScrollRevealImage({
  src,
  alt,
  className = '',
  parallax = true,
  scale = true
}: ScrollRevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    const handleScroll = () => {
      if (!element || !isVisible) return;
      
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Calculate scroll progress from -1 to 1
      const progress = (windowHeight - elementTop) / (windowHeight + elementHeight);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  const parallaxOffset = parallax ? scrollProgress * 50 - 25 : 0;
  const scaleValue = scale ? 1 + (scrollProgress * 0.1) : 1;

  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: `translateY(${parallaxOffset}px) scale(${scaleValue})`,
          transition: isVisible ? 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : ''
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Reveal overlay */}
          <div 
            className="absolute inset-0 bg-white"
            style={{
              transform: `scaleX(${1 - scrollProgress})`,
              transformOrigin: 'right',
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          />
        </div>
      </div>
    </div>
  );
}