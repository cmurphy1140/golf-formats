'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Users, User } from 'lucide-react';

export default function WolfDemoMinimal() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      title: "Player 1 is the Wolf",
      description: "Watches other players tee off and decides strategy",
      wolf: 0,
      teams: null,
      action: 'watching'
    },
    {
      title: "Player 2 Tees Off",
      description: "Wolf can choose Player 2 as partner or pass",
      wolf: 0,
      teams: null,
      action: 'decision',
      shots: [{ player: 1, quality: 'fair', distance: 240 }]
    },
    {
      title: "Wolf Passes on Player 2",
      description: "Decides to wait and see Player 3's shot",
      wolf: 0,
      teams: null,
      action: 'pass'
    },
    {
      title: "Player 3 Tees Off",
      description: "Great drive! Wolf must decide now or wait",
      wolf: 0,
      teams: null,
      action: 'decision',
      shots: [{ player: 1, quality: 'fair', distance: 240 }, { player: 2, quality: 'great', distance: 270 }]
    },
    {
      title: "Wolf Partners with Player 3",
      description: "Forms team before seeing Player 4's shot",
      wolf: 0,
      teams: [[0, 2], [1, 3]],
      action: 'partner'
    },
    {
      title: "Teams Compete",
      description: "Wolf & Player 3 vs Player 2 & Player 4",
      wolf: 0,
      teams: [[0, 2], [1, 3]],
      action: 'play',
      result: 'Wolf team wins the hole!'
    }
  ];

  const lonewolfSteps = [
    {
      title: "Player 2 is the Wolf",
      description: "New hole, Player 2's turn as Wolf",
      wolf: 1,
      teams: null,
      action: 'watching'
    },
    {
      title: "Wolf Goes Lone Wolf!",
      description: "Declares before anyone tees off - playing 1 vs 3",
      wolf: 1,
      teams: 'lone',
      action: 'lone'
    },
    {
      title: "High Stakes",
      description: "Points are doubled (or tripled) for Lone Wolf",
      wolf: 1,
      teams: 'lone',
      action: 'stakes'
    },
    {
      title: "Lone Wolf Wins!",
      description: "Beats all three players for triple points",
      wolf: 1,
      teams: 'lone',
      action: 'win',
      result: 'Lone Wolf wins 3x points!'
    }
  ];

  const currentSequence = step < steps.length ? steps : lonewolfSteps;
  const currentStep = step < steps.length ? steps[step] : lonewolfSteps[step - steps.length];

  useEffect(() => {
    if (isPlaying) {
      const totalSteps = steps.length + lonewolfSteps.length;
      if (step < totalSteps - 1) {
        const timer = setTimeout(() => {
          setStep(prev => prev + 1);
        }, 2500);
        return () => clearTimeout(timer);
      } else {
        setIsPlaying(false);
      }
    }
  }, [isPlaying, step]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && step === steps.length + lonewolfSteps.length - 1) {
      setStep(0);
    }
  };

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
  const playerColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'];

  return (
    <div className="w-full bg-white rounded-2xl border border-masters-pine/10 overflow-hidden">
      {/* Header */}
      <div className="bg-masters-pine/5 border-b border-masters-pine/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-masters-charcoal">Wolf Format</h3>
            <p className="text-sm text-masters-slate mt-1">Strategic partner selection game</p>
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
        <div className="mt-4">
          <div className="text-xs text-masters-slate mb-2">
            {step < steps.length ? 'Regular Wolf' : 'Lone Wolf'} Scenario
          </div>
          <div className="flex gap-1">
            {[...steps, ...lonewolfSteps].map((_, index) => (
              <div
                key={index}
                className={`h-0.5 flex-1 rounded-full transition-all ${
                  index === steps.length - 1 ? 'mx-2' : ''
                } ${
                  index < step ? 'bg-masters-pine' :
                  index === step ? 'bg-masters-pine/50' : 'bg-masters-pine/10'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Game Visualization */}
          <div className="space-y-6">
            {/* Players Display */}
            <div className="bg-gradient-to-br from-masters-pine/5 to-masters-pine/10 rounded-xl p-6">
              <h4 className="text-sm font-medium text-masters-pine mb-4">Players</h4>
              
              <div className="grid grid-cols-2 gap-3">
                {players.map((player, index) => {
                  const isWolf = currentStep.wolf === index;
                  const isInWolfTeam = currentStep.teams && currentStep.teams !== 'lone' && 
                    currentStep.teams[0].includes(index);
                  const isInOtherTeam = currentStep.teams && currentStep.teams !== 'lone' && 
                    currentStep.teams[1].includes(index);
                  const isLoneWolf = currentStep.teams === 'lone' && isWolf;
                  
                  return (
                    <motion.div
                      key={player}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        isLoneWolf ? 'bg-masters-gold/20 border-masters-gold' :
                        isWolf ? 'bg-red-50 border-red-500' :
                        isInWolfTeam ? 'bg-blue-50 border-blue-500' :
                        isInOtherTeam ? 'bg-green-50 border-green-500' :
                        'bg-white border-gray-300'
                      }`}
                      animate={{
                        scale: isWolf ? 1.05 : 1,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 ${playerColors[index]} rounded-full flex items-center justify-center`}>
                            <User size={14} className="text-white" />
                          </div>
                          <span className="text-sm font-medium text-masters-charcoal">
                            {player}
                          </span>
                        </div>
                        {isWolf && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="text-lg"
                          >
                            🐺
                          </motion.div>
                        )}
                      </div>
                      
                      {isLoneWolf && (
                        <motion.div 
                          className="text-xs text-masters-gold font-bold mt-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          LONE WOLF (3x points)
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Teams Display */}
              {currentStep.teams && currentStep.teams !== 'lone' && (
                <motion.div
                  className="mt-4 p-3 bg-white rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-xs font-medium text-masters-charcoal mb-2">Teams Formed:</div>
                  <div className="flex justify-around">
                    <div className="text-center">
                      <div className="text-xs text-blue-600 font-medium">Wolf Team</div>
                      <div className="text-sm text-masters-slate">
                        P{currentStep.teams[0][0] + 1} & P{currentStep.teams[0][1] + 1}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-green-600 font-medium">Other Team</div>
                      <div className="text-sm text-masters-slate">
                        P{currentStep.teams[1][0] + 1} & P{currentStep.teams[1][1] + 1}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Display */}
              {currentStep.action === 'decision' && currentStep.shots && (
                <motion.div
                  className="mt-4 space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {currentStep.shots.map((shot, i) => (
                    <div key={i} className="p-2 bg-white rounded flex justify-between items-center">
                      <span className="text-sm text-masters-slate">P{shot.player + 1} Drive:</span>
                      <span className={`text-sm font-medium ${
                        shot.quality === 'great' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {shot.distance} yards ({shot.quality})
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Result Display */}
              {currentStep.result && (
                <motion.div
                  className="mt-4 p-4 bg-masters-gold/20 rounded-lg text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring' }}
                >
                  <div className="text-lg font-bold text-masters-pine">
                    {currentStep.result}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Info Panel */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-sm text-masters-pine/60 mb-2">
                  Step {(step % steps.length) + 1}
                </div>

                <h4 className="text-2xl font-light text-masters-charcoal mb-2">
                  {currentStep.title}
                </h4>

                <p className="text-masters-slate mb-6">
                  {currentStep.description}
                </p>

                {/* Strategy Tips */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-masters-charcoal mb-3">
                    Wolf Strategy
                  </div>
                  
                  <div className="space-y-2 text-xs text-masters-slate">
                    {currentStep.action === 'watching' && (
                      <div>• Assess each player's drive before deciding</div>
                    )}
                    {currentStep.action === 'decision' && (
                      <>
                        <div>• Choose now or risk waiting</div>
                        <div>• Last player means no choice - automatic partner</div>
                      </>
                    )}
                    {currentStep.action === 'lone' && (
                      <>
                        <div>• Go alone for 2x or 3x points</div>
                        <div>• Must declare before anyone tees off</div>
                      </>
                    )}
                    {currentStep.action === 'partner' && (
                      <div>• Best ball format for teams</div>
                    )}
                  </div>
                </div>

                {/* Rules Summary */}
                {step === 0 && (
                  <motion.div
                    className="mt-6 p-4 bg-masters-pine/5 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="text-sm space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-masters-pine rounded-full mt-1.5"></div>
                        <div>
                          <span className="font-medium text-masters-charcoal">Rotation:</span>
                          <span className="text-masters-slate"> Players take turns being Wolf</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-masters-pine rounded-full mt-1.5"></div>
                        <div>
                          <span className="font-medium text-masters-charcoal">Choosing:</span>
                          <span className="text-masters-slate"> Wolf picks partner after their tee shot</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-masters-pine rounded-full mt-1.5"></div>
                        <div>
                          <span className="font-medium text-masters-charcoal">Lone Wolf:</span>
                          <span className="text-masters-slate"> Play alone for multiplied points</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
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
            <span className="font-medium text-masters-charcoal">Wolf:</span> A strategic game where players take turns selecting partners based on tee shots. Going "Lone Wolf" multiplies the stakes.
          </p>
        </motion.div>
      </div>
    </div>
  );
}