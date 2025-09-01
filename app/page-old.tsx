'use client';

import Link from 'next/link';
import { useState } from 'react';
import { golfFormats } from '@/data/formats';
import FormatCardEnhanced from '@/components/format-card-enhanced';
import SearchBar from '@/components/search-bar';
import { 
  Trophy, 
  Users, 
  Clock, 
  Target,
  ArrowRight,
  Crown,
  Grid,
  Star,
  Shield,
  ChevronRight
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
    { icon: Trophy, label: 'Game Formats', value: golfFormats.length + '+', color: 'text-masters-gold' },
    { icon: Users, label: 'Player Options', value: '1-144', color: 'text-masters-pristine' },
    { icon: Clock, label: 'Time Ranges', value: '3-5 hrs', color: 'text-masters-azalea' },
    { icon: Target, label: 'Skill Levels', value: 'All', color: 'text-masters-fairway' },
  ];

  const categories = [
    { 
      name: 'Tournament', 
      count: golfFormats.filter(f => f.category === 'tournament').length, 
      icon: Trophy,
      description: 'Official competitive formats'
    },
    { 
      name: 'Casual', 
      count: golfFormats.filter(f => f.category === 'casual').length, 
      icon: Users,
      description: 'Fun recreational games'
    },
    { 
      name: 'Betting', 
      count: golfFormats.filter(f => f.category === 'betting').length, 
      icon: Star,
      description: 'Exciting wagering games'
    },
    { 
      name: 'Team', 
      count: golfFormats.filter(f => f.category === 'team').length, 
      icon: Shield,
      description: 'Collaborative team formats'
    },
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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-masters-cream masters-pattern">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-masters-pine/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-masters-fairway/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative container-masters section-padding">
          <div className="text-center max-w-5xl mx-auto">
            {/* Tradition Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-masters-pine/10 border border-masters-pine/20 rounded-full text-masters-pine mb-8 animate-fade-in">
              <Crown size={20} />
              <span className="text-small font-medium tracking-wider uppercase">A Tradition of Excellence</span>
            </div>
            
            <h1 className="text-display lg:text-8xl font-serif font-bold text-masters-charcoal mb-8 tracking-tight animate-slide-up text-balance">
              Discover Golf&apos;s
              <span className="block text-masters-pine">
                Greatest Traditions
              </span>
            </h1>
            
            <p className="text-h4 text-masters-slate max-w-4xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              From the hallowed grounds of Augusta National to your local course, explore {golfFormats.length}+ 
              prestigious golf formats with the elegance and tradition they deserve.
            </p>

            <div className="max-w-3xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search the archives..."
                className="shadow-large hover-glow"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <Link
                href="/formats"
                className="btn-masters-tradition hover-lift focus-masters"
              >
                Explore the Collection
                <Grid size={22} />
              </Link>
              <Link
                href="/formats?category=tournament"
                className="btn-masters-secondary hover-lift focus-masters"
              >
                Championship Formats
                <Trophy size={20} />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group hover-lift">
                  <div className="card-masters hover-glow p-8">
                    <Icon className={`w-12 h-12 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`} />
                    <div className="text-display font-serif font-bold text-masters-charcoal mb-2">{stat.value}</div>
                    <div className="text-small text-masters-slate uppercase tracking-wider font-medium">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-masters-sand/30">
        <div className="container-masters">
          <div className="text-center mb-16">
            <h2 className="text-h1 font-serif font-bold text-masters-charcoal mb-6">
              Browse Our Collection
            </h2>
            <p className="text-h4 text-masters-slate max-w-2xl mx-auto">
              Discover formats steeped in tradition, each with its own distinguished legacy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.name}
                  href={`/formats?category=${category.name.toLowerCase()}`}
                  className="group card-masters hover-glow p-8 animate-slide-up hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-masters-pine/10 rounded flex items-center justify-center mb-4 group-hover:bg-masters-pine/20 transition-colors duration-300">
                      <Icon className="w-8 h-8 text-masters-pine group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-h3 font-serif font-bold text-masters-charcoal mb-2">
                      {category.name}
                    </h3>
                    <p className="text-small text-masters-slate mb-4 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-h2 font-serif font-bold text-masters-pine mb-1">
                        {category.count}
                      </div>
                      <div className="text-tiny text-masters-slate uppercase tracking-wider">
                        Formats Available
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-masters-slate group-hover:text-masters-pine group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Formats */}
      <section className="section-padding bg-masters-cream">
        <div className="container-masters">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="badge-tradition mb-6">
                <Star size={18} className="text-masters-gold" />
                <span className="font-medium">Most Celebrated</span>
              </div>
              <h2 className="text-h1 font-serif font-bold text-masters-charcoal mb-4">
                Champions&apos; Choice
              </h2>
              <p className="text-h4 text-masters-slate max-w-2xl">
                The most revered formats played by golfers of distinction
              </p>
            </div>
            <Link
              href="/formats"
              className="hidden lg:flex btn-masters-ghost hover-lift focus-masters"
            >
              View Collection
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularFormats.map((format, index) => format && (
              <div key={format.id} className="relative animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="w-12 h-12 bg-masters-gold rounded-full flex items-center justify-center shadow-large">
                    <Crown size={20} className="text-masters-pine" />
                  </div>
                </div>
                <FormatCardEnhanced format={format} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Formats */}
      <section className="section-padding bg-masters-sand/20 masters-pattern">
        <div className="container-masters">
          <div className="text-center mb-16">
            <h2 className="text-h1 font-serif font-bold text-masters-charcoal mb-6">
              {searchQuery ? 'Search Results' : 'Curator&apos;s Selection'}
            </h2>
            <p className="text-h4 text-masters-slate max-w-3xl mx-auto">
              {searchQuery 
                ? `Showing distinguished results for "${searchQuery}"`
                : 'Handpicked formats to elevate your golf experience with timeless elegance'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFormats.map((format, index) => (
              <div key={format.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <FormatCardEnhanced format={format} />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/formats"
              className="btn-masters-tradition hover-lift focus-masters"
            >
              Explore Full Collection
              <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-masters-pine masters-pattern">
        <div className="container-masters">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-masters-cream/10 rounded-full mb-8">
              <Trophy className="w-10 h-10 text-masters-gold" />
            </div>
            <h2 className="text-display font-serif font-bold text-masters-cream mb-8">
              Join the Tradition
            </h2>
            <p className="text-h3 text-masters-cream/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Embrace the legacy of golf&apos;s greatest formats and elevate your game 
              to championship standards
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/formats"
                className="inline-flex items-center gap-3 px-10 py-4 bg-masters-cream text-masters-pine font-serif font-medium hover:shadow-xl hover-lift transition-all duration-300"
              >
                Begin Your Journey
                <ArrowRight size={22} />
              </Link>
              <Link
                href="/tournaments"
                className="inline-flex items-center gap-3 px-10 py-4 bg-masters-fairway/20 text-masters-cream border-2 border-masters-cream/30 font-serif font-medium hover:bg-masters-fairway/30 hover-lift transition-all duration-300"
              >
                Championship Ideas
                <Crown size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}