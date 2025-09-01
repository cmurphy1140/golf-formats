import Link from 'next/link';
import { Trophy, ArrowLeft } from 'lucide-react';

export default function TournamentsPage() {
  // TODO: Implement full tournament page with:
  // - Tournament creation wizard
  // - Bracket generator for match play tournaments
  // - Leaderboard templates
  // - Scoring system configuration
  // - Tournament management features
  // - Export/share tournament results
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to home
        </Link>
        
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tournament Formats
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Discover competitive formats perfect for organizing your next golf tournament
          </p>
          <Link
            href="/formats?category=tournament"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            Browse Tournament Formats
            <Trophy size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}