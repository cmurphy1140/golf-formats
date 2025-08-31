import { notFound } from 'next/navigation';
import Link from 'next/link';
import { golfFormats } from '@/data/formats';
import { 
  ArrowLeft, 
  Users, 
  Clock, 
  Trophy, 
  TrendingUp,
  CheckCircle,
  XCircle,
  Lightbulb,
  List,
  Calculator,
  Shuffle,
  Settings
} from 'lucide-react';

export default function FormatDetailPage({ params }: { params: { id: string } }) {
  const format = golfFormats.find(f => f.id === params.id);

  if (!format) {
    notFound();
  }

  const categoryColors = {
    tournament: 'from-blue-500 to-blue-600',
    casual: 'from-green-500 to-green-600',
    betting: 'from-orange-500 to-orange-600',
    team: 'from-purple-500 to-purple-600',
    training: 'from-gray-500 to-gray-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${categoryColors[format.category]} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/formats"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to all formats
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-4">{format.name}</h1>
              <p className="text-xl text-white/90 max-w-3xl">
                {format.description}
              </p>
            </div>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium capitalize">
              {format.category}
            </span>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Users className="text-white/80" size={24} />
                <div>
                  <p className="text-white/70 text-sm">Players</p>
                  <p className="text-white font-semibold">
                    {format.players.min === format.players.max 
                      ? format.players.min 
                      : `${format.players.min}-${format.players.max}`}
                    {format.players.ideal && ` (ideal: ${format.players.ideal})`}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Clock className="text-white/80" size={24} />
                <div>
                  <p className="text-white/70 text-sm">Duration</p>
                  <p className="text-white font-semibold">{format.duration}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Trophy className="text-white/80" size={24} />
                <div>
                  <p className="text-white/70 text-sm">Competition</p>
                  <p className="text-white font-semibold capitalize">{format.type}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-white/80" size={24} />
                <div>
                  <p className="text-white/70 text-sm">Skill Level</p>
                  <p className="text-white font-semibold capitalize">
                    {format.skillLevel.length === 3 ? 'All levels' : format.skillLevel.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Rules */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <List className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Rules</h2>
              </div>
              <ul className="space-y-3">
                {format.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scoring */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Calculator className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Scoring</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Method</h3>
                  <p className="text-gray-700 dark:text-gray-300">{format.scoring.method}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Details</h3>
                  <p className="text-gray-700 dark:text-gray-300">{format.scoring.description}</p>
                </div>
              </div>
            </div>

            {/* Pros and Cons */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Advantages */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Advantages</h3>
                </div>
                <ul className="space-y-2">
                  {format.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400 mt-1">+</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disadvantages */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <XCircle className="text-red-600 dark:text-red-400" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Disadvantages</h3>
                </div>
                <ul className="space-y-2">
                  {format.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-600 dark:text-red-400 mt-1">-</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Tips */}
            {format.tips && format.tips.length > 0 && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Lightbulb className="text-yellow-600 dark:text-yellow-400" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tips</h3>
                </div>
                <ul className="space-y-2">
                  {format.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Variations */}
            {format.variations && format.variations.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <Shuffle className="text-indigo-600 dark:text-indigo-400" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Variations</h3>
                </div>
                <ul className="space-y-2">
                  {format.variations.map((variation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{variation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Equipment */}
            {format.equipment && format.equipment.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Settings className="text-gray-600 dark:text-gray-400" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Equipment Needed</h3>
                </div>
                <ul className="space-y-2">
                  {format.equipment.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-gray-600 dark:text-gray-400 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Similar Formats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Similar Formats</h3>
              <div className="space-y-3">
                {golfFormats
                  .filter(f => f.category === format.category && f.id !== format.id)
                  .slice(0, 3)
                  .map(similarFormat => (
                    <Link
                      key={similarFormat.id}
                      href={`/formats/${similarFormat.id}`}
                      className="block p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white">{similarFormat.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {similarFormat.description}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return golfFormats.map((format) => ({
    id: format.id,
  }));
}