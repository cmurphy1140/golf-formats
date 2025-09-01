'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Users, ArrowRightLeft } from 'lucide-react';

export default function AlternateShotDemoMinimal() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      title: "Player A Tees Off",
      description: "First player hits from the tee on odd holes",
      currentPlayer: 'A',
      shotFrom: 'Tee',
      shotTo: 'Fairway',
      distance: 260,
      position: { x: 50, y: 70 }
    },
    {
      title: "Player B Hits Second Shot",
      description: "Partner plays from where ball lies",
      currentPlayer: 'B',
      shotFrom: 'Fairway',
      shotTo: 'Green',
      distance: 150,
      position: { x: 50, y: 30 }
    },
    {
      title: "Player A Putts",
      description: "Back to first player for the putt",
      currentPlayer: 'A',
      shotFrom: 'Green',
      shotTo: 'Near Pin',
      distance: 25,
      position: { x: 52, y: 22 }
    },
    {
      title: "Player B Finishes",
      description: "Partner sinks the putt for par",
      currentPlayer: 'B',
      shotFrom: 'Near Pin',
      shotTo: 'Hole',
      distance: 3,
      position: { x: 50, y: 20 },
      holed: true
    },
    {
      title: "Next Hole - Players Switch",
      description: "Player B tees off on even holes",
      currentPlayer: 'B',
      shotFrom: 'Tee',
      shotTo: 'Fairway',
      distance: 240,
      position: { x: 48, y: 68 },
      newHole: true
    }
  ];

  useEffect(() => {
    if (isPlaying && step < steps.length - 1) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 2500);
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

  const currentStep = steps[step];
  const shotCount = step < 4 ? step + 1 : 1;
  const currentHole = step < 4 ? 1 : 2;

  return (
    <div className="w-full bg-white rounded-2xl border border-masters-pine/10 overflow-hidden">
      {/* Header */}
      <div className="bg-masters-pine/5 border-b border-masters-pine/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-masters-charcoal">Alternate Shot Format</h3>
            <p className="text-sm text-masters-slate mt-1">Partners alternate hitting the same ball</p>
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
          {/* Golf Hole Visualization */}
          <div className="relative">
            <div className="relative h-[400px] bg-gradient-to-b from-masters-pine/5 to-masters-pine/10 rounded-xl overflow-hidden">
              {/* Grid Pattern */}
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
              <div
                className="absolute left-1/2 transform -translate-x-1/2"
                style={{
                  width: '120px',
                  height: '100%',
                  background: 'linear-gradient(to top, rgba(0, 75, 54, 0.15), rgba(0, 75, 54, 0.05))',
                  clipPath: 'polygon(35% 100%, 65% 100%, 75% 0%, 25% 0%)'
                }}
              />

              {/* Tee Box */}
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-20 h-12 bg-masters-pine/20 rounded-sm flex items-center justify-center">
                  <div className="text-xs font-medium text-masters-pine">TEE</div>
                </div>
              </motion.div>

              {/* Green */}
              <motion.div
                className="absolute top-12 left-1/2 transform -translate-x-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-28 h-28 bg-gradient-to-br from-masters-pine/10 to-masters-pine/20 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-900 rounded-full" />
                  <div className="absolute -top-8 w-0.5 h-8 bg-gray-600">
                    <div className="absolute -top-2 -left-2">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="red" opacity="0.8">
                        <polygon points="0,0 10,1 8,4 0,5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Ball Position */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  className="absolute"
                  style={{
                    left: `${currentStep.position.x}%`,
                    bottom: `${currentStep.position.y}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring' }}
                >
                  <div className="relative">
                    {/* Ball */}
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      currentStep.currentPlayer === 'A' 
                        ? 'bg-blue-500/30 border-blue-500' 
                        : 'bg-orange-500/30 border-orange-500'
                    }`} />
                    
                    {/* Player Label */}
                    <motion.div
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className={`text-xs font-bold ${
                        currentStep.currentPlayer === 'A' ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        Player {currentStep.currentPlayer}
                      </span>
                    </motion.div>

                    {/* Shot Arc (if not holed) */}
                    {!currentStep.holed && step > 0 && (
                      <svg className="absolute inset-0 w-32 h-32 -left-14 -top-14 pointer-events-none">
                        <motion.path
                          d={`M 64 64 Q 32 32, ${steps[step - 1].position.x * 1.28} ${128 - steps[step - 1].position.y * 1.28}`}
                          stroke={currentStep.currentPlayer === 'A' ? '#3B82F6' : '#F97316'}
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4 4"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1 }}
                        />
                      </svg>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Shot Trail */}
              {step > 0 && !currentStep.newHole && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {steps.slice(0, step).map((s, i) => {
                    if (i === 0) return null;
                    const prevStep = steps[i - 1];
                    return (
                      <motion.line
                        key={i}
                        x1={`${prevStep.position.x}%`}
                        y1={`${100 - prevStep.position.y}%`}
                        x2={`${s.position.x}%`}
                        y2={`${100 - s.position.y}%`}
                        stroke="#004B36"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        opacity="0.3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    );
                  })}
                </svg>
              )}
            </div>

            {/* Shot Counter */}
            <div className="mt-4 flex justify-center">
              <div className="px-4 py-2 bg-masters-pine/10 rounded-lg">
                <span className="text-sm font-medium text-masters-charcoal">
                  Hole {currentHole} • Shot {shotCount}
                </span>
              </div>
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
                <h4 className="text-2xl font-light text-masters-charcoal mb-3">
                  {currentStep.title}
                </h4>

                <p className="text-masters-slate mb-6">
                  {currentStep.description}
                </p>

                {/* Shot Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-masters-slate">From:</span>
                      <span className="text-sm font-medium text-masters-charcoal">{currentStep.shotFrom}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-masters-slate">To:</span>
                      <span className="text-sm font-medium text-masters-charcoal">{currentStep.shotTo}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-masters-slate">Distance:</span>
                      <span className="text-sm font-medium text-masters-pine">{currentStep.distance} yards</span>
                    </div>
                  </div>
                </div>

                {/* Player Rotation Display */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <motion.div
                    className={`px-4 py-3 rounded-lg border-2 ${
                      currentStep.currentPlayer === 'A' 
                        ? 'bg-blue-50 border-blue-500' 
                        : 'bg-white border-gray-300'
                    }`}
                    animate={{ scale: currentStep.currentPlayer === 'A' ? 1.05 : 1 }}
                  >
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Player A</div>
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Users size={16} className="text-white" />
                      </div>
                    </div>
                  </motion.div>

                  <ArrowRightLeft size={20} className="text-masters-pine" />

                  <motion.div
                    className={`px-4 py-3 rounded-lg border-2 ${
                      currentStep.currentPlayer === 'B' 
                        ? 'bg-orange-50 border-orange-500' 
                        : 'bg-white border-gray-300'
                    }`}
                    animate={{ scale: currentStep.currentPlayer === 'B' ? 1.05 : 1 }}
                  >
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Player B</div>
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <Users size={16} className="text-white" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Key Rules */}
                <div className="bg-masters-pine/5 rounded-lg p-4">
                  <h5 className="text-sm font-medium text-masters-charcoal mb-3">Key Rules</h5>
                  <div className="space-y-2 text-xs text-masters-slate">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-masters-pine rounded-full mt-1"></div>
                      <span>Partners alternate shots with one ball</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-masters-pine rounded-full mt-1"></div>
                      <span>Player A tees off odd holes, Player B even holes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-masters-pine rounded-full mt-1"></div>
                      <span>Penalties don't change the rotation</span>
                    </div>
                  </div>
                </div>

                {currentStep.holed && (
                  <motion.div
                    className="mt-4 p-4 bg-masters-gold/20 rounded-lg text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    <div className="text-lg font-bold text-masters-pine">
                      Hole Complete! 
                    </div>
                    <div className="text-sm text-masters-slate mt-1">
                      Team scores 4 (Par)
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
            <span className="font-medium text-masters-charcoal">Alternate Shot (Foursomes):</span> True partnership golf where players alternate hitting the same ball. Requires strategy and teamwork.
          </p>
        </motion.div>
      </div>
    </div>
  );
}