import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GolfFormat, FilterState, SearchState, ComparisonFormat } from '@/types/golf'

interface FormatStore {
  // Search state
  searchState: SearchState
  setSearchQuery: (query: string) => void
  addRecentSearch: (query: string) => void
  clearRecentSearches: () => void
  
  // Filter state
  filterState: FilterState
  setFilter: (key: keyof FilterState, value: string[] | number[]) => void
  clearFilters: () => void
  resetFilter: (key: keyof FilterState) => void
  
  // Comparison state
  comparisonFormats: ComparisonFormat[]
  addToComparison: (format: GolfFormat) => void
  removeFromComparison: (formatId: string) => void
  clearComparison: () => void
  
  // UI state
  viewMode: 'grid' | 'list'
  setViewMode: (mode: 'grid' | 'list') => void
  
  // Sorting
  sortBy: string
  setSortBy: (sortBy: string) => void
  
  // Favorites
  favoriteFormats: string[]
  toggleFavorite: (formatId: string) => void
  
  // Recently viewed
  recentlyViewed: string[]
  addToRecentlyViewed: (formatId: string) => void
}

export const useFormatStore = create<FormatStore>()(
  persist(
    (set) => ({
      // Search state
      searchState: {
        query: '',
        suggestions: [],
        recentSearches: []
      },
      
      setSearchQuery: (query: string) => 
        set((state) => ({
          searchState: { ...state.searchState, query }
        })),
      
      addRecentSearch: (query: string) =>
        set((state) => {
          const trimmedQuery = query.trim().toLowerCase()
          if (!trimmedQuery || trimmedQuery.length < 2) return state
          
          const recentSearches = [
            trimmedQuery,
            ...state.searchState.recentSearches.filter(q => q !== trimmedQuery)
          ].slice(0, 10)
          
          return {
            searchState: { ...state.searchState, recentSearches }
          }
        }),
      
      clearRecentSearches: () =>
        set((state) => ({
          searchState: { ...state.searchState, recentSearches: [] }
        })),
      
      // Filter state
      filterState: {
        category: [],
        playerCount: [],
        skillLevel: [],
        duration: [],
        difficulty: [],
        type: []
      },
      
      setFilter: (key: keyof FilterState, value: string[] | number[]) =>
        set((state) => ({
          filterState: { ...state.filterState, [key]: value }
        })),
      
      clearFilters: () =>
        set(() => ({
          filterState: {
            category: [],
            playerCount: [],
            skillLevel: [],
            duration: [],
            difficulty: [],
            type: []
          }
        })),
      
      resetFilter: (key: keyof FilterState) =>
        set((state) => ({
          filterState: { ...state.filterState, [key]: [] }
        })),
      
      // Comparison state
      comparisonFormats: [],
      
      addToComparison: (format: GolfFormat) =>
        set((state) => {
          const exists = state.comparisonFormats.find(cf => cf.id === format.id)
          if (exists || state.comparisonFormats.length >= 3) return state
          
          return {
            comparisonFormats: [
              ...state.comparisonFormats,
              { id: format.id, format }
            ]
          }
        }),
      
      removeFromComparison: (formatId: string) =>
        set((state) => ({
          comparisonFormats: state.comparisonFormats.filter(cf => cf.id !== formatId)
        })),
      
      clearComparison: () =>
        set(() => ({ comparisonFormats: [] })),
      
      // UI state
      viewMode: 'grid',
      setViewMode: (mode: 'grid' | 'list') => set(() => ({ viewMode: mode })),
      
      // Sorting
      sortBy: 'popularity',
      setSortBy: (sortBy: string) => set(() => ({ sortBy })),
      
      // Favorites
      favoriteFormats: [],
      toggleFavorite: (formatId: string) =>
        set((state) => {
          const isFavorite = state.favoriteFormats.includes(formatId)
          return {
            favoriteFormats: isFavorite
              ? state.favoriteFormats.filter(id => id !== formatId)
              : [...state.favoriteFormats, formatId]
          }
        }),
      
      // Recently viewed
      recentlyViewed: [],
      addToRecentlyViewed: (formatId: string) =>
        set((state) => ({
          recentlyViewed: [
            formatId,
            ...state.recentlyViewed.filter(id => id !== formatId)
          ].slice(0, 20)
        }))
    }),
    {
      name: 'golf-formats-store',
      partialize: (state) => ({
        favoriteFormats: state.favoriteFormats,
        recentlyViewed: state.recentlyViewed,
        searchState: { 
          query: '',
          suggestions: [],
          recentSearches: state.searchState.recentSearches 
        },
        viewMode: state.viewMode,
        sortBy: state.sortBy
      })
    }
  )
)