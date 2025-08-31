export const CATEGORIES = [
  { value: 'tournament', label: 'Tournament', description: 'Official competition formats' },
  { value: 'casual', label: 'Casual', description: 'Fun, relaxed game formats' },
  { value: 'betting', label: 'Betting', description: 'Wagering and side bet games' },
  { value: 'team', label: 'Team', description: 'Group and partnership formats' },
  { value: 'training', label: 'Training', description: 'Practice and skill building' }
] as const

export const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner', description: 'New to golf, learning basics' },
  { value: 'intermediate', label: 'Intermediate', description: 'Some experience, improving game' },
  { value: 'advanced', label: 'Advanced', description: 'Experienced, low handicap' }
] as const

export const GAME_TYPES = [
  { value: 'individual', label: 'Individual', description: 'Solo competition' },
  { value: 'team', label: 'Team', description: 'Group vs group' },
  { value: 'partnership', label: 'Partnership', description: 'Paired players' }
] as const

export const DURATION_RANGES = [
  { value: '2-3', label: '2-3 hours', description: 'Quick rounds' },
  { value: '3-4', label: '3-4 hours', description: 'Standard pace' },
  { value: '4-5', label: '4-5 hours', description: 'Full rounds' },
  { value: '5+', label: '5+ hours', description: 'Extended play' }
] as const

export const PLAYER_COUNT_RANGES = [
  { value: 1, label: '1 Player', description: 'Solo play' },
  { value: 2, label: '2 Players', description: 'Head-to-head' },
  { value: 3, label: '3 Players', description: 'Threesome' },
  { value: 4, label: '4 Players', description: 'Foursome' },
  { value: 5, label: '5+ Players', description: 'Large groups' }
] as const

export const DIFFICULTY_LEVELS = [
  { value: 1, label: 'Very Easy', color: 'green' },
  { value: 2, label: 'Easy', color: 'green' },
  { value: 3, label: 'Easy-Medium', color: 'green' },
  { value: 4, label: 'Medium', color: 'yellow' },
  { value: 5, label: 'Medium', color: 'yellow' },
  { value: 6, label: 'Medium-Hard', color: 'yellow' },
  { value: 7, label: 'Hard', color: 'orange' },
  { value: 8, label: 'Hard', color: 'orange' },
  { value: 9, label: 'Very Hard', color: 'red' },
  { value: 10, label: 'Expert', color: 'red' }
] as const

export const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity', description: 'Most played first' },
  { value: 'name', label: 'Name', description: 'Alphabetical order' },
  { value: 'difficulty', label: 'Difficulty', description: 'Easiest first' },
  { value: 'players-min', label: 'Min Players', description: 'Fewest players first' },
  { value: 'players-max', label: 'Max Players', description: 'Most players first' }
] as const

export const POPULAR_SEARCHES = [
  'scramble',
  'best ball', 
  'skins',
  'match play',
  'stroke play',
  'nassau',
  'stableford',
  'wolf',
  '4 players',
  'beginner friendly',
  'betting games',
  'team formats'
] as const

export const EQUIPMENT_SUGGESTIONS = [
  'Standard golf clubs',
  'Golf balls (multiple)',
  'Tees',
  'Ball markers',
  'Scorecard and pencil',
  'Range finder (optional)',
  'Handicap calculator'
] as const

export const DEFAULT_FILTER_STATE = {
  category: [],
  playerCount: [],
  skillLevel: [],
  duration: [],
  difficulty: [],
  type: []
} as const

export const COMPARISON_CRITERIA = [
  { key: 'difficulty', label: 'Difficulty', type: 'number' },
  { key: 'popularity', label: 'Popularity', type: 'number' },
  { key: 'players', label: 'Players', type: 'range' },
  { key: 'duration', label: 'Duration', type: 'text' },
  { key: 'skillLevel', label: 'Skill Level', type: 'array' },
  { key: 'type', label: 'Game Type', type: 'text' },
  { key: 'category', label: 'Category', type: 'text' }
] as const

export const SEO_KEYWORDS = [
  'golf game formats',
  'golf rules',
  'golf scoring',
  'recreational golf',
  'golf tournaments',
  'golf betting games',
  'team golf formats',
  'golf strategies',
  'golf variations',
  'weekend golf games'
] as const

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/golfformats',
  instagram: 'https://instagram.com/golfformats',
  facebook: 'https://facebook.com/golfformats'
} as const