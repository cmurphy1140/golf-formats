'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { 
  Users, 
  Clock,
  Trophy,
  ChevronRight
} from 'lucide-react';
import { GolfFormat } from '@/types/golf';

interface FormatCardSimpleProps {
  format: GolfFormat;
}

export default function FormatCardSimple({ format }: FormatCardSimpleProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const getCategoryColor = (category: string) => {
    // All categories use the same Masters theme for consistency
    return 'bg-masters-pine/10 text-masters-pine border-masters-pine/20';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 2) return 'Easy';
    if (difficulty <= 3) return 'Moderate';
    if (difficulty <= 4) return 'Challenging';
    return 'Expert';
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'text-masters-fairway';
    if (difficulty <= 3) return 'text-masters-pine';
    if (difficulty <= 4) return 'text-masters-charcoal';
    return 'text-masters-charcoal';
  };


  return (
    <Link href={`/formats/${format.id}`}>
      <div 
        ref={cardRef}
        className="group glass-card rounded-lg p-4 md:p-6 cursor-pointer h-full relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-masters-pine/20 transition-all duration-300 hover:shadow-lg"
        data-format-card
        tabIndex={0}
        role="article"
        aria-label={`${format.name} - ${format.category} format`}
      >
        {/* Category Badge with animation */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${getCategoryColor(format.category)}`}>
            {format.category.toUpperCase()}
          </span>
          {format.popularity >= 80 && (
            <Trophy size={16} className="text-yellow-500 animate-pulse" />
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-base md:text-lg font-semibold text-masters-charcoal mb-2 group-hover:text-masters-pine transition-colors">
          {format.name}
        </h3>
        <p className="text-sm text-masters-slate mb-3 md:mb-4 line-clamp-2">
          {format.description}
        </p>

        {/* Quick Stats with hover effects */}
        <div className="flex items-center gap-4 text-xs text-masters-slate/70 mb-4">
          <div className="flex items-center gap-1 text-masters-slate/70">
            <Users size={14} />
            <span>{format.players.min}-{format.players.max}</span>
          </div>
          <div className="flex items-center gap-1 text-masters-slate/70">
            <Clock size={14} />
            <span>{format.duration}</span>
          </div>
          <span className={`font-medium ${getDifficultyColor(format.difficulty)} px-2 py-0.5 rounded-full bg-masters-pine/5`}>
            {getDifficultyLabel(format.difficulty)}
          </span>
        </div>

        {/* View Details Link with enhanced animation */}
        <div className="flex items-center text-sm font-medium text-masters-pine group-hover:text-masters-pine/90">
          <span className="relative">
            Learn more
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-masters-pine transition-all duration-300 group-hover:w-full"></span>
          </span>
          <ChevronRight size={16} className="ml-1 group-hover:translate-x-2 transition-transform duration-300" />
        </div>

      </div>
    </Link>
  );
}