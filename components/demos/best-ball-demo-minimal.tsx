'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface BallPosition {
  x: number;
  y: number;
  player: string;
  team: 'A' | 'B';
  selected?: boolean;
}

export default function BestBallDemoMinimal() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const controls = useAnimation();

  const steps = [
    {
      title: "Tee Off",
      description: "All four players hit their drives",
      balls: [
        { x: 30, y: 55, player: 'A1', team: 'A' as const },
        { x: 35, y: 60, player: 'A2', team: 'A' as const },
        { x: 40, y: 58, player: 'B1', team: 'B' as const },
        { x: 38, y: 52, player: 'B2', team: 'B' as const },
      ]
    },
    {
      title: "Select Best",
      description: "Each team chooses their best positioned ball",
      balls: [
        { x: 35, y: 60, player: 'A2', team: 'A' as const, selected: true },
        { x: 40, y: 58, player: 'B1', team: 'B' as const, selected: true },
      ]
    },
    {
      title: "Approach",
      description: "Both team members play from selected position",
      balls: [
        { x: 48, y: 20, player: 'A1', team: 'A' as const },
        { x: 50, y: 18, player: 'A2', team: 'A' as const },
        { x: 52, y: 22, player: 'B1', team: 'B' as const },
        { x: 49, y: 19, player: 'B2', team: 'B' as const },
      ]
    },
    {
      title: "Score",
      description: "Team uses their best score for the hole",
      balls: []
    }
  ];

  const currentStep = steps[step];

  useEffect(() => {
    if (isPlaying && step < steps.length - 1) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (isPlaying && step === steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, step]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && step === steps.length - 1) {
      setStep(0);
    }
  };

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-masters-pine/10 overflow-hidden">
      {/* Minimalist Header */}
      <div className="bg-masters-pine/5 border-b border-masters-pine/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-masters-charcoal">Best Ball Format</h3>
            <p className="text-sm text-masters-slate mt-1">Interactive demonstration</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayPause}
              className="p-2.5 bg-white hover:bg-masters-pine/5 rounded-lg transition-all duration-300 group"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={16} className="text-masters-pine group-hover:scale-110 transition-transform" />
              ) : (
                <Play size={16} className="text-masters-pine group-hover:scale-110 transition-transform" />
              )}
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 bg-white hover:bg-masters-pine/5 rounded-lg transition-all duration-300 group"
              aria-label="Reset"
            >
              <RotateCcw size={16} className="text-masters-pine group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Elegant Progress Indicator */}
        <div className="mt-4 flex gap-1">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className="h-0.5 flex-1 bg-masters-pine/10 rounded-full overflow-hidden"
              initial={false}
            >
              <motion.div
                className="h-full bg-masters-pine"
                initial={{ width: '0%' }}
                animate={{ 
                  width: index < step ? '100%' : index === step ? '50%' : '0%' 
                }}
                transition={{ 
                  duration: 0.5,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Minimalist Golf Course */}
          <div className="relative">
            <div className="relative h-[400px] bg-gradient-to-b from-masters-pine/5 to-masters-pine/10 rounded-xl overflow-hidden">
              {/* Subtle Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(0deg, #004B36 0.5px, transparent 0.5px),
                    linear-gradient(90deg, #004B36 0.5px, transparent 0.5px)
                  `,
                  backgroundSize: '40px 40px'
                }}
              />

              {/* Fairway - Minimalist Design */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{
                  width: '100px',
                  height: '100%',
                  background: 'linear-gradient(to top, rgba(0, 75, 54, 0.1), rgba(0, 75, 54, 0.05))',
                  clipPath: 'polygon(40% 100%, 60% 100%, 70% 0%, 30% 0%)'
                }}
              />

              {/* Tee Box - More Realistic */}
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <div className="relative">
                  {/* Tee Box Surface */}
                  <div className="w-16 h-10 bg-gradient-to-b from-masters-pine/25 to-masters-pine/35 rounded-sm" />
                  {/* Tee Markers */}
                  <div className="absolute top-2 left-2 w-1 h-6 bg-white/80 rounded-full" />
                  <div className="absolute top-2 right-2 w-1 h-6 bg-white/80 rounded-full" />
                  {/* Center Line */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-px bg-white/30" />
                </div>
              </motion.div>

              {/* Green - More Realistic */}
              <motion.div
                className="absolute top-8 left-1/2 transform -translate-x-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <div className="relative">
                  {/* Green Surface with Gradient */}
                  <div className="w-24 h-24 bg-gradient-to-br from-masters-pine/10 via-masters-pine/15 to-masters-pine/20 rounded-full relative overflow-hidden">
                    {/* Subtle contour lines */}
                    <div className="absolute inset-0">
                      <div className="absolute top-4 left-4 right-4 h-px bg-masters-pine/10" />
                      <div className="absolute top-8 left-6 right-6 h-px bg-masters-pine/10" />
                      <div className="absolute bottom-8 left-6 right-6 h-px bg-masters-pine/10" />
                    </div>
                    
                    {/* Hole */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-3 h-3 bg-gray-900/80 rounded-full">
                        <div className="w-2 h-2 bg-gray-900 rounded-full mx-auto mt-0.5" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Flag Pole and Flag */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                    {/* Pole */}
                    <div className="relative">
                      <div className="w-0.5 h-16 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full" />
                      
                      {/* Flag */}
                      <motion.div
                        className="absolute -top-1 left-0.5"
                        animate={{ 
                          rotate: [0, 2, 0, -1, 0],
                          x: [0, 1, 0, -0.5, 0]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                          <path 
                            d="M0 0 L18 1 L16 6 L0 7 Z" 
                            fill="url(#flagGradient)"
                            opacity="0.9"
                          />
                          <defs>
                            <linearGradient id="flagGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#DC2626" />
                              <stop offset="100%" stopColor="#EF4444" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </motion.div>
                      
                      {/* Pin number */}
                      <div className="absolute -top-0.5 left-3 text-white text-[8px] font-bold">
                        3
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Ball Positions with Advanced Animations */}
              <AnimatePresence mode="wait">
                {currentStep.balls.map((ball, index) => (
                  <motion.div
                    key={`${step}-${ball.player}`}
                    className="absolute"
                    style={{
                      left: `${ball.x}%`,
                      bottom: `${ball.y}%`,
                    }}
                    initial={{ 
                      scale: 0,
                      opacity: 0,
                      rotate: -180
                    }}
                    animate={{ 
                      scale: ball.selected ? 1.3 : 1,
                      opacity: ball.selected ? 1 : 0.6,
                      rotate: 0
                    }}
                    exit={{ 
                      scale: 0,
                      opacity: 0,
                      rotate: 180
                    }}
                    transition={{
                      delay: index * 0.1,
                      type: 'spring',
                      stiffness: 260,
                      damping: 20
                    }}
                  >
                    {/* Ball with Team Color */}
                    <motion.div
                      className={`w-3 h-3 rounded-full border-2 ${
                        ball.team === 'A' 
                          ? 'bg-blue-500/20 border-blue-500' 
                          : 'bg-orange-500/20 border-orange-500'
                      }`}
                      whileHover={{ scale: 1.5 }}
                      animate={ball.selected ? {
                        boxShadow: [
                          '0 0 0 0px rgba(0, 75, 54, 0)',
                          '0 0 0 8px rgba(0, 75, 54, 0.1)',
                          '0 0 0 0px rgba(0, 75, 54, 0)',
                        ]
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                    
                    {/* Player Label */}
                    <motion.div
                      className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <span className={`text-xs font-medium ${
                        ball.team === 'A' ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        {ball.player}
                      </span>
                    </motion.div>

                    {/* Selection Ring Animation */}
                    {ball.selected && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        initial={{ scale: 1 }}
                        animate={{ scale: 2.5 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'easeOut'
                        }}
                        style={{
                          border: `1px solid ${ball.team === 'A' ? '#3B82F6' : '#F97316'}`,
                          opacity: 0.3
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Distance Markers - Minimalist */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-8">
                {[150, 100, 50].map((distance, index) => (
                  <motion.div
                    key={distance}
                    className="text-xs text-masters-pine/40"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {distance}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Information Panel - Clean and Modern */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Step Counter */}
                <div className="text-sm text-masters-pine/60 mb-2">
                  Step {step + 1} of {steps.length}
                </div>

                {/* Step Title */}
                <h4 className="text-2xl font-light text-masters-charcoal mb-2">
                  {currentStep.title}
                </h4>

                {/* Step Description */}
                <p className="text-masters-slate mb-8">
                  {currentStep.description}
                </p>

                {/* Team Status Cards - Minimalist */}
                {step < 3 && (
                  <div className="space-y-3">
                    {/* Team A */}
                    <motion.div
                      className="p-4 bg-blue-50/50 border border-blue-200/30 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-900">Team A</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <div className="w-2 h-2 bg-blue-500/40 rounded-full" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Team B */}
                    <motion.div
                      className="p-4 bg-orange-50/50 border border-orange-200/30 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-orange-900">Team B</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-orange-500 rounded-full" />
                          <div className="w-2 h-2 bg-orange-500/40 rounded-full" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Final Score - Elegant Display */}
                {step === 3 && (
                  <motion.div
                    className="p-6 bg-masters-pine/5 border border-masters-pine/20 rounded-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <div className="flex justify-around items-center">
                      <div className="text-center">
                        <motion.div
                          className="text-3xl font-light text-blue-600"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: 'spring' }}
                        >
                          4
                        </motion.div>
                        <div className="text-xs text-masters-slate mt-1">Team A</div>
                      </div>
                      <div className="text-masters-pine/20 text-2xl">•</div>
                      <div className="text-center">
                        <motion.div
                          className="text-3xl font-light text-orange-600"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: 'spring' }}
                        >
                          4
                        </motion.div>
                        <div className="text-xs text-masters-slate mt-1">Team B</div>
                      </div>
                    </div>
                    <motion.div
                      className="text-center mt-4 text-sm text-masters-pine"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Hole Halved
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setStep(index)}
                  className="group"
                  aria-label={`Go to step ${index + 1}`}
                >
                  <motion.div
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === step 
                        ? 'bg-masters-pine' 
                        : 'bg-masters-pine/20 hover:bg-masters-pine/40'
                    }`}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Points - Minimalist Footer */}
        <motion.div
          className="mt-8 p-4 bg-masters-pine/5 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-masters-slate">
            <span className="font-medium text-masters-charcoal">Best Ball:</span> Each player plays their own ball. The team uses the lowest score among all members.
          </p>
        </motion.div>
      </div>
    </div>
  );
}