'use client';

import { useEffect } from 'react';
import { useFormatStore } from '@/src/store';

export default function SettingsLoader() {
  const { loadSettings } = useFormatStore();

  useEffect(() => {
    // Load settings from localStorage on mount
    loadSettings();
    
    // Listen for system theme changes if auto mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const settings = JSON.parse(localStorage.getItem('golfSettings') || '{}');
      if (settings.theme === 'auto') {
        const theme = mediaQuery.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [loadSettings]);

  return null;
}