'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { 
  ArrowRight,
  Trophy,
  Users,
  Target,
  Sparkles,
  DollarSign,
  Award,
  ChevronDown,
  Clock,
  TrendingUp,
  Heart,
  Zap
} from 'lucide-react';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [expandedFact, setExpandedFact] = useState<number | null>(null);
  const [animatedStats, setAnimatedStats] = useState({
    formats: 0,
    timeReduction: 0,
    handicapRange: 0,
    tourEvents: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Trigger animation when stats section is in view
      if (!hasAnimated && window.scrollY > 200) {
        setHasAnimated(true);
        // Animate stats counting
        const duration = 2000; // 2 seconds
        const steps = 60;
        const interval = duration / steps;
        let currentStep = 0;
        
        const timer = setInterval(() => {
          currentStep++;
          const progress = currentStep / steps;
          
          setAnimatedStats({
            formats: Math.floor(20 * progress),
            timeReduction: Math.floor(30 * progress),
            handicapRange: Math.floor(20 * progress),
            tourEvents: Math.floor(50 * progress)
          });
          
          if (currentStep >= steps) {
            clearInterval(timer);
            setAnimatedStats({ formats: 20, timeReduction: 30, handicapRange: 20, tourEvents: 50 });
          }
        }, interval);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  // Calculate opacity - simply keep everything visible
  const getOpacity = (elementTop: number, fadeDistance: number = 200) => {
    // Disable fading entirely - keep all content fully visible
    return 1;
  };

  // Calculate transform based on scroll - disabled to prevent content shifting
  const getTransform = (speed: number = 1) => {
    // Disabled parallax transform to keep content in place
    return `translateY(0px)`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-green-50 to-white"
          style={{ transform: getTransform(0.5) }}
        />
        
        <div 
          className="relative z-10 max-w-3xl mx-auto text-center px-6 transition-opacity duration-300"
          style={{ 
            opacity: getOpacity(0),
            transform: getTransform(0.2)
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-800 rounded-full text-green-800 text-sm font-medium mb-8">
            <Sparkles size={16} />
            <span>Transform Your Golf Experience</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-green-900 mb-4 leading-tight">
            Why Play Golf
            <span className="block text-green-800">The Same Way?</span>
          </h1>

          <p className="text-xl text-gray-800 max-w-xl mx-auto mb-8 leading-relaxed">
            Discover <span className="font-bold text-green-800">{animatedStats.formats || 20}+</span> unique golf formats that turn every round into an adventure. 
            From competitive tournaments to fun team games, find the perfect way to play.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/formats"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-800 text-white font-medium rounded-lg hover:bg-green-900 transition-colors"
            >
              Explore Formats
              <ArrowRight size={20} />
            </Link>
            <Link
              href="#why-formats"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Learn More
              <ChevronDown size={20} />
            </Link>
          </div>

          {/* Scroll Indicator - Positioned Lower */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center gap-1">
              <span className="text-green-800 text-xs font-medium">Scroll to explore</span>
              <div className="animate-bounce">
                <ChevronDown size={28} className="text-green-800" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle Down Arrow */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <ChevronDown size={20} className="text-green-600/40 animate-pulse" />
        </div>
      </section>

      {/* What is This App Section */}
      <section id="what-is-this" className="relative py-12 px-6">
        <div 
          className="max-w-4xl mx-auto transition-all duration-500"
          style={{ 
            opacity: getOpacity(600),
            transform: getTransform(0.05)
          }}
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
              What is Golf Format Explorer?
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
              Your comprehensive guide to making golf more exciting, social, and enjoyable 
              through different playing formats
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-3">
                Find Your Game
              </h3>
              <p className="text-base text-gray-800 leading-relaxed">
                Match your skill level, group size, and playing style with the perfect format. 
                Whether you're a beginner or scratch golfer, there's a format for you.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-3">
                Keep It Fresh
              </h3>
              <p className="text-base text-gray-800 leading-relaxed">
                Stop playing the same way every round. Our formats add variety, excitement, 
                and new challenges that keep golf interesting week after week.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-3">
                Learn & Improve
              </h3>
              <p className="text-base text-gray-800 leading-relaxed">
                Each format teaches different skills and strategies. Build confidence, 
                learn course management, and become a more complete golfer.
              </p>
            </div>
          </div>
        </div>
        
        {/* Subtle Section Divider */}
        <div className="flex justify-center mt-4">
          <ChevronDown size={20} className="text-green-600/30 animate-pulse" />
        </div>
      </section>

      {/* Why Use Different Formats Section */}
      <section id="why-formats" className="relative py-12 px-6 bg-gradient-to-b from-white to-green-50">
        <div 
          className="max-w-4xl mx-auto"
          style={{ 
            opacity: getOpacity(1200),
            transform: getTransform(0.05)
          }}
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Use Different Golf Formats?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transform your regular foursome into an exciting competition or casual fun
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    Level the Playing Field
                  </h3>
                  <p className="text-base text-gray-800 leading-relaxed">
                    Many formats allow players of different skill levels to compete fairly. 
                    Scrambles and best ball formats let beginners contribute while learning from better players.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    Speed Up Play
                  </h3>
                  <p className="text-base text-gray-800 leading-relaxed">
                    Formats like scramble and alternate shot can significantly reduce round times 
                    while maintaining the fun and competitive spirit.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    Develop New Skills
                  </h3>
                  <p className="text-base text-gray-800 leading-relaxed">
                    Different formats emphasize different aspects of the game. Match play teaches 
                    strategy, while stableford encourages aggressive play.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    Build Camaraderie
                  </h3>
                  <p className="text-base text-gray-800 leading-relaxed">
                    Team formats create bonds and memorable moments. Share victories, support 
                    each other through tough shots, and enjoy golf as a social experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-full">
              <div className="bg-gradient-to-b from-green-900 to-green-700 rounded-2xl p-6 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-4 text-amber-50">Did You Know?</h3>
                <div className="space-y-2 flex-1">
                  {[
                    { title: "Ryder Cup Formats", detail: "The Ryder Cup uses fourball, foursomes, and singles matches over 3 days, creating the most exciting team competition in golf" },
                    { title: "Stableford on Tour", detail: "The Barracuda Championship is the only PGA Tour event using Modified Stableford scoring, rewarding aggressive play with bonus points" },
                    { title: "Match Play History", detail: "Match play was golf's original format dating back to the 15th century in Scotland, and remained the only format until 1759" },
                    { title: "Team Format Benefits", detail: `Team formats can reduce round times by ${animatedStats.timeReduction || 30}% while allowing players of all skill levels to contribute meaningfully` },
                    { title: "Corporate Scrambles", detail: "Scramble is used in 75% of corporate tournaments because it keeps everyone involved and speeds up play significantly" },
                    { title: "Skins Game Payouts", detail: `Skins games have awarded over $${animatedStats.tourEvents || 50}M in PGA Tour history, with single holes sometimes worth $1 million` },
                    { title: "Best Ball Handicapping", detail: `Best Ball's format allows a ${animatedStats.handicapRange || 20} handicapper to compete fairly with scratch golfers through proper handicap allocation` },
                    { title: "Modified Stableford", detail: "Modified Stableford awards 8 points for albatross, 5 for eagle, 2 for birdie, encouraging risk-taking on every hole" }
                  ].map((fact, index) => (
                    <div key={index} className="border-b border-amber-100/20 last:border-0">
                      <button
                        onClick={() => setExpandedFact(expandedFact === index ? null : index)}
                        className="w-full text-left py-2 flex items-center justify-between hover:bg-white/5 transition-colors rounded px-2"
                      >
                        <span className="text-sm font-medium text-amber-100">{fact.title}</span>
                        <ChevronDown 
                          size={16} 
                          className={`text-amber-100/60 transition-transform ${expandedFact === index ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      {expandedFact === index && (
                        <div className="px-2 pb-3 text-xs text-amber-100/80 leading-relaxed animate-fade-in">
                          {fact.detail}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle Section Divider */}
        <div className="flex justify-center mt-4">
          <ChevronDown size={20} className="text-green-600/30 animate-pulse" />
        </div>
      </section>

      {/* How Each Category Works */}
      <section className="relative py-12 px-6">
        <div 
          className="max-w-4xl mx-auto"
          style={{ 
            opacity: getOpacity(1800),
            transform: getTransform(0.05)
          }}
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
              How Each Category Works
            </h2>
            <p className="text-xl text-gray-800 max-w-2xl mx-auto leading-relaxed">
              Understanding the different categories helps you choose the right format for your group
            </p>
          </div>

          <div className="space-y-6">
            {/* Tournament Formats */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-800 to-green-700 p-6">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-amber-100" />
                  <h3 className="text-2xl font-bold text-amber-50">Tournament Formats</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-base text-gray-800 mb-4 leading-relaxed">
                  Official competitive formats used in professional and amateur competitions. 
                  These formats test true golfing ability and maintain the integrity of the game.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Stroke Play</h4>
                    <p className="text-sm text-gray-700">
                      Count every stroke. Lowest total score wins. The purest test of golf.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Match Play</h4>
                    <p className="text-sm text-gray-700">
                      Win individual holes. Strategic format where every hole is a new battle.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Stableford</h4>
                    <p className="text-sm text-gray-700">
                      Points-based scoring that rewards aggressive play and minimizes disasters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Formats */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-800 to-green-700 p-6">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-amber-100" />
                  <h3 className="text-2xl font-bold text-amber-50">Team Formats</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-base text-gray-800 mb-4 leading-relaxed">
                  Collaborative formats where partners work together. Perfect for building 
                  camaraderie and allowing players of different abilities to contribute.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Scramble</h4>
                    <p className="text-sm text-gray-700">
                      All players hit, team chooses best shot. Great for beginners and fast play.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Best Ball</h4>
                    <p className="text-sm text-gray-700">
                      Play your own ball, count best score. Individual play with team support.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Alternate Shot</h4>
                    <p className="text-sm text-gray-700">
                      Partners alternate hitting same ball. True teamwork and communication.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Betting Games */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-800 to-green-700 p-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-amber-100" />
                  <h3 className="text-2xl font-bold text-amber-50">Betting Games</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-base text-gray-800 mb-4 leading-relaxed">
                  Add excitement with friendly wagers. These formats create drama on every hole 
                  and keep all players engaged throughout the round.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Skins</h4>
                    <p className="text-sm text-gray-700">
                      Win holes to win "skins". Carryovers create big pots and excitement.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Nassau</h4>
                    <p className="text-sm text-gray-700">
                      Three bets in one: front 9, back 9, overall. Classic betting format.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Wolf</h4>
                    <p className="text-sm text-gray-700">
                      Rotating captain chooses partners or goes alone. Strategy and risk/reward.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Casual Formats */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-800 to-green-700 p-6">
                <div className="flex items-center gap-3 text-white">
                  <Target className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Casual Formats</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-base text-gray-800 mb-4 leading-relaxed">
                  Fun, relaxed formats perfect for social golf. These games keep things light 
                  while still providing competition and improvement opportunities.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Bingo Bango Bongo</h4>
                    <p className="text-sm text-gray-700">
                      Points for first on green, closest to pin, first in hole. Levels playing field.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">String Game</h4>
                    <p className="text-sm text-gray-700">
                      Use string to move ball. Fun format that helps beginners enjoy the game.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Worst Ball</h4>
                    <p className="text-sm text-gray-700">
                      Play from worst shot. Challenging format that improves consistency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>
    </div>
  );
}