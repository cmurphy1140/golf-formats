'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { golfFormats } from '@/data/formats';
import { useFormatStore } from '@/src/store';
import ShareButton from '@/components/share-button';
import BestBallDemoMinimal from '@/components/demos/best-ball-demo-minimal';
import ScrambleDemoMinimal from '@/components/demos/scramble-demo-minimal';
import MatchPlayDemoMinimal from '@/components/demos/match-play-demo-minimal';
import SkinsDemoMinimal from '@/components/demos/skins-demo-minimal';
import StablefordDemoMinimal from '@/components/demos/stableford-demo-minimal';
import NassauDemoMinimal from '@/components/demos/nassau-demo-minimal';
import WolfDemoMinimal from '@/components/demos/wolf-demo-minimal';
import AlternateShotDemoMinimal from '@/components/demos/alternate-shot-demo-minimal';
import StrokePlayDemoMinimal from '@/components/demos/stroke-play-demo-minimal';
import { 
  ArrowLeft,
  Users, 
  Clock, 
  Trophy,
  Target,
  ChevronRight,
  BookOpen,
  Award,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  Play,
  Crown,
  Star
} from 'lucide-react';

export default function FormatDetailPage() {
  const params = useParams();
  const format = golfFormats.find(f => f.id === params.id);
  const { addToRecentlyViewed } = useFormatStore();
  
  useEffect(() => {
    if (format) {
      addToRecentlyViewed(format.id);
    }
  }, [format, addToRecentlyViewed]);

  if (!format) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-h1 font-serif text-masters-charcoal mb-4">Format Not Found</h1>
          <Link href="/formats" className="btn-masters-secondary">
            Back to All Formats
          </Link>
        </div>
      </div>
    );
  }

  const relatedFormats = golfFormats
    .filter(f => f.category === format.category && f.id !== format.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-masters-cream">
      {/* Breadcrumb */}
      <div className="bg-masters-sand/30 border-b border-masters-stone/20">
        <div className="container-masters py-6">
          <nav className="flex items-center gap-2 text-small">
            <Link href="/" className="text-masters-slate hover:text-masters-pine transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-masters-slate/50" />
            <Link href="/formats" className="text-masters-slate hover:text-masters-pine transition-colors">
              All Formats
            </Link>
            <ChevronRight className="w-4 h-4 text-masters-slate/50" />
            <span className="text-masters-pine font-medium">{format.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-masters-sand/30 to-masters-cream py-12">
        <div className="container-masters">
          <Link 
            href="/formats" 
            className="inline-flex items-center gap-2 text-masters-slate hover:text-masters-pine transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-small font-medium">Back to Formats</span>
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`badge-masters badge-${format.category}`}>
                      {format.category}
                    </span>
                    {format.popularity >= 4 && (
                      <div className="flex items-center gap-1 bg-masters-gold/10 px-3 py-1 rounded-full">
                        <Crown className="w-4 h-4 text-masters-gold" />
                        <span className="text-tiny font-medium text-masters-gold uppercase tracking-wider">
                          Popular Choice
                        </span>
                      </div>
                    )}
                  </div>
                  <h1 className="text-display font-serif font-bold text-masters-charcoal mb-4">
                    {format.name}
                  </h1>
                  <p className="text-h4 text-masters-slate leading-relaxed">
                    {format.description}
                  </p>
                  
                  {/* Share Buttons */}
                  <div className="mt-6">
                    <ShareButton 
                      formatId={format.id}
                      formatName={format.name}
                      formatDescription={format.description}
                    />
                  </div>
                </div>
              </div>

              {/* Interactive Demo - Show for formats with animations */}
              {(() => {
                const demos: { [key: string]: JSX.Element } = {
                  'best-ball': <BestBallDemoMinimal />,
                  'scramble': <ScrambleDemoMinimal />,
                  'match-play': <MatchPlayDemoMinimal />,
                  'skins': <SkinsDemoMinimal />
                };
                
                if (demos[format.id]) {
                  return (
                    <div className="mb-12">
                      {demos[format.id]}
                    </div>
                  );
                }
                return null;
              })()}

              {/* Key Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div className="card-masters p-6 text-center">
                  <Users className="w-8 h-8 text-masters-pine mx-auto mb-3" />
                  <div className="text-h3 font-serif font-bold text-masters-charcoal mb-1">
                    {format.players.min}-{format.players.max}
                  </div>
                  <div className="text-tiny text-masters-slate uppercase tracking-wider">Players</div>
                </div>
                <div className="card-masters p-6 text-center">
                  <Clock className="w-8 h-8 text-masters-pine mx-auto mb-3" />
                  <div className="text-h3 font-serif font-bold text-masters-charcoal mb-1">
                    {format.duration}
                  </div>
                  <div className="text-tiny text-masters-slate uppercase tracking-wider">Duration</div>
                </div>
                <div className="card-masters p-6 text-center">
                  <Trophy className="w-8 h-8 text-masters-pine mx-auto mb-3" />
                  <div className="text-h3 font-serif font-bold text-masters-charcoal mb-1 capitalize">
                    {format.type}
                  </div>
                  <div className="text-tiny text-masters-slate uppercase tracking-wider">Type</div>
                </div>
                <div className="card-masters p-6 text-center">
                  <Target className="w-8 h-8 text-masters-pine mx-auto mb-3" />
                  <div className="text-h3 font-serif font-bold text-masters-charcoal mb-1">
                    {format.difficulty}/5
                  </div>
                  <div className="text-tiny text-masters-slate uppercase tracking-wider">Difficulty</div>
                </div>
              </div>

              {/* Interactive Demo Section */}
              {(format.id === 'best-ball' || format.id === 'scramble' || format.id === 'match-play' || 
                format.id === 'skins' || format.id === 'stableford' || format.id === 'nassau' || 
                format.id === 'wolf' || format.id === 'alternate-shot' || format.id === 'stroke-play') && (
                <div className="mb-8">
                  <div className="card-masters">
                    <div className="p-8 border-b border-masters-stone/20">
                      <div className="flex items-center gap-3">
                        <Play className="w-6 h-6 text-masters-pine" />
                        <h2 className="text-h2 font-serif font-semibold text-masters-charcoal">
                          Interactive Demo
                        </h2>
                      </div>
                    </div>
                    <div className="p-8">
                      {format.id === 'best-ball' && <BestBallDemoMinimal />}
                      {format.id === 'scramble' && <ScrambleDemoMinimal />}
                      {format.id === 'match-play' && <MatchPlayDemoMinimal />}
                      {format.id === 'skins' && <SkinsDemoMinimal />}
                      {format.id === 'stableford' && <StablefordDemoMinimal />}
                      {format.id === 'nassau' && <NassauDemoMinimal />}
                      {format.id === 'wolf' && <WolfDemoMinimal />}
                      {format.id === 'alternate-shot' && <AlternateShotDemoMinimal />}
                      {format.id === 'stroke-play' && <StrokePlayDemoMinimal />}
                    </div>
                  </div>
                </div>
              )}

              {/* Content Tabs */}
              <div className="space-y-8">
                {/* Rules Section */}
                <div className="card-masters">
                  <div className="p-8 border-b border-masters-stone/20">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-masters-pine" />
                      <h2 className="text-h2 font-serif font-semibold text-masters-charcoal">
                        Rules & Gameplay
                      </h2>
                    </div>
                  </div>
                  <div className="p-8">
                    <ul className="space-y-4">
                      {format.rules.map((rule, index) => (
                        <li key={index} className="flex gap-4">
                          <span className="flex-shrink-0 w-8 h-8 bg-masters-pine/10 rounded-full flex items-center justify-center text-small font-medium text-masters-pine">
                            {index + 1}
                          </span>
                          <span className="text-masters-slate leading-relaxed">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Scoring Section */}
                <div className="card-masters">
                  <div className="p-8 border-b border-masters-stone/20">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-masters-pine" />
                      <h2 className="text-h2 font-serif font-semibold text-masters-charcoal">
                        Scoring System
                      </h2>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="bg-masters-sand/50 rounded-lg p-6 mb-6">
                      <h3 className="text-h4 font-medium text-masters-charcoal mb-3">
                        {format.scoring.method}
                      </h3>
                      <p className="text-masters-slate leading-relaxed">
                        {format.scoring.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pros & Cons */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="card-masters p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <TrendingUp className="w-6 h-6 text-masters-pristine" />
                      <h3 className="text-h3 font-serif font-semibold text-masters-charcoal">
                        Advantages
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {format.pros.map((pro, index) => (
                        <li key={index} className="flex gap-3">
                          <Star className="w-5 h-5 text-masters-gold flex-shrink-0 mt-0.5" />
                          <span className="text-masters-slate">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-masters p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <AlertCircle className="w-6 h-6 text-masters-azalea" />
                      <h3 className="text-h3 font-serif font-semibold text-masters-charcoal">
                        Considerations
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {format.cons.map((con, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="w-2 h-2 bg-masters-slate/50 rounded-full flex-shrink-0 mt-2" />
                          <span className="text-masters-slate">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tips Section */}
                {format.tips && format.tips.length > 0 && (
                  <div className="card-masters">
                    <div className="p-8 border-b border-masters-stone/20">
                      <div className="flex items-center gap-3">
                        <Lightbulb className="w-6 h-6 text-masters-gold" />
                        <h2 className="text-h2 font-serif font-semibold text-masters-charcoal">
                          Strategy Tips
                        </h2>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="grid md:grid-cols-2 gap-6">
                        {format.tips.map((tip, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-masters-gold/10 rounded-full flex items-center justify-center">
                                <Lightbulb className="w-5 h-5 text-masters-gold" />
                              </div>
                            </div>
                            <p className="text-masters-slate leading-relaxed">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Facts */}
                <div className="card-masters p-6">
                  <h3 className="text-h4 font-serif font-semibold text-masters-charcoal mb-6">
                    Quick Facts
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-masters-stone/20">
                      <span className="text-small text-masters-slate">Ideal Players</span>
                      <span className="text-small font-medium text-masters-charcoal">
                        {format.players.ideal || format.players.max}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-masters-stone/20">
                      <span className="text-small text-masters-slate">Skill Level</span>
                      <div className="flex gap-1">
                        {format.skillLevel.map(level => (
                          <span key={level} className="badge-masters bg-masters-sand text-masters-slate text-xs capitalize">
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-masters-stone/20">
                      <span className="text-small text-masters-slate">Popularity</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < format.popularity 
                                ? 'text-masters-gold fill-masters-gold' 
                                : 'text-masters-stone'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Formats */}
                {relatedFormats.length > 0 && (
                  <div className="card-masters p-6">
                    <h3 className="text-h4 font-serif font-semibold text-masters-charcoal mb-6">
                      Similar Formats
                    </h3>
                    <div className="space-y-4">
                      {relatedFormats.map(related => (
                        <Link
                          key={related.id}
                          href={`/formats/${related.id}`}
                          className="block group"
                        >
                          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-masters-sand/50 transition-colors">
                            <div>
                              <h4 className="text-small font-medium text-masters-charcoal group-hover:text-masters-pine transition-colors">
                                {related.name}
                              </h4>
                              <p className="text-tiny text-masters-slate">
                                {related.players.min}-{related.players.max} players
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-masters-slate group-hover:text-masters-pine transition-all group-hover:translate-x-1" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Play Button */}
                <Link href={`/scorecard?format=${format.id}`} className="block">
                  <button className="btn-masters-tradition w-full hover-lift">
                    <Play className="w-5 h-5" />
                    <span>Start Playing {format.name}</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}