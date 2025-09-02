'use client';

import { useEffect, useRef, useState } from 'react';

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticElement({ 
  children, 
  strength = 0.3,
  className = '' 
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const maxDistance = 100;
      
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        setPosition({
          x: distanceX * strength * force,
          y: distanceY * strength * force
        });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div 
      ref={ref}
      className={className}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      {children}
    </div>
  );
}

export function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Don't render on server or before mount to avoid hydration mismatch
  if (!isMounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0
      }}
    >
      <div
        className="absolute w-96 h-96 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          background: `radial-gradient(circle at center, rgba(27, 67, 50, 0.05) 0%, transparent 50%)`,
          filter: 'blur(40px)'
        }}
      />
    </div>
  );
}