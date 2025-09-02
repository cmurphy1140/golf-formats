'use client';

import { GolfAnimationData } from '@/types/golf-animation';
import { Users, Target, Trophy, Flag } from 'lucide-react';

interface FormatSelectorProps {
  currentFormat: GolfAnimationData['format'];
  onFormatChange: (format: GolfAnimationData['format']) => void;
}

const formats = [
  {
    id: 'scramble' as const,
    name: 'Scramble',
    icon: Users,
    description: 'All players tee off, play from best ball',
    color: 'bg-masters-pine'
  },
  {
    id: 'best-ball' as const,
    name: 'Best Ball',
    icon: Flag,
    description: 'Players play own ball, best score counts',
    color: 'bg-masters-gold'
  },
  {
    id: 'stableford' as const,
    name: 'Stableford',
    icon: Target,
    description: 'Point-based scoring system',
    color: 'bg-masters-charcoal'
  },
  {
    id: 'match-play' as const,
    name: 'Match Play',
    icon: Trophy,
    description: 'Hole-by-hole competition',
    color: 'bg-masters-slate'
  }
];

export default function FormatSelector({ currentFormat, onFormatChange }: FormatSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-masters-pine/10 p-4">
      <h3 className="text-lg font-semibold text-masters-charcoal mb-3">
        Select Format to Demonstrate
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {formats.map(format => {
          const Icon = format.icon;
          const isSelected = currentFormat === format.id;
          
          return (
            <button
              key={format.id}
              onClick={() => onFormatChange(format.id)}
              className={`relative p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-masters-pine bg-masters-pine/5'
                  : 'border-masters-stone/30 hover:border-masters-pine/50 bg-white'
              }`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                isSelected ? format.color : 'bg-masters-sand/20'
              }`}>
                <Icon size={24} className={isSelected ? 'text-white' : 'text-masters-slate'} />
              </div>
              
              {/* Name */}
              <h4 className={`text-sm font-semibold mb-1 ${
                isSelected ? 'text-masters-pine' : 'text-masters-charcoal'
              }`}>
                {format.name}
              </h4>
              
              {/* Description */}
              <p className="text-xs text-masters-slate line-clamp-2">
                {format.description}
              </p>
              
              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-masters-pine rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}