'use client';

import Link from 'next/link';
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

  return (
    <Link href={`/formats/${format.id}`}>
      <div className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full">
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
      </div>
    </Link>
  );
}