'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Home, 
  Grid, 
  Trophy, 
  Search, 
  Menu, 
  X,
  GitCompare,
  Heart,
  Settings,
  ClipboardList
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFormatStore } from '@/src/store';
import SearchBar from '@/components/search-bar';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { comparisonFormats, favoriteFormats } = useFormatStore();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/formats', label: 'All Formats', icon: Grid },
    { href: '/scorecard', label: 'Scorecard', icon: ClipboardList },
    { href: '/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <header className="sticky top-0 z-50 glass-masters border-b border-masters-stone/20 px-safe">
      <div className="container-masters">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-masters-pine rounded flex items-center justify-center shadow-medium group-hover:shadow-large transition-all duration-300">
              <Trophy className="w-6 h-6 md:w-7 md:h-7 text-masters-cream" />
            </div>
            <div className="hidden xs:block">
              <h1 className="text-lg md:text-h3 font-serif font-medium text-masters-pine tracking-tight">
                Golf Formats
              </h1>
              <p className="text-tiny text-masters-slate -mt-1 tracking-wide uppercase hidden md:block">
                Masters Edition
              </p>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <SearchBar 
              placeholder="Search the tradition..." 
              className="w-full"
              showSuggestions={true}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || 
                (item.href === '/formats' && pathname.startsWith('/formats'));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-3 px-6 py-3 transition-all duration-300 font-medium text-sm hover-lift ${
                    isActive
                      ? 'text-masters-pine bg-masters-pine/5 border-b-2 border-masters-pine'
                      : 'text-masters-slate hover:text-masters-pine hover:bg-masters-sand/50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <Badge className="badge-masters bg-masters-pine/10 text-masters-pine h-6 min-w-6 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden text-masters-slate hover:text-masters-pine hover:bg-masters-sand/50 focus-masters"
            >
              <Search size={20} />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-masters-slate hover:text-masters-pine hover:bg-masters-sand/50 focus-masters"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden py-6 border-t border-masters-stone/20 animate-fade-in">
            <SearchBar 
              placeholder="Search the tradition..." 
              className="w-full"
              showSuggestions={true}
            />
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-masters-stone/20 animate-fade-in">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || 
                  (item.href === '/formats' && pathname.startsWith('/formats'));
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 transition-all duration-300 font-medium text-base ${
                      isActive
                        ? 'text-masters-pine bg-masters-pine/5 border-l-3 border-masters-pine'
                        : 'text-masters-slate hover:text-masters-pine hover:bg-masters-sand/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 && (
                      <Badge className="badge-masters bg-masters-pine/10 text-masters-pine">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
            
            <div className="border-t border-masters-stone/20 mt-6 pt-6">
              <SearchBar 
                placeholder="Search the tradition..." 
                className="w-full"
                showSuggestions={false}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}