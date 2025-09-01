'use client';

import { useFormats } from '@/src/hooks/use-formats';
import { useSearch } from '@/src/hooks/use-search';
import { useFilters } from '@/src/hooks/use-filters';
import FormatGrid from '@/components/formats/format-grid';
import FormatFilters from '@/components/formats/format-filters';
import CategoryWheel from '@/components/category-wheel';
import SearchBar from '@/components/search-bar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Filter,
  LayoutGrid,
  List,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FormatsPage() {
  const { formats, totalFormats, filteredCount } = useFormats();
  const { query } = useSearch();
  const { filterState, toggleFilter, clearFilters } = useFilters();
  const [displayCount, setDisplayCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Animated counter effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    let start = 0;
    const end = formats.length;
    const duration = 500;
    const increment = end / (duration / 16);
    
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayCount(end);
        clearInterval(counter);
      } else {
        setDisplayCount(Math.floor(start));
      }
    }, 16);
    
    return () => {
      clearTimeout(timer);
      clearInterval(counter);
    };
  }, [formats.length]);
  
  const categories = [
    { id: 'tournament', label: 'Tournament', description: 'Competitive play' },
    { id: 'casual', label: 'Casual', description: 'Recreational fun' },
    { id: 'betting', label: 'Betting', description: 'Wagering games' },
    { id: 'team', label: 'Team', description: 'Group formats' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-white to-stone-50">
      {/* Hero Section with animated background */}
      <section className="relative overflow-hidden">
        {/* Animated subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.02] animate-pulse">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #004B36 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        <div className="relative px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-masters-charcoal mb-3">
              Golf Format Explorer
            </h1>
            <p className="text-base text-masters-pine max-w-2xl mx-auto mb-6">
              Browse <span className="font-semibold text-masters-charcoal animate-pulse">{totalFormats}</span> different ways to play golf, from tournament formats to fun betting games.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Condensed */}
      <main className="px-4 py-6 bg-gradient-to-b from-white to-stone-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter Panel - Desktop */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="sticky top-24">
                {/* Filter Card with enhanced animations */}
                <div className="bg-white rounded-2xl shadow-xl border-2 border-masters-pine/10 overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:border-masters-pine/20">
                  <div className="bg-gradient-to-br from-masters-pine to-masters-fairway p-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <Filter size={20} className="animate-pulse" />
                        <span className="font-semibold">Filters</span>
                      </div>
                      <span className="text-sm bg-white/20 backdrop-blur px-2 py-1 rounded-full transition-all duration-300">
                        <span className="font-semibold">{filteredCount}</span> results
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <FormatFilters />
                  </div>
                </div>
              </div>
            </aside>

            {/* Format Grid */}
            <div className="flex-1">
              {/* Results Counter with Animation */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-masters-pine animate-pulse"></div>
                  <p className="text-sm text-masters-slate">
                    Showing <span className="font-semibold text-masters-charcoal transition-all duration-300">{displayCount}</span> of {totalFormats} formats
                    {filterState.category.length > 0 && (
                      <span className="ml-2 text-xs text-masters-pine">
                        ({filterState.category.join(', ')})
                      </span>
                    )}
                  </p>
                </div>
              </div>
              
              {/* Category Pills with stagger animation */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      // Clear all category filters
                      categories.forEach(cat => {
                        if (filterState.category.includes(cat.id)) {
                          toggleFilter('category', cat.id);
                        }
                      });
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      filterState.category.length === 0
                        ? 'bg-masters-pine text-white shadow-md scale-105'
                        : 'bg-white text-masters-slate border border-masters-stone/30 hover:border-masters-pine hover:shadow-md'
                    }`}
                  >
                    All Formats
                    {filterState.category.length === 0 && (
                      <span className="ml-1 inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    )}
                  </button>
                  {categories.map((category, index) => {
                    const isActive = filterState.category.includes(category.id);
                    return (
                      <button
                        key={category.id}
                        onClick={() => toggleFilter('category', category.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                          isActive
                            ? 'bg-masters-pine text-white shadow-md scale-105'
                            : 'bg-white text-masters-slate border border-masters-stone/30 hover:border-masters-pine hover:shadow-md'
                        }`}
                        style={{
                          animationDelay: `${index * 50}ms`
                        }}
                      >
                        {category.label}
                        {isActive && (
                          <span className="ml-1 inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>


              {/* Format Cards with loading state */}
              <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
                <FormatGrid 
                  formats={formats}
                  totalCount={totalFormats}
                />
              </div>
              
              {/* No Results State */}
              {formats.length === 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Filter className="w-10 h-10 text-stone-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-masters-charcoal mb-2">
                      No formats found
                    </h3>
                    <p className="text-masters-slate mb-6">
                      Try adjusting your filters or search terms
                    </p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="px-6 py-2 bg-masters-pine text-white rounded-lg hover:bg-green-900 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}