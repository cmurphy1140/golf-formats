'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, 
  Clock, 
  Trophy,
  Target,
  Star,
  Heart,
  Info,
  CheckCircle,
  Circle,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';
import { GolfFormat } from '@/types/golf';

interface FormatCardEnhancedProps {
  format: GolfFormat;
  onFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

export default function FormatCardEnhanced({ format, onFavorite, isFavorite = false }: FormatCardEnhancedProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Generate a comprehensive summary
  const getSummary = () => {
    const summaries: Record<string, string> = {
      'stroke-play': 'The purest test of golf skill where every shot matters equally. Players complete all 18 holes, counting every stroke taken including penalties. This traditional format rewards consistency and mental toughness throughout the entire round. Perfect for handicap tracking and tournament play, stroke play reveals true playing ability without the safety net of picking up on bad holes.',
      'match-play': 'Experience golf as a strategic duel where each hole is a separate battle to be won or lost. Players compete head-to-head, with the winner determined by holes won rather than total strokes. Bad holes can be forgotten immediately, allowing for aggressive play and comebacks. The psychological element is huge as you directly face your opponent, making every putt count in real-time competition.',
      'scramble': 'The ultimate team bonding format where everyone contributes to success. All players tee off, then the team selects the best shot and everyone plays from there, continuing until holed out. This format minimizes individual pressure while maximizing fun and camaraderie. Beginners love it because they can contribute without slowing play, while skilled players enjoy the low scoring opportunities.',
      'best-ball': 'Combines individual play with team strategy in perfect balance. Each player plays their own ball throughout the hole, but only the best score among teammates counts. This format maintains the integrity of individual golf while providing team support and reducing pressure. Players can take risks knowing their partner provides backup, creating exciting scoring opportunities.',
      'alternate-shot': 'The ultimate test of partnership and trust in golf. Partners alternate hitting the same ball, including tee shots on alternating holes, requiring complete coordination and communication. This format builds true teamwork as players must deal with their partner\'s misses and set up shots for each other. The pressure is intense but the shared experience creates lasting bonds.',
      'stableford': 'A refreshing scoring system that rewards aggressive play and minimizes disaster holes. Players earn points based on their score relative to par, with higher points for better scores. Unlike stroke play, a bad hole won\'t ruin your round since you can simply pick up and move on. This format encourages attacking pins and taking calculated risks for birdie opportunities.',
      'skins': 'High-stakes excitement where every hole offers a new opportunity to win. Each hole has a value (skin) that goes to the player with the lowest score, but ties carry the value forward creating bigger pots. The drama builds throughout the round as carryovers accumulate. One great hole can win multiple skins, keeping everyone engaged until the final putt.',
      'nassau': 'Three competitions in one round providing multiple chances for victory. The front nine, back nine, and overall 18 holes are separate bets, allowing players to recover from a poor start. Automatic presses can double the action when someone falls behind. This classic format is perfect for regular games as it balances competition with social play.',
      'wolf': 'A rotating captain format that combines strategy, partnerships, and individual play. The designated "Wolf" for each hole chooses a partner after watching tee shots or goes alone for double points. Decision-making is crucial as the Wolf must instantly assess each shot. The format naturally balances different skill levels and creates dynamic team combinations throughout the round.',
      'bingo-bango-bongo': 'A fun, fast-paced game that levels the playing field between different skill levels. Points are awarded for being first on the green, closest to the pin once all are on, and first in the hole. This format rewards smart strategy over pure ball-striking ability. Short hitters can compete by laying up for "bingo" points while long hitters might struggle with putting order.'
    };

    return summaries[format.id] || format.description;
  };

  // Key highlights for quick reference
  const getKeyPoints = () => {
    const keyPoints: Record<string, string[]> = {
      'stroke-play': [
        'Every stroke counts',
        'Complete all 18 holes',
        'Best for handicaps',
        'Mental endurance test'
      ],
      'match-play': [
        'Hole-by-hole competition',
        'Direct opponent battle',
        'Can concede putts',
        'Forget bad holes quickly'
      ],
      'scramble': [
        'Use best team shot',
        'Great for beginners',
        'Fast pace of play',
        'Low scoring potential'
      ],
      'best-ball': [
        'Play own ball',
        'Best score counts',
        'Individual integrity',
        'Team backup support'
      ],
      'alternate-shot': [
        'Share same ball',
        'True partnership',
        'Alternating tee shots',
        'High pressure format'
      ],
      'stableford': [
        'Points not strokes',
        'Reward good holes',
        'Pick up when struggling',
        'Aggressive play rewarded'
      ],
      'skins': [
        'Win individual holes',
        'Carryover potential',
        'High drama format',
        'Every hole matters'
      ],
      'nassau': [
        'Three separate bets',
        'Front/Back/Total',
        'Press opportunities',
        'Traditional format'
      ],
      'wolf': [
        'Rotating captain',
        'Choose partners',
        'Go alone option',
        'Strategic decisions'
      ],
      'bingo-bango-bongo': [
        'Three points per hole',
        'Rewards positioning',
        'Levels skill gaps',
        'Order matters'
      ]
    };

    return keyPoints[format.id] || [];
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'text-green-600 bg-green-50';
    if (difficulty <= 3) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 2) return 'Easy';
    if (difficulty <= 3) return 'Moderate';
    if (difficulty <= 4) return 'Challenging';
    return 'Expert';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Card Header */}
      <div className="relative p-6 pb-0">
        {/* Category & Favorite */}
        <div className="flex justify-between items-start mb-4">
          <span className={`badge-masters badge-${format.category}`}>
            {format.category}
          </span>
          <button
            onClick={() => onFavorite?.(format.id)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>

        {/* Title & Quick Stats */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-masters-pine transition-colors">
          {format.name}
        </h3>

        {/* Quick Stats Bar */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{format.players.min}-{format.players.max}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{format.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4" />
            <span className="capitalize">{format.type}</span>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(format.difficulty)}`}>
            {getDifficultyLabel(format.difficulty)} Difficulty
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${
                  i < format.popularity 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-6 pb-6">
        {/* Summary Section */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
            {getSummary()}
          </p>
        </div>

        {/* Key Points Sidebar */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-masters-pine" />
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Quick Highlights
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {getKeyPoints().map((point, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-gray-600">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scoring Method */}
        <div className="bg-masters-sand/30 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-masters-pine" />
            <span className="text-xs font-semibold text-gray-700">Scoring Method</span>
          </div>
          <p className="text-xs text-gray-600">{format.scoring.method}</p>
        </div>

        {/* Best For Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-masters-pine" />
            <span className="text-xs font-semibold text-gray-700">Best For</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {format.skillLevel.map(level => (
              <span key={level} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full capitalize">
                {level}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link 
            href={`/formats/${format.id}`}
            className="flex-1 btn-masters-primary text-sm py-2 text-center rounded-lg"
          >
            View Details
          </Link>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Info className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Expandable Details */}
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-1">Top Rules</h4>
                <ul className="space-y-1">
                  {format.rules.slice(0, 3).map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Circle className="w-2 h-2 text-gray-400 mt-1 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-1">Pro Tips</h4>
                <ul className="space-y-1">
                  {format.tips?.slice(0, 2).map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <TrendingUp className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}