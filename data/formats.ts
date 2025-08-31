import { GolfFormat } from '@/types/golf';

export const golfFormats: GolfFormat[] = [
  {
    id: 'stroke-play',
    name: 'Stroke Play',
    category: 'tournament',
    description: 'Count every stroke taken during the round. Lowest total score wins.',
    players: { min: 1, max: 144, ideal: 4 },
    skillLevel: ['beginner', 'intermediate', 'advanced'],
    duration: '4-5 hours',
    type: 'individual',
    rules: [
      'Count every stroke taken',
      'Must hole out on every hole',
      'No maximum score per hole',
      'Penalties apply for rules violations'
    ],
    scoring: {
      method: 'Total strokes',
      description: 'Gross scoring: actual strokes, Net scoring: strokes minus handicap'
    },
    pros: ['Fair comparison', 'Official format', 'Straightforward scoring'],
    cons: ['One bad hole ruins round', 'Must play every shot', 'Can be slow'],
    tips: ['Focus on consistency, avoid big numbers'],
    popularity: 95,
    difficulty: 5
  },
  {
    id: 'match-play',
    name: 'Match Play',
    category: 'tournament',
    description: 'Head-to-head competition where each hole is a separate contest.',
    players: { min: 2, max: 2 },
    skillLevel: ['beginner', 'intermediate', 'advanced'],
    duration: '3-4 hours',
    type: 'individual',
    rules: [
      'Win holes to go "up"',
      'Match ends when lead exceeds remaining holes',
      'Concessions allowed',
      'Halved holes split'
    ],
    scoring: {
      method: 'Holes won',
      description: 'Track holes up/down, All square means tied'
    },
    pros: ['Bad holes don\'t matter', 'Psychological element', 'Can concede putts'],
    cons: ['Only two players', 'Complex rules', 'Can end early'],
    popularity: 75,
    difficulty: 7
  },
  {
    id: 'scramble',
    name: 'Scramble',
    category: 'team',
    description: 'All team members hit, select best shot, everyone plays from there.',
    players: { min: 2, max: 4, ideal: 4 },
    skillLevel: ['beginner', 'intermediate', 'advanced'],
    duration: '4-5 hours',
    type: 'team',
    rules: [
      'All players tee off',
      'Select best shot',
      'All play from selected position',
      'Minimum drives per player required'
    ],
    scoring: {
      method: 'Team score',
      description: 'One score per team, Handicap: combined ÷ 8'
    },
    pros: ['Most forgiving', 'Great for groups', 'Social format'],
    cons: ['Strong players dominate', 'Not individual test'],
    tips: ['Use best driver\'s tee shots, best putter\'s putts'],
    popularity: 90,
    difficulty: 3
  },
  {
    id: 'skins',
    name: 'Skins',
    category: 'betting',
    description: 'Each hole worth a "skin" - lowest score wins, ties carry over.',
    players: { min: 2, max: 8, ideal: 4 },
    skillLevel: ['intermediate', 'advanced'],
    duration: '4-5 hours',
    type: 'individual',
    rules: [
      'Each hole worth one skin',
      'Lowest score wins the skin',
      'Tied holes carry over',
      'Carryovers accumulate value'
    ],
    scoring: {
      method: 'Skins won',
      description: 'Track skins per player, Value multiplies on carryovers'
    },
    pros: ['Every hole matters', 'Dramatic carryovers', 'Simple tracking'],
    cons: ['Can be expensive', 'Luck factor high'],
    variations: ['Whole round', 'Nine hole splits', 'Progressive values'],
    popularity: 80,
    difficulty: 6
  },
  {
    id: 'nassau',
    name: 'Nassau',
    category: 'betting',
    description: 'Three separate bets: front 9, back 9, and overall 18 holes.',
    players: { min: 2, max: 4 },
    skillLevel: ['intermediate', 'advanced'],
    duration: '4-5 hours',
    type: 'individual',
    rules: [
      'Three separate matches',
      'Front 9, Back 9, Overall 18',
      'Can "press" when 2 down',
      'Press creates new bet'
    ],
    scoring: {
      method: 'Match play or stroke play',
      description: 'Track three scores, Monitor press bets'
    },
    pros: ['Multiple ways to win', 'Press adds excitement', 'Classic format'],
    cons: ['Complex tracking', 'Can get expensive with presses'],
    popularity: 70,
    difficulty: 8
  },
  {
    id: 'wolf',
    name: 'Wolf',
    category: 'betting',
    description: 'Rotating "Wolf" chooses partner or plays alone after seeing drives.',
    players: { min: 3, max: 4, ideal: 4 },
    skillLevel: ['intermediate', 'advanced'],
    duration: '4-5 hours',
    type: 'partnership',
    rules: [
      'Wolf rotates each hole',
      'Wolf tees off last',
      'Choose partner after drives',
      'Or go "Lone Wolf" for more points'
    ],
    scoring: {
      method: 'Points',
      description: 'Partnership: 1 point each, Lone Wolf: 3 points win, -3 loss'
    },
    pros: ['Strategic decisions', 'Changing partnerships', 'Exciting format'],
    cons: ['Complex rules', 'Slower pace'],
    tips: ['Assess risk/reward for going alone'],
    popularity: 65,
    difficulty: 9
  },
  {
    id: 'best-ball',
    name: 'Best Ball',
    category: 'team',
    description: 'Partners play own ball, count better score on each hole.',
    players: { min: 2, max: 4 },
    skillLevel: ['beginner', 'intermediate', 'advanced'],
    duration: '4-5 hours',
    type: 'partnership',
    rules: [
      'Each player plays own ball',
      'Take better score of partners',
      'Can be stroke or match play',
      'Full handicaps typically used'
    ],
    scoring: {
      method: 'Better score each hole',
      description: 'Track individual scores, Record team score'
    },
    pros: ['Play own ball', 'Partner backup', 'Standard pace'],
    cons: ['One player may dominate'],
    popularity: 85,
    difficulty: 4
  },
  {
    id: 'stableford',
    name: 'Stableford',
    category: 'tournament',
    description: 'Points-based scoring where higher is better. Rewards aggressive play.',
    players: { min: 1, max: 144 },
    skillLevel: ['beginner', 'intermediate', 'advanced'],
    duration: '3-4 hours',
    type: 'individual',
    rules: [
      'Eagle: 4 points',
      'Birdie: 3 points',
      'Par: 2 points',
      'Bogey: 1 point',
      'Double bogey+: 0 points'
    ],
    scoring: {
      method: 'Point accumulation',
      description: 'Highest points wins, Can pick up after double bogey'
    },
    pros: ['Bad holes don\'t ruin round', 'Faster play', 'Encourages aggressive play'],
    cons: ['Less familiar format', 'Complex for beginners'],
    popularity: 60,
    difficulty: 6
  },
  {
    id: 'alternate-shot',
    name: 'Alternate Shot',
    category: 'team',
    description: 'Partners play one ball, alternating shots throughout the hole.',
    players: { min: 2, max: 4 },
    skillLevel: ['intermediate', 'advanced'],
    duration: '3-4 hours',
    type: 'partnership',
    rules: [
      'Partners alternate shots',
      'Alternate tee shots by hole',
      'One ball per team',
      'Penalties don\'t change order'
    ],
    scoring: {
      method: 'Team score',
      description: 'One score per team, 50% combined handicap'
    },
    pros: ['True partnership', 'Faster play', 'Team strategy'],
    cons: ['High pressure', 'Need compatible partner'],
    popularity: 55,
    difficulty: 8
  },
  {
    id: 'chapman',
    name: 'Chapman/Pinehurst',
    category: 'team',
    description: 'Both tee off, play partner\'s ball for second shot, then alternate.',
    players: { min: 2, max: 4 },
    skillLevel: ['intermediate', 'advanced'],
    duration: '4-5 hours',
    type: 'partnership',
    rules: [
      'Both players tee off',
      'Switch balls for second shot',
      'Select better ball after second',
      'Alternate shots to finish'
    ],
    scoring: {
      method: 'Team score',
      description: '60% low handicap, 40% high'
    },
    pros: ['Strategic format', 'Both players involved', 'Interesting decisions'],
    cons: ['Complex rules', 'Slower pace'],
    popularity: 45,
    difficulty: 9
  },
  {
    id: 'bingo-bango-bongo',
    name: 'Bingo Bango Bongo',
    category: 'casual',
    description: 'Three points per hole: first on green, closest to pin, first in hole.',
    players: { min: 2, max: 4 },
    skillLevel: ['beginner', 'intermediate'],
    duration: '4-5 hours',
    type: 'individual',
    rules: [
      'Bingo: First on green',
      'Bango: Closest when all on',
      'Bongo: First in hole',
      'Must follow order of play'
    ],
    scoring: {
      method: 'Points',
      description: '3 points available per hole, Track total points'
    },
    pros: ['Levels playing field', 'Every shot matters', 'Fun for all levels'],
    cons: ['Strict order required', 'Can be slow'],
    popularity: 50,
    difficulty: 5
  },
  {
    id: 'vegas',
    name: 'Vegas',
    category: 'betting',
    description: 'Team scores combined into 2-digit number, lower score first.',
    players: { min: 4, max: 4 },
    skillLevel: ['advanced'],
    duration: '4-5 hours',
    type: 'team',
    rules: [
      'Combine team scores',
      'Lower score goes first',
      'Example: 4 and 6 = 46',
      'Birdie flips opponent score'
    ],
    scoring: {
      method: 'Point differential',
      description: 'Track running difference, Can get expensive quickly'
    },
    pros: ['Exciting swings', 'Team format', 'Strategic play'],
    cons: ['Can be costly', 'Complex scoring', 'Pressure situations'],
    popularity: 40,
    difficulty: 10
  },
  {
    id: 'shamble',
    name: 'Shamble',
    category: 'team',
    description: 'Scramble off the tee, then play own ball to the hole.',
    players: { min: 2, max: 4, ideal: 4 },
    skillLevel: ['beginner', 'intermediate', 'advanced'],
    duration: '4-5 hours',
    type: 'team',
    rules: [
      'All players tee off',
      'Select best drive',
      'Play own ball from there',
      'Take best score(s)'
    ],
    scoring: {
      method: 'Best ball(s)',
      description: 'Can use 1 or 2 best scores, Handicaps applied'
    },
    pros: ['Easier than scramble', 'Individual play element', 'Good for mixed groups'],
    cons: ['Still relies on good drives', 'Can be confusing'],
    popularity: 75,
    difficulty: 4
  },
  {
    id: 'quota',
    name: 'Quota Tournament',
    category: 'tournament',
    description: 'Players have point quota based on handicap, try to exceed it.',
    players: { min: 1, max: 144 },
    skillLevel: ['intermediate', 'advanced'],
    duration: '4-5 hours',
    type: 'individual',
    rules: [
      'Quota = 36 - handicap',
      'Stableford point scoring',
      'Try to exceed quota',
      'Highest over quota wins'
    ],
    scoring: {
      method: 'Points vs quota',
      description: 'Track points earned, Calculate vs quota'
    },
    pros: ['Levels competition', 'Clear target', 'Fair for all'],
    cons: ['Requires handicaps', 'Complex initial setup'],
    popularity: 35,
    difficulty: 7
  },
  {
    id: 'dots',
    name: 'Dots/Garbage',
    category: 'betting',
    description: 'Award points for various achievements like greenies, sandies, birdies.',
    players: { min: 2, max: 8 },
    skillLevel: ['intermediate', 'advanced'],
    duration: '4-5 hours',
    type: 'individual',
    rules: [
      'Greenie: Closest to pin on par 3',
      'Sandie: Par from bunker',
      'Barkie: Par after hitting tree',
      'Birdie: Under par score'
    ],
    scoring: {
      method: 'Dot accumulation',
      description: 'Track various achievements, Assign point values'
    },
    pros: ['Multiple ways to score', 'Rewards good shots', 'Entertaining'],
    cons: ['Complex tracking', 'Need to agree on dots'],
    variations: ['Positive dots only', 'Include negative dots'],
    popularity: 55,
    difficulty: 6
  },
  {
    id: 'six-six-six',
    name: 'Six-Six-Six',
    category: 'casual',
    description: 'Three different formats over 18 holes, 6 holes each.',
    players: { min: 2, max: 4 },
    skillLevel: ['intermediate', 'advanced'],
    duration: '4-5 hours',
    type: 'team',
    rules: [
      'Holes 1-6: Best ball',
      'Holes 7-12: Scramble',
      'Holes 13-18: Alternate shot',
      'Track cumulative score'
    ],
    scoring: {
      method: 'Cumulative',
      description: 'Different scoring each segment, Total determines winner'
    },
    pros: ['Variety in one round', 'Tests all skills', 'Stays interesting'],
    cons: ['Rule changes confusing', 'Pace varies'],
    popularity: 45,
    difficulty: 8
  },
  {
    id: 'scotch',
    name: 'Scotch Foursomes',
    category: 'team',
    description: 'Both tee off, select better drive, alternate shots from there.',
    players: { min: 2, max: 4 },
    skillLevel: ['intermediate', 'advanced'],
    duration: '3-4 hours',
    type: 'partnership',
    rules: [
      'Both players drive',
      'Choose better drive',
      'Alternate from there',
      'Player not selected hits next'
    ],
    scoring: {
      method: 'Team score',
      description: 'One score per team, Handicap adjustments'
    },
    pros: ['Both drive', 'Faster than regular golf', 'Strategic'],
    cons: ['Still pressure shots', 'Need good partner'],
    popularity: 40,
    difficulty: 7
  },
  {
    id: 'pro-am',
    name: 'Pro-Am',
    category: 'team',
    description: 'Professional paired with amateurs, various scoring formats.',
    players: { min: 3, max: 5 },
    skillLevel: ['beginner', 'intermediate', 'advanced'],
    duration: '4-5 hours',
    type: 'team',
    rules: [
      'Pro plays scratch',
      'Amateurs get handicaps',
      'Best ball scoring common',
      'Pro score may count double'
    ],
    scoring: {
      method: 'Best ball or modified',
      description: 'Various formats used, Pro guidance included'
    },
    pros: ['Learn from pro', 'Exciting format', 'Good for events'],
    cons: ['Need professional', 'Can be intimidating'],
    popularity: 30,
    difficulty: 5
  },
  {
    id: 'nines',
    name: 'Nines',
    category: 'casual',
    description: 'Nine points distributed among players based on scores each hole.',
    players: { min: 3, max: 3 },
    skillLevel: ['intermediate'],
    duration: '4-5 hours',
    type: 'individual',
    rules: [
      '9 points per hole',
      'Best score gets 5 points',
      'Second gets 3 points',
      'Third gets 1 point',
      'Split points for ties'
    ],
    scoring: {
      method: 'Point accumulation',
      description: 'Track points per hole, Most points wins'
    },
    pros: ['Perfect for threesomes', 'Simple math', 'Competitive'],
    cons: ['Only for 3 players', 'Can be predictable'],
    popularity: 35,
    difficulty: 5
  },
  {
    id: 'barkies',
    name: 'Barkies',
    category: 'casual',
    description: 'Make par or better after hitting a tree during the hole.',
    players: { min: 2, max: 8 },
    skillLevel: ['intermediate', 'advanced'],
    duration: '4-5 hours',
    type: 'individual',
    rules: [
      'Hit tree during hole',
      'Still make par or better',
      'Must be witnessed',
      'Worth predetermined amount'
    ],
    scoring: {
      method: 'Achievement tracking',
      description: 'Count barkies made, Assign value per barkie'
    },
    pros: ['Adds fun element', 'Rewards recovery', 'Simple concept'],
    cons: ['Requires honesty', 'Arguments over hits', 'Luck-based'],
    popularity: 25,
    difficulty: 6
  }
];