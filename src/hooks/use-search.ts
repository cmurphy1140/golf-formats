import { useState, useEffect, useMemo } from 'react'
import { useFormatStore } from '@/src/store'
import { golfFormats } from '@/data/formats'
import { searchFormats, debounce } from '@/src/lib/utils'
import { POPULAR_SEARCHES } from '@/src/lib/constants'

export function useSearch() {
  const { 
    searchState, 
    setSearchQuery, 
    addRecentSearch,
    clearRecentSearches 
  } = useFormatStore()
  
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  
  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      setSearchQuery(query)
      if (query.trim()) {
        addRecentSearch(query)
      }
      setIsSearching(false)
    }, 300),
    [setSearchQuery, addRecentSearch]
  )
  
  const handleSearch = (query: string) => {
    setIsSearching(true)
    debouncedSearch(query)
  }
  
  const generateSuggestions = useMemo(
    () => debounce((query: string) => {
      if (!query.trim() || query.length < 2) {
        setSuggestions([])
        return
      }
      
      const searchTerm = query.toLowerCase()
      const formatSuggestions = golfFormats
        .filter(format => 
          format.name.toLowerCase().includes(searchTerm) ||
          format.category.toLowerCase().includes(searchTerm) ||
          format.description.toLowerCase().includes(searchTerm)
        )
        .slice(0, 5)
        .map(format => format.name)
      
      const popularSuggestions = POPULAR_SEARCHES
        .filter(search => search.toLowerCase().includes(searchTerm))
        .slice(0, 3)
      
      const allSuggestions = [
        ...new Set([...formatSuggestions, ...popularSuggestions])
      ].slice(0, 8)
      
      setSuggestions(allSuggestions)
    }, 200),
    []
  )
  
  useEffect(() => {
    if (searchState.query) {
      generateSuggestions(searchState.query)
    } else {
      setSuggestions([])
    }
  }, [searchState.query, generateSuggestions])
  
  const searchResults = useMemo(() => {
    if (!searchState.query.trim()) {
      return golfFormats
    }
    return searchFormats(golfFormats, searchState.query)
  }, [searchState.query])
  
  return {
    query: searchState.query,
    suggestions,
    recentSearches: searchState.recentSearches,
    searchResults,
    isSearching,
    handleSearch,
    clearRecentSearches,
    hasResults: searchResults.length > 0,
    resultCount: searchResults.length
  }
}

export function useSearchHistory() {
  const { searchState, addRecentSearch, clearRecentSearches } = useFormatStore()
  
  const addSearch = (query: string) => {
    const trimmed = query.trim()
    if (trimmed && trimmed.length >= 2) {
      addRecentSearch(trimmed)
    }
  }
  
  return {
    recentSearches: searchState.recentSearches,
    addSearch,
    clearHistory: clearRecentSearches
  }
}

export function useSearchSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  
  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([])
      return
    }
    
    const searchTerm = query.toLowerCase()
    
    // Format name suggestions
    const formatNames = golfFormats
      .filter(format => format.name.toLowerCase().includes(searchTerm))
      .map(format => format.name)
      .slice(0, 4)
    
    // Category suggestions
    const categories = ['tournament', 'casual', 'betting', 'team']
      .filter(cat => cat.toLowerCase().includes(searchTerm))
      .slice(0, 2)
    
    // Popular search suggestions
    const popular = POPULAR_SEARCHES
      .filter(search => search.toLowerCase().includes(searchTerm))
      .slice(0, 3)
    
    const allSuggestions = [
      ...new Set([...formatNames, ...categories, ...popular])
    ].slice(0, 8)
    
    setSuggestions(allSuggestions)
  }, [query])
  
  return suggestions
}