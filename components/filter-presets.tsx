'use client';

import { useFilters } from '@/src/hooks/use-filters';
import { Zap, Users, Trophy, Clock, Sparkles } from 'lucide-react';

export default function FilterPresets() {
  const { setFilter, clearFilters } = useFilters();

  const presets = [
    {
      id: 'beginner',
      label: 'Beginner Friendly',
      icon: Sparkles,
      filters: {
        difficulty: ['easy'],
        paceOfPlay: ['fast', 'normal'],
        handicapFriendly: ['yes']
      }
    },
    {
      id: 'quick',
      label: 'Quick Games',
      icon: Clock,
      filters: {
        paceOfPlay: ['fast'],
        duration: [60, 180] // 1-3 hours
      }
    },
    {
      id: 'tournament',
      label: 'Tournament Ready',
      icon: Trophy,
      filters: {
        category: ['tournament'],
        difficulty: ['medium', 'hard']
      }
    },
    {
      id: 'large-group',
      label: 'Large Groups',
      icon: Users,
      filters: {
        players: [8, 20],
        category: ['team', 'casual']
      }
    }
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    clearFilters();
    Object.entries(preset.filters).forEach(([key, value]) => {
      setFilter(key as any, value as any);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-masters-pine/10 p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Zap size={18} className="text-masters-pine" />
        <h3 className="font-semibold text-masters-charcoal text-sm">Quick Filters</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {presets.map((preset) => {
          const Icon = preset.icon;
          return (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className="flex items-center gap-2 px-3 py-2 bg-masters-sand/20 hover:bg-masters-sand/40 rounded-lg transition-all text-left group"
            >
              <Icon size={16} className="text-masters-pine group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-masters-charcoal">
                {preset.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}