'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Calculator, TrendingUp } from 'lucide-react';

export default function StrokePlayDemoMinimal() {
  const [currentHole, setCurrentHole] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const holes = [
    { hole: 1, par: 4, strokes: 5, score: '+1' },
    { hole: 2, par: 3, strokes: 3, score: 'E' },
    { hole: 3, par: 5, strokes: 6, score: '+1' },
    { hole: 4, par: 4, strokes: 3, score: '-1' },
    { hole: 5, par: 4, strokes: 4, score: 'E' },
    { hole: 6, par: 3, strokes: 4, score: '+1' },
    { hole: 7, par: 4, strokes: 5, score: '+1' },
    { hole: 8, par: 5, strokes: 5, score: 'E' },
    { hole: 9, par: 4, strokes: 4, score: 'E' },
  ];

  const calculateTotalScore = (throughHole: number) => {
    let total = 0;
    let parTotal = 0;
    for (let i = 0; i < throughHole; i++) {
      total += holes[i].strokes;
      parTotal += holes[i].par;
    }
    return { total, parTotal, relative: total - parTotal };
  };

  useEffect(() => {
    if (isPlaying && currentHole < 9) {
      const timer = setTimeout(() => {
        setCurrentHole(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (isPlaying && currentHole === 9) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentHole]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentHole === 9) {
      setCurrentHole(1);
    }
  };

  const handleReset = () => {
    setCurrentHole(1);
    setIsPlaying(false);
  };

  const currentScore = calculateTotalScore(currentHole);
  const formatRelativeScore = (score: number) => {
    if (score === 0) return 'E';
    return score > 0 ? `+${score}` : `${score}`;
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-masters-pine/10 overflow-hidden">
      {/* Header */}
      <div className="bg-masters-pine/5 border-b border-masters-pine/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-masters-charcoal">Stroke Play Format</h3>
            <p className="text-sm text-masters-slate mt-1">Count every stroke, lowest total wins</p>
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
          <div className="flex items-center justify-between text-xs text-masters-slate mb-2">
            <span>Through {currentHole} holes</span>
            <span className="font-medium text-masters-pine">
              Score: {formatRelativeScore(currentScore.relative)}
            </span>
          </div>
          <div className="h-1 bg-masters-pine/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-masters-pine"
              animate={{ width: `${(currentHole / 9) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Scorecard */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-masters-pine/5 to-masters-pine/10 rounded-xl p-4">
              <h4 className="text-sm font-medium text-masters-pine mb-3">Scorecard</h4>
              
              {/* Holes Grid */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-masters-pine/20">
                      <th className="text-left py-2 text-masters-charcoal">Hole</th>
                      {holes.map(h => (
                        <th key={h.hole} className="text-center px-2 py-2 text-masters-charcoal">
                          {h.hole}
                        </th>
                      ))}
                      <th className="text-center px-2 py-2 text-masters-charcoal font-bold">OUT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-masters-pine/10">
                      <td className="py-2 text-masters-slate font-medium">Par</td>
                      {holes.map(h => (
                        <td key={h.hole} className="text-center px-2 py-2 text-masters-slate">
                          {h.par}
                        </td>
                      ))}
                      <td className="text-center px-2 py-2 font-bold text-masters-charcoal">
                        {holes.reduce((sum, h) => sum + h.par, 0)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-masters-slate font-medium">Score</td>
                      {holes.map((h, index) => {
                        const isPlayed = index < currentHole;
                        const isCurrent = index === currentHole - 1;
                        
                        return (
                          <td key={h.hole} className="text-center px-2 py-2">
                            {isPlayed && (
                              <motion.div
                                className={`inline-block px-1.5 py-0.5 rounded ${
                                  isCurrent ? 'bg-masters-gold/30 border border-masters-gold' :
                                  h.strokes < h.par ? 'bg-green-100 text-green-700' :
                                  h.strokes > h.par ? 'bg-red-100 text-red-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}
                                initial={{ scale: 0 }}
                                animate={{ scale: isCurrent ? 1.1 : 1 }}
                                transition={{ type: 'spring' }}
                              >
                                {h.strokes}
                              </motion.div>
                            )}
                          </td>
                        );
                      })}
                      <td className="text-center px-2 py-2 font-bold text-masters-pine">
                        {currentScore.total > 0 && currentScore.total}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Running Total */}
              <motion.div
                className="mt-4 p-3 bg-masters-pine text-white rounded-lg"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 0.5 }}
                key={currentScore.total}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator size={16} />
                    <span className="text-sm font-medium">Total Strokes</span>
                  </div>
                  <div className="text-xl font-bold">
                    {currentScore.total}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 text-masters-gold/80 text-xs">
                  <span>Par: {currentScore.parTotal}</span>
                  <span className="font-medium">
                    {formatRelativeScore(currentScore.relative)}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Current Hole Detail */}
            {currentHole <= 9 && (
              <motion.div
                className="p-4 bg-masters-sand/20 rounded-lg"
                key={currentHole}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-sm font-medium text-masters-charcoal">
                    Hole {currentHole} Analysis
                  </h5>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    holes[currentHole - 1].strokes < holes[currentHole - 1].par 
                      ? 'bg-green-100 text-green-700' :
                    holes[currentHole - 1].strokes > holes[currentHole - 1].par 
                      ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                  }`}>
                    {holes[currentHole - 1].strokes < holes[currentHole - 1].par ? 'Birdie' :
                     holes[currentHole - 1].strokes > holes[currentHole - 1].par ? 'Bogey' : 'Par'}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-xs text-masters-slate">Par</div>
                    <div className="text-lg font-bold text-masters-charcoal">
                      {holes[currentHole - 1].par}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-masters-slate">Strokes</div>
                    <div className="text-lg font-bold text-masters-pine">
                      {holes[currentHole - 1].strokes}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-masters-slate">Score</div>
                    <div className="text-lg font-bold text-masters-charcoal">
                      {holes[currentHole - 1].score}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Info Panel */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <h4 className="text-2xl font-light text-masters-charcoal mb-3">
                How Stroke Play Works
              </h4>
              <p className="text-masters-slate mb-6">
                The purest form of golf. Count every stroke taken during the round.
                Lowest total score wins. No hiding from bad holes!
              </p>

              {/* Scoring Examples */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h5 className="text-sm font-medium text-masters-charcoal mb-2">
                  Scoring Terms
                </h5>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span className="text-sm text-masters-slate">Albatross</span>
                    <span className="text-sm font-medium text-green-600">-3</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span className="text-sm text-masters-slate">Eagle</span>
                    <span className="text-sm font-medium text-green-600">-2</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span className="text-sm text-masters-slate">Birdie</span>
                    <span className="text-sm font-medium text-green-600">-1</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span className="text-sm text-masters-slate">Par</span>
                    <span className="text-sm font-medium text-gray-600">E</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span className="text-sm text-masters-slate">Bogey</span>
                    <span className="text-sm font-medium text-red-600">+1</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span className="text-sm text-masters-slate">Double Bogey</span>
                    <span className="text-sm font-medium text-red-600">+2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Points */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <TrendingUp size={16} className="text-masters-pine mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-masters-charcoal">Consistency Matters</div>
                  <div className="text-xs text-masters-slate">
                    One bad hole can ruin your score - every stroke counts
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <TrendingUp size={16} className="text-masters-pine mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-masters-charcoal">Mental Game</div>
                  <div className="text-xs text-masters-slate">
                    Stay focused after bad holes - can't give up strokes
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <TrendingUp size={16} className="text-masters-pine mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-masters-charcoal">Course Management</div>
                  <div className="text-xs text-masters-slate">
                    Play smart, avoid big numbers, know when to be aggressive
                  </div>
                </div>
              </div>
            </div>

            {/* Final Score Summary (when complete) */}
            {currentHole === 9 && (
              <motion.div
                className="mt-6 p-4 bg-masters-gold/20 border border-masters-gold rounded-lg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-masters-pine">
                    {currentScore.total}
                  </div>
                  <div className="text-sm text-masters-slate mt-1">
                    Total Strokes
                  </div>
                  <div className="text-lg font-medium text-masters-charcoal mt-2">
                    {formatRelativeScore(currentScore.relative)} to Par
                  </div>
                </div>
              </motion.div>
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
            <span className="font-medium text-masters-charcoal">Stroke Play:</span> The standard tournament format. Every shot matters, no room for error. True test of golf skill.
          </p>
        </motion.div>
      </div>
    </div>
  );
}