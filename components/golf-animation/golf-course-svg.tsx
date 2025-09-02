'use client';

import { useRef, useEffect, useState } from 'react';
import { HoleLayout, Shot, Player, Position } from '@/types/golf-animation';

interface GolfCourseSVGProps {
  hole: HoleLayout;
  shots: Shot[];
  players: Player[];
  selectedPlayer: string | null;
  hoveredShot: string | null;
  currentShotIndex: number;
  onShotClick?: (shot: Shot) => void;
  onPlayerClick?: (player: Player) => void;
  animationProgress: number; // 0-1
}

export default function GolfCourseSVG({
  hole,
  shots,
  players,
  selectedPlayer,
  hoveredShot,
  currentShotIndex,
  onShotClick,
  onPlayerClick,
  animationProgress
}: GolfCourseSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState(`0 0 ${hole.bounds.width} ${hole.bounds.height}`);

  // Calculate ball positions based on animation progress
  const getBallPosition = (shot: Shot, progress: number): Position => {
    const x = shot.from.x + (shot.to.x - shot.from.x) * progress;
    const y = shot.from.y + (shot.to.y - shot.from.y) * progress;
    
    // Add arc for ball flight
    const distance = Math.sqrt(
      Math.pow(shot.to.x - shot.from.x, 2) + 
      Math.pow(shot.to.y - shot.from.y, 2)
    );
    const maxHeight = distance * 0.3;
    const arcHeight = Math.sin(progress * Math.PI) * maxHeight;
    
    return { x, y: y - arcHeight };
  };

  // Convert position array to SVG path
  const pointsToPath = (points: Position[]): string => {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  };

  // Get player color
  const getPlayerColor = (playerId: string): string => {
    const player = players.find(p => p.id === playerId);
    return player?.color || '#000000';
  };

  return (
    <div className="relative w-full h-full bg-masters-sand/10 rounded-lg overflow-hidden">
      <svg
        ref={svgRef}
        viewBox={viewBox}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Definitions for reusable elements */}
        <defs>
          {/* Gradient for fairway */}
          <linearGradient id="fairwayGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A9D4A" stopOpacity="1" />
            <stop offset="100%" stopColor="#3A7D3A" stopOpacity="1" />
          </linearGradient>

          {/* Gradient for green */}
          <radialGradient id="greenGradient">
            <stop offset="0%" stopColor="#2A6D2A" stopOpacity="1" />
            <stop offset="100%" stopColor="#1A5D1A" stopOpacity="1" />
          </radialGradient>

          {/* Pattern for rough */}
          <pattern id="roughPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="#5A8D5A" />
            <circle cx="2" cy="2" r="1" fill="#4A7D4A" opacity="0.5" />
            <circle cx="7" cy="5" r="1" fill="#4A7D4A" opacity="0.5" />
            <circle cx="4" cy="8" r="1" fill="#4A7D4A" opacity="0.5" />
          </pattern>

          {/* Pattern for bunker */}
          <pattern id="bunkerPattern" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="#E8D4A0" />
            <circle cx="1" cy="1" r="0.5" fill="#D4C090" opacity="0.3" />
            <circle cx="3" cy="3" r="0.5" fill="#D4C090" opacity="0.3" />
          </pattern>

          {/* Water effect */}
          <pattern id="waterPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#4A90E2" />
            <path d="M0,10 Q5,5 10,10 T20,10" stroke="#5AA0F2" strokeWidth="0.5" fill="none" opacity="0.5" />
          </pattern>

          {/* Ball shadow */}
          <filter id="ballShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="2" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Rough (background) */}
        <rect 
          x="0" 
          y="0" 
          width={hole.bounds.width} 
          height={hole.bounds.height} 
          fill="url(#roughPattern)"
        />

        {/* Fairway */}
        <path
          d={pointsToPath(hole.fairway)}
          fill="url(#fairwayGradient)"
          stroke="#3A7D3A"
          strokeWidth="1"
        />

        {/* Hazards */}
        {hole.hazards.map((hazard, index) => (
          <path
            key={`hazard-${index}`}
            d={pointsToPath(hazard.shape)}
            fill={hazard.type === 'bunker' ? 'url(#bunkerPattern)' : 'url(#waterPattern)'}
            stroke={hazard.type === 'bunker' ? '#C4B090' : '#3A80D2'}
            strokeWidth="1"
          />
        ))}

        {/* Green */}
        <circle
          cx={hole.green.center.x}
          cy={hole.green.center.y}
          r={hole.green.radius}
          fill="url(#greenGradient)"
          stroke="#1A5D1A"
          strokeWidth="1"
        />

        {/* Pin/Flag */}
        <g transform={`translate(${hole.pin.x}, ${hole.pin.y})`}>
          {/* Flag pole */}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-20"
            stroke="#8B4513"
            strokeWidth="1.5"
          />
          {/* Flag */}
          <path
            d="M 0,-20 L 12,-16 L 12,-12 L 0,-16 Z"
            fill="#FF0000"
            stroke="#CC0000"
            strokeWidth="0.5"
          />
          {/* Hole */}
          <circle
            cx="0"
            cy="0"
            r="2"
            fill="#000000"
          />
        </g>

        {/* Tee Box */}
        <rect
          x={hole.teeBox.x - 15}
          y={hole.teeBox.y - 10}
          width="30"
          height="20"
          fill="#4A7D4A"
          stroke="#3A6D3A"
          strokeWidth="1"
          rx="2"
        />
        <text
          x={hole.teeBox.x}
          y={hole.teeBox.y + 25}
          textAnchor="middle"
          fontSize="10"
          fill="#2C312E"
          fontWeight="500"
        >
          TEE
        </text>

        {/* Shot paths */}
        {shots.slice(0, currentShotIndex + 1).map((shot, index) => {
          const player = players.find(p => p.id === shot.playerId);
          const isSelected = shot.playerId === selectedPlayer;
          const isHovered = `${shot.playerId}-${index}` === hoveredShot;
          
          return (
            <g key={`shot-${index}`}>
              {/* Shot path line */}
              <line
                x1={shot.from.x}
                y1={shot.from.y}
                x2={shot.to.x}
                y2={shot.to.y}
                stroke={getPlayerColor(shot.playerId)}
                strokeWidth={isSelected || isHovered ? 3 : 1.5}
                strokeDasharray={shot.selected ? 'none' : '5,5'}
                opacity={isSelected || isHovered ? 1 : 0.6}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onShotClick?.(shot)}
              />

              {/* Shot arc indicator for long shots */}
              {shot.distance > 100 && (
                <path
                  d={`M ${shot.from.x},${shot.from.y} Q ${
                    (shot.from.x + shot.to.x) / 2
                  },${
                    Math.min(shot.from.y, shot.to.y) - shot.distance * 0.3
                  } ${shot.to.x},${shot.to.y}`}
                  fill="none"
                  stroke={getPlayerColor(shot.playerId)}
                  strokeWidth="1"
                  strokeDasharray="2,2"
                  opacity="0.3"
                />
              )}

              {/* Landing spot marker */}
              <circle
                cx={shot.to.x}
                cy={shot.to.y}
                r="3"
                fill={getPlayerColor(shot.playerId)}
                opacity={shot.selected ? 1 : 0.5}
              />

              {/* Club and distance label */}
              {(isSelected || isHovered) && (
                <g transform={`translate(${(shot.from.x + shot.to.x) / 2}, ${(shot.from.y + shot.to.y) / 2})`}>
                  <rect
                    x="-25"
                    y="-10"
                    width="50"
                    height="20"
                    fill="white"
                    stroke={getPlayerColor(shot.playerId)}
                    strokeWidth="1"
                    rx="3"
                    opacity="0.95"
                  />
                  <text
                    x="0"
                    y="0"
                    textAnchor="middle"
                    fontSize="9"
                    fill={getPlayerColor(shot.playerId)}
                  >
                    <tspan x="0" dy="-2">{shot.club}</tspan>
                    <tspan x="0" dy="10">{shot.distance}yd</tspan>
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Animated ball for current shot */}
        {currentShotIndex >= 0 && currentShotIndex < shots.length && (
          (() => {
            const currentShot = shots[currentShotIndex];
            const ballPos = getBallPosition(currentShot, animationProgress);
            return (
              <g filter="url(#ballShadow)">
                <circle
                  cx={ballPos.x}
                  cy={ballPos.y}
                  r="4"
                  fill="white"
                  stroke="#CCCCCC"
                  strokeWidth="0.5"
                  className="transition-all duration-100"
                />
                {/* Player initial on ball */}
                <text
                  x={ballPos.x}
                  y={ballPos.y + 1}
                  textAnchor="middle"
                  fontSize="6"
                  fill="#666666"
                  fontWeight="bold"
                >
                  {players.find(p => p.id === currentShot.playerId)?.name[0]}
                </text>
              </g>
            );
          })()
        )}

        {/* Player markers at tee box */}
        {players.map((player, index) => (
          <g
            key={player.id}
            transform={`translate(${hole.teeBox.x + (index - 1.5) * 8}, ${hole.teeBox.y})`}
            className="cursor-pointer"
            onClick={() => onPlayerClick?.(player)}
          >
            <circle
              r="6"
              fill={player.color}
              stroke={selectedPlayer === player.id ? '#FFD700' : 'white'}
              strokeWidth={selectedPlayer === player.id ? 2 : 1}
              opacity={selectedPlayer === player.id ? 1 : 0.8}
            />
            <text
              y="1"
              textAnchor="middle"
              fontSize="8"
              fill="white"
              fontWeight="bold"
            >
              {player.name[0]}
            </text>
          </g>
        ))}

        {/* Distance markers */}
        {[100, 200, 300].map(distance => {
          const y = hole.teeBox.y - (distance / hole.distance) * (hole.teeBox.y - hole.green.center.y);
          return (
            <g key={`distance-${distance}`}>
              <line
                x1="10"
                y1={y}
                x2="20"
                y2={y}
                stroke="#999999"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
              <text
                x="25"
                y={y + 3}
                fontSize="8"
                fill="#666666"
              >
                {distance}y
              </text>
            </g>
          );
        })}

        {/* Hole info */}
        <g transform={`translate(${hole.bounds.width - 60}, 20)`}>
          <rect
            x="-5"
            y="-15"
            width="60"
            height="30"
            fill="white"
            stroke="#004B36"
            strokeWidth="1"
            rx="3"
            opacity="0.95"
          />
          <text fontSize="10" fill="#004B36" fontWeight="bold">
            <tspan x="25" dy="0" textAnchor="middle">Hole {hole.number}</tspan>
            <tspan x="25" dy="12" textAnchor="middle">Par {hole.par} • {hole.distance}y</tspan>
          </text>
        </g>
      </svg>
    </div>
  );
}