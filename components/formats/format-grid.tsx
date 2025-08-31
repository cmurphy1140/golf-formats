'use client';

import { Grid, List, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { GolfFormat } from '@/types/golf';
import FormatCard from '@/components/format-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFormatStore } from '@/src/store';
import { SORT_OPTIONS } from '@/src/lib/constants';
import { formatPlayerCount, getDifficultyLabel } from '@/src/lib/utils';

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

  const FormatListView = ({ format }: { format: GolfFormat }) => (
    <Card className="hover:-translate-y-1 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start gap-6">
          {/* Format Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {format.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                  {format.description}
                </p>
              </div>
              <Badge variant="outline" className="capitalize">
                {format.category}
              </Badge>
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
              <span>{formatPlayerCount(format.players)}</span>
              <span>•</span>
              <span>{format.duration}</span>
              <span>•</span>
              <span className="capitalize">{format.type}</span>
              <span>•</span>
              <span>{getDifficultyLabel(format.difficulty)}</span>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="flex flex-col items-end gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={`/formats/${format.id}`}>
                View Details
              </a>
            </Button>
            <div className="text-xs text-gray-400">
              Popularity: {format.popularity}/100
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Controls Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Showing <span className="font-semibold">{formats.length}</span> of{' '}
            <span className="font-semibold">{totalCount}</span> formats
          </div>
          {formats.length !== totalCount && (
            <Badge variant="secondary">Filtered</Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Sort Select */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="p-2"
            >
              <Grid size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="p-2"
            >
              <List size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {formats.length === 0 ? (
        <Card className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No formats found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your filters or search terms
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RotateCcw size={16} className="mr-2" />
              Reset Filters
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {formats.map((format) => (
                <FormatCard key={format.id} format={format} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {formats.map((format) => (
                <FormatListView key={format.id} format={format} />
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
    <div className="space-y-6">
      {/* Controls Skeleton */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 h-16 animate-pulse" />
      
      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="p-6 h-80">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
              <div className="space-y-2 pt-4">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}