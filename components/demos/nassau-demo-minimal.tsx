'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Trophy, DollarSign } from 'lucide-react';

export default function NassauDemoMinimal() {
  const [currentHole, setCurrentHole] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const holes = [
    { hole: 1, p1Score: 4, p2Score: 5, winner: 'P1' },
    { hole: 2, p1Score: 3, p2Score: 3, winner: 'tie' },
    { hole: 3, p1Score: 5, p2Score: 4, winner: 'P2' },
    { hole: 4, p1Score: 4, p2Score: 4, winner: 'tie' },
    { hole: 5, p1Score: 3, p2Score: 4, winner: 'P1' },
    { hole: 6, p1Score: 5, p2Score: 4, winner: 'P2' },
    { hole: 7, p1Score: 4, p2Score: 5, winner: 'P1' },
    { hole: 8, p1Score: 4, p2Score: 3, winner: 'P2' },
    { hole: 9, p1Score: 4, p2Score: 4, winner: 'tie' },
    // Back 9
    { hole: 10, p1Score: 5, p2Score: 4, winner: 'P2' },
    { hole: 11, p1Score: 3, p2Score: 3, winner: 'tie' },
    { hole: 12, p1Score: 4, p2Score: 5, winner: 'P1' },
    { hole: 13, p1Score: 4, p2Score: 4, winner: 'tie' },
    { hole: 14, p1Score: 5, p2Score: 4, winner: 'P2' },
    { hole: 15, p1Score: 4, p2Score: 3, winner: 'P2' },
    { hole: 16, p1Score: 4, p2Score: 5, winner: 'P1' },
    { hole: 17, p1Score: 3, p2Score: 4, winner: 'P1' },
    { hole: 18, p1Score: 5, p2Score: 4, winner: 'P2' },
  ];

  const calculateScore = (endHole: number) => {
    const relevantHoles = holes.slice(0, endHole);
    let p1Wins = 0;
    let p2Wins = 0;
    
    relevantHoles.forEach(hole => {
      if (hole.winner === 'P1') p1Wins++;
      if (hole.winner === 'P2') p2Wins++;
    });
    
    return { p1Wins, p2Wins };
  };

  const getFrontNineScore = () => calculateScore(9);
  const getBackNineScore = () => {
    const backHoles = holes.slice(9, currentHole);
    let p1Wins = 0;
    let p2Wins = 0;
    
    backHoles.forEach(hole => {
      if (hole.winner === 'P1') p1Wins++;
      if (hole.winner === 'P2') p2Wins++;
    });
    
    return { p1Wins, p2Wins };
  };
  const getOverallScore = () => calculateScore(currentHole);

  useEffect(() => {
    if (isPlaying && currentHole < 18) {
      const timer = setTimeout(() => {
        setCurrentHole(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (isPlaying && currentHole === 18) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentHole]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentHole === 18) {
      setCurrentHole(1);
    }
  };

  const handleReset = () => {
    setCurrentHole(1);
    setIsPlaying(false);
  };

  const frontScore = getFrontNineScore();
  const backScore = getBackNineScore();
  const overallScore = getOverallScore();

  return (
    <div className="w-full bg-white rounded-2xl border border-masters-pine/10 overflow-hidden">
      {/* Header */}
      <div className="bg-masters-pine/5 border-b border-masters-pine/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-masters-charcoal">Nassau Format</h3>
            <p className="text-sm text-masters-slate mt-1">Three matches in one round</p>
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

        {/* Hole Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-masters-slate mb-2">
            <span>Hole {currentHole} of 18</span>
            <span>{currentHole <= 9 ? 'Front 9' : 'Back 9'}</span>
          </div>
          <div className="h-1 bg-masters-pine/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-masters-pine"
              animate={{ width: `${(currentHole / 18) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Match Visualization */}
          <div className="space-y-4">
            {/* Three Bets Display */}
            <div className="space-y-3">
              {/* Front 9 */}
              <motion.div 
                className={`p-4 rounded-lg border ${
                  currentHole <= 9 ? 'bg-masters-gold/10 border-masters-gold' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-masters-pine" />
                    <span className="font-medium text-masters-charcoal">Front 9</span>
                  </div>
                  {currentHole >= 9 && (
                    <div className="text-sm font-bold text-masters-pine">
                      {frontScore.p1Wins > frontScore.p2Wins ? 'Player 1 Wins' :
                       frontScore.p2Wins > frontScore.p1Wins ? 'Player 2 Wins' : 'Tied'}
                    </div>
                  )}
                </div>
                
                {/* Hole indicators */}
                <div className="flex gap-1">
                  {Array.from({ length: 9 }, (_, i) => {
                    const hole = holes[i];
                    const isPlayed = i < currentHole;
                    
                    return (
                      <motion.div
                        key={i}
                        className={`flex-1 h-6 rounded flex items-center justify-center text-xs font-medium ${
                          !isPlayed ? 'bg-gray-100 text-gray-400' :
                          hole.winner === 'P1' ? 'bg-blue-500 text-white' :
                          hole.winner === 'P2' ? 'bg-red-500 text-white' :
                          'bg-gray-300 text-gray-600'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: isPlayed ? 1 : 0.3,
                          scale: isPlayed ? 1 : 0.95
                        }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {i + 1}
                      </motion.div>
                    );
                  })}
                </div>
                
                {currentHole >= 1 && currentHole <= 9 && (
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-blue-600 font-medium">P1: {calculateScore(Math.min(currentHole, 9)).p1Wins}</span>
                    <span className="text-red-600 font-medium">P2: {calculateScore(Math.min(currentHole, 9)).p2Wins}</span>
                  </div>
                )}
              </motion.div>

              {/* Back 9 */}
              <motion.div 
                className={`p-4 rounded-lg border ${
                  currentHole > 9 ? 'bg-masters-gold/10 border-masters-gold' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-masters-pine" />
                    <span className="font-medium text-masters-charcoal">Back 9</span>
                  </div>
                  {currentHole === 18 && (
                    <div className="text-sm font-bold text-masters-pine">
                      {backScore.p1Wins > backScore.p2Wins ? 'Player 1 Wins' :
                       backScore.p2Wins > backScore.p1Wins ? 'Player 2 Wins' : 'Tied'}
                    </div>
                  )}
                </div>
                
                {/* Hole indicators */}
                <div className="flex gap-1">
                  {Array.from({ length: 9 }, (_, i) => {
                    const holeIndex = i + 9;
                    const hole = holes[holeIndex];
                    const isPlayed = holeIndex < currentHole;
                    
                    return (
                      <motion.div
                        key={holeIndex}
                        className={`flex-1 h-6 rounded flex items-center justify-center text-xs font-medium ${
                          !isPlayed ? 'bg-gray-100 text-gray-400' :
                          hole.winner === 'P1' ? 'bg-blue-500 text-white' :
                          hole.winner === 'P2' ? 'bg-red-500 text-white' :
                          'bg-gray-300 text-gray-600'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: isPlayed ? 1 : 0.3,
                          scale: isPlayed ? 1 : 0.95
                        }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {holeIndex + 1}
                      </motion.div>
                    );
                  })}
                </div>
                
                {currentHole > 9 && (
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-blue-600 font-medium">P1: {backScore.p1Wins}</span>
                    <span className="text-red-600 font-medium">P2: {backScore.p2Wins}</span>
                  </div>
                )}
              </motion.div>

              {/* Overall */}
              <motion.div 
                className="p-4 bg-masters-pine text-white rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Trophy size={16} />
                    <span className="font-medium">Overall (18 Holes)</span>
                  </div>
                  {currentHole === 18 && (
                    <div className="text-sm font-bold text-masters-gold">
                      {overallScore.p1Wins > overallScore.p2Wins ? 'Player 1 Wins' :
                       overallScore.p2Wins > overallScore.p1Wins ? 'Player 2 Wins' : 'Tied'}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-blue-300">P1: {overallScore.p1Wins}</span>
                  <span className="text-masters-gold">vs</span>
                  <span className="text-red-300">P2: {overallScore.p2Wins}</span>
                </div>
              </motion.div>
            </div>

            {/* Current Hole Detail */}
            {currentHole <= 18 && (
              <motion.div
                className="p-4 bg-masters-sand/20 rounded-lg"
                key={currentHole}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                <div className="text-sm font-medium text-masters-charcoal mb-2">
                  Hole {currentHole} Result
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-blue-600">P1: {holes[currentHole - 1].p1Score}</span>
                    <span className="mx-2 text-masters-slate">vs</span>
                    <span className="text-red-600">P2: {holes[currentHole - 1].p2Score}</span>
                  </div>
                  <div className="font-bold text-masters-pine">
                    {holes[currentHole - 1].winner === 'tie' ? 'Halved' :
                     holes[currentHole - 1].winner === 'P1' ? 'P1 Wins' : 'P2 Wins'}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Info Panel */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <h4 className="text-2xl font-light text-masters-charcoal mb-3">
                How Nassau Works
              </h4>
              <p className="text-masters-slate mb-6">
                Nassau creates three separate matches: Front 9, Back 9, and Overall 18 holes. 
                Each is typically played for equal stakes.
              </p>

              {/* Betting Structure */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded">
                  <span className="text-sm font-medium text-masters-charcoal">Front 9</span>
                  <span className="text-sm text-masters-pine font-bold">$10</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded">
                  <span className="text-sm font-medium text-masters-charcoal">Back 9</span>
                  <span className="text-sm text-masters-pine font-bold">$10</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded">
                  <span className="text-sm font-medium text-masters-charcoal">Overall</span>
                  <span className="text-sm text-masters-pine font-bold">$10</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-masters-charcoal">Maximum Risk</span>
                    <span className="text-sm text-masters-pine font-bold">$30</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-masters-pine rounded-full mt-1.5"></div>
                <div>
                  <div className="font-medium text-masters-charcoal text-sm">Press Option</div>
                  <div className="text-xs text-masters-slate">When down, start a new bet from current hole</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-masters-pine rounded-full mt-1.5"></div>
                <div>
                  <div className="font-medium text-masters-charcoal text-sm">Automatic Press</div>
                  <div className="text-xs text-masters-slate">New bet starts when 2 holes down</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-masters-pine rounded-full mt-1.5"></div>
                <div>
                  <div className="font-medium text-masters-charcoal text-sm">Match Play Scoring</div>
                  <div className="text-xs text-masters-slate">Each hole is won, lost, or halved</div>
                </div>
              </div>
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
            <span className="font-medium text-masters-charcoal">Nassau:</span> The most popular golf betting game. Three matches in one round keeps the competition alive throughout.
          </p>
        </motion.div>
      </div>
    </div>
  );
}