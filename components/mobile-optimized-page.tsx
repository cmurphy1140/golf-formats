'use client';

import { useState, useEffect } from 'react';
import { GolfFormat } from '@/types/golf';
import TouchGestureHandler from './touch-gesture-handler';
import { ChevronLeft, ChevronRight, Grid, List, Filter } from 'lucide-react';

interface MobileOptimizedPageProps {
  formats: GolfFormat[];
}

export default function MobileOptimizedPage({ formats }: MobileOptimizedPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPortrait, setIsPortrait] = useState(true);
  const [touchFeedback, setTouchFeedback] = useState<string | null>(null);

  useEffect(() => {
    const handleOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    handleOrientation();
    window.addEventListener('resize', handleOrientation);
    window.addEventListener('orientationchange', handleOrientation);

    return () => {
      window.removeEventListener('resize', handleOrientation);
      window.removeEventListener('orientationchange', handleOrientation);
    };
  }, []);

  const handleSwipeLeft = () => {
    setCurrentIndex(prev => Math.min(prev + 1, formats.length - 1));
    showFeedback('Swiped left');
  };

  const handleSwipeRight = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
    showFeedback('Swiped right');
  };

  const showFeedback = (message: string) => {
    setTouchFeedback(message);
    setTimeout(() => setTouchFeedback(null), 1000);
  };

  return (
    <div className={`mobile-optimized-page ${isPortrait ? 'portrait' : 'landscape'}`}>
      {/* Mobile Header */}
      <header className="site-header safe-top">
        <div className="flex items-center justify-between px-safe">
          <h1 className="text-xl font-light text-masters-charcoal">Golf Formats</h1>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="mobile-menu-button"
              aria-label="Toggle view mode"
            >
              {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
            </button>
            
            <button className="mobile-menu-button" aria-label="Filter">
              <Filter size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Touch Feedback Indicator */}
      {touchFeedback && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 
          bg-masters-pine text-white px-4 py-2 rounded-full text-sm
          animate-fade-in-out z-50">
          {touchFeedback}
        </div>
      )}

      {/* Main Content Area */}
      <main className="main-content safe-bottom">
        {viewMode === 'grid' ? (
          // Grid View
          <div className="formats-grid p-4">
            {formats.map((format, index) => (
              <TouchGestureHandler
                key={format.id}
                onLongPress={() => showFeedback(`Long pressed: ${format.name}`)}
                className="format-card-mobile"
              >
                <div className="format-card-simple active:scale-98">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider text-masters-slate/60">
                      {format.category}
                    </span>
                    {format.popularity >= 80 && (
                      <span className="text-xs text-masters-gold">Popular</span>
                    )}
                  </div>
                  
                  <h3 className="card-title text-masters-charcoal">
                    {format.name}
                  </h3>
                  
                  <p className="card-description text-masters-slate">
                    {format.description}
                  </p>
                  
                  <div className="card-meta text-masters-slate/60 mt-4">
                    <span>{format.players.min}-{format.players.max} players</span>
                    <span>{format.duration}</span>
                    <span>Difficulty: {format.difficulty}/5</span>
                  </div>
                </div>
              </TouchGestureHandler>
            ))}
          </div>
        ) : (
          // List View with Swipe Navigation
          <TouchGestureHandler
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            className="h-full"
          >
            <div className="flex flex-col h-full p-4">
              {/* Current Card Display */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-sm">
                  <div className="format-card-simple p-6 bg-white shadow-xl">
                    <div className="text-center mb-4">
                      <span className="text-xs uppercase tracking-wider text-masters-slate/60">
                        {formats[currentIndex].category}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-light text-masters-charcoal text-center mb-4">
                      {formats[currentIndex].name}
                    </h2>
                    
                    <p className="text-masters-slate text-center mb-6">
                      {formats[currentIndex].description}
                    </p>
                    
                    <div className="flex justify-center gap-4 text-sm text-masters-slate/60">
                      <span>{formats[currentIndex].players.min}-{formats[currentIndex].players.max} players</span>
                      <span>{formats[currentIndex].duration}</span>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <span className="text-sm text-masters-pine">
                        Difficulty: {formats[currentIndex].difficulty}/5
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Indicators */}
              <div className="flex items-center justify-between py-4">
                <button
                  onClick={handleSwipeRight}
                  disabled={currentIndex === 0}
                  className="p-3 rounded-full bg-white shadow-md disabled:opacity-30"
                  aria-label="Previous format"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-1">
                  {formats.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex 
                          ? 'bg-masters-pine w-6' 
                          : 'bg-masters-stone/30'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleSwipeLeft}
                  disabled={currentIndex === formats.length - 1}
                  className="p-3 rounded-full bg-white shadow-md disabled:opacity-30"
                  aria-label="Next format"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </TouchGestureHandler>
        )}

        {/* Orientation Indicator */}
        <div className="fixed bottom-4 right-4 text-xs text-masters-slate/40">
          {isPortrait ? 'Portrait' : 'Landscape'} Mode
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateY(-10px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }

        .animate-fade-in-out {
          animation: fade-in-out 1s ease-in-out;
        }

        .active\\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}