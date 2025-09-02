'use client';

import { useState, useEffect, useCallback } from 'react';
import { GolfAnimationData, Shot, Player } from '@/types/golf-animation';
import GolfCourseSVG from './golf-course-svg';
import AnimationController from './animation-controller';
import LiveScorecard from './live-scorecard';
import FormatSelector from './format-selector';
import { generateAnimationData } from './animation-generators';
import TouchGestureHandler from '../touch-gesture-handler';

interface GolfAnimationSystemProps {
  initialFormat?: GolfAnimationData['format'];
  className?: string;
}

export default function GolfAnimationSystem({ 
  initialFormat = 'scramble',
  className = '' 
}: GolfAnimationSystemProps) {
  const [currentFormat, setCurrentFormat] = useState(initialFormat);
  const [animationData, setAnimationData] = useState<GolfAnimationData | null>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [frameProgress, setFrameProgress] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [hoveredShot, setHoveredShot] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Generate animation data for the selected format
  useEffect(() => {
    const data = generateAnimationData(currentFormat);
    setAnimationData(data);
    setCurrentFrameIndex(0);
    setFrameProgress(0);
  }, [currentFormat]);

  // Detect mobile
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle frame changes
  const handleFrameChange = useCallback((frameIndex: number, progress: number) => {
    setCurrentFrameIndex(frameIndex);
    setFrameProgress(progress);
  }, []);

  // Handle shot interactions
  const handleShotClick = useCallback((shot: Shot) => {
    console.log('Shot clicked:', shot);
    // Could show detailed shot info in a modal
  }, []);

  // Handle player interactions
  const handlePlayerClick = useCallback((player: Player) => {
    setSelectedPlayer(player.id === selectedPlayer ? null : player.id);
  }, [selectedPlayer]);

  // Handle swipe gestures for mobile
  const handleSwipeLeft = useCallback(() => {
    if (animationData && currentFrameIndex < animationData.frames.length - 1) {
      setCurrentFrameIndex(prev => prev + 1);
      setFrameProgress(0);
    }
  }, [animationData, currentFrameIndex]);

  const handleSwipeRight = useCallback(() => {
    if (currentFrameIndex > 0) {
      setCurrentFrameIndex(prev => prev - 1);
      setFrameProgress(0);
    }
  }, [currentFrameIndex]);

  if (!animationData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-masters-slate">Loading animation...</div>
      </div>
    );
  }

  const currentFrame = animationData.frames[currentFrameIndex];
  const visibleShots = currentFrame.shots.filter(
    shot => !selectedPlayer || shot.playerId === selectedPlayer
  );

  return (
    <div className={`golf-animation-system ${className}`}>
      {/* Format Selector */}
      <div className="mb-6">
        <FormatSelector
          currentFormat={currentFormat}
          onFormatChange={setCurrentFormat}
        />
      </div>

      {/* Main Animation Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Golf Course Visualization - 2 columns on desktop */}
        <div className="lg:col-span-2">
          <TouchGestureHandler
            onSwipeLeft={isMobile ? handleSwipeLeft : undefined}
            onSwipeRight={isMobile ? handleSwipeRight : undefined}
            className="h-full"
          >
            <div className="bg-white rounded-lg shadow-md border border-masters-pine/10 p-4 h-full">
              <div className="aspect-square w-full">
                <GolfCourseSVG
                  hole={animationData.hole}
                  shots={visibleShots}
                  players={animationData.players}
                  selectedPlayer={selectedPlayer}
                  hoveredShot={hoveredShot}
                  currentShotIndex={Math.floor(currentFrameIndex * 0.5)} // Simplified for demo
                  onShotClick={handleShotClick}
                  onPlayerClick={handlePlayerClick}
                  animationProgress={frameProgress}
                />
              </div>
            </div>
          </TouchGestureHandler>
        </div>

        {/* Scorecard - 1 column on desktop */}
        <div className="lg:col-span-1">
          <LiveScorecard
            scoring={currentFrame.scoring}
            players={animationData.players}
            format={animationData.format}
            par={animationData.hole.par}
            onPlayerHover={setSelectedPlayer}
            onScoreClick={(playerId) => setSelectedPlayer(
              playerId === selectedPlayer ? null : playerId
            )}
          />
        </div>
      </div>

      {/* Animation Controller */}
      <div className="mt-6">
        <AnimationController
          animationData={animationData}
          onFrameChange={handleFrameChange}
          onPlayerSelect={setSelectedPlayer}
        />
      </div>

      {/* Format Rules Reference */}
      <div className="mt-6 bg-masters-sand/10 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-masters-charcoal mb-2">
          {animationData.formatRules.name} Rules
        </h4>
        <ul className="space-y-1">
          {animationData.formatRules.specialRules.map((rule, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-masters-slate">
              <span className="text-masters-pine mt-0.5">•</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}