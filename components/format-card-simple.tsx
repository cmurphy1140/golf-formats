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
    // All categories use the same dark green theme for consistency
    return 'bg-green-50 text-green-800 border-green-200';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 2) return 'Easy';
    if (difficulty <= 3) return 'Moderate';
    if (difficulty <= 4) return 'Challenging';
    return 'Expert';
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'text-green-700';
    if (difficulty <= 3) return 'text-green-800';
    if (difficulty <= 4) return 'text-green-900';
    return 'text-gray-900';
  };

  // Get quick rules for preview
  const getQuickRules = () => {
    const rules = [];
    if (format.scoring) rules.push(`Scoring: ${format.scoring.split('.')[0]}`);
    if (format.players) rules.push(`Players: ${format.players.min}-${format.players.max}`);
    if (format.duration) rules.push(`Duration: ${format.duration}`);
    return rules.slice(0, 3); // Show max 3 rules
  };

  return (
    <Link href={`/formats/${format.id}`}>
      <div 
        className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getCategoryColor(format.category)}`}>
            {format.category.toUpperCase()}
          </span>
          {format.popularity >= 80 && (
            <Trophy size={16} className="text-yellow-500" />
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-800 transition-colors">
          {format.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {format.description}
        </p>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{format.players.min}-{format.players.max}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{format.duration}</span>
          </div>
          <span className={`font-medium ${getDifficultyColor(format.difficulty)}`}>
            {getDifficultyLabel(format.difficulty)}
          </span>
        </div>

        {/* View Details Link */}
        <div className="flex items-center text-sm font-medium text-green-800 group-hover:text-green-900">
          <span>Learn more</span>
          <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Hover Preview - Quick Rules */}
        {isHovered && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-green-900 to-green-800 text-white p-4 transform transition-transform duration-300 animate-slide-up">
            <div className="text-xs font-semibold mb-2 text-amber-100">Quick Rules:</div>
            <div className="space-y-1">
              {getQuickRules().map((rule, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-2 text-xs animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle size={12} className="text-amber-200 mt-0.5 flex-shrink-0" />
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