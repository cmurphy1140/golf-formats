'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Trophy, Target } from 'lucide-react';

export default function StablefordDemoMinimal() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const holes = [
    { hole: 1, par: 4, score: 5, points: 1, result: 'Bogey' },
    { hole: 2, par: 3, score: 2, points: 4, result: 'Birdie' },
    { hole: 3, par: 5, score: 4, points: 4, result: 'Birdie' },
    { hole: 4, par: 4, score: 7, points: 0, result: 'Triple' },
    { hole: 5, par: 4, score: 4, points: 2, result: 'Par' },
  ];

  const pointSystem = [
    { score: 'Double Eagle', points: 5, strokes: '-3' },
    { score: 'Eagle', points: 4, strokes: '-2' },
    { score: 'Birdie', points: 3, strokes: '-1' },
    { score: 'Par', points: 2, strokes: '0' },
    { score: 'Bogey', points: 1, strokes: '+1' },
    { score: 'Double+', points: 0, strokes: '+2+' },
  ];

  useEffect(() => {
    if (isPlaying && step < holes.length - 1) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    } else if (isPlaying && step === holes.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, step]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && step === holes.length - 1) {
      setStep(0);
    }
  };

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  const totalPoints = holes.slice(0, step + 1).reduce((sum, hole) => sum + hole.points, 0);

  return (
    <div className="w-full bg-white rounded-2xl border border-masters-pine/10 overflow-hidden">
      {/* Header */}
      <div className="bg-masters-pine/5 border-b border-masters-pine/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-masters-charcoal">Stableford Format</h3>
            <p className="text-sm text-masters-slate mt-1">Points-based scoring system</p>
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
          {holes.map((_, index) => (
            <motion.div
              key={index}
              className="h-0.5 flex-1 bg-masters-pine/10 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-masters-pine"
                animate={{ 
                  width: index <= step ? '100%' : '0%' 
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
          {/* Scorecard Visual */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-masters-pine/5 to-masters-pine/10 rounded-xl p-6">
              <h4 className="text-sm font-medium text-masters-pine mb-4">Scorecard Progress</h4>
              
              {/* Holes Grid */}
              <div className="space-y-2">
                {holes.map((hole, index) => {
                  const isActive = index === step;
                  const isPast = index <= step;
                  
                  return (
                    <motion.div
                      key={hole.hole}
                      className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                        isActive ? 'bg-masters-gold/20 border border-masters-gold' :
                        isPast ? 'bg-white' : 'bg-gray-50 opacity-50'
                      }`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ 
                        x: 0, 
                        opacity: isPast ? 1 : 0.5,
                        scale: isActive ? 1.02 : 1
                      }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-masters-pine/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-masters-pine">{hole.hole}</span>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium text-masters-charcoal">Par {hole.par}</div>
                          {isPast && (
                            <motion.div 
                              className="text-xs text-masters-slate"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              Score: {hole.score}
                            </motion.div>
                          )}
                        </div>
                      </div>
                      
                      {isPast && (
                        <motion.div 
                          className="flex items-center gap-3"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', delay: 0.2 }}
                        >
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            hole.points >= 3 ? 'bg-green-100 text-green-700' :
                            hole.points === 2 ? 'bg-blue-100 text-blue-700' :
                            hole.points === 1 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {hole.result}
                          </div>
                          <div className="text-lg font-bold text-masters-pine">
                            +{hole.points}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Total Points */}
              <motion.div 
                className="mt-6 p-4 bg-masters-pine text-white rounded-lg"
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy size={20} />
                    <span className="font-medium">Total Points</span>
                  </div>
                  <motion.div 
                    className="text-2xl font-bold"
                    key={totalPoints}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    {totalPoints}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <h4 className="text-2xl font-light text-masters-charcoal mb-3">
                Point System
              </h4>
              <p className="text-masters-slate mb-6">
                Earn points based on your score relative to par. Bad holes don't ruin your round!
              </p>

              {/* Points Table */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  {pointSystem.map((item, index) => (
                    <motion.div
                      key={item.score}
                      className="flex items-center justify-between p-2 rounded hover:bg-white transition-colors"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex items-center gap-3">
                        <Target size={14} className="text-masters-pine/60" />
                        <span className="text-sm font-medium text-masters-charcoal">
                          {item.score}
                        </span>
                        <span className="text-xs text-masters-slate">
                          ({item.strokes})
                        </span>
                      </div>
                      <div className={`text-lg font-bold ${
                        item.points >= 3 ? 'text-green-600' :
                        item.points === 2 ? 'text-blue-600' :
                        item.points === 1 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {item.points} pts
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Hole Analysis */}
            {step < holes.length && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  className="p-4 bg-masters-gold/10 border border-masters-gold/30 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="text-sm font-medium text-masters-charcoal mb-2">
                    Hole {holes[step].hole} Analysis
                  </div>
                  <div className="text-xs text-masters-slate">
                    Par {holes[step].par} - Shot {holes[step].score} ({holes[step].result})
                  </div>
                  <div className="mt-2 text-lg font-bold text-masters-pine">
                    Earned {holes[step].points} point{holes[step].points !== 1 ? 's' : ''}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
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
            <span className="font-medium text-masters-charcoal">Stableford:</span> Rewards aggressive play by awarding points for good scores. Bad holes (double bogey+) don't hurt as much.
          </p>
        </motion.div>
      </div>
    </div>
  );
}