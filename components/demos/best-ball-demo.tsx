'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Users,
  Flag,
  ChevronRight,
  CheckCircle2,
  Wind
} from 'lucide-react';

interface Player {
  id: string;
  name: string;
  color: string;
  team: 'A' | 'B';
  scores: number[];
  currentScore?: number;
  ballPosition?: { x: number; y: number };
  shotTrajectory?: { x: number; y: number }[];
  clubSelection?: string;
  distance?: number;
}

interface HoleData {
  hole: number;
  par: number;
  yards: number;
  teamAScore?: number;
  teamBScore?: number;
  winner?: 'A' | 'B' | 'tie';
  bestPlayerA?: string;
  bestPlayerB?: string;
}

// Realistic club distances (yards)
const CLUB_DISTANCES = {
  driver: { min: 220, max: 280 },
  '3-wood': { min: 200, max: 240 },
  '5-iron': { min: 150, max: 180 },
  '7-iron': { min: 130, max: 160 },
  '9-iron': { min: 100, max: 130 },
  wedge: { min: 60, max: 100 },
  putter: { min: 0, max: 50 }
};

export default function BestBallDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentHole, setCurrentHole] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentShot, setCurrentShot] = useState(0);
  const [holes, setHoles] = useState<HoleData[]>([]);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDirection, setWindDirection] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const [players, setPlayers] = useState<Player[]>([
    { id: 'p1', name: 'Player 1', color: '#004B36', team: 'A', scores: [] },
    { id: 'p2', name: 'Player 2', color: '#008556', team: 'A', scores: [] },
    { id: 'p3', name: 'Player 3', color: '#4A5247', team: 'B', scores: [] },
    { id: 'p4', name: 'Player 4', color: '#2C312E', team: 'B', scores: [] },
  ]);

  const holesData = [
    { hole: 1, par: 4, yards: 425 },
    { hole: 2, par: 3, yards: 185 },
    { hole: 3, par: 5, yards: 540 },
    { hole: 4, par: 4, yards: 380 },
    { hole: 5, par: 4, yards: 410 },
    { hole: 6, par: 3, yards: 165 },
    { hole: 7, par: 4, yards: 445 },
    { hole: 8, par: 5, yards: 520 },
    { hole: 9, par: 4, yards: 395 }
  ];

  const demoSteps = [
    { 
      title: "Tee Shot",
      description: "All players hit their drives from the tee box",
      action: "teeOff"
    },
    {
      title: "Approach Shot",
      description: "Players hit their approach shots to the green",
      action: "approach"
    },
    {
      title: "Putting",
      description: "Players putt to complete the hole",
      action: "putting"
    },
    {
      title: "Score Recording",
      description: "Individual scores are recorded for each player",
      action: "recordScores"
    },
    {
      title: "Best Ball Selection",
      description: "The lowest score from each team is selected",
      action: "selectBest"
    },
    {
      title: "Hole Result",
      description: "Teams compare their best scores",
      action: "compareTeams"
    }
  ];

  // Generate realistic shot trajectory
  const generateTrajectory = (startX: number, startY: number, endX: number, endY: number, club: string) => {
    const points = [];
    const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const steps = 30;
    
    // Realistic ball flight parameters
    const maxHeight = club === 'driver' ? 35 : club === 'wedge' ? 50 : 25;
    const apexPosition = club === 'wedge' ? 0.6 : 0.5; // Wedges peak later
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = startX + (endX - startX) * t;
      
      // Parabolic trajectory with realistic ball flight
      let height;
      if (t < apexPosition) {
        // Ascending phase
        height = maxHeight * Math.sin((t / apexPosition) * Math.PI / 2);
      } else {
        // Descending phase
        const descendT = (t - apexPosition) / (1 - apexPosition);
        height = maxHeight * Math.cos(descendT * Math.PI / 2);
      }
      
      // Add wind effect
      const windEffect = windSpeed * t * 0.5;
      const y = startY + (endY - startY) * t - height + windEffect * Math.sin(windDirection * Math.PI / 180);
      
      points.push({ x, y });
    }
    
    return points;
  };

  // Simulate realistic shot
  const simulateShot = (playerIndex: number, shotType: string) => {
    const player = players[playerIndex];
    const holeData = holesData[currentHole - 1];
    
    let startX = 0;
    let startY = 50;
    let endX = 0;
    let endY = 50;
    let club = 'driver';
    let distance = 0;
    
    if (shotType === 'tee') {
      startX = 10;
      endX = 50 + (Math.random() - 0.5) * 20;
      club = holeData.par === 3 ? '5-iron' : 'driver';
      const clubData = CLUB_DISTANCES[club as keyof typeof CLUB_DISTANCES];
      distance = clubData.min + Math.random() * (clubData.max - clubData.min);
    } else if (shotType === 'approach') {
      startX = player.ballPosition?.x || 50;
      startY = player.ballPosition?.y || 50;
      endX = 85 + (Math.random() - 0.5) * 10;
      endY = 50 + (Math.random() - 0.5) * 15;
      club = '7-iron';
      distance = 120 + Math.random() * 40;
    } else if (shotType === 'putt') {
      startX = player.ballPosition?.x || 85;
      startY = player.ballPosition?.y || 50;
      endX = 92;
      endY = 50;
      club = 'putter';
      distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    }
    
    const trajectory = generateTrajectory(startX, startY, endX, endY, club);
    
    setPlayers(prev => {
      const updated = [...prev];
      updated[playerIndex] = {
        ...updated[playerIndex],
        ballPosition: { x: endX, y: endY },
        shotTrajectory: trajectory,
        clubSelection: club,
        distance: Math.round(distance)
      };
      return updated;
    });
    
    return trajectory;
  };

  useEffect(() => {
    // Set random wind conditions for each hole
    if (currentStep === 0) {
      setWindSpeed(Math.random() * 15);
      setWindDirection(Math.random() * 360);
    }
  }, [currentHole, currentStep]);

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        if (currentStep < demoSteps.length - 1) {
          setCurrentStep(currentStep + 1);
          executeStep(currentStep + 1);
        } else if (currentHole < holesData.length) {
          // Move to next hole
          setCurrentHole(currentHole + 1);
          setCurrentStep(0);
          setCurrentShot(0);
          executeStep(0);
        } else {
          // Demo complete
          setIsPlaying(false);
        }
      }, currentStep < 3 ? 3000 : 2000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentStep, currentHole]);

  const executeStep = (step: number) => {
    const action = demoSteps[step].action;
    
    switch(action) {
      case 'teeOff':
        animateTeeShots();
        break;
      case 'approach':
        animateApproachShots();
        break;
      case 'putting':
        animatePutts();
        break;
      case 'recordScores':
        generateScores();
        break;
      case 'selectBest':
        selectBestScores();
        break;
      case 'compareTeams':
        compareAndScore();
        break;
    }
  };

  const animateTeeShots = () => {
    players.forEach((_, index) => {
      setTimeout(() => {
        simulateShot(index, 'tee');
        setCurrentShot(index);
      }, index * 500);
    });
  };

  const animateApproachShots = () => {
    players.forEach((_, index) => {
      setTimeout(() => {
        simulateShot(index, 'approach');
        setCurrentShot(index);
      }, index * 500);
    });
  };

  const animatePutts = () => {
    players.forEach((_, index) => {
      setTimeout(() => {
        simulateShot(index, 'putt');
        setCurrentShot(index);
      }, index * 500);
    });
  };

  const generateScores = () => {
    const par = holesData[currentHole - 1].par;
    setPlayers(prev => prev.map(player => {
      const variance = Math.floor(Math.random() * 5) - 2;
      const score = Math.max(1, par + variance);
      return {
        ...player,
        currentScore: score,
        scores: [...player.scores, score]
      };
    }));
  };

  const selectBestScores = () => {
    const teamAPlayers = players.filter(p => p.team === 'A');
    const teamBPlayers = players.filter(p => p.team === 'B');
    
    const bestA = Math.min(...teamAPlayers.map(p => p.currentScore || 99));
    const bestB = Math.min(...teamBPlayers.map(p => p.currentScore || 99));
    
    const bestPlayerA = teamAPlayers.find(p => p.currentScore === bestA);
    const bestPlayerB = teamBPlayers.find(p => p.currentScore === bestB);
    
    setHoles(prev => [...prev, {
      ...holesData[currentHole - 1],
      teamAScore: bestA,
      teamBScore: bestB,
      bestPlayerA: bestPlayerA?.name,
      bestPlayerB: bestPlayerB?.name
    }]);
  };

  const compareAndScore = () => {
    setHoles(prev => {
      const updated = [...prev];
      const lastHole = updated[updated.length - 1];
      if (lastHole.teamAScore && lastHole.teamBScore) {
        if (lastHole.teamAScore < lastHole.teamBScore) {
          lastHole.winner = 'A';
        } else if (lastHole.teamBScore < lastHole.teamAScore) {
          lastHole.winner = 'B';
        } else {
          lastHole.winner = 'tie';
        }
      }
      return updated;
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentStep === 0 && currentHole === 1) {
      executeStep(0);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentHole(1);
    setCurrentStep(0);
    setCurrentShot(0);
    setHoles([]);
    setPlayers(prev => prev.map(p => ({ 
      ...p, 
      scores: [], 
      currentScore: undefined, 
      ballPosition: undefined,
      shotTrajectory: undefined,
      clubSelection: undefined,
      distance: undefined
    })));
  };

  const getScoreDisplay = (score: number, par: number) => {
    const diff = score - par;
    if (diff === 0) return { text: 'PAR', color: 'text-gray-600' };
    if (diff === -1) return { text: 'BIRDIE', color: 'text-green-600' };
    if (diff === -2) return { text: 'EAGLE', color: 'text-green-700' };
    if (diff === 1) return { text: 'BOGEY', color: 'text-orange-600' };
    if (diff === 2) return { text: 'DOUBLE', color: 'text-red-600' };
    if (diff < -2) return { text: `${Math.abs(diff)} UNDER`, color: 'text-green-800' };
    return { text: `+${diff}`, color: 'text-red-700' };
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold">Best Ball Interactive Tutorial</h3>
            <p className="text-gray-300 mt-1">Professional golf format demonstration</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePlayPause}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur px-4 py-2 rounded-lg transition-all"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span className="text-sm font-medium">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-medium">Start</span>
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur px-4 py-2 rounded-lg transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm font-medium">Reset</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/10 rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-green-400 to-green-500 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentHole - 1) * 6 + currentStep) / (holesData.length * 6) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Main Demo Area */}
      <div className="bg-gray-50 p-8">
        {/* Hole Information Bar */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Flag className="w-5 h-5 text-red-500" />
                <span className="font-bold text-gray-900">
                  Hole {currentHole}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">Par {holesData[currentHole - 1].par}</span>
                <span className="text-gray-600">{holesData[currentHole - 1].yards} yards</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Wind className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600">{Math.round(windSpeed)} mph</span>
                <span className="text-gray-500" style={{ transform: `rotate(${windDirection}deg)` }}>↗</span>
              </div>
              <div className="text-sm text-gray-500">
                Step {currentStep + 1} of {demoSteps.length}
              </div>
            </div>
          </div>
        </div>

        {/* Golf Course Visualization */}
        <div className="relative bg-gradient-to-b from-green-100 via-green-50 to-green-100 rounded-2xl p-4 mb-8 overflow-hidden"
             style={{ height: '400px' }}
             ref={canvasRef}>
          
          {/* Fairway */}
          <div className="absolute inset-x-0 top-1/4 bottom-1/4">
            <div className="h-full bg-gradient-to-r from-green-200/30 via-green-300/40 to-green-200/30 rounded-full blur-xl" />
          </div>

          {/* Tee Box */}
          <div className="absolute left-[8%] top-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="w-20 h-24 bg-green-600/30 rounded-lg backdrop-blur" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-green-800 uppercase tracking-wider">TEE</span>
              </div>
            </div>
          </div>

          {/* Green */}
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-green-500/40 to-green-600/40 rounded-full backdrop-blur" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Flag className="w-8 h-8 text-red-600 drop-shadow-lg" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                <span className="text-xs font-bold text-green-800 uppercase tracking-wider">GREEN</span>
              </div>
            </div>
          </div>

          {/* Distance Markers */}
          <div className="absolute left-1/4 top-3/4 text-xs text-gray-600 font-medium">
            250 yds
          </div>
          <div className="absolute left-1/2 top-3/4 text-xs text-gray-600 font-medium">
            150 yds
          </div>
          <div className="absolute left-3/4 top-3/4 text-xs text-gray-600 font-medium">
            50 yds
          </div>

          {/* Player Balls and Trajectories */}
          <AnimatePresence>
            {players.map((player, index) => (
              <div key={player.id}>
                {/* Ball Trajectory */}
                {player.shotTrajectory && currentStep < 3 && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <motion.path
                      d={`M ${player.shotTrajectory.map((p) => 
                        `${(p.x / 100) * (canvasRef.current?.offsetWidth || 400)} ${(p.y / 100) * (canvasRef.current?.offsetHeight || 200)}`
                      ).join(' L ')}`}
                      fill="none"
                      stroke={player.color}
                      strokeWidth="1"
                      strokeDasharray="4 2"
                      opacity="0.6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </svg>
                )}
                
                {/* Golf Ball */}
                {player.ballPosition && (
                  <motion.div
                    className="absolute w-3 h-3 rounded-full shadow-lg z-30"
                    style={{ 
                      backgroundColor: 'white',
                      border: `2px solid ${player.color}`,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      left: `${player.ballPosition.x}%`,
                      top: `${player.ballPosition.y}%`,
                      x: '-50%',
                      y: '-50%'
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ 
                      duration: 1.5,
                      delay: index * 0.5,
                      ease: "easeInOut"
                    }}
                  />
                )}

                {/* Club and Distance Label */}
                {player.clubSelection && player.distance && currentStep < 3 && currentShot === index && (
                  <motion.div
                    className="absolute z-40 bg-white/90 backdrop-blur px-2 py-1 rounded-lg shadow-md"
                    style={{
                      left: `${player.ballPosition?.x || 50}%`,
                      top: `${(player.ballPosition?.y || 50) - 10}%`,
                      transform: 'translate(-50%, -100%)'
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-xs font-bold text-gray-800">{player.clubSelection}</div>
                    <div className="text-xs text-gray-600">{player.distance} yds</div>
                  </motion.div>
                )}
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* Current Step Indicator */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">
                {demoSteps[currentStep].title}
              </h4>
              <p className="text-sm text-gray-600">
                {demoSteps[currentStep].description}
              </p>
            </div>
          </div>
        </div>

        {/* Teams Display */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Team A */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-bold text-gray-900">Team A</h5>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="space-y-3">
              {players.filter(p => p.team === 'A').map(player => (
                <div key={player.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: player.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {player.name}
                    </span>
                  </div>
                  <AnimatePresence>
                    {player.currentScore && currentStep >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-2xl font-bold text-gray-900">
                          {player.currentScore}
                        </span>
                        <span className={`text-xs font-medium ${getScoreDisplay(player.currentScore, holesData[currentHole - 1].par).color}`}>
                          {getScoreDisplay(player.currentScore, holesData[currentHole - 1].par).text}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            {currentStep >= 4 && holes[currentHole - 1]?.teamAScore && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Best Ball:</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">
                      {holes[currentHole - 1].teamAScore}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {holes[currentHole - 1].bestPlayerA} contributed
                </p>
              </div>
            )}
          </div>

          {/* Team B */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-bold text-gray-900">Team B</h5>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <div className="space-y-3">
              {players.filter(p => p.team === 'B').map(player => (
                <div key={player.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: player.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {player.name}
                    </span>
                  </div>
                  <AnimatePresence>
                    {player.currentScore && currentStep >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-2xl font-bold text-gray-900">
                          {player.currentScore}
                        </span>
                        <span className={`text-xs font-medium ${getScoreDisplay(player.currentScore, holesData[currentHole - 1].par).color}`}>
                          {getScoreDisplay(player.currentScore, holesData[currentHole - 1].par).text}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            {currentStep >= 4 && holes[currentHole - 1]?.teamBScore && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Best Ball:</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-600" />
                    <span className="text-2xl font-bold text-gray-700">
                      {holes[currentHole - 1].teamBScore}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {holes[currentHole - 1].bestPlayerB} contributed
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Professional Scorecard */}
        {holes.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3">
              <h5 className="font-bold">Professional Scorecard</h5>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Hole</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Par</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Yards</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Team A</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Team B</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {holes.map((hole, index) => (
                    <motion.tr
                      key={hole.hole}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">{hole.hole}</td>
                      <td className="px-4 py-3 text-center text-gray-700">{hole.par}</td>
                      <td className="px-4 py-3 text-center text-gray-600 text-sm">{hole.yards}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`font-bold text-lg ${hole.winner === 'A' ? 'text-green-600' : 'text-gray-700'}`}>
                          {hole.teamAScore || '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`font-bold text-lg ${hole.winner === 'B' ? 'text-gray-900' : 'text-gray-700'}`}>
                          {hole.teamBScore || '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {hole.winner === 'A' && (
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Team A</span>
                        )}
                        {hole.winner === 'B' && (
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">Team B</span>
                        )}
                        {hole.winner === 'tie' && (
                          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">Halved</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
                {holes.length === holesData.length && (
                  <tfoot className="bg-gray-900 text-white">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 font-bold">Final Score</td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-2xl font-bold">
                          {holes.reduce((sum, h) => sum + (h.teamAScore || 0), 0)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-2xl font-bold">
                          {holes.reduce((sum, h) => sum + (h.teamBScore || 0), 0)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {(() => {
                          const teamATotal = holes.reduce((sum, h) => sum + (h.teamAScore || 0), 0);
                          const teamBTotal = holes.reduce((sum, h) => sum + (h.teamBScore || 0), 0);
                          if (teamATotal < teamBTotal) return <span className="font-bold">Team A Wins</span>;
                          if (teamBTotal < teamATotal) return <span className="font-bold">Team B Wins</span>;
                          return <span className="font-bold">Tied</span>;
                        })()}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}