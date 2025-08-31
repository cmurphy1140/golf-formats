import Link from 'next/link';
import { Clock, Users, Trophy, TrendingUp, ArrowRight, Heart, Star } from 'lucide-react';
import { GolfFormat } from '@/types/golf';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPlayerCount, getDifficultyLabel, getDifficultyColor, getCategoryColor } from '@/src/lib/utils';
import { useFormatStore } from '@/src/store';

interface FormatCardProps {
  format: GolfFormat;
}

export default function FormatCard({ format }: FormatCardProps) {
  const { favoriteFormats, toggleFavorite } = useFormatStore();
  const isFavorite = favoriteFormats.includes(format.id);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(format.id);
  };

  return (
    <Card className="group relative h-full overflow-hidden hover:-translate-y-2 transition-all duration-500">
      {/* Gradient header */}
      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${getCategoryColor(format.category)}`} />
      
      {/* Favorite button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
        onClick={handleFavoriteClick}
      >
        <Heart 
          size={16} 
          className={`transition-all ${isFavorite 
            ? 'fill-red-500 text-red-500' 
            : 'text-gray-400 hover:text-red-500'
          }`} 
        />
      </Button>
      
      <Link href={`/formats/${format.id}`} className="block p-6 h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors leading-tight">
              {format.name}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className="capitalize">
              {format.category}
            </Badge>
            {format.popularity >= 80 && (
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={12} fill="currentColor" />
                <span className="text-xs font-medium">Popular</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2 text-sm leading-relaxed">
          {format.description}
        </p>
        
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Users size={16} className="flex-shrink-0" />
            <span className="text-sm truncate">
              {formatPlayerCount(format.players)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Clock size={16} className="flex-shrink-0" />
            <span className="text-sm truncate">{format.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Trophy size={16} className="flex-shrink-0" />
            <span className="text-sm capitalize truncate">{format.type}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <TrendingUp size={16} className="flex-shrink-0" />
            <span className="text-sm truncate">
              {getDifficultyLabel(format.difficulty)}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
          <div className="flex flex-wrap gap-1">
            <Badge 
              variant="secondary" 
              size="sm"
              className={getDifficultyColor(format.difficulty)}
            >
              Level {format.difficulty}
            </Badge>
            {format.skillLevel.length < 3 && (
              <Badge variant="outline" size="sm">
                {format.skillLevel[0]}
              </Badge>
            )}
          </div>
          <ArrowRight 
            size={18} 
            className="text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 group-hover:translate-x-1 transition-all" 
          />
        </div>
      </Link>
    </Card>
  );
}