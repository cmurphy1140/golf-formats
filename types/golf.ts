export interface GolfFormat {
  id: string;
  name: string;
  category: 'tournament' | 'casual' | 'betting' | 'team' | 'training';
  description: string;
  players: {
    min: number;
    max: number;
    ideal?: number;
  };
  skillLevel: ('beginner' | 'intermediate' | 'advanced')[];
  duration: string;
  type: 'individual' | 'team' | 'partnership';
  rules: string[];
  scoring: {
    method: string;
    description: string;
  };
  pros: string[];
  cons: string[];
  tips?: string[];
  popularity: number;
  difficulty: number;
  variations?: string[];
  equipment?: string[];
}

export interface FilterState {
  category: string[];
  playerCount: number[];
  skillLevel: string[];
  duration: string[];
  difficulty: number[];
  type: string[];
}

export interface SearchState {
  query: string;
  suggestions: string[];
  recentSearches: string[];
}

export interface ComparisonFormat {
  id: string;
  format: GolfFormat;
}