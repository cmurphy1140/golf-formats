'use client';

import { useState } from 'react';
import { ScoringState, Player, GolfAnimationData } from '@/types/golf-animation';
import { Trophy, Target, Users, TrendingUp, Info } from 'lucide-react';

interface LiveScorecardProps {
  scoring: ScoringState;
  players: Player[];
  format: GolfAnimationData['format'];
  par: number;
  onPlayerHover?: (playerId: string | null) => void;
  onScoreClick?: (playerId: string) => void;
}

export default function LiveScorecard({
  scoring,
  players,
  format,
  par,
  onPlayerHover,
  onScoreClick
}: LiveScorecardProps) {
  const [showDetails, setShowDetails] = useState<string | null>(null);

  // Calculate score relative to par
  const getScoreDisplay = (strokes: number): { text: string; color: string } => {
    if (strokes === 0) return { text: '-', color: 'text-masters-slate' };
    
    const diff = strokes - par;
    if (diff < -1) return { text: `${diff}`, color: 'text-green-600' }; // Eagle or better
    if (diff === -1) return { text: '-1', color: 'text-green-500' }; // Birdie
    if (diff === 0) return { text: 'E', color: 'text-masters-charcoal' }; // Par
    if (diff === 1) return { text: '+1', color: 'text-orange-500' }; // Bogey
    return { text: `+${diff}`, color: 'text-red-500' }; // Double bogey or worse
  };

  // Get Stableford points color
  const getPointsColor = (points: number): string => {
    if (points >= 4) return 'text-green-600';
    if (points >= 3) return 'text-green-500';
    if (points >= 2) return 'text-masters-charcoal';
    if (points >= 1) return 'text-orange-500';
    return 'text-red-500';
  };

  // Format-specific scoring display
  const renderFormatSpecificScore = () => {
    switch (format) {
      case 'scramble':
      case 'best-ball':
        return (
          <div className="mt-3 p-3 bg-masters-pine/10 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-masters-pine" />
                <span className="text-sm font-medium text-masters-charcoal">Team Score</span>
              </div>
              <span className="text-lg font-bold text-masters-pine">
                {scoring.teamScore || 0}
              </span>
            </div>
            {format === 'scramble' && (
              <p className="text-xs text-masters-slate mt-1">
                All players playing from best ball position
              </p>
            )}
            {format === 'best-ball' && (
              <p className="text-xs text-masters-slate mt-1">
                Best individual score counts for team
              </p>
            )}
          </div>
        );

      case 'stableford':
        const totalPoints = scoring.players.reduce((sum, p) => sum + (p.points || 0), 0);
        return (
          <div className="mt-3 p-3 bg-masters-gold/10 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-masters-gold" />
                <span className="text-sm font-medium text-masters-charcoal">Total Points</span>
              </div>
              <span className="text-lg font-bold text-masters-gold">
                {totalPoints}
              </span>
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs text-masters-slate">
                <span>Eagle or better</span>
                <span>4 pts</span>
              </div>
              <div className="flex justify-between text-xs text-masters-slate">
                <span>Birdie</span>
                <span>3 pts</span>
              </div>
              <div className="flex justify-between text-xs text-masters-slate">
                <span>Par</span>
                <span>2 pts</span>
              </div>
              <div className="flex justify-between text-xs text-masters-slate">
                <span>Bogey</span>
                <span>1 pt</span>
              </div>
            </div>
          </div>
        );

      case 'match-play':
        return (
          <div className="mt-3 p-3 bg-masters-pine/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-masters-pine" />
                <span className="text-sm font-medium text-masters-charcoal">Match Status</span>
              </div>
              <span className="text-lg font-bold text-masters-pine">
                {scoring.matchStatus || 'All Square'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {scoring.players.map(player => (
                <div 
                  key={player.playerId}
                  className="flex justify-between p-1 bg-white rounded"
                >
                  <span className="text-masters-charcoal">
                    {players.find(p => p.id === player.playerId)?.name}
                  </span>
                  <span className={`font-medium ${
                    player.status?.includes('UP') ? 'text-green-500' : 'text-masters-slate'
                  }`}>
                    {player.status || '-'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-masters-pine/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-masters-charcoal">Live Scoring</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-masters-slate">Hole {scoring.hole}</span>
          <span className="text-sm font-medium text-masters-pine">Par {par}</span>
        </div>
      </div>

      {/* Player Scores */}
      <div className="space-y-2">
        {scoring.players.map(playerScore => {
          const player = players.find(p => p.id === playerScore.playerId);
          if (!player) return null;

          const scoreDisplay = getScoreDisplay(playerScore.strokes);
          const isExpanded = showDetails === player.id;

          return (
            <div
              key={player.id}
              className="relative"
              onMouseEnter={() => onPlayerHover?.(player.id)}
              onMouseLeave={() => onPlayerHover?.(null)}
            >
              <div
                className="flex items-center justify-between p-3 bg-masters-sand/10 
                  rounded-lg cursor-pointer hover:bg-masters-sand/20 transition-colors"
                onClick={() => {
                  setShowDetails(isExpanded ? null : player.id);
                  onScoreClick?.(player.id);
                }}
              >
                <div className="flex items-center gap-3">
                  {/* Player marker */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: player.color }}
                  >
                    {player.name[0]}
                  </div>
                  
                  {/* Player info */}
                  <div>
                    <p className="text-sm font-medium text-masters-charcoal">
                      {player.name}
                    </p>
                    <p className="text-xs text-masters-slate">
                      HCP {player.handicap}
                    </p>
                  </div>
                </div>

                {/* Score display */}
                <div className="flex items-center gap-4">
                  {/* Strokes */}
                  <div className="text-center">
                    <p className="text-xs text-masters-slate mb-0.5">Strokes</p>
                    <p className="text-lg font-bold text-masters-charcoal">
                      {playerScore.strokes || '-'}
                    </p>
                  </div>

                  {/* Score to par */}
                  <div className="text-center">
                    <p className="text-xs text-masters-slate mb-0.5">Score</p>
                    <p className={`text-lg font-bold ${scoreDisplay.color}`}>
                      {scoreDisplay.text}
                    </p>
                  </div>

                  {/* Stableford points */}
                  {format === 'stableford' && (
                    <div className="text-center">
                      <p className="text-xs text-masters-slate mb-0.5">Points</p>
                      <p className={`text-lg font-bold ${getPointsColor(playerScore.points || 0)}`}>
                        {playerScore.points || 0}
                      </p>
                    </div>
                  )}

                  {/* Match play status */}
                  {format === 'match-play' && playerScore.status && (
                    <div className="text-center min-w-[60px]">
                      <p className={`text-sm font-bold ${
                        playerScore.status.includes('UP') ? 'text-green-500' :
                        playerScore.status === 'All Square' ? 'text-masters-charcoal' :
                        'text-red-500'
                      }`}>
                        {playerScore.status}
                      </p>
                    </div>
                  )}

                  {/* Info indicator */}
                  <Info 
                    size={16} 
                    className={`text-masters-slate transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="mt-2 p-3 bg-white border border-masters-stone/20 rounded-lg">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-masters-slate">Gross Score:</span>
                      <span className="ml-2 font-medium text-masters-charcoal">
                        {playerScore.strokes}
                      </span>
                    </div>
                    <div>
                      <span className="text-masters-slate">Net Score:</span>
                      <span className="ml-2 font-medium text-masters-charcoal">
                        {Math.max(0, playerScore.strokes - Math.floor(player.handicap / 18))}
                      </span>
                    </div>
                    {format === 'stableford' && (
                      <>
                        <div>
                          <span className="text-masters-slate">Points Earned:</span>
                          <span className="ml-2 font-medium text-masters-gold">
                            {playerScore.points}
                          </span>
                        </div>
                        <div>
                          <span className="text-masters-slate">Target:</span>
                          <span className="ml-2 font-medium text-masters-charcoal">
                            2 points (par)
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Format-specific scoring section */}
      {renderFormatSpecificScore()}

      {/* Scoring trend indicator */}
      <div className="mt-4 pt-4 border-t border-masters-stone/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-masters-pine" />
            <span className="text-xs text-masters-slate">Scoring Pace</span>
          </div>
          <div className="flex items-center gap-3">
            {scoring.players.map(playerScore => {
              const player = players.find(p => p.id === playerScore.playerId);
              if (!player) return null;
              
              const pace = playerScore.strokes - par;
              return (
                <div key={player.id} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: player.color }}
                  />
                  <span className={`text-xs font-medium ${
                    pace < 0 ? 'text-green-500' :
                    pace === 0 ? 'text-masters-charcoal' :
                    'text-red-500'
                  }`}>
                    {pace > 0 ? '+' : ''}{pace}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}