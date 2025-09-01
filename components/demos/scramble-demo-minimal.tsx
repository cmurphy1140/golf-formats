'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Users } from 'lucide-react';

export default function ScrambleDemoMinimal() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      title: "Everyone Tees Off",
      description: "All four team members hit their drives",
      balls: [
        { x: 35, y: 55, player: 'P1', selected: false },
        { x: 42, y: 60, player: 'P2', selected: false },
        { x: 38, y: 58, player: 'P3', selected: false },
        { x: 45, y: 62, player: 'P4', selected: false },
      ]
    },
    {
      title: "Choose Best Drive",
      description: "Team selects Player 4's ball - best position at 280 yards",
      balls: [
        { x: 45, y: 62, player: 'P4', selected: true },
      ]
    },
    {
      title: "All Play From Best Ball",
      description: "Everyone hits from the selected spot",
      balls: [
        { x: 49, y: 18, player: 'P1', selected: false },
        { x: 51, y: 20, player: 'P2', selected: false },
        { x: 50, y: 22, player: 'P3', selected: false },
        { x: 52, y: 19, player: 'P4', selected: false },
      ]
    },
    {
      title: "Select Best Approach",
      description: "Team chooses Player 2's ball - closest to pin",
      balls: [
        { x: 51, y: 20, player: 'P2', selected: true },
      ]
    },
    {
      title: "Team Scores",
      description: "Everyone putts from best position - Team makes birdie!",
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
      {/* Header */}
      <div className="bg-masters-pine/5 border-b border-masters-pine/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-masters-charcoal">Scramble Format</h3>
            <p className="text-sm text-masters-slate mt-1">Team plays from best position</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayPause}
              className="p-2.5 bg-white hover:bg-masters-pine/5 rounded-lg transition-all duration-300 group"
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
            >
              <RotateCcw size={16} className="text-masters-pine group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4 flex gap-1">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className="h-0.5 flex-1 bg-masters-pine/10 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-masters-pine"
                animate={{ 
                  width: index < step ? '100%' : index === step ? '50%' : '0%' 
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Golf Course Visual */}
          <div className="relative h-[400px] bg-gradient-to-b from-masters-pine/5 to-masters-pine/10 rounded-xl overflow-hidden">
            {/* Grid */}
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

            {/* Fairway */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                width: '100px',
                height: '100%',
                background: 'linear-gradient(to top, rgba(0, 75, 54, 0.1), rgba(0, 75, 54, 0.05))',
                clipPath: 'polygon(40% 100%, 60% 100%, 70% 0%, 30% 0%)'
              }}
            />

            {/* Tee Box */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <div className="relative">
                <div className="w-16 h-10 bg-gradient-to-b from-masters-pine/25 to-masters-pine/35 rounded-sm" />
                <div className="absolute top-2 left-2 w-1 h-6 bg-white/80 rounded-full" />
                <div className="absolute top-2 right-2 w-1 h-6 bg-white/80 rounded-full" />
              </div>
            </motion.div>

            {/* Green */}
            <motion.div
              className="absolute top-8 left-1/2 transform -translate-x-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-masters-pine/10 via-masters-pine/15 to-masters-pine/20 rounded-full">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 bg-gray-900/80 rounded-full" />
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                  <div className="w-0.5 h-16 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full" />
                  <motion.div
                    className="absolute -top-1 left-0.5"
                    animate={{ rotate: [0, 2, 0, -1, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                      <path d="M0 0 L18 1 L16 6 L0 7 Z" fill="#DC2626" opacity="0.9" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Ball Positions */}
            <AnimatePresence mode="wait">
              {currentStep.balls.map((ball, index) => (
                <motion.div
                  key={`${step}-${ball.player}`}
                  className="absolute"
                  style={{
                    left: `${ball.x}%`,
                    bottom: `${ball.y}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: ball.selected ? 1.5 : 1,
                    opacity: ball.selected ? 1 : 0.7
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 260
                  }}
                >
                  {/* Ball */}
                  <motion.div
                    className={`w-3 h-3 rounded-full border-2 ${
                      ball.selected 
                        ? 'bg-masters-gold/30 border-masters-gold' 
                        : 'bg-purple-500/20 border-purple-500'
                    }`}
                    whileHover={{ scale: 1.5 }}
                    animate={ball.selected ? {
                      boxShadow: [
                        '0 0 0 0px rgba(212, 165, 116, 0)',
                        '0 0 0 8px rgba(212, 165, 116, 0.2)',
                        '0 0 0 0px rgba(212, 165, 116, 0)',
                      ]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                  
                  {/* Player Label */}
                  <motion.div
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span className="text-xs font-medium text-purple-600">
                      {ball.player}
                    </span>
                  </motion.div>

                  {/* Selection Arrow */}
                  {ball.selected && (
                    <motion.div
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="text-masters-gold text-xs font-bold">BEST</div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Connection Lines for Scramble */}
            {step === 2 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {[35, 38, 42].map((startX, i) => (
                  <motion.line
                    key={i}
                    x1={`${startX}%`}
                    y1="38%"
                    x2="45%"
                    y2="38%"
                    stroke="rgba(147, 51, 234, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  />
                ))}
              </svg>
            )}
          </div>

          {/* Info Panel */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-sm text-masters-pine/60 mb-2">
                  Step {step + 1} of {steps.length}
                </div>

                <h4 className="text-2xl font-light text-masters-charcoal mb-2">
                  {currentStep.title}
                </h4>

                <p className="text-masters-slate mb-8">
                  {currentStep.description}
                </p>

                {/* Team Status */}
                {step < 4 && (
                  <motion.div
                    className="p-4 bg-purple-50/50 border border-purple-200/30 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">Team Status</span>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((p) => (
                          <div key={p} className="w-2 h-2 bg-purple-500 rounded-full" />
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-purple-700 mt-2">
                      {step === 0 && "All players teeing off"}
                      {step === 1 && "Moving to Player 4's ball"}
                      {step === 2 && "All hitting from best position"}
                      {step === 3 && "Selected Player 2's approach"}
                    </div>
                  </motion.div>
                )}

                {/* Final Score */}
                {step === 4 && (
                  <motion.div
                    className="p-6 bg-masters-pine/5 border border-masters-pine/20 rounded-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    <div className="text-center">
                      <motion.div
                        className="text-4xl font-light text-masters-pine"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                      >
                        3
                      </motion.div>
                      <div className="text-sm text-masters-slate mt-2">Team Score</div>
                      <motion.div
                        className="text-lg font-medium text-masters-gold mt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        Birdie! 🏆
                      </motion.div>
                    </div>
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

        {/* Footer */}
        <motion.div
          className="mt-8 p-4 bg-masters-pine/5 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-masters-slate">
            <span className="font-medium text-masters-charcoal">Scramble:</span> All players tee off, then everyone plays from the best position. Repeat until holed.
          </p>
        </motion.div>
      </div>
    </div>
  );
}