'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Trophy,
  Users,
  DollarSign,
  Target,
  Sparkles,
  ChevronDown,
  Clock,
  Star,
  Zap,
  Heart
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  count: number;
  popular?: string[];
}

export default function MegaDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
    {
      id: 'tournament',
      name: 'Tournament',
      description: 'Competitive formats for serious play',
      icon: <Trophy size={20} />,
      color: 'text-masters-pine',
      count: 8,
      popular: ['Stroke Play', 'Match Play', 'Stableford']
    },
    {
      id: 'casual',
      name: 'Casual',
      description: 'Fun formats for recreational rounds',
      icon: <Heart size={20} />,
      color: 'text-masters-fairway',
      count: 6,
      popular: ['Scramble', 'Best Ball', 'Alternate Shot']
    },
    {
      id: 'betting',
      name: 'Betting',
      description: 'Wagering games to add excitement',
      icon: <DollarSign size={20} />,
      color: 'text-masters-gold',
      count: 4,
      popular: ['Nassau', 'Skins', 'Wolf']
    },
    {
      id: 'team',
      name: 'Team',
      description: 'Partner and group formats',
      icon: <Users size={20} />,
      color: 'text-masters-azalea',
      count: 5,
      popular: ['Four-Ball', 'Foursomes', 'Ryder Cup']
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          isOpen 
            ? 'bg-masters-pine text-white' 
            : 'text-masters-slate hover:text-masters-pine hover:bg-masters-sand/50'
        }`}
      >
        <span>Browse Formats</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div className={`mega-dropdown ${isOpen ? 'active' : ''} absolute top-full left-0 mt-2 w-[600px] glass-card rounded-xl p-6 z-50`}>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/formats?category=${category.id}`}
              className="group p-4 rounded-lg hover:bg-masters-pine/5 transition-all duration-300 scroll-reveal"
              style={{"--scroll-delay": `${index * 50}ms`} as React.CSSProperties}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-masters-pine/10 ${category.color} group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-masters-charcoal group-hover:text-masters-pine transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-xs text-masters-slate bg-masters-sand/50 px-2 py-1 rounded-full">
                      {category.count} formats
                    </span>
                  </div>
                  <p className="text-xs text-masters-slate mb-2">
                    {category.description}
                  </p>
                  {category.popular && (
                    <div className="flex flex-wrap gap-1">
                      {category.popular.map(format => (
                        <span 
                          key={format}
                          className="text-xs px-2 py-0.5 bg-white rounded-full text-masters-slate border border-masters-stone/20"
                        >
                          {format}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-masters-stone/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/formats"
                className="text-sm font-medium text-masters-pine hover:text-masters-fairway transition-colors flex items-center gap-1"
                onClick={() => setIsOpen(false)}
              >
                <Sparkles size={14} />
                View All Formats
              </Link>
              <Link 
                href="/scorecard"
                className="text-sm font-medium text-masters-slate hover:text-masters-pine transition-colors flex items-center gap-1"
                onClick={() => setIsOpen(false)}
              >
                <Target size={14} />
                Start Scorecard
              </Link>
            </div>
            <div className="flex items-center gap-2 text-xs text-masters-slate">
              <Clock size={12} />
              <span>Recently updated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}