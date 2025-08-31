import { useMemo } from 'react'
import { useFormatStore } from '@/src/store'
import { golfFormats } from '@/data/formats'
import { FilterState } from '@/types/golf'

export function useFilters() {
  const { filterState, setFilter, clearFilters, resetFilter } = useFormatStore()
  
  const activeFiltersCount = useMemo(() => {
    return Object.values(filterState).reduce(
      (count, filterArray) => count + filterArray.length,
      0
    )
  }, [filterState])
  
  const hasActiveFilters = activeFiltersCount > 0
  
  const updateFilter = (key: keyof FilterState, value: string, checked: boolean) => {
    const currentValues = filterState[key] as string[]
    
    if (checked) {
      if (!currentValues.includes(value)) {
        setFilter(key, [...currentValues, value])
      }
    } else {
      setFilter(key, currentValues.filter(v => v !== value))
    }
  }
  
  const toggleFilter = (key: keyof FilterState, value: string) => {
    const currentValues = filterState[key] as string[]
    const isActive = currentValues.includes(value)
    
    updateFilter(key, value, !isActive)
  }
  
  const isFilterActive = (key: keyof FilterState, value: string) => {
    return (filterState[key] as string[]).includes(value)
  }
  
  return {
    filterState,
    activeFiltersCount,
    hasActiveFilters,
    setFilter,
    updateFilter,
    toggleFilter,
    isFilterActive,
    clearFilters,
    resetFilter
  }
}

export function useFilterCounts() {
  const { searchState } = useFormatStore()
  
  return useMemo(() => {
    // Start with all formats or search results
    const baseFormats = searchState.query 
      ? golfFormats.filter(format => 
          format.name.toLowerCase().includes(searchState.query.toLowerCase()) ||
          format.description.toLowerCase().includes(searchState.query.toLowerCase())
        )
      : golfFormats
    
    const counts = {
      category: {} as Record<string, number>,
      skillLevel: {} as Record<string, number>,
      type: {} as Record<string, number>,
      playerCount: {} as Record<number, number>,
      difficulty: {} as Record<number, number>,
      duration: {} as Record<string, number>
    }
    
    baseFormats.forEach(format => {
      // Category counts
      counts.category[format.category] = (counts.category[format.category] || 0) + 1
      
      // Skill level counts
      format.skillLevel.forEach(level => {
        counts.skillLevel[level] = (counts.skillLevel[level] || 0) + 1
      })
      
      // Type counts
      counts.type[format.type] = (counts.type[format.type] || 0) + 1
      
      // Player count ranges
      if (format.players.min === 1) counts.playerCount[1] = (counts.playerCount[1] || 0) + 1
      if (format.players.min <= 2 && format.players.max >= 2) counts.playerCount[2] = (counts.playerCount[2] || 0) + 1
      if (format.players.min <= 3 && format.players.max >= 3) counts.playerCount[3] = (counts.playerCount[3] || 0) + 1
      if (format.players.min <= 4 && format.players.max >= 4) counts.playerCount[4] = (counts.playerCount[4] || 0) + 1
      if (format.players.max >= 5) counts.playerCount[5] = (counts.playerCount[5] || 0) + 1
      
      // Difficulty ranges
      if (format.difficulty <= 3) counts.difficulty[1] = (counts.difficulty[1] || 0) + 1
      if (format.difficulty >= 4 && format.difficulty <= 6) counts.difficulty[2] = (counts.difficulty[2] || 0) + 1
      if (format.difficulty >= 7 && format.difficulty <= 8) counts.difficulty[3] = (counts.difficulty[3] || 0) + 1
      if (format.difficulty >= 9) counts.difficulty[4] = (counts.difficulty[4] || 0) + 1
      
      // Duration
      if (format.duration.includes('2-3') || format.duration.includes('3-4')) {
        counts.duration['2-3'] = (counts.duration['2-3'] || 0) + 1
      }
      if (format.duration.includes('3-4')) {
        counts.duration['3-4'] = (counts.duration['3-4'] || 0) + 1
      }
      if (format.duration.includes('4-5')) {
        counts.duration['4-5'] = (counts.duration['4-5'] || 0) + 1
      }
      if (format.duration.includes('5+')) {
        counts.duration['5+'] = (counts.duration['5+'] || 0) + 1
      }
    })
    
    return counts
  }, [searchState.query])
}

export function useFilterSummary() {
  const { filterState } = useFormatStore()
  
  return useMemo(() => {
    const summary: string[] = []
    
    if (filterState.category.length > 0) {
      summary.push(`${filterState.category.length} categor${filterState.category.length === 1 ? 'y' : 'ies'}`)
    }
    
    if (filterState.skillLevel.length > 0) {
      summary.push(`${filterState.skillLevel.length} skill level${filterState.skillLevel.length === 1 ? '' : 's'}`)
    }
    
    if (filterState.type.length > 0) {
      summary.push(`${filterState.type.length} type${filterState.type.length === 1 ? '' : 's'}`)
    }
    
    if (filterState.playerCount.length > 0) {
      summary.push(`${filterState.playerCount.length} player count${filterState.playerCount.length === 1 ? '' : 's'}`)
    }
    
    if (filterState.difficulty.length > 0) {
      summary.push(`${filterState.difficulty.length} difficult${filterState.difficulty.length === 1 ? 'y' : 'ies'}`)
    }
    
    if (filterState.duration.length > 0) {
      summary.push(`${filterState.duration.length} duration${filterState.duration.length === 1 ? '' : 's'}`)
    }
    
    return summary.join(', ')
  }, [filterState])
}