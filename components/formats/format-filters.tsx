'use client';

import { useState } from 'react';
import { Filter, RotateCcw, Check } from 'lucide-react';
import { useFilters, useFilterCounts } from '@/src/hooks/use-filters';
import { FilterState } from '@/types/golf';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  CATEGORIES, 
  SKILL_LEVELS, 
  GAME_TYPES, 
  DURATION_RANGES, 
  PLAYER_COUNT_RANGES
} from '@/src/lib/constants';

interface FormatFiltersProps {
  className?: string;
}

export default function FormatFilters({ className = "" }: FormatFiltersProps) {
  const { 
    activeFiltersCount, 
    hasActiveFilters,
    toggleFilter, 
    isFilterActive, 
    clearFilters 
  } = useFilters();
  
  const filterCounts = useFilterCounts();
  const [isOpen, setIsOpen] = useState(false);

  // Quick filter buttons for mobile
  const QuickFilters = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      {CATEGORIES.slice(0, 4).map((category) => (
        <Button
          key={category.value}
          variant={isFilterActive('category', category.value) ? 'default' : 'outline'}
          size="sm"
          onClick={() => toggleFilter('category', category.value)}
          className="text-xs"
        >
          {category.label}
        </Button>
      ))}
    </div>
  );

  const FilterSection = ({ 
    title, 
    section, 
    items, 
    getCount 
  }: { 
    title: string;
    section: keyof FilterState;
    items: { value: string; label: string; description?: string }[];
    getCount: (value: string) => number;
  }) => (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
      <div className="grid grid-cols-1 gap-2">
        {items.map((item) => {
          const count = getCount(item.value);
          const isActive = isFilterActive(section, item.value);
          const isDisabled = count === 0 && !isActive;
          
          return (
            <button
              key={item.value}
              onClick={() => !isDisabled && toggleFilter(section, item.value)}
              disabled={isDisabled}
              className={`flex items-center justify-between p-3 rounded-lg text-left transition-colors border ${
                isActive
                  ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
                  : isDisabled
                  ? 'text-gray-400 border-gray-100 dark:border-gray-800 cursor-not-allowed'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex-1">
                <div className="font-medium flex items-center gap-2">
                  {isActive && <Check size={14} />}
                  {item.label}
                </div>
                {item.description && (
                  <div className="text-xs opacity-70 mt-1">{item.description}</div>
                )}
              </div>
              <Badge 
                variant={isActive ? "default" : "secondary"} 
                size="sm"
              >
                {count}
              </Badge>
            </button>
          );
        })}
      </div>
    </div>
  );

  const PlayerCountSection = () => (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900 dark:text-white">Player Count</h4>
      <div className="grid grid-cols-1 gap-2">
        {PLAYER_COUNT_RANGES.map((range) => {
          const count = filterCounts.playerCount[range.value] || 0;
          const isActive = isFilterActive('playerCount', range.value.toString());
          const isDisabled = count === 0 && !isActive;
          
          return (
            <button
              key={range.value}
              onClick={() => !isDisabled && toggleFilter('playerCount', range.value.toString())}
              disabled={isDisabled}
              className={`flex items-center justify-between p-3 rounded-lg text-left transition-colors border ${
                isActive
                  ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
                  : isDisabled
                  ? 'text-gray-400 border-gray-100 dark:border-gray-800 cursor-not-allowed'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex-1">
                <div className="font-medium flex items-center gap-2">
                  {isActive && <Check size={14} />}
                  {range.label}
                </div>
                <div className="text-xs opacity-70 mt-1">{range.description}</div>
              </div>
              <Badge 
                variant={isActive ? "default" : "secondary"} 
                size="sm"
              >
                {count}
              </Badge>
            </button>
          );
        })}
      </div>
    </div>
  );

  const DifficultySection = () => (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900 dark:text-white">Difficulty</h4>
      <div className="grid grid-cols-1 gap-2">
        {[
          { value: 1, label: 'Easy', description: 'Levels 1-3' },
          { value: 2, label: 'Medium', description: 'Levels 4-6' },
          { value: 3, label: 'Hard', description: 'Levels 7-8' },
          { value: 4, label: 'Expert', description: 'Levels 9-10' }
        ].map((range) => {
          const count = filterCounts.difficulty[range.value] || 0;
          const isActive = isFilterActive('difficulty', range.value.toString());
          const isDisabled = count === 0 && !isActive;
          
          return (
            <button
              key={range.value}
              onClick={() => !isDisabled && toggleFilter('difficulty', range.value.toString())}
              disabled={isDisabled}
              className={`flex items-center justify-between p-3 rounded-lg text-left transition-colors border ${
                isActive
                  ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
                  : isDisabled
                  ? 'text-gray-400 border-gray-100 dark:border-gray-800 cursor-not-allowed'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex-1">
                <div className="font-medium flex items-center gap-2">
                  {isActive && <Check size={14} />}
                  {range.label}
                </div>
                <div className="text-xs opacity-70 mt-1">{range.description}</div>
              </div>
              <Badge 
                variant={isActive ? "default" : "secondary"} 
                size="sm"
              >
                {count}
              </Badge>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className={className}>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full relative">
              <Filter size={16} className="mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge 
                  variant="default" 
                  size="sm"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter size={18} />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="default" size="sm">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </div>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs"
                  >
                    <RotateCcw size={14} />
                    <span className="ml-1">Reset</span>
                  </Button>
                )}
              </DialogTitle>
            </DialogHeader>
            
            <ScrollArea className="h-[60vh] px-1">
              <div className="space-y-6">
                <QuickFilters />
                
                <FilterSection
                  title="Category"
                  section="category"
                  items={CATEGORIES}
                  getCount={(value) => filterCounts.category[value] || 0}
                />
                
                <FilterSection
                  title="Skill Level"
                  section="skillLevel"
                  items={SKILL_LEVELS}
                  getCount={(value) => filterCounts.skillLevel[value] || 0}
                />
                
                <FilterSection
                  title="Game Type"
                  section="type"
                  items={GAME_TYPES}
                  getCount={(value) => filterCounts.type[value] || 0}
                />
                
                <PlayerCountSection />
                <DifficultySection />
                
                <FilterSection
                  title="Duration"
                  section="duration"
                  items={DURATION_RANGES}
                  getCount={(value) => filterCounts.duration[value] || 0}
                />
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {/* Desktop Filter Panel */}
      <Card className="hidden lg:block h-fit" variant="glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Filter size={18} />
            Filters
            {hasActiveFilters && (
              <Badge variant="default" size="sm">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              <RotateCcw size={14} />
              <span className="ml-1">Reset</span>
            </Button>
          )}
        </CardHeader>
        
        <CardContent>
          <ScrollArea className="h-[70vh] pr-4">
            <div className="space-y-6">
              <FilterSection
                title="Category"
                section="category"
                items={CATEGORIES}
                getCount={(value) => filterCounts.category[value] || 0}
              />
              
              <FilterSection
                title="Skill Level"
                section="skillLevel"
                items={SKILL_LEVELS}
                getCount={(value) => filterCounts.skillLevel[value] || 0}
              />
              
              <FilterSection
                title="Game Type"
                section="type"
                items={GAME_TYPES}
                getCount={(value) => filterCounts.type[value] || 0}
              />
              
              <PlayerCountSection />
              <DifficultySection />
              
              <FilterSection
                title="Duration"
                section="duration"
                items={DURATION_RANGES}
                getCount={(value) => filterCounts.duration[value] || 0}
              />
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}