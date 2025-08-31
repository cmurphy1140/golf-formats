'use client';

import Link from 'next/link';
import { useState } from 'react';
import { golfFormats } from '@/data/formats';
import FormatCard from '@/components/format-card';
import SearchBar from '@/components/search-bar';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { 
  Trophy, 
  Users, 
  Clock, 
  Target,
  ArrowRight,
  Sparkles,
  Grid,
  Zap,
  Star
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredFormats, setFeaturedFormats] = useState(golfFormats.slice(0, 6));

  // Popular formats
  const popularFormats = [
    golfFormats.find(f => f.id === 'scramble'),
    golfFormats.find(f => f.id === 'best-ball'),
    golfFormats.find(f => f.id === 'skins'),
    golfFormats.find(f => f.id === 'stableford'),
  ].filter(Boolean);

  const stats = [
    { icon: Trophy, label: 'Game Formats', value: golfFormats.length + '+' },
    { icon: Users, label: 'Player Options', value: '1-144' },
    { icon: Clock, label: 'Time Ranges', value: '3-5 hrs' },
    { icon: Target, label: 'Skill Levels', value: 'All' },
  ];

  const categories = [
    { name: 'Tournament', count: golfFormats.filter(f => f.category === 'tournament').length, color: 'from-blue-500 to-blue-600' },
    { name: 'Casual', count: golfFormats.filter(f => f.category === 'casual').length, color: 'from-green-500 to-green-600' },
    { name: 'Betting', count: golfFormats.filter(f => f.category === 'betting').length, color: 'from-orange-500 to-orange-600' },
    { name: 'Team', count: golfFormats.filter(f => f.category === 'team').length, color: 'from-purple-500 to-purple-600' },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = golfFormats.filter(format => 
        format.name.toLowerCase().includes(query.toLowerCase()) ||
        format.description.toLowerCase().includes(query.toLowerCase())
      );
      setFeaturedFormats(filtered.slice(0, 6));
    } else {
      setFeaturedFormats(golfFormats.slice(0, 6));
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-6">
              <Sparkles size={16} />
              <span className="text-sm font-medium">Your Complete Golf Formats Resource</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              Discover Your Perfect
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Golf Game Format
              </span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
              From classic stroke play to exciting betting games, find the ideal format for your group. 
              {golfFormats.length}+ formats with detailed rules, scoring, and strategies.
            </p>

            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Try 'scramble', 'betting', or '4 players'..."
                className="transform hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/formats"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Browse All Formats
                <Grid size={20} />
              </Link>
              <Link
                href="/formats?category=tournament"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-semibold hover:bg-white/30 transition-all"
              >
                Tournament Formats
                <Trophy size={20} />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <Icon className="w-8 h-8 text-white/80 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Find the perfect format for your playing style
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/formats?category=${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-2xl p-6 bg-white dark:bg-gray-800 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${category.color} mb-4`}>
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {category.count}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    formats available
                  </p>
                  <ArrowRight className="absolute bottom-6 right-6 w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Formats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Popular Formats
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Most-played formats by recreational golfers
              </p>
            </div>
            <Link
              href="/formats"
              className="hidden sm:inline-flex items-center gap-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-semibold"
            >
              View all
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularFormats.map((format) => format && (
              <div key={format.id} className="relative">
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="bg-yellow-400 text-yellow-900 rounded-full p-2">
                    <Star size={16} fill="currentColor" />
                  </div>
                </div>
                <FormatCard format={format} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Formats */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {searchQuery ? 'Search Results' : 'Featured Formats'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {searchQuery 
                ? `Showing results for "${searchQuery}"`
                : 'Handpicked formats to enhance your golf experience'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredFormats.map((format) => (
              <FormatCard key={format.id} format={format} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/formats"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Explore All Formats
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Golf Game?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Find the perfect format for your next round and make every game memorable
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/formats"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Start Exploring
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/tournaments"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-semibold hover:bg-white/30 transition-all"
            >
              Tournament Ideas
              <Trophy size={20} />
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}