'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, DollarSign, TrendingUp } from 'lucide-react';

export default function SkinsDemoMinimal() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      title: "Hole 1 - $100 Skin",
      description: "All players compete for the skin",
      skinValue: 100,
      scores: { P1: 4, P2: 4, P3: 5, P4: 4 },
      winner: null,
      carryover: true,
      totalPot: 100,
      balls: [
        { x: 48, y: 20, player: 'P1' },
        { x: 50, y: 22, player: 'P2' },
        { x: 45, y: 18, player: 'P3' },
        { x: 52, y: 21, player: 'P4' },
      ]
    },
    {
      title: "Hole 1 - Tied!",
      description: "Three players tied with 4 - Skin carries over",
      skinValue: 100,
      scores: { P1: 4, P2: 4, P3: 5, P4: 4 },
      winner: null,
      carryover: true,
      totalPot: 100,
      balls: []
    },
    {
      title: "Hole 2 - $200 Skin",
      description: "Carryover makes this hole worth $200",
      skinValue: 200,
      scores: { P1: 3, P2: 4, P3: 4, P4: 5 },
      winner: 'P1',
      carryover: false,
      totalPot: 200,
      balls: [
        { x: 51, y: 19, player: 'P1', winning: true },
        { x: 47, y: 21, player: 'P2' },
        { x: 49, y: 20, player: 'P3' },
        { x: 46, y: 18, player: 'P4' },
      ]
    },
    {
      title: "Player 1 Wins $200!",
      description: "Birdie wins the carried-over skin",
      skinValue: 200,
      scores: { P1: 3, P2: 4, P3: 4, P4: 5 },
      winner: 'P1',
      totalWon: 200,
      balls: []
    },
    {
      title: "Skins Summary",
      description: "After 2 holes",
      summary: true,
      playerWinnings: { P1: 200, P2: 0, P3: 0, P4: 0 },
      totalSkins: 2,
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

  const getPlayerColor = (player: string) => {
    const colors = {
      P1: 'text-red-600 border-red-500 bg-red-500/20',
      P2: 'text-blue-600 border-blue-500 bg-blue-500/20',
      P3: 'text-green-600 border-green-500 bg-green-500/20',
      P4: 'text-purple-600 border-purple-500 bg-purple-500/20'
    };
    return colors[player as keyof typeof colors];
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-masters-pine/10 overflow-hidden">
      {/* Header */}
      <div className="bg-masters-pine/5 border-b border-masters-pine/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-masters-charcoal">Skins Game</h3>
            <p className="text-sm text-masters-slate mt-1">Win holes to win money</p>
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
          {/* Visual Display */}
          <div className="relative">
            {!currentStep.summary ? (
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

                {/* Money Pot Display */}
                <motion.div
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  <div className="flex items-center gap-2">
                    <DollarSign size={20} className="text-masters-gold" />
                    <div>
                      <div className="text-xs text-masters-slate">Current Pot</div>
                      <motion.div 
                        className="text-xl font-bold text-masters-pine"
                        key={currentStep.totalPot}
                        initial={{ scale: 1.5 }}
                        animate={{ scale: 1 }}
                      >
                        ${currentStep.totalPot}
                      </motion.div>
                    </div>
                  </div>
                  {currentStep.carryover && (
                    <motion.div
                      className="mt-2 text-xs text-orange-600 font-medium flex items-center gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <TrendingUp size={12} />
                      CARRYOVER
                    </motion.div>
                  )}
                </motion.div>

                {/* Green */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                >
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-masters-pine/10 via-masters-pine/15 to-masters-pine/20 rounded-full">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 bg-gray-900/80 rounded-full" />
                      </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                      <div className="w-0.5 h-20 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full" />
                      <motion.div
                        className="absolute -top-1 left-0.5"
                        animate={{ rotate: [0, 2, 0, -1, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
                          <path d="M0 0 L20 1 L18 7 L0 8 Z" fill="#DC2626" opacity="0.9" />
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
                        scale: ball.winning ? 1.5 : 1,
                        opacity: 1 
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        delay: index * 0.1,
                        type: 'spring',
                        stiffness: 260
                      }}
                    >
                      <motion.div
                        className={`w-3 h-3 rounded-full border-2 ${getPlayerColor(ball.player)}`}
                        whileHover={{ scale: 1.5 }}
                        animate={ball.winning ? {
                          boxShadow: [
                            '0 0 0 0px rgba(212, 165, 116, 0)',
                            '0 0 0 12px rgba(212, 165, 116, 0.3)',
                            '0 0 0 0px rgba(212, 165, 116, 0)',
                          ]
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                      
                      {ball.winning && (
                        <motion.div
                          className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <DollarSign size={20} className="text-masters-gold" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              // Summary Display
              <motion.div
                className="h-[400px] bg-gradient-to-br from-masters-pine/5 to-masters-pine/10 rounded-xl p-8 flex flex-col justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <div className="text-center mb-6">
                  <DollarSign className="w-16 h-16 text-masters-gold mx-auto mb-4" />
                  <h3 className="text-2xl font-light text-masters-charcoal">Skins Leaderboard</h3>
                </div>
                
                <div className="space-y-2">
                  {Object.entries(currentStep.playerWinnings || {}).map(([player, amount], index) => (
                    <motion.div
                      key={player}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        amount > 0 ? 'bg-masters-gold/10 border border-masters-gold/30' : 'bg-white/50'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="font-medium text-masters-charcoal">{player}</span>
                      <span className={`text-lg font-bold ${
                        amount > 0 ? 'text-masters-gold' : 'text-masters-slate/50'
                      }`}>
                        ${amount}
                      </span>
                    </motion.div>
                  ))}
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

                {/* Scores Display */}
                {currentStep.scores && (
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {Object.entries(currentStep.scores).map(([player, score]) => (
                      <motion.div
                        key={player}
                        className={`p-3 rounded-lg text-center ${
                          player === currentStep.winner
                            ? 'bg-masters-gold/20 border border-masters-gold/40'
                            : 'bg-gray-50 border border-gray-200'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="text-xs text-masters-slate">{player}</div>
                        <div className={`text-xl font-light mt-1 ${
                          player === currentStep.winner ? 'text-masters-gold' : 'text-masters-charcoal'
                        }`}>
                          {score}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Winner Announcement */}
                {currentStep.totalWon && (
                  <motion.div
                    className="p-6 bg-masters-gold/10 border-2 border-masters-gold/30 rounded-lg text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.3 }}
                  >
                    <DollarSign className="w-12 h-12 text-masters-gold mx-auto mb-2" />
                    <div className="text-3xl font-bold text-masters-gold">
                      ${currentStep.totalWon}
                    </div>
                    <div className="text-sm text-masters-charcoal mt-2">
                      Won by {currentStep.winner}
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
            <span className="font-medium text-masters-charcoal">Skins:</span> Win a hole outright to win the skin. Ties carry over to the next hole.
          </p>
        </motion.div>
      </div>
    </div>
  );
}