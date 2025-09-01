'use client';

import { useFormats } from '@/src/hooks/use-formats';
import { useSearch } from '@/src/hooks/use-search';
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
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

export default function FormatsPage() {
  const { formats, totalFormats, filteredCount } = useFormats();
  const { query } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    { id: 'tournament', label: 'Tournament', description: 'Competitive play' },
    { id: 'casual', label: 'Casual', description: 'Recreational fun' },
    { id: 'betting', label: 'Betting', description: 'Wagering games' },
    { id: 'team', label: 'Team', description: 'Group formats' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-white to-stone-50">
      {/* Hero Section with Tan Theme */}
      <section className="relative overflow-hidden">
        {/* Subtle dot pattern instead of stripes */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #8b7355 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        <div className="relative px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
              Golf Format Explorer
            </h1>
            <p className="text-lg text-green-800 max-w-2xl mx-auto mb-12">
              Discover the perfect golf format for your next round. Browse {totalFormats} different ways to play 
              golf, from classic tournament formats to fun betting games.
            </p>
            
            {/* Interactive Category Wheel */}
            <div className="py-8">
              <CategoryWheel 
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 py-12 bg-gradient-to-b from-white to-stone-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Panel - Desktop */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="sticky top-24">
                {/* Filter Card with Character */}
                <div className="bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden">
                  <div className="bg-gradient-to-br from-green-800 to-green-900 p-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <Filter size={20} />
                        <span className="font-semibold">Filters</span>
                      </div>
                      <span className="text-sm bg-green-700/50 px-2 py-1 rounded-full">
                        {filteredCount} results
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
              {/* View Controls */}
              <div className="bg-white rounded-xl shadow-md border border-amber-100 p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-green-900">
                      All Formats
                    </h2>
                    <p className="text-sm text-green-700 mt-1">
                      Showing {formats.length} of {totalFormats} formats
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-amber-50 text-stone-700 hover:bg-amber-100 transition-colors">
                      <LayoutGrid size={20} />
                    </button>
                    <button className="p-2 rounded-lg text-green-600 hover:bg-gray-100 transition-colors">
                      <List size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Format Cards */}
              <FormatGrid 
                formats={formats}
                totalCount={totalFormats}
              />
              
              {/* No Results State */}
              {formats.length === 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Filter className="w-10 h-10 text-stone-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-900 mb-2">
                      No formats found
                    </h3>
                    <p className="text-green-700 mb-6">
                      Try adjusting your filters or search terms
                    </p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 transition-colors"
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