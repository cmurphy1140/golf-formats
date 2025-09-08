import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GolfFormat, FilterState, SearchState, ComparisonFormat } from '@/types/golf'

export interface Settings {
  handicap: number
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
  groupSize: number
  theme: 'light' | 'dark' | 'auto'
  animations: boolean
}

interface FormatStore {
  // Settings
  settings: Settings
  updateSettings: (settings: Partial<Settings>) => void
  loadSettings: () => void
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

const defaultSettings: Settings = {
  handicap: 15,
  skillLevel: 'intermediate',
  groupSize: 4,
  theme: 'auto',
  animations: true,
}

export const useFormatStore = create<FormatStore>()(
  persist(
    (set, get) => ({
      // Settings
      settings: defaultSettings,
      
      updateSettings: (newSettings: Partial<Settings>) => {
        const updatedSettings = { ...get().settings, ...newSettings }
        localStorage.setItem('golfSettings', JSON.stringify(updatedSettings))
        
        // Apply theme immediately
        if (newSettings.theme !== undefined) {
          const theme = newSettings.theme === 'auto' 
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : newSettings.theme
          document.documentElement.setAttribute('data-theme', theme)
        }
        
        // Apply animations
        if (newSettings.animations !== undefined) {
          document.documentElement.setAttribute('data-animations', newSettings.animations ? 'on' : 'off')
        }
        
        set({ settings: updatedSettings })
      },
      
      loadSettings: () => {
        const stored = localStorage.getItem('golfSettings')
        if (stored) {
          const settings = JSON.parse(stored)
          set({ settings })
          
          // Apply theme
          const theme = settings.theme === 'auto' 
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : settings.theme
          document.documentElement.setAttribute('data-theme', theme)
          
          // Apply animations
          document.documentElement.setAttribute('data-animations', settings.animations ? 'on' : 'off')
        }
      },
      
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
      name: 'format-finder-store',
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