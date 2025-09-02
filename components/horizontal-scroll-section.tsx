'use client';

import { useRef, useState, useEffect } from 'react';
import { GolfFormat } from '@/types/golf';
import { MagneticElement } from './magnetic-cursor';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface HorizontalScrollSectionProps {
  formats: GolfFormat[];
  title: string;
}

export default function HorizontalScrollSection({ 
  formats, 
  title 
}: HorizontalScrollSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    
    const progress = scrollLeft / (scrollWidth - clientWidth);
    setScrollProgress(Math.min(1, Math.max(0, progress)));
  };

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    const element = scrollRef.current;
    if (!element) return;

    element.addEventListener('scroll', updateScrollState);
    updateScrollState();

    return () => {
      window.removeEventListener('resize', handleResize);
      element.removeEventListener('scroll', updateScrollState);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 400;
    const currentScroll = scrollRef.current.scrollLeft;
    const targetScroll = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;
    
    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative py-8 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-masters-charcoal mb-2">
              {title}
            </h2>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="h-0.5 w-16 md:w-32 bg-masters-pine/20" />
              <span className="text-xs md:text-sm text-masters-slate">
                {isMobile ? 'Swipe' : 'Scroll'} to explore
              </span>
            </div>
          </div>

          {/* Navigation Buttons - Desktop only */}
          {!isMobile && (
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`p-3 rounded-full transition-all ${
                  canScrollLeft 
                    ? 'bg-white hover:bg-masters-sand/50 text-masters-pine' 
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`p-3 rounded-full transition-all ${
                  canScrollRight 
                    ? 'bg-white hover:bg-masters-sand/50 text-masters-pine' 
                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Scroll Container */}
        <div className="relative -mx-4 md:mx-0">
          <div 
            ref={scrollRef}
            className="flex gap-3 md:gap-6 overflow-x-auto scrollbar-hide pb-4 px-4 md:px-0"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {formats.map((format, index) => (
              <MagneticElement 
                key={format.id}
                strength={isMobile ? 0 : 0.1}
                className="flex-shrink-0 w-72 sm:w-80 md:w-96"
                style={{ scrollSnapAlign: isMobile ? 'center' : 'start' }}
              >
                <div className="group bg-white h-full p-4 md:p-8 cursor-pointer
                  transition-all duration-300 md:duration-500 hover:shadow-xl md:hover:shadow-2xl
                  border border-masters-stone/20 hover:border-masters-pine/30 rounded-lg md:rounded-none"
                  style={{
                    transform: `translateZ(0)`,
                    willChange: 'transform'
                  }}
                >
                  {/* Number Badge */}
                  <div className="flex items-start justify-between mb-4 md:mb-6">
                    <span className="text-3xl md:text-5xl font-light text-masters-pine/20">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {format.popularity >= 80 && (
                      <div className="flex items-center gap-1 px-2 py-1 
                        bg-masters-gold/10 rounded-full">
                        <Star size={14} className="text-masters-gold" />
                        <span className="text-xs text-masters-gold">Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-masters-slate/60">
                        {format.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-light text-masters-charcoal mt-1 
                        group-hover:text-masters-pine transition-colors">
                        {format.name}
                      </h3>
                    </div>

                    <p className="text-sm text-masters-slate leading-relaxed">
                      {format.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 
                      border-t border-masters-stone/20">
                      <div className="flex gap-4 text-xs text-masters-slate">
                        <span>{format.players.min}-{format.players.max} players</span>
                        <span>{format.duration}</span>
                      </div>
                      <ChevronRight 
                        size={18} 
                        className="text-masters-pine opacity-0 -translate-x-2
                          group-hover:opacity-100 group-hover:translate-x-0
                          transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              </MagneticElement>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 md:mt-6 mx-4 md:mx-0 h-0.5 bg-masters-stone/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-masters-pine transition-transform duration-300"
              style={{
                transform: `translateX(-${100 - scrollProgress * 100}%)`
              }}
            />
          </div>
        </div>
      </div>

      {/* Background Decoration - Desktop only */}
      {!isMobile && (
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-l from-masters-pine to-transparent" />
        </div>
      )}
    </section>
  );
}