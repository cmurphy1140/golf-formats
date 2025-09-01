'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  Users, 
  Clock,
  Trophy,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import { GolfFormat } from '@/types/golf';

interface FormatCardSimpleProps {
  format: GolfFormat;
}

export default function FormatCardSimple({ format }: FormatCardSimpleProps) {
  const [isHovered, setIsHovered] = useState(false);
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

  // Get quick rules for preview
  const getQuickRules = () => {
    const rules = [];
    if (format.scoring) {
      const scoringText = typeof format.scoring === 'string' 
        ? format.scoring.split('.')[0]
        : format.scoring.method;
      rules.push(`Scoring: ${scoringText}`);
    }
    if (format.players) rules.push(`Players: ${format.players.min}-${format.players.max}`);
    if (format.duration) rules.push(`Duration: ${format.duration}`);
    return rules.slice(0, 3); // Show max 3 rules
  };

  return (
    <Link href={`/formats/${format.id}`}>
      <div 
        className="group bg-white rounded-lg border-2 border-masters-pine/10 p-4 md:p-6 hover:border-masters-pine/30 hover:shadow-xl md:hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-masters-pine/30 focus:border-masters-pine active:scale-[0.98] touch-manipulation"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-format-card
        tabIndex={0}
        role="article"
        aria-label={`${format.name} - ${format.category} format`}
      >
        {/* Category Badge with animation */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${getCategoryColor(format.category)} transform transition-transform group-hover:scale-105`}>
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
          <div className="flex items-center gap-1 group-hover:text-masters-pine transition-colors">
            <Users size={14} className="group-hover:scale-110 transition-transform" />
            <span>{format.players.min}-{format.players.max}</span>
          </div>
          <div className="flex items-center gap-1 group-hover:text-masters-pine transition-colors">
            <Clock size={14} className="group-hover:scale-110 transition-transform" />
            <span>{format.duration}</span>
          </div>
          <span className={`font-medium ${getDifficultyColor(format.difficulty)} px-2 py-0.5 rounded-full bg-masters-pine/5 group-hover:bg-masters-pine/10 transition-colors`}>
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

        {/* Hover Preview - Quick Rules */}
        {isHovered && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-masters-pine to-masters-fairway text-white p-4 transform transition-transform duration-300 animate-slide-up">
            <div className="text-xs font-semibold mb-2 text-masters-gold">Quick Rules:</div>
            <div className="space-y-1">
              {getQuickRules().map((rule, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-2 text-xs animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle size={12} className="text-masters-gold mt-0.5 flex-shrink-0" />
                  <span className="text-white/90">{rule}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}