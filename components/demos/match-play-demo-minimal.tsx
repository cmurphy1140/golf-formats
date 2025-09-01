'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Trophy, X } from 'lucide-react';

export default function MatchPlayDemoMinimal() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      title: "Hole 1 - Par 4",
      description: "Both players tee off",
      player1Score: null,
      player2Score: null,
      status: "in-progress",
      balls: [
        { x: 38, y: 58, player: 'P1', strokes: 1 },
        { x: 42, y: 60, player: 'P2', strokes: 1 },
      ]
    },
    {
      title: "Hole 1 Complete",
      description: "Player 1: 4 (Par) • Player 2: 5 (Bogey)",
      player1Score: 4,
      player2Score: 5,
      status: "P1 wins",
      winner: 'P1',
      matchStatus: "Player 1: 1 UP",
      balls: []
    },
    {
      title: "Hole 2 - Par 3",
      description: "Both players on the green",
      player1Score: null,
      player2Score: null,
      status: "in-progress",
      balls: [
        { x: 50, y: 20, player: 'P1', strokes: 1 },
        { x: 48, y: 18, player: 'P2', strokes: 1 },
      ]
    },
    {
      title: "Hole 2 Complete",
      description: "Player 1: 3 (Par) • Player 2: 2 (Birdie)",
      player1Score: 3,
      player2Score: 2,
      status: "P2 wins",
      winner: 'P2',
      matchStatus: "Match: ALL SQUARE",
      balls: []
    },
    {
      title: "Match Status",
      description: "After 2 holes - Match is tied",
      matchSummary: true,
      holesPlayed: 2,
      p1Wins: 1,
      p2Wins: 1,
      halved: 0,
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
            <h3 className="text-lg font-medium text-masters-charcoal">Match Play Format</h3>
            <p className="text-sm text-masters-slate mt-1">Hole-by-hole competition</p>
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
          {/* Golf Course Visual / Match Status Display */}
          <div className="relative">
            {!currentStep.matchSummary ? (
              // Golf Course Visual
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
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        delay: index * 0.2,
                        type: 'spring',
                        stiffness: 260
                      }}
                    >
                      <motion.div
                        className={`w-3 h-3 rounded-full border-2 ${
                          ball.player === 'P1'
                            ? 'bg-red-500/20 border-red-500' 
                            : 'bg-blue-500/20 border-blue-500'
                        }`}
                        whileHover={{ scale: 1.5 }}
                      />
                      
                      <motion.div
                        className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <span className={`text-xs font-medium ${
                          ball.player === 'P1' ? 'text-red-600' : 'text-blue-600'
                        }`}>
                          {ball.player}
                        </span>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              // Match Summary Display
              <motion.div
                className="h-[400px] bg-gradient-to-br from-masters-pine/5 to-masters-pine/10 rounded-xl p-8 flex flex-col justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <div className="text-center">
                  <Trophy className="w-16 h-16 text-masters-gold mx-auto mb-4" />
                  <h3 className="text-2xl font-light text-masters-charcoal mb-6">Match Status</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-red-50/50 rounded-lg p-4 border border-red-200/30">
                      <div className="text-2xl font-light text-red-600">{currentStep.p1Wins}</div>
                      <div className="text-xs text-red-800 mt-1">Player 1 Wins</div>
                    </div>
                    <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-200/30">
                      <div className="text-2xl font-light text-blue-600">{currentStep.p2Wins}</div>
                      <div className="text-xs text-blue-800 mt-1">Player 2 Wins</div>
                    </div>
                  </div>
                  
                  <div className="text-lg font-medium text-masters-pine">
                    ALL SQUARE
                  </div>
                  <div className="text-sm text-masters-slate mt-2">
                    {currentStep.holesPlayed} holes played
                  </div>
                </div>
              </motion.div>
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

                {/* Hole Result */}
                {currentStep.winner && (
                  <motion.div
                    className={`p-4 rounded-lg mb-4 ${
                      currentStep.winner === 'P1' 
                        ? 'bg-red-50/50 border border-red-200/30'
                        : 'bg-blue-50/50 border border-blue-200/30'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Hole Winner</span>
                      <Trophy size={16} className={
                        currentStep.winner === 'P1' ? 'text-red-500' : 'text-blue-500'
                      } />
                    </div>
                    <div className={`text-lg font-medium mt-1 ${
                      currentStep.winner === 'P1' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      Player {currentStep.winner === 'P1' ? '1' : '2'}
                    </div>
                  </motion.div>
                )}

                {/* Match Status */}
                {currentStep.matchStatus && (
                  <motion.div
                    className="p-4 bg-masters-pine/5 border border-masters-pine/20 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-center text-lg font-medium text-masters-pine">
                      {currentStep.matchStatus}
                    </div>
                  </motion.div>
                )}

                {/* Player Scores */}
                {currentStep.player1Score && (
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-red-50/30 rounded-lg p-3 text-center">
                      <div className="text-xs text-red-700">Player 1</div>
                      <div className="text-xl font-light text-red-600 mt-1">
                        {currentStep.player1Score}
                      </div>
                    </div>
                    <div className="bg-blue-50/30 rounded-lg p-3 text-center">
                      <div className="text-xs text-blue-700">Player 2</div>
                      <div className="text-xl font-light text-blue-600 mt-1">
                        {currentStep.player2Score}
                      </div>
                    </div>
                  </div>
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
            <span className="font-medium text-masters-charcoal">Match Play:</span> Win individual holes to win the match. Match ends when one player's lead exceeds remaining holes.
          </p>
        </motion.div>
      </div>
    </div>
  );
}