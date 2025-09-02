import { GolfAnimationData, HoleLayout, Player, AnimationFrame, Shot } from '@/types/golf-animation';

// Shared hole layout
const defaultHole: HoleLayout = {
  number: 1,
  par: 4,
  distance: 380,
  teeBox: { x: 250, y: 450 },
  green: {
    center: { x: 250, y: 80 },
    radius: 35
  },
  pin: { x: 260, y: 75 },
  fairway: [
    { x: 200, y: 450 },
    { x: 300, y: 450 },
    { x: 320, y: 350 },
    { x: 310, y: 250 },
    { x: 290, y: 150 },
    { x: 280, y: 100 },
    { x: 220, y: 100 },
    { x: 210, y: 150 },
    { x: 190, y: 250 },
    { x: 180, y: 350 },
    { x: 200, y: 450 }
  ],
  rough: [],
  hazards: [
    {
      type: 'bunker',
      shape: [
        { x: 200, y: 90 },
        { x: 180, y: 100 },
        { x: 185, y: 120 },
        { x: 210, y: 115 },
        { x: 215, y: 95 }
      ]
    },
    {
      type: 'water',
      shape: [
        { x: 350, y: 250 },
        { x: 380, y: 240 },
        { x: 390, y: 200 },
        { x: 370, y: 180 },
        { x: 340, y: 190 },
        { x: 335, y: 230 }
      ]
    }
  ],
  bounds: { width: 500, height: 500 }
};

// Shared players
const defaultPlayers: Player[] = [
  { id: 'p1', name: 'Alice', handicap: 10, color: '#004B36' },
  { id: 'p2', name: 'Bob', handicap: 15, color: '#D4A574' },
  { id: 'p3', name: 'Carol', handicap: 20, color: '#2C312E' },
  { id: 'p4', name: 'David', handicap: 8, color: '#4A5247' }
];

// Generate Scramble animation data
function generateScrambleData(): GolfAnimationData {
  const frames: AnimationFrame[] = [
    // Frame 1: Introduction
    {
      timestamp: 0,
      shots: [],
      scoring: {
        hole: 1,
        players: defaultPlayers.map(p => ({ playerId: p.id, strokes: 0 })),
        teamScore: 0
      },
      narration: 'In Scramble format, all four players will tee off',
      highlightRule: 'All players tee off'
    },
    // Frame 2: Tee shots
    {
      timestamp: 3000,
      shots: [
        { playerId: 'p1', shotNumber: 1, from: { x: 250, y: 450 }, to: { x: 240, y: 280 }, 
          club: 'Driver', distance: 250, result: 'fairway', timestamp: 1000 },
        { playerId: 'p2', shotNumber: 1, from: { x: 250, y: 450 }, to: { x: 200, y: 300 }, 
          club: 'Driver', distance: 230, result: 'rough', timestamp: 2000 },
        { playerId: 'p3', shotNumber: 1, from: { x: 250, y: 450 }, to: { x: 270, y: 290 }, 
          club: 'Driver', distance: 240, result: 'fairway', timestamp: 3000 },
        { playerId: 'p4', shotNumber: 1, from: { x: 250, y: 450 }, to: { x: 255, y: 270 }, 
          club: 'Driver', distance: 260, result: 'fairway', timestamp: 4000, selected: true }
      ],
      scoring: {
        hole: 1,
        players: defaultPlayers.map(p => ({ playerId: p.id, strokes: 1 })),
        teamScore: 1
      },
      narration: "David's drive of 260 yards is the best shot - team will play from there",
      highlightRule: 'Team selects best shot',
      decision: {
        type: 'shot-selection',
        description: "David's ball selected - longest and in perfect position"
      }
    },
    // Frame 3: Second shots from David's ball
    {
      timestamp: 6000,
      shots: [
        { playerId: 'p1', shotNumber: 2, from: { x: 255, y: 270 }, to: { x: 250, y: 100 }, 
          club: '7 Iron', distance: 140, result: 'green', timestamp: 5000 },
        { playerId: 'p2', shotNumber: 2, from: { x: 255, y: 270 }, to: { x: 190, y: 110 }, 
          club: '6 Iron', distance: 145, result: 'bunker', timestamp: 6000 },
        { playerId: 'p3', shotNumber: 2, from: { x: 255, y: 270 }, to: { x: 240, y: 90 }, 
          club: '7 Iron', distance: 138, result: 'green', timestamp: 7000, selected: true },
        { playerId: 'p4', shotNumber: 2, from: { x: 255, y: 270 }, to: { x: 280, y: 120 }, 
          club: '8 Iron', distance: 135, result: 'rough', timestamp: 8000 }
      ],
      scoring: {
        hole: 1,
        players: defaultPlayers.map(p => ({ playerId: p.id, strokes: 2 })),
        teamScore: 2
      },
      narration: "All players hit from David's position. Carol's shot is closest to the pin!",
      highlightRule: 'All players play from selected position'
    },
    // Frame 4: Putting
    {
      timestamp: 9000,
      shots: [
        { playerId: 'p1', shotNumber: 3, from: { x: 240, y: 90 }, to: { x: 260, y: 75 }, 
          club: 'Putter', distance: 15, result: 'hole', timestamp: 9000, selected: true }
      ],
      scoring: {
        hole: 1,
        players: defaultPlayers.map(p => ({ playerId: p.id, strokes: 3 })),
        teamScore: 3
      },
      narration: 'Alice sinks the putt! Team scores a birdie (3 on a par 4)',
      highlightRule: 'Team records single score'
    }
  ];

  return {
    hole: defaultHole,
    players: defaultPlayers,
    format: 'scramble',
    formatRules: {
      name: 'Scramble',
      type: 'team',
      scoreMethod: 'stroke',
      specialRules: [
        'All players tee off',
        'Team selects the best shot',
        'All players play from the selected position',
        'Process repeats until the ball is holed',
        'Team records a single score'
      ]
    },
    frames,
    duration: 12000
  };
}

