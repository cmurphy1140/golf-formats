'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  SkipBack,
  Zap,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { AnimationState, GolfAnimationData } from '@/types/golf-animation';

interface AnimationControllerProps {
  animationData: GolfAnimationData;
  onFrameChange: (frameIndex: number, progress: number) => void;
  onSpeedChange?: (speed: number) => void;
  onPlayerSelect?: (playerId: string | null) => void;
}

export default function AnimationController({
  animationData,
  onFrameChange,
  onSpeedChange,
  onPlayerSelect
}: AnimationControllerProps) {
  const [state, setState] = useState<AnimationState>({
    isPlaying: false,
    currentFrame: 0,
    playbackSpeed: 1,
    selectedPlayer: null,
    hoveredElement: { type: null, id: null }
  });

  const [progress, setProgress] = useState(0); // 0-100
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const progressRef = useRef<number>(0);

  // Calculate frame duration
  const frameDuration = animationData.duration / animationData.frames.length;

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    
    const deltaTime = timestamp - lastTimeRef.current;
    const adjustedDelta = deltaTime * state.playbackSpeed;
    
    progressRef.current += (adjustedDelta / frameDuration) * 100;
    
    if (progressRef.current >= 100) {
      // Move to next frame
      const nextFrame = state.currentFrame + 1;
      if (nextFrame < animationData.frames.length) {
        setState(prev => ({ ...prev, currentFrame: nextFrame }));
        progressRef.current = 0;
        onFrameChange(nextFrame, 0);
      } else {
        // Animation complete
        setState(prev => ({ ...prev, isPlaying: false, currentFrame: 0 }));
        progressRef.current = 0;
        setProgress(0);
        return;
      }
    }
    
    setProgress(progressRef.current);
    onFrameChange(state.currentFrame, progressRef.current / 100);
    
    lastTimeRef.current = timestamp;
    animationRef.current = requestAnimationFrame(animate);
  }, [state.currentFrame, state.playbackSpeed, frameDuration, animationData.frames.length, onFrameChange]);

  // Start/stop animation
  useEffect(() => {
    if (state.isPlaying) {
      lastTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [state.isPlaying, animate]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextFrame();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          previousFrame();
          break;
        case 'r':
          e.preventDefault();
          restart();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state.currentFrame]);

  const togglePlay = () => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const restart = () => {
    setState(prev => ({ ...prev, currentFrame: 0, isPlaying: false }));
    setProgress(0);
    progressRef.current = 0;
    onFrameChange(0, 0);
  };

  const nextFrame = () => {
    if (state.currentFrame < animationData.frames.length - 1) {
      const nextFrame = state.currentFrame + 1;
      setState(prev => ({ ...prev, currentFrame: nextFrame, isPlaying: false }));
      setProgress(0);
      progressRef.current = 0;
      onFrameChange(nextFrame, 0);
    }
  };

  const previousFrame = () => {
    if (state.currentFrame > 0) {
      const prevFrame = state.currentFrame - 1;
      setState(prev => ({ ...prev, currentFrame: prevFrame, isPlaying: false }));
      setProgress(0);
      progressRef.current = 0;
      onFrameChange(prevFrame, 0);
    }
  };

  const changeSpeed = (speed: 0.5 | 1 | 1.5 | 2) => {
    setState(prev => ({ ...prev, playbackSpeed: speed }));
    onSpeedChange?.(speed);
  };

  const selectPlayer = (playerId: string | null) => {
    setState(prev => ({ ...prev, selectedPlayer: playerId }));
    onPlayerSelect?.(playerId);
  };

  const currentFrameData = animationData.frames[state.currentFrame];

  return (
    <div className="bg-white rounded-lg shadow-md border border-masters-pine/10 p-4">
      {/* Main Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {/* Previous Frame */}
          <button
            onClick={previousFrame}
            disabled={state.currentFrame === 0}
            className="p-2 rounded-lg bg-masters-sand/20 hover:bg-masters-sand/40 
              disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous frame"
          >
            <SkipBack size={20} className="text-masters-pine" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="p-3 rounded-lg bg-masters-pine text-white hover:bg-masters-pine/90 
              transition-colors shadow-sm"
            aria-label={state.isPlaying ? 'Pause' : 'Play'}
          >
            {state.isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          {/* Next Frame */}
          <button
            onClick={nextFrame}
            disabled={state.currentFrame === animationData.frames.length - 1}
            className="p-2 rounded-lg bg-masters-sand/20 hover:bg-masters-sand/40 
              disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next frame"
          >
            <SkipForward size={20} className="text-masters-pine" />
          </button>

          {/* Restart */}
          <button
            onClick={restart}
            className="p-2 rounded-lg bg-masters-sand/20 hover:bg-masters-sand/40 transition-colors"
            aria-label="Restart"
          >
            <RotateCcw size={20} className="text-masters-pine" />
          </button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-1 bg-masters-sand/20 rounded-lg p-1">
          <Zap size={16} className="text-masters-slate ml-1" />
          {[0.5, 1, 1.5, 2].map(speed => (
            <button
              key={speed}
              onClick={() => changeSpeed(speed as any)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                state.playbackSpeed === speed
                  ? 'bg-masters-pine text-white'
                  : 'text-masters-slate hover:bg-masters-sand/40'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-masters-slate mb-1">
          <span>Frame {state.currentFrame + 1} / {animationData.frames.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="relative h-2 bg-masters-sand/30 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-masters-pine transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
          {/* Frame markers */}
          {animationData.frames.map((_, index) => (
            <div
              key={index}
              className="absolute top-0 w-px h-full bg-masters-pine/20"
              style={{ left: `${(index / animationData.frames.length) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Frame Info */}
      {currentFrameData && (
        <div className="space-y-3">
          {/* Narration */}
          {currentFrameData.narration && (
            <div className="p-3 bg-masters-sand/10 rounded-lg">
              <p className="text-sm text-masters-charcoal">
                {currentFrameData.narration}
              </p>
            </div>
          )}

          {/* Highlighted Rule */}
          {currentFrameData.highlightRule && (
            <div className="p-3 bg-masters-gold/10 border border-masters-gold/30 rounded-lg">
              <div className="flex items-start gap-2">
                <ChevronRight size={16} className="text-masters-gold mt-0.5 flex-shrink-0" />
                <p className="text-sm text-masters-charcoal font-medium">
                  Rule: {currentFrameData.highlightRule}
                </p>
              </div>
            </div>
          )}

          {/* Decision Point */}
          {currentFrameData.decision && (
            <div className="p-3 bg-masters-pine/10 border border-masters-pine/30 rounded-lg">
              <p className="text-xs font-semibold text-masters-pine uppercase tracking-wider mb-1">
                {currentFrameData.decision.type.replace('-', ' ')}
              </p>
              <p className="text-sm text-masters-charcoal">
                {currentFrameData.decision.description}
              </p>
            </div>
          )}

          {/* Player Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-masters-slate">Filter by player:</span>
            <div className="flex gap-1">
              <button
                onClick={() => selectPlayer(null)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  state.selectedPlayer === null
                    ? 'bg-masters-pine text-white'
                    : 'bg-masters-sand/20 text-masters-slate hover:bg-masters-sand/40'
                }`}
              >
                All
              </button>
              {animationData.players.map(player => (
                <button
                  key={player.id}
                  onClick={() => selectPlayer(player.id)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    state.selectedPlayer === player.id
                      ? 'text-white'
                      : 'text-masters-slate hover:opacity-80'
                  }`}
                  style={{
                    backgroundColor: state.selectedPlayer === player.id 
                      ? player.color 
                      : `${player.color}20`
                  }}
                >
                  {player.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Touch Controls */}
      <div className="flex md:hidden items-center justify-center gap-4 mt-4 pt-4 border-t border-masters-stone/20">
        <button
          onClick={previousFrame}
          disabled={state.currentFrame === 0}
          className="flex items-center gap-1 text-sm text-masters-pine disabled:opacity-50"
        >
          <ChevronLeft size={16} />
          Prev
        </button>
        <span className="text-xs text-masters-slate">
          Swipe to navigate
        </span>
        <button
          onClick={nextFrame}
          disabled={state.currentFrame === animationData.frames.length - 1}
          className="flex items-center gap-1 text-sm text-masters-pine disabled:opacity-50"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="hidden md:flex items-center justify-center gap-4 mt-4 pt-4 border-t border-masters-stone/20 text-xs text-masters-slate">
        <span>Space: Play/Pause</span>
        <span>←→: Previous/Next</span>
        <span>R: Restart</span>
      </div>
    </div>
  );
}