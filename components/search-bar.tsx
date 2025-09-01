'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp, Loader2 } from 'lucide-react';
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
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { 
    suggestions, 
    recentSearches, 
    handleSearch,
    clearRecentSearches,
    isSearching
  } = useSearch();

  // Properly use the existing debounced search from the hook
  const handleInputChange = (value: string) => {
    setInputValue(value);
    setIsTyping(true);
    handleSearch(value); // This already has debouncing in the hook
    onSearch?.(value);
    
    // Clear typing indicator after debounce
    setTimeout(() => setIsTyping(false), 400);
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
      <div className={`relative transition-all duration-300 hover-lift ${
        isFocused ? 'scale-[1.01]' : ''
      }`}>
        {isSearching || isTyping ? (
          <Loader2 
            className={`absolute left-6 top-1/2 -translate-y-1/2 animate-spin text-masters-pine`} 
            size={22} 
          />
        ) : (
          <Search 
            className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
              isFocused ? 'text-masters-pine' : 'text-masters-slate/50'
            }`} 
            size={22} 
          />
        )}
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
          className={`input-masters pl-16 pr-16 py-6 text-body font-medium transition-all duration-300 ${
            isFocused 
              ? 'border-masters-pine shadow-large' 
              : 'hover:border-masters-slate/40'
          }`}
        />
        {inputValue && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full hover:bg-masters-sand/50 text-masters-slate hover:text-masters-pine focus-masters"
            aria-label="Clear search"
          >
            <X size={18} />
          </Button>
        )}
      </div>
      
      {showSuggestions && showDropdown && hasContent && (
        <div 
          ref={dropdownRef}
          className="absolute top-full mt-4 left-0 right-0 bg-white rounded-lg shadow-large border border-masters-stone/20 glass-masters z-50 max-h-96 overflow-y-auto"
        >
          {suggestions.length > 0 && (
            <div className="p-4">
              <div className="flex items-center gap-3 px-4 py-3 text-small font-medium text-masters-slate uppercase tracking-wider border-b border-masters-stone/20 mb-2">
                <TrendingUp size={16} className="text-masters-pine" />
                Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => selectSuggestion(suggestion)}
                  className="w-full text-left px-4 py-3 rounded hover:bg-masters-sand/50 transition-all duration-200 text-masters-charcoal text-body font-medium hover-lift"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          
          {recentSearches.length > 0 && (
            <div className="p-4 border-t border-masters-stone/20">
              <div className="flex items-center justify-between px-4 py-3 mb-3">
                <div className="flex items-center gap-3 text-small font-medium text-masters-slate uppercase tracking-wider">
                  <Clock size={16} className="text-masters-pine" />
                  Recent Searches
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearRecentSearches}
                  className="text-small text-masters-slate hover:text-masters-pine"
                >
                  Clear
                </Button>
              </div>
              <div className="flex flex-wrap gap-3 px-4">
                {recentSearches.slice(0, 6).map((search, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-masters-pine/10 hover:text-masters-pine transition-colors duration-200 hover-lift"
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