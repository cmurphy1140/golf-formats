import { renderHook, act } from '@testing-library/react';
import { useSearch } from '../use-search';

describe('useSearch Hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('initializes with empty search state', () => {
    const { result } = renderHook(() => useSearch());
    
    expect(result.current.searchQuery).toBe('');
    expect(result.current.suggestions).toEqual([]);
    expect(result.current.recentSearches).toEqual([]);
  });

  it('updates search query when handleSearch is called', () => {
    const { result } = renderHook(() => useSearch());
    
    act(() => {
      result.current.handleSearch('scramble');
    });
    
    expect(result.current.searchQuery).toBe('scramble');
  });

  it('generates suggestions based on search query', () => {
    const { result } = renderHook(() => useSearch());
    
    act(() => {
      result.current.handleSearch('best');
    });
    
    expect(result.current.suggestions).toContain('Best Ball');
  });

  it('stores recent searches in localStorage', () => {
    const { result } = renderHook(() => useSearch());
    
    act(() => {
      result.current.handleSearch('tournament');
    });
    
    const stored = localStorage.getItem('recentSearches');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored || '[]');
    expect(parsed).toContain('tournament');
  });

  it('clears recent searches when clearRecentSearches is called', () => {
    const { result } = renderHook(() => useSearch());
    
    act(() => {
      result.current.handleSearch('test search');
    });
    
    expect(result.current.recentSearches.length).toBeGreaterThan(0);
    
    act(() => {
      result.current.clearRecentSearches();
    });
    
    expect(result.current.recentSearches).toEqual([]);
    expect(localStorage.getItem('recentSearches')).toBe('[]');
  });

  // TODO: Add tests for:
  // - Maximum recent searches limit
  // - Duplicate search prevention
  // - Case-insensitive search
  // - Special character handling
});