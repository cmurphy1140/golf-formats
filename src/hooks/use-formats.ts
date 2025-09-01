import { useMemo } from 'react'
import { golfFormats } from '@/data/formats'
import { GolfFormat } from '@/types/golf'
import { searchFormats, sortFormats } from '@/src/lib/utils'
import { useFormatStore } from '@/src/store'

export function useFormats() {
  const { searchState, filterState, sortBy, settings } = useFormatStore()
  
  const filteredFormats = useMemo(() => {
    let filtered = [...golfFormats]
    
    // Apply search
    if (searchState.query) {
      filtered = searchFormats(filtered, searchState.query)
    }
    
    // Apply filters
    if (filterState.category.length > 0) {
      filtered = filtered.filter(format => 
        filterState.category.includes(format.category)
      )
    }
    
    // Apply skill level filter (from filters or settings)
    const skillLevels = filterState.skillLevel.length > 0 
      ? filterState.skillLevel 
      : [settings.skillLevel] // Use user's skill level as default
    
    if (skillLevels.length > 0 && filterState.skillLevel.length > 0) {
      filtered = filtered.filter(format => 
        format.skillLevel.some(level => skillLevels.includes(level))
      )
    }
    
    if (filterState.type.length > 0) {
      filtered = filtered.filter(format => 
        filterState.type.includes(format.type)
      )
    }
    
    if (filterState.playerCount.length > 0) {
      filtered = filtered.filter(format => {
        return filterState.playerCount.some(count => {
          if (count === 1) return format.players.min === 1
          if (count === 2) return format.players.min <= 2 && format.players.max >= 2
          if (count === 3) return format.players.min <= 3 && format.players.max >= 3
          if (count === 4) return format.players.min <= 4 && format.players.max >= 4
          if (count === 5) return format.players.max >= 5
          return false
        })
      })
    }
    
    if (filterState.difficulty.length > 0) {
      filtered = filtered.filter(format => {
        return filterState.difficulty.some(diff => {
          if (diff === 1) return format.difficulty <= 3
          if (diff === 2) return format.difficulty >= 4 && format.difficulty <= 6
          if (diff === 3) return format.difficulty >= 7 && format.difficulty <= 8
          if (diff === 4) return format.difficulty >= 9
          return false
        })
      })
    }
    
    if (filterState.duration.length > 0) {
      filtered = filtered.filter(format => {
        return filterState.duration.some(dur => {
          if (dur === '2-3') return format.duration.includes('2-3') || format.duration.includes('3-4')
          if (dur === '3-4') return format.duration.includes('3-4')
          if (dur === '4-5') return format.duration.includes('4-5')
          if (dur === '5+') return format.duration.includes('5+')
          return false
        })
      })
    }
    
    // Apply sorting
    return sortFormats(filtered, sortBy)
  }, [searchState.query, filterState, sortBy, settings.skillLevel])
  
  return {
    formats: filteredFormats,
    totalFormats: golfFormats.length,
    filteredCount: filteredFormats.length
  }
}

export function useFormat(id: string) {
  return useMemo(() => {
    return golfFormats.find(format => format.id === id)
  }, [id])
}

export function usePopularFormats(limit = 4) {
  return useMemo(() => {
    return golfFormats
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit)
  }, [limit])
}

export function useFormatsByCategory(category: string, limit = 6) {
  return useMemo(() => {
    return golfFormats
      .filter(format => format.category === category)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit)
  }, [category, limit])
}

export function useRecommendedFormats(
  currentFormatId: string, 
  playerCount?: number,
  skillLevel?: string,
  limit = 4
) {
  const { settings } = useFormatStore()
  
  return useMemo(() => {
    const currentFormat = golfFormats.find(f => f.id === currentFormatId)
    if (!currentFormat) return []
    
    let recommended = golfFormats.filter(format => format.id !== currentFormatId)
    
    // Use player count from parameter or settings
    const effectivePlayerCount = playerCount || settings.groupSize
    if (effectivePlayerCount) {
      recommended = recommended.filter(format => 
        effectivePlayerCount >= format.players.min && effectivePlayerCount <= format.players.max
      )
    }
    
    // Use skill level from parameter or settings
    const effectiveSkillLevel = skillLevel || settings.skillLevel
    if (effectiveSkillLevel) {
      recommended = recommended.filter(format => 
        format.skillLevel.includes(effectiveSkillLevel as ('beginner' | 'intermediate' | 'advanced'))
      )
    }
    
    // Prioritize same category
    const sameCategory = recommended.filter(f => f.category === currentFormat.category)
    const otherCategory = recommended.filter(f => f.category !== currentFormat.category)
    
    return [
      ...sameCategory.sort((a, b) => b.popularity - a.popularity),
      ...otherCategory.sort((a, b) => b.popularity - a.popularity)
    ].slice(0, limit)
  }, [currentFormatId, playerCount, skillLevel, limit, settings.groupSize, settings.skillLevel])
}

export function useFavoriteFormats() {
  const { favoriteFormats } = useFormatStore()
  
  return useMemo(() => {
    return golfFormats.filter(format => favoriteFormats.includes(format.id))
  }, [favoriteFormats])
}

export function useRecentlyViewedFormats() {
  const { recentlyViewed } = useFormatStore()
  
  return useMemo(() => {
    return recentlyViewed
      .map(id => golfFormats.find(format => format.id === id))
      .filter(Boolean) as GolfFormat[]
  }, [recentlyViewed])
}