'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useSearch } from '@/src/hooks/use-search';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  showSuggestions?: boolean;
}

export default function SearchBar({ 
  onSearch,
  placeholder = "Search golf formats...",
  className = "",
  showSuggestions = true
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { 
    suggestions, 
    recentSearches, 
    handleSearch,
    clearRecentSearches 
  } = useSearch();

  const debouncedSearch = useCallback((value: string) => {
    handleSearch(value);
    onSearch?.(value);
  }, [handleSearch, onSearch]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setInputValue('');
    handleSearch('');
    onSearch?.('');
    inputRef.current?.focus();
  };

  const selectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    handleSearch(suggestion);
    onSearch?.(suggestion);
    setShowDropdown(false);
    inputRef.current?.blur();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasContent = suggestions.length > 0 || recentSearches.length > 0;

  return (
    <div className={`relative w-full ${className}`}>
      <div className={`relative transition-all duration-300 ${
        isFocused ? 'scale-[1.02]' : ''
      }`}>
        <Search 
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
            isFocused ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
          }`} 
          size={20} 
        />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (showSuggestions && hasContent) {
              setShowDropdown(true);
            }
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full pl-12 pr-12 py-4 rounded-2xl border-2 transition-all duration-300 ${
            isFocused 
              ? 'border-green-500 shadow-lg shadow-green-500/20 dark:shadow-green-500/10' 
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none backdrop-blur-sm`}
        />
        {inputValue && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Clear search"
          >
            <X size={16} className="text-gray-400" />
          </Button>
        )}
      </div>
      
      {showSuggestions && showDropdown && hasContent && (
        <div 
          ref={dropdownRef}
          className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 z-50 max-h-80 overflow-y-auto"
        >
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                <TrendingUp size={14} />
                Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => selectSuggestion(suggestion)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          
          {recentSearches.length > 0 && (
            <div className="p-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  <Clock size={14} />
                  Recent Searches
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 h-auto p-1"
                >
                  Clear
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 px-3 pb-2">
                {recentSearches.slice(0, 6).map((search, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 text-xs"
                    onClick={() => selectSuggestion(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}