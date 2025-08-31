'use client';

import { useState } from 'react';
import { Filter, X, ChevronDown, RotateCcw } from 'lucide-react';
import { useFilters, useFilterCounts } from '@/src/hooks/use-filters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CATEGORIES, 
  SKILL_LEVELS, 
  GAME_TYPES, 
  DURATION_RANGES, 
  PLAYER_COUNT_RANGES
} from '@/src/lib/constants';

interface FilterPanelProps {
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function FilterPanel({ 
  className = "", 
  isOpen = true,
  onToggle 
}: FilterPanelProps) {
  const { 
    filterState, 
    activeFiltersCount, 
    hasActiveFilters,
    toggleFilter, 
    isFilterActive, 
    clearFilters 
  } = useFilters();
  
  const filterCounts = useFilterCounts();
  
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    skillLevel: true,
    type: true,
    playerCount: false,
    difficulty: false,
    duration: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FilterSection = ({ 
    title, 
    section, 
    items, 
    getCount 
  }: { 
    title: string;
    section: keyof typeof expandedSections;
    items: readonly { readonly value: string; readonly label: string; readonly description?: string }[];
    getCount: (value: string) => number;
  }) => (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 dark:text-white">{title}</span>
          {filterState[section].length > 0 && (
            <Badge variant="default" size="sm">
              {filterState[section].length}
            </Badge>
          )}
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform ${
            expandedSections[section] ? 'rotate-180' : ''
          }`} 
        />
      </button>
      
      {expandedSections[section] && (
        <div className="px-4 pb-4 space-y-2">
          {items.map((item) => {
            const count = getCount(item.value);
            const isActive = isFilterActive(section, item.value);
            const isDisabled = count === 0 && !isActive;
            
            return (
              <button
                key={item.value}
                onClick={() => !isDisabled && toggleFilter(section, item.value)}
                disabled={isDisabled}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : isDisabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  {item.description && (
                    <div className="text-xs opacity-70 mt-0.5">{item.description}</div>
                  )}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isDisabled 
                    ? 'bg-gray-100 dark:bg-gray-700' 
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  const PlayerCountSection = () => (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={() => toggleSection('playerCount')}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 dark:text-white">Player Count</span>
          {filterState.playerCount.length > 0 && (
            <Badge variant="default" size="sm">
              {filterState.playerCount.length}
            </Badge>
          )}
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform ${
            expandedSections.playerCount ? 'rotate-180' : ''
          }`} 
        />
      </button>
      
      {expandedSections.playerCount && (
        <div className="px-4 pb-4 space-y-2">
          {PLAYER_COUNT_RANGES.map((range) => {
            const count = filterCounts.playerCount[range.value] || 0;
            const isActive = isFilterActive('playerCount', range.value.toString());
            const isDisabled = count === 0 && !isActive;
            
            return (
              <button
                key={range.value}
                onClick={() => !isDisabled && toggleFilter('playerCount', range.value.toString())}
                disabled={isDisabled}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : isDisabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex-1">
                  <div className="font-medium">{range.label}</div>
                  <div className="text-xs opacity-70 mt-0.5">{range.description}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isDisabled 
                    ? 'bg-gray-100 dark:bg-gray-700' 
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  const DifficultySection = () => (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <button
        onClick={() => toggleSection('difficulty')}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 dark:text-white">Difficulty</span>
          {filterState.difficulty.length > 0 && (
            <Badge variant="default" size="sm">
              {filterState.difficulty.length}
            </Badge>
          )}
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform ${
            expandedSections.difficulty ? 'rotate-180' : ''
          }`} 
        />
      </button>
      
      {expandedSections.difficulty && (
        <div className="px-4 pb-4 space-y-2">
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
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : isDisabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex-1">
                  <div className="font-medium">{range.label}</div>
                  <div className="text-xs opacity-70 mt-0.5">{range.description}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isDisabled 
                    ? 'bg-gray-100 dark:bg-gray-700' 
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        variant="outline"
        className={`relative ${className}`}
      >
        <Filter size={16} />
        <span className="ml-2">Filters</span>
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
    );
  }

  return (
    <Card className={`h-fit ${className}`} variant="glass">
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
        <div className="flex items-center gap-2">
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
          {onToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8"
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[60vh]">
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
        </ScrollArea>
      </CardContent>
    </Card>
  );
}