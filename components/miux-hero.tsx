'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function MiuxHero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;
  const textParallax = scrollY * 0.3;
  const opacity = Math.max(0, 1 - scrollY / 600);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 parallax-element"
        style={{ transform: `translateY(${parallaxOffset}px) scale(1.1)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-masters-light-beige via-white to-masters-sand/30" />
        <div className="absolute inset-0 noise-overlay" />
      </div>

      {/* Content */}
      <div 
        className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24"
        style={{ 
          transform: `translateY(${textParallax}px)`,
          opacity 
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Sophisticated Typography */}
          <div className="mb-12">
            <h1 className="miux-heading font-serif mb-6">
              <span className="block opacity-0 animate-[fadeSlide_0.8s_0.2s_forwards]">
                Elevate Your
              </span>
              <span className="block text-masters-pine opacity-0 animate-[fadeSlide_0.8s_0.4s_forwards]">
                Golf Experience
              </span>
            </h1>
            
            <p className="miux-subheading max-w-2xl opacity-0 animate-[fadeSlide_0.8s_0.6s_forwards]">
              A curated collection of golf formats designed to transform 
              every round into an unforgettable journey.
            </p>
          </div>

          {/* Elegant CTAs */}
          <div className="flex flex-wrap gap-4 opacity-0 animate-[fadeSlide_0.8s_0.8s_forwards]">
            <Link
              href="/formats"
              className="miux-button group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Collection
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            
            <button className="miux-link text-lg">
              Learn More
            </button>
          </div>

          {/* Elegant Stats */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-0 animate-[fadeSlide_0.8s_1s_forwards]">
            {[
              { value: '20+', label: 'Curated Formats' },
              { value: '4', label: 'Categories' },
              { value: '100%', label: 'Mobile Ready' },
              { value: 'Free', label: 'Forever' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center md:text-left"
                style={{ animationDelay: `${1000 + index * 100}ms` }}
              >
                <div className="text-3xl font-light text-masters-pine mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-masters-slate uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        style={{ opacity: opacity }}
      >
        <div className="flex flex-col items-center gap-2 text-masters-slate">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown size={20} className="animate-bounce" />
        </div>
      </div>

      {/* Scroll Progress */}
      <div 
        className="scroll-progress"
        style={{ 
          transform: `scaleX(${Math.min(scrollY / (document.body.scrollHeight - window.innerHeight), 1)})` 
        }}
      />
    </section>
  );
}