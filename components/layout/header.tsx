'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Home, 
  Grid, 
  Trophy, 
  Moon, 
  Sun, 
  Search, 
  Menu, 
  X,
  GitCompare,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFormatStore } from '@/src/store';
import SearchBar from '@/components/search-bar';

export default function Header() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { comparisonFormats, favoriteFormats } = useFormatStore();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/formats', label: 'All Formats', icon: Grid },
    { href: '/compare', label: 'Compare', icon: GitCompare, badge: comparisonFormats.length },
    { href: '/favorites', label: 'Favorites', icon: Heart, badge: favoriteFormats.length }
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 supports-[backdrop-filter]:bg-white/80 supports-[backdrop-filter]:dark:bg-gray-900/80">
      <div className="container-centered">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Golf Formats
              </span>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <SearchBar 
              placeholder="Search formats..." 
              className="w-full"
              showSuggestions={true}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || 
                (item.href === '/formats' && pathname.startsWith('/formats'));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-green-600 dark:text-green-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium text-sm">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <Badge 
                      variant="default" 
                      size="sm"
                      className="h-5 min-w-5 text-xs p-0 flex items-center justify-center"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden"
            >
              <Search size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-xl"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-xl"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2">
            <SearchBar 
              placeholder="Search formats..." 
              className="w-full"
              showSuggestions={true}
            />
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || 
                  (item.href === '/formats' && pathname.startsWith('/formats'));
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 text-green-600 dark:text-green-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 && (
                      <Badge variant="default" size="sm">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
              <div className="mb-3">
                <SearchBar 
                  placeholder="Search formats..." 
                  className="w-full"
                  showSuggestions={false}
                />
              </div>
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className="w-full justify-start gap-3 px-4 py-3 h-auto"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                <span>Switch to {isDark ? 'light' : 'dark'} mode</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}