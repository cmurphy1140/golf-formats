// Golf Animation System Types

export interface Position {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  name: string;
  handicap: number;
  color: string; // For visual distinction
  team?: string; // For team formats
}

export interface Shot {
  playerId: string;
  shotNumber: number;
  from: Position;
  to: Position;
  club: string;
  distance: number;
  result: 'fairway' | 'rough' | 'bunker' | 'water' | 'green' | 'hole' | 'out-of-bounds';
  timestamp: number; // For animation timing
  points?: number; // For Stableford
  selected?: boolean; // For Scramble (which shot was selected)
  conceded?: boolean; // For Match Play
}

export interface HoleLayout {
  number: number;
  par: 3 | 4 | 5;
  distance: number;
  teeBox: Position;
  green: {
    center: Position;
    radius: number;
  };
  pin: Position;
  fairway: Position[]; // Polygon points
  rough: Position[]; // Polygon points
  hazards: Array<{
    type: 'bunker' | 'water';
    shape: Position[];
  }>;
  bounds: {
    width: number;
    height: number;
  };
}

export interface ScoringState {
  hole: number;
  players: Array<{
    playerId: string;
    strokes: number;
    points?: number; // Stableford
    status?: string; // Match Play (e.g., "2 UP")
  }>;
  teamScore?: number; // Team formats
  matchStatus?: string; // Match Play overall status
}

export interface AnimationFrame {
  timestamp: number;
  shots: Shot[];
  scoring: ScoringState;
  narration?: string; // Explanatory text
  highlightRule?: string; // Which rule is being demonstrated
  decision?: {
    type: 'shot-selection' | 'concession' | 'pickup';
    description: string;
  };
}

export interface FormatRules {
  name: string;
  type: 'individual' | 'team';
  scoreMethod: 'stroke' | 'stableford' | 'match';
  specialRules: string[];
}

export interface GolfAnimationData {
  hole: HoleLayout;
  players: Player[];
  format: 'scramble' | 'best-ball' | 'stableford' | 'match-play' | 'stroke-play';
  formatRules: FormatRules;
  frames: AnimationFrame[];
  duration: number; // Total animation duration in ms
}

// Animation Control State
export interface AnimationState {
  isPlaying: boolean;
  currentFrame: number;
  playbackSpeed: 0.5 | 1 | 1.5 | 2;
  selectedPlayer: string | null;
  hoveredElement: {
    type: 'player' | 'shot' | 'score' | null;
    id: string | null;
  };
}

// Example data structure for a Scramble hole
export const EXAMPLE_SCRAMBLE_DATA: GolfAnimationData = {
  hole: {
    number: 1,
    par: 4,
    distance: 380,
    teeBox: { x: 50, y: 450 },
    green: {
      center: { x: 400, y: 100 },
      radius: 30
    },
    pin: { x: 410, y: 95 },
    fairway: [
      { x: 40, y: 400 },
      { x: 80, y: 400 },
      { x: 120, y: 300 },
      { x: 140, y: 200 },
      { x: 380, y: 120 },
      { x: 420, y: 120 },
      { x: 420, y: 80 },
      { x: 380, y: 80 },
      { x: 120, y: 200 },
      { x: 100, y: 300 },
      { x: 60, y: 400 },
      { x: 40, y: 400 }
    ],
    rough: [], // Simplified for example
    hazards: [
      {
        type: 'bunker',
        shape: [
          { x: 350, y: 110 },
          { x: 370, y: 115 },
          { x: 365, y: 130 },
          { x: 345, y: 125 }
        ]
      }
    ],
    bounds: { width: 500, height: 500 }
  },
  players: [
    { id: 'p1', name: 'Player 1', handicap: 10, color: '#004B36' },
    { id: 'p2', name: 'Player 2', handicap: 15, color: '#D4A574' },
    { id: 'p3', name: 'Player 3', handicap: 20, color: '#2C312E' },
    { id: 'p4', name: 'Player 4', handicap: 8, color: '#4A5247' }
  ],
  format: 'scramble',
  formatRules: {
    name: 'Scramble',
    type: 'team',
    scoreMethod: 'stroke',
    specialRules: [
      'All players tee off',
      'Team selects best shot',
      'All players play from selected position',
      'Repeat until holed'
    ]
  },
  frames: [
    {
      timestamp: 0,
      shots: [],
      scoring: {
        hole: 1,
        players: [
          { playerId: 'p1', strokes: 0 },
          { playerId: 'p2', strokes: 0 },
          { playerId: 'p3', strokes: 0 },
          { playerId: 'p4', strokes: 0 }
        ],
        teamScore: 0
      },
      narration: 'All four players prepare to tee off',
      highlightRule: 'All players tee off'
    },
    // More frames would follow...
  ],
  duration: 30000 // 30 seconds total
};

// Utility type for animation callbacks
export type AnimationCallback = (state: AnimationState, data: GolfAnimationData) => void;