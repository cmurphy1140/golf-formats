import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { GolfFormat } from "@/types/golf"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPlayerCount(players: GolfFormat['players']): string {
  if (players.ideal && players.ideal !== players.min && players.ideal !== players.max) {
    return `${players.min}-${players.max} (ideal: ${players.ideal})`
  }
  if (players.min === players.max) {
    return `${players.min} players`
  }
  return `${players.min}-${players.max} players`
}

export function getDifficultyLabel(difficulty: number): string {
  if (difficulty <= 3) return 'Easy'
  if (difficulty <= 6) return 'Medium'
  if (difficulty <= 8) return 'Hard'
  return 'Expert'
}

export function getDifficultyColor(difficulty: number): string {
  if (difficulty <= 3) return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
  if (difficulty <= 6) return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30'
  if (difficulty <= 8) return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30'
  return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
}

export function getPopularityLabel(popularity: number): string {
  if (popularity >= 80) return 'Very Popular'
  if (popularity >= 60) return 'Popular'
  if (popularity >= 40) return 'Moderate'
  return 'Niche'
}

export function getCategoryColor(category: GolfFormat['category']): string {
  const colors = {
    tournament: 'from-blue-500 to-blue-600',
    casual: 'from-green-500 to-green-600', 
    betting: 'from-orange-500 to-orange-600',
    team: 'from-purple-500 to-purple-600',
    training: 'from-indigo-500 to-indigo-600'
  }
  return colors[category] || 'from-gray-500 to-gray-600'
}

export function getTypeIcon(type: GolfFormat['type']): string {
  const icons = {
    individual: 'User',
    team: 'Users',
    partnership: 'UserPlus'
  }
  return icons[type] || 'User'
}

export function formatSkillLevels(skillLevels: string[]): string {
  if (skillLevels.length === 3) return 'All Levels'
  return skillLevels.map(level => 
    level.charAt(0).toUpperCase() + level.slice(1)
  ).join(', ')
}

export function searchFormats(formats: GolfFormat[], query: string): GolfFormat[] {
  if (!query.trim()) return formats

  const searchTerm = query.toLowerCase().trim()
  
  return formats.filter(format => {
    // Search in name
    if (format.name.toLowerCase().includes(searchTerm)) return true
    
    // Search in description
    if (format.description.toLowerCase().includes(searchTerm)) return true
    
    // Search in category
    if (format.category.toLowerCase().includes(searchTerm)) return true
    
    // Search in type
    if (format.type.toLowerCase().includes(searchTerm)) return true
    
    // Search in skill levels
    if (format.skillLevel.some(level => level.toLowerCase().includes(searchTerm))) return true
    
    // Search in rules
    if (format.rules.some(rule => rule.toLowerCase().includes(searchTerm))) return true
    
    // Search in variations
    if (format.variations?.some(variation => variation.toLowerCase().includes(searchTerm))) return true
    
    return false
  })
}

export function sortFormats(formats: GolfFormat[], sortBy: string): GolfFormat[] {
  const sortedFormats = [...formats]
  
  switch (sortBy) {
    case 'name':
      return sortedFormats.sort((a, b) => a.name.localeCompare(b.name))
    case 'popularity':
      return sortedFormats.sort((a, b) => b.popularity - a.popularity)
    case 'difficulty':
      return sortedFormats.sort((a, b) => a.difficulty - b.difficulty)
    case 'players-min':
      return sortedFormats.sort((a, b) => a.players.min - b.players.min)
    case 'players-max':
      return sortedFormats.sort((a, b) => b.players.max - a.players.max)
    default:
      return sortedFormats
  }
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Replace multiple - with single -
    .trim() // Remove leading/trailing -
}

export function validatePlayerCount(count: number, format: GolfFormat): boolean {
  return count >= format.players.min && count <= format.players.max
}

export function getRecommendedFormats(
  formats: GolfFormat[], 
  playerCount: number, 
  skillLevel: string,
  excludeIds: string[] = []
): GolfFormat[] {
  return formats
    .filter(format => 
      !excludeIds.includes(format.id) &&
      validatePlayerCount(playerCount, format) &&
      format.skillLevel.includes(skillLevel as ('beginner' | 'intermediate' | 'advanced'))
    )
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4)
}

export function formatDuration(duration: string): string {
  return duration.replace(/(\d+)-(\d+) hours?/, '$1-$2 hrs')
}