'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  Flag,
  Wind,
  Trophy,
  Info,
  Circle
} from 'lucide-react';

interface Player {
  id: string;
  name: string;
  color: string;
  team: 'A' | 'B';
  ballPosition?: { x: number; y: number };
}

interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  activePlayers?: string[];
  showTrajectories?: boolean;
  ballPositions?: { [key: string]: { x: number; y: number } };
}

// Professional color palette
const COLORS = {
  course: {
    rough: '#2C4A2C',        // Dark green for rough
    fairway: '#4A7C4E',      // Medium green for fairway  
    green: '#7FB069',        // Light green for putting green
    teeBox: '#3D5A3D',       // Tee box color
    bunker: '#E8D4A0',       // Sand bunker color
    water: '#4A90A4',        // Water hazard color
    cartPath: '#9B9B9B'      // Cart path gray
  },
  ui: {
    background: '#F8F9FA',
    text: '#2C3E50',
    subtext: '#6C757D',
    border: '#DEE2E6',
    teamA: '#1E3A8A',        // Deep blue
    teamB: '#7C2D12'         // Deep brown
  }
};

export default function BestBallDemoProfessional() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Slide data for the presentation
  const slides: SlideData[] = [
    {
      title: "Tee Shots",
      subtitle: "All players drive",
      description: "Each player hits their tee shot. Teams will select the best positioned ball for their next shot.",
      ballPositions: {
        'A1': { x: 35, y: 65 },
        'A2': { x: 38, y: 60 },
        'B1': { x: 42, y: 62 },
        'B2': { x: 36, y: 58 }
      },
      showTrajectories: true
    },
    {
      title: "Best Ball Selection",
      subtitle: "Teams choose optimal position",
      description: "Team A selects Player 1's ball (265 yards, fairway). Team B selects Player 1's ball (271 yards, fairway).",
      activePlayers: ['A1', 'B1'],
      ballPositions: {
        'A1': { x: 35, y: 65 },
        'B1': { x: 42, y: 62 }
      }
    },
    {
      title: "Approach Shots",
      subtitle: "Second shots to green",
      description: "Both team members play from their team's selected position to reach the green.",
      ballPositions: {
        'A1': { x: 50, y: 18 },
        'A2': { x: 48, y: 22 },
        'B1': { x: 52, y: 19 },
        'B2': { x: 46, y: 25 }
      },
      showTrajectories: true
    },
    {
      title: "On the Green",
      subtitle: "Putting for score",
      description: "Players putt out. Each team uses their best score for the hole.",
      ballPositions: {
        'A1': { x: 50, y: 18 },
        'A2': { x: 48, y: 22 },
        'B1': { x: 52, y: 19 },
        'B2': { x: 46, y: 25 }
      }
    },
    {
      title: "Hole Complete",
      subtitle: "Scores recorded",
      description: "Team A: 4 (Par) • Team B: 4 (Par) • Match remains all square",
      ballPositions: {}
    }
  ];

  const currentSlideData = slides[currentSlide];

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && currentSlide < slides.length - 1) {
      const timer = setTimeout(() => {
        setCurrentSlide(prev => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    } else if (isPlaying && currentSlide === slides.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentSlide, slides.length]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const reset = () => {
    setCurrentSlide(0);
    setIsPlaying(false);
  };

  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-normal tracking-wide text-white">Best Ball Interactive Tutorial</h3>
            <p className="text-sm text-gray-200 mt-1">Professional golf format demonstration</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 backdrop-blur"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2 backdrop-blur"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-1">
          {slides.map((_, index) => (
            <div
              key={index}
              className="h-1 flex-1 rounded-full transition-all duration-500"
              style={{
                backgroundColor: index <= currentSlide ? '#10B981' : 'rgba(255,255,255,0.2)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Golf Course Visualization */}
          <div className="relative">
            {/* Hole Info Bar */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Flag size={18} className="text-red-600" />
                  <span className="font-medium text-gray-800">Hole 3</span>
                </div>
                <span className="text-gray-600">Par 5</span>
                <span className="text-gray-600">540 yards</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Wind size={14} />
                <span>14 mph</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Course Layout */}
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-inner" 
                 style={{ backgroundColor: COLORS.course.rough }}>
              
              {/* Fairway */}
              <svg className="absolute inset-0 w-full h-full">
                {/* Main fairway */}
                <path
                  d="M 80 480 Q 100 400 120 320 T 160 180 Q 180 120 200 60"
                  fill="none"
                  stroke={COLORS.course.fairway}
                  strokeWidth="80"
                  strokeLinecap="round"
                />
                
                {/* Fairway widening near green */}
                <ellipse
                  cx="200"
                  cy="80"
                  rx="100"
                  ry="60"
                  fill={COLORS.course.fairway}
                />
              </svg>

              {/* Hazards */}
              {/* Large Sand Trap - Middle Left */}
              <div 
                className="absolute"
                style={{
                  left: '8%',
                  top: '45%',
                  width: '120px',
                  height: '80px',
                }}
              >
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: COLORS.course.bunker,
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                  }}
                />
                {/* Sand texture dots */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 rounded-full"
                        style={{ 
                          backgroundColor: '#D4A574',
                          opacity: 0.5 
                        }}
                      />
                    ))}
                  </div>
                </div>
                {/* Rake lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 10 30 Q 50 35 90 30"
                    stroke="#C19A6B"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.3"
                  />
                  <path
                    d="M 15 40 Q 55 45 95 40"
                    stroke="#C19A6B"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.3"
                  />
                  <path
                    d="M 10 50 Q 50 55 90 50"
                    stroke="#C19A6B"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.3"
                  />
                </svg>
              </div>

              {/* Golf Cart Path - Middle Right */}
              <div 
                className="absolute"
                style={{
                  right: '10%',
                  top: '40%',
                  width: '100px',
                  height: '100px',
                }}
              >
                {/* Cart Path */}
                <div 
                  className="absolute"
                  style={{
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '8px',
                    backgroundColor: COLORS.course.cartPath,
                    transform: 'rotate(-15deg)',
                    transformOrigin: 'center',
                  }}
                />
                {/* Golf Cart Icon */}
                <div 
                  className="absolute flex items-center justify-center"
                  style={{
                    top: '20px',
                    left: '35px',
                    width: '30px',
                    height: '25px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    border: '2px solid #666',
                  }}
                >
                  <svg width="20" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="8" width="16" height="8" stroke="#666" strokeWidth="1.5" rx="2"/>
                    <rect x="18" y="10" width="4" height="4" stroke="#666" strokeWidth="1.5"/>
                    <circle cx="6" cy="18" r="2" fill="#666"/>
                    <circle cx="14" cy="18" r="2" fill="#666"/>
                    <path d="M8 8L10 4H14L16 8" stroke="#666" strokeWidth="1.5"/>
                  </svg>
                </div>
                {/* 150 Yard Marker */}
                <div 
                  className="absolute flex items-center justify-center"
                  style={{
                    bottom: '10px',
                    right: '10px',
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    border: '3px solid ' + COLORS.course.fairway,
                    fontWeight: 'bold',
                    fontSize: '12px',
                    color: COLORS.course.fairway,
                  }}
                >
                  150
                </div>
              </div>
              
              {/* Water hazard */}
              <div 
                className="absolute rounded-full"
                style={{
                  left: '55%',
                  top: '40%',
                  width: '80px',
                  height: '100px',
                  backgroundColor: COLORS.course.water,
                  transform: 'rotate(-20deg)'
                }}
              />
              
              {/* Smaller Bunkers */}
              <div 
                className="absolute rounded-full"
                style={{
                  left: '35%',
                  top: '25%',
                  width: '35px',
                  height: '30px',
                  backgroundColor: COLORS.course.bunker
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  left: '45%',
                  top: '15%',
                  width: '30px',
                  height: '25px',
                  backgroundColor: COLORS.course.bunker
                }}
              />
              <div 
                className="absolute rounded-full"
                style={{
                  left: '55%',
                  top: '18%',
                  width: '35px',
                  height: '30px',
                  backgroundColor: COLORS.course.bunker
                }}
              />

              {/* Tee Box */}
              <div 
                className="absolute rounded"
                style={{
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '30px',
                  backgroundColor: COLORS.course.teeBox
                }}
              >
                <div className="text-white text-xs font-medium text-center mt-2">TEE</div>
              </div>

              {/* Green */}
              <div 
                className="absolute rounded-full flex items-center justify-center"
                style={{
                  top: '40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '120px',
                  height: '100px',
                  backgroundColor: COLORS.course.green
                }}
              >
                <Flag size={24} className="text-red-600" />
                <div className="absolute bottom-2 text-xs font-medium text-white">GREEN</div>
              </div>

              {/* Distance Markers */}
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-xs space-y-8">
                <div>250 yds</div>
                <div>150 yds</div>
                <div>50 yds</div>
              </div>

              {/* Ball Positions */}
              <AnimatePresence mode="wait">
                {currentSlideData.ballPositions && Object.entries(currentSlideData.ballPositions).map(([playerId, position]) => {
                  const isActive = currentSlideData.activePlayers?.includes(playerId) || !currentSlideData.activePlayers;
                  const isTeamA = playerId.startsWith('A');
                  
                  return (
                    <motion.div
                      key={`${currentSlide}-${playerId}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0.4, 
                        scale: isActive ? 1 : 0.8 
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute"
                      style={{
                        left: `${position.x}%`,
                        bottom: `${position.y}%`,
                        transform: 'translate(-50%, 50%)'
                      }}
                    >
                      {/* Ball */}
                      <Circle 
                        size={isActive ? 10 : 8} 
                        fill="white"
                        stroke={isTeamA ? COLORS.ui.teamA : COLORS.ui.teamB}
                        strokeWidth={2}
                        className="drop-shadow-md"
                      />
                      
                      {/* Trajectory lines */}
                      {currentSlideData.showTrajectories && isActive && (
                        <svg className="absolute inset-0 pointer-events-none" style={{ width: '200px', height: '200px', left: '-100px', top: '-100px' }}>
                          <motion.path
                            d={`M 100 100 Q ${100 + (position.x - 50) * 2} 50 ${100 + (position.x - 50) * 4} 100`}
                            fill="none"
                            stroke={isTeamA ? COLORS.ui.teamA : COLORS.ui.teamB}
                            strokeWidth="1"
                            strokeDasharray="4 2"
                            opacity="0.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1 }}
                          />
                        </svg>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Information Panel */}
          <div>
            {/* Step Info */}
            <div className="text-right text-sm text-gray-500 mb-4">
              Step {currentSlide + 1} of {slides.length}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Slide Content */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {currentSlideData.title}
                  </h3>
                  <p className="text-sm text-blue-600 font-medium mb-4">
                    {currentSlideData.subtitle}
                  </p>
                  <p className="text-gray-700">
                    {currentSlideData.description}
                  </p>
                </div>

                {/* Player Status */}
                {currentSlide < 4 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800 mb-3">Player Status</h4>
                    
                    {/* Team A */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-blue-900">Team A</span>
                        <div className="flex gap-2">
                          <Circle size={12} fill={COLORS.ui.teamA} className="text-blue-900" />
                          <Circle size={12} fill={COLORS.ui.teamA} className="text-blue-900 opacity-50" />
                        </div>
                      </div>
                      <div className="text-sm text-blue-700">
                        {currentSlide === 0 && "Both players teeing off"}
                        {currentSlide === 1 && "Player 1's ball selected (265 yds)"}
                        {currentSlide === 2 && "Both players hitting approach"}
                        {currentSlide === 3 && "On the green, putting"}
                      </div>
                    </div>

                    {/* Team B */}
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-orange-900">Team B</span>
                        <div className="flex gap-2">
                          <Circle size={12} fill={COLORS.ui.teamB} className="text-orange-900" />
                          <Circle size={12} fill={COLORS.ui.teamB} className="text-orange-900 opacity-50" />
                        </div>
                      </div>
                      <div className="text-sm text-orange-700">
                        {currentSlide === 0 && "Both players teeing off"}
                        {currentSlide === 1 && "Player 1's ball selected (271 yds)"}
                        {currentSlide === 2 && "Both players hitting approach"}
                        {currentSlide === 3 && "On the green, putting"}
                      </div>
                    </div>
                  </div>
                )}

                {/* Final Score */}
                {currentSlide === 4 && (
                  <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                    <div className="flex justify-around items-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-900">4</div>
                        <div className="text-sm text-gray-600 mt-1">Team A</div>
                      </div>
                      <div className="text-xl text-gray-400">-</div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-900">4</div>
                        <div className="text-sm text-gray-600 mt-1">Team B</div>
                      </div>
                    </div>
                    <div className="text-center mt-4 text-green-700 font-medium">
                      Hole Halved • Match All Square
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentSlide === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentSlide === slides.length - 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Info size={16} className="text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Best Ball Format:</span> Each player plays their own ball throughout the hole. 
                The team's score is the lowest score among all team members on each hole.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}