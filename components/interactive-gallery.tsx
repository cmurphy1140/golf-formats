'use client';

import { useState, useRef, useEffect } from 'react';
import { GolfFormat } from '@/types/golf';
import { MagneticElement } from './magnetic-cursor';
import { ArrowRight, Sparkles } from 'lucide-react';

interface InteractiveGalleryProps {
  formats: GolfFormat[];
}

export default function InteractiveGallery({ formats }: InteractiveGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth <= 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || isMobile) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      setMousePosition({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
    };

    window.addEventListener('resize', handleResize);
    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    container?.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      container?.removeEventListener('mousemove', handleMouseMove);
      container?.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} className="relative">
      {/* Dynamic background gradient that follows cursor - desktop only */}
      {!isMobile && (
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(27, 67, 50, 0.1), transparent)`,
            transition: 'background 0.3s ease'
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative px-4 md:px-0">
        {formats.slice(0, 6).map((format, index) => (
          <MagneticElement key={format.id} strength={isMobile ? 0 : 0.2}>
            <div
              className={`group relative bg-white rounded-lg md:rounded-none overflow-hidden cursor-pointer
                transition-all duration-300 md:duration-500 ${
                activeIndex === index ? 'md:scale-105 z-10' : 'scale-100'
              } shadow-md md:shadow-none hover:shadow-lg`}
              onMouseEnter={() => !isMobile && setActiveIndex(index)}
              onMouseLeave={() => !isMobile && setActiveIndex(null)}
              onTouchStart={() => isMobile && setActiveIndex(index)}
              onTouchEnd={() => isMobile && setTimeout(() => setActiveIndex(null), 300)}
              style={{
                transform: activeIndex !== null && activeIndex !== index 
                  ? 'scale(0.95)' 
                  : '',
                filter: activeIndex !== null && activeIndex !== index 
                  ? 'brightness(0.7)' 
                  : ''
              }}
            >
              {/* Card Content */}
              <div className="p-4 md:p-8 relative">
                {/* Animated Background Pattern */}
                <div 
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 35px,
                      rgba(27, 67, 50, 0.1) 35px,
                      rgba(27, 67, 50, 0.1) 70px
                    )`,
                    transform: `translateX(${activeIndex === index ? '10px' : '0'})`,
                    transition: 'transform 0.5s ease'
                  }}
                />

                {/* Category Badge with Animation */}
                <div className="flex items-center justify-between mb-6 relative">
                  <span className={`text-xs uppercase tracking-wider font-medium
                    ${activeIndex === index ? 'text-masters-pine' : 'text-masters-slate/60'}`}>
                    {format.category}
                  </span>
                  {format.popularity >= 80 && (
                    <Sparkles 
                      size={16} 
                      className={`text-masters-gold transition-transform duration-300 ${
                        activeIndex === index ? 'rotate-12 scale-110' : ''
                      }`}
                    />
                  )}
                </div>

                {/* Title with Dynamic Underline */}
                <h3 className="text-xl md:text-2xl font-light text-masters-charcoal mb-3 relative">
                  {format.name}
                  <span 
                    className="absolute bottom-0 left-0 h-0.5 bg-masters-pine transition-all duration-300"
                    style={{
                      width: activeIndex === index ? '100%' : '0%'
                    }}
                  />
                </h3>

                {/* Description */}
                <p className="text-sm text-masters-slate mb-4 md:mb-6 line-clamp-2">
                  {format.description}
                </p>

                {/* Meta Info with Hover Effects */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-xs text-masters-slate/60">
                    <span className={`transition-colors ${
                      activeIndex === index ? 'text-masters-pine' : ''
                    }`}>
                      {format.players.min}-{format.players.max} players
                    </span>
                    <span className={`transition-colors ${
                      activeIndex === index ? 'text-masters-pine' : ''
                    }`}>
                      {format.duration}
                    </span>
                  </div>

                  {/* Animated Arrow */}
                  <div className={`transition-all duration-300 ${
                    activeIndex === index 
                      ? 'translate-x-2 opacity-100' 
                      : 'translate-x-0 opacity-50'
                  }`}>
                    <ArrowRight size={20} className="text-masters-pine" />
                  </div>
                </div>

                {/* Hover Reveal Content - Desktop only */}
                {!isMobile && (
                  <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t 
                    from-masters-pine to-transparent text-white p-6
                    transition-all duration-500 ${
                    activeIndex === index 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-full opacity-0'
                  }`}>
                    <p className="text-xs mb-2">Quick Play</p>
                    <p className="text-sm">
                      Difficulty: {format.difficulty}/5
                    </p>
                  </div>
                )}
              </div>

              {/* Side Border Animation */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 bg-masters-pine
                  transition-transform duration-300 origin-top"
                style={{
                  transform: activeIndex === index ? 'scaleY(1)' : 'scaleY(0)'
                }}
              />
            </div>
          </MagneticElement>
        ))}
      </div>
    </div>
  );
}