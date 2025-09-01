'use client';

import { useState } from 'react';
import { Trophy, Users, DollarSign, Sparkles } from 'lucide-react';

interface CategoryWheelProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export default function CategoryWheel({ selectedCategory, onCategorySelect }: CategoryWheelProps) {
  const [rotation, setRotation] = useState(0);
  
  const categories = [
    { id: 'tournament', label: 'Tournament', icon: Trophy, color: 'from-green-700 to-green-600' },
    { id: 'team', label: 'Team', icon: Users, color: 'from-green-600 to-green-500' },
    { id: 'betting', label: 'Betting', icon: DollarSign, color: 'from-green-800 to-green-700' },
    { id: 'casual', label: 'Casual', icon: Sparkles, color: 'from-green-500 to-green-400' },
  ];

  const handleCategoryClick = (category: string, index: number) => {
    const newRotation = -90 * index;
    setRotation(newRotation);
    onCategorySelect(selectedCategory === category ? null : category);
  };

  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Center button */}
      <button
        onClick={() => {
          setRotation(0);
          onCategorySelect(null);
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 bg-white rounded-full shadow-lg border-2 border-green-800 flex items-center justify-center hover:scale-110 transition-transform"
      >
        <span className="text-xs font-bold text-green-800">ALL</span>
      </button>

      {/* Rotating wheel */}
      <div 
        className="absolute inset-0 transition-transform duration-500 ease-in-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {categories.map((category, index) => {
          const Icon = category.icon;
          const angle = (360 / categories.length) * index;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id, index)}
              className={`absolute w-16 h-16 rounded-full shadow-lg transition-all duration-300 ${
                isSelected 
                  ? 'scale-125 z-20' 
                  : 'hover:scale-110 z-10'
              }`}
              style={{
                background: isSelected 
                  ? `linear-gradient(135deg, ${category.color.split(' ').join(', ')})`
                  : 'white',
                border: isSelected ? '3px solid #166534' : '2px solid #d1d5db',
                transform: `rotate(${angle}deg) translateX(90px) rotate(-${angle - rotation}deg)`,
                transformOrigin: 'center',
              }}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <Icon 
                  size={20} 
                  className={isSelected ? 'text-white' : 'text-green-800'} 
                />
                <span className={`text-xs font-medium mt-1 ${
                  isSelected ? 'text-white' : 'text-green-800'
                }`}>
                  {category.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selection indicator */}
      {selectedCategory && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-sm font-medium text-green-800">
            {categories.find(c => c.id === selectedCategory)?.label} Formats Selected
          </p>
        </div>
      )}
    </div>
  );
}