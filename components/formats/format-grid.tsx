'use client';

import { Grid, List, RotateCcw, SlidersHorizontal, Crown, ArrowRight } from 'lucide-react';
import { GolfFormat } from '@/types/golf';
import FormatCardSimple from '@/components/format-card-simple';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFormatStore } from '@/src/store';
import { SORT_OPTIONS } from '@/src/lib/constants';
import { formatPlayerCount, getDifficultyLabel } from '@/src/lib/utils';
import Link from 'next/link';

interface FormatGridProps {
  formats: GolfFormat[];
  totalCount: number;
  isLoading?: boolean;
}

export default function FormatGrid({ formats, totalCount, isLoading = false }: FormatGridProps) {
  const { viewMode, setViewMode, sortBy, setSortBy } = useFormatStore();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <FormatGridSkeleton />
      </div>
    );
  }

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'tournament':
        return 'badge-tournament';
      case 'casual':
        return 'badge-casual';
      case 'betting':
        return 'badge-betting';
      case 'team':
        return 'badge-team';
      case 'training':
        return 'badge-training';
      default:
        return 'badge-casual';
    }
  };

  const FormatListView = ({ format }: { format: GolfFormat }) => (
    <div className="card-masters hover-glow hover-lift transition-all duration-300">
      <div className="p-8">
        <div className="flex items-start gap-8">
          {/* Format Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 pr-6">
                <h3 className="text-h3 font-serif font-bold text-masters-charcoal mb-3">
                  {format.name}
                </h3>
                <p className="text-masters-slate line-clamp-2 leading-relaxed">
                  {format.description}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={`${getCategoryBadgeClass(format.category)} text-xs`}>
                  {format.category}
                </Badge>
                {format.popularity >= 80 && (
                  <div className="flex items-center gap-2 bg-masters-gold/10 px-2 py-1 rounded-full">
                    <Crown size={12} className="text-masters-gold" />
                    <span className="text-tiny font-medium text-masters-gold uppercase tracking-wider">Distinguished</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-6 text-small text-masters-slate font-medium">
              <span>{formatPlayerCount(format.players)}</span>
              <span className="text-masters-stone">•</span>
              <span>{format.duration}</span>
              <span className="text-masters-stone">•</span>
              <span className="capitalize">{format.type}</span>
              <span className="text-masters-stone">•</span>
              <span>{getDifficultyLabel(format.difficulty)}</span>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="flex flex-col items-end gap-3">
            <Link href={`/formats/${format.id}`}>
              <Button variant="outline" size="sm" className="hover-lift">
                View Details
                <ArrowRight size={16} />
              </Button>
            </Link>
            <div className="text-tiny text-masters-slate/60 font-medium">
              Distinction: {format.popularity}/100
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Controls Header */}
      <div className="card-masters p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="text-small font-medium text-masters-slate">
            Showing <span className="font-serif font-semibold text-masters-charcoal">{formats.length}</span> of{' '}
            <span className="font-serif font-semibold text-masters-charcoal">{totalCount}</span> distinguished formats
          </div>
          {formats.length !== totalCount && (
            <Badge variant="secondary" className="bg-masters-pine/10 text-masters-pine">
              Filtered Collection
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {/* Sort Select */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 input-masters h-auto py-3">
              <SelectValue placeholder="Sort by tradition" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-masters-stone/20 rounded-lg shadow-large">
              {SORT_OPTIONS.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="hover:bg-masters-sand/50 font-medium text-masters-slate"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-masters-sand/50 rounded p-1">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="w-12 h-12 p-0 hover-lift"
            >
              <Grid size={18} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="w-12 h-12 p-0 hover-lift"
            >
              <List size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {formats.length === 0 ? (
        <div className="card-masters text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-masters-sand rounded-full flex items-center justify-center mx-auto mb-6">
              <SlidersHorizontal className="w-10 h-10 text-masters-slate/40" />
            </div>
            <h3 className="text-h3 font-serif font-bold text-masters-charcoal mb-4">
              No Formats Found
            </h3>
            <p className="text-masters-slate mb-8 leading-relaxed">
              We could not locate any formats matching your distinguished criteria. 
              Perhaps consider broadening your search.
            </p>
            <Button variant="outline" onClick={() => window.location.reload()} className="hover-lift">
              <RotateCcw size={18} />
              Reset Collection
            </Button>
          </div>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {formats.map((format, index) => (
                <div key={format.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <FormatCardSimple format={format} />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {formats.map((format, index) => (
                <div key={format.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <FormatListView format={format} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function FormatGridSkeleton() {
  return (
    <div className="space-y-8">
      {/* Controls Skeleton */}
      <div className="card-masters p-6 h-20 skeleton-masters" />
      
      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card-masters p-8 h-96">
            <div className="space-y-6">
              <div className="h-6 skeleton-masters rounded w-3/4" />
              <div className="space-y-3">
                <div className="h-4 skeleton-masters rounded w-full" />
                <div className="h-4 skeleton-masters rounded w-2/3" />
              </div>
              <div className="space-y-3 pt-6">
                <div className="h-4 skeleton-masters rounded w-1/2" />
                <div className="h-4 skeleton-masters rounded w-1/3" />
              </div>
              <div className="flex justify-between pt-6">
                <div className="h-6 skeleton-masters rounded w-24" />
                <div className="h-6 skeleton-masters rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}