'use client';

import { useState } from 'react';
import { Trophy, Users, DollarSign, Sparkles } from 'lucide-react';

interface CategoryWheelProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export default function CategoryWheel({ selectedCategory, onCategorySelect }: CategoryWheelProps) {
  const categories = [
    { id: 'tournament', label: 'Tournament', icon: Trophy, color: 'bg-green-700' },
    { id: 'team', label: 'Team', icon: Users, color: 'bg-green-600' },
    { id: 'betting', label: 'Betting', icon: DollarSign, color: 'bg-green-800' },
    { id: 'casual', label: 'Casual', icon: Sparkles, color: 'bg-green-500' },
  ];

  const handleCategoryClick = (category: string) => {
    onCategorySelect(selectedCategory === category ? null : category);
  };

  return (
    <div className="relative w-72 h-72 mx-auto">
      {/* Center button */}
      <button
        onClick={() => onCategorySelect(null)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-24 h-24 bg-white rounded-full shadow-xl border-3 border-green-800 flex items-center justify-center hover:scale-105 transition-transform"
      >
        <span className="text-sm font-bold text-green-800">ALL</span>
      </button>

      {/* Category buttons positioned around center */}
      {categories.map((category, index) => {
        const Icon = category.icon;
        const angle = (360 / categories.length) * index - 90; // Start from top
        const radius = 100; // Distance from center
        const x = Math.cos(angle * Math.PI / 180) * radius;
        const y = Math.sin(angle * Math.PI / 180) * radius;
        const isSelected = selectedCategory === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`absolute w-20 h-20 rounded-full shadow-lg transition-all duration-300 ${
              isSelected 
                ? 'scale-110 z-10' 
                : 'hover:scale-105 z-5'
            }`}
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <div 
              className={`w-full h-full rounded-full flex flex-col items-center justify-center ${
                isSelected 
                  ? category.color + ' text-white border-3 border-green-900' 
                  : 'bg-white text-green-800 border-2 border-gray-300 hover:border-green-600'
              } transition-all duration-300`}
            >
              <Icon 
                size={24} 
                className={isSelected ? 'text-white' : 'text-green-800'} 
              />
              <span className={`text-xs font-semibold mt-1 ${
                isSelected ? 'text-white' : 'text-green-800'
              }`}>
                {category.label}
              </span>
            </div>
          </button>
        );
      })}

      {/* Selection indicator */}
      {selectedCategory && (
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-sm font-semibold text-green-800 bg-white px-4 py-2 rounded-full shadow-md">
            {categories.find(c => c.id === selectedCategory)?.label} Formats
          </p>
        </div>
      )}
    </div>
  );
}