// Generate Best Ball animation data
function generateBestBallData(): GolfAnimationData {
  const frames: AnimationFrame[] = [
    {
      timestamp: 0,
      shots: [],
      scoring: {
        hole: 1,
        players: defaultPlayers.map(p => ({ playerId: p.id, strokes: 0 })),
        teamScore: 0
      },
      narration: 'In Best Ball, each player plays their own ball throughout the hole',
      highlightRule: 'Each player plays own ball'
    },
    {
      timestamp: 3000,
      shots: [
        { playerId: 'p1', shotNumber: 1, from: { x: 250, y: 450 }, to: { x: 240, y: 280 }, 
          club: 'Driver', distance: 250, result: 'fairway', timestamp: 1000 },
        { playerId: 'p2', shotNumber: 1, from: { x: 250, y: 450 }, to: { x: 200, y: 300 }, 
          club: 'Driver', distance: 230, result: 'rough', timestamp: 2000 }
      ],
      scoring: {
        hole: 1,
        players: [
          { playerId: 'p1', strokes: 1 },
          { playerId: 'p2', strokes: 1 },
          { playerId: 'p3', strokes: 0 },
          { playerId: 'p4', strokes: 0 }
        ],
        teamScore: 0
      },
      narration: 'Players continue playing their own balls independently',
      highlightRule: 'Individual play continues'
    },
    {
      timestamp: 6000,
      shots: [
        { playerId: 'p1', shotNumber: 4, from: { x: 250, y: 85 }, to: { x: 260, y: 75 }, 
          club: 'Putter', distance: 12, result: 'hole', timestamp: 6000 }
      ],
      scoring: {
        hole: 1,
        players: [
          { playerId: 'p1', strokes: 4 },
          { playerId: 'p2', strokes: 5 },
          { playerId: 'p3', strokes: 5 },
          { playerId: 'p4', strokes: 4 }
        ],
        teamScore: 4
      },
      narration: "Alice and David both made par - team scores 4",
      highlightRule: 'Best individual score counts for team'
    }
  ];

  return {
    hole: defaultHole,
    players: defaultPlayers,
    format: 'best-ball',
    formatRules: {
      name: 'Best Ball',
      type: 'team',
      scoreMethod: 'stroke',
      specialRules: [
        'Each player plays their own ball',
        'Players play independently throughout the hole',
        'The lowest individual score counts as the team score',
        'Other scores are recorded but don\'t count'
      ]
    },
    frames,
    duration: 9000
  };
}

// Generate Stableford animation data
function generateStablefordData(): GolfAnimationData {
  const frames: AnimationFrame[] = [
    {
      timestamp: 0,
      shots: [],
      scoring: {
        hole: 1,
        players: defaultPlayers.map(p => ({ playerId: p.id, strokes: 0, points: 0 }))
      },
      narration: 'Stableford scoring awards points based on score relative to par',
      highlightRule: 'Points based on score vs par'
    },
    {
      timestamp: 3000,
      shots: [],
      scoring: {
        hole: 1,
        players: [
          { playerId: 'p1', strokes: 3, points: 3 }, // Birdie
          { playerId: 'p2', strokes: 4, points: 2 }, // Par
          { playerId: 'p3', strokes: 5, points: 1 }, // Bogey
          { playerId: 'p4', strokes: 6, points: 0 }  // Double bogey
        ]
      },
      narration: 'Alice earns 3 points for birdie, Bob 2 for par, Carol 1 for bogey',
      highlightRule: 'Birdie = 3 pts, Par = 2 pts, Bogey = 1 pt'
    }
  ];

  return {
    hole: defaultHole,
    players: defaultPlayers,
    format: 'stableford',
    formatRules: {
      name: 'Stableford',
      type: 'individual',
      scoreMethod: 'stableford',
      specialRules: [
        'Eagle or better: 4 points',
        'Birdie: 3 points',
        'Par: 2 points',
        'Bogey: 1 point',
        'Double bogey or worse: 0 points',
        'Highest total points wins'
      ]
    },
    frames,
    duration: 6000
  };
}

// Generate Match Play animation data
function generateMatchPlayData(): GolfAnimationData {
  const frames: AnimationFrame[] = [
    {
      timestamp: 0,
      shots: [],
      scoring: {
        hole: 1,
        players: [
          { playerId: 'p1', strokes: 0, status: 'All Square' },
          { playerId: 'p2', strokes: 0, status: 'All Square' }
        ],
        matchStatus: 'All Square'
      },
      narration: 'Match Play is hole-by-hole competition between players',
      highlightRule: 'Win holes, not total strokes'
    },
    {
      timestamp: 3000,
      shots: [],
      scoring: {
        hole: 1,
        players: [
          { playerId: 'p1', strokes: 4, status: '1 UP' },
          { playerId: 'p2', strokes: 5, status: '1 DOWN' }
        ],
        matchStatus: 'Player 1: 1 UP'
      },
      narration: 'Alice wins the hole with a par vs Bob\'s bogey - now 1 UP',
      highlightRule: 'Lowest score wins the hole'
    },
    {
      timestamp: 6000,
      shots: [],
      scoring: {
        hole: 2,
        players: [
          { playerId: 'p1', strokes: 3, status: '2 UP' },
          { playerId: 'p2', strokes: 4, status: '2 DOWN' }
        ],
        matchStatus: 'Player 1: 2 UP'
      },
      narration: 'Alice wins another hole - now 2 UP with 16 holes to play',
      highlightRule: 'Match continues until mathematically decided'
    }
  ];

  return {
    hole: defaultHole,
    players: defaultPlayers.slice(0, 2), // Only 2 players for match play
    format: 'match-play',
    formatRules: {
      name: 'Match Play',
      type: 'individual',
      scoreMethod: 'match',
      specialRules: [
        'Players compete hole by hole',
        'Lowest score wins the hole',
        'Tied holes are "halved"',
        'Match scored by holes up/down',
        'Match ends when one player is up by more holes than remain'
      ]
    },
    frames,
    duration: 9000
  };
}

// Main generator function
export function generateAnimationData(format: GolfAnimationData['format']): GolfAnimationData {
  switch (format) {
    case 'scramble':
      return generateScrambleData();
    case 'best-ball':
      return generateBestBallData();
    case 'stableford':
      return generateStablefordData();
    case 'match-play':
      return generateMatchPlayData();
    default:
      return generateScrambleData();
  }
}