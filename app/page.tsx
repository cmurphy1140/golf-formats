'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
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

// Dynamic imports for performance
const GolfPattern = dynamic(() => import('@/components/backgrounds/golf-pattern'), { ssr: false });
const DynamicGradient = dynamic(() => import('@/components/backgrounds/dynamic-gradient'), { ssr: false });
const FloatingShapes = dynamic(() => import('@/components/backgrounds/floating-shapes'), { ssr: false });
const ParticleField = dynamic(() => import('@/components/backgrounds/particle-field'), { ssr: false });
const ScrollProgress = dynamic(() => import('@/components/scroll-progress'), { ssr: false });
const ParallaxSection = dynamic(() => import('@/components/parallax-section'), { ssr: false });
const RevealOnScroll = dynamic(() => import('@/components/reveal-on-scroll'), { ssr: false });

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [expandedFact, setExpandedFact] = useState<number | null>(0);
  const [animatedStats, setAnimatedStats] = useState({
    formats: 0,
    timeReduction: 0,
    handicapRange: 0,
    tourEvents: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
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
    <div className="min-h-screen relative">
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Dynamic Background Layers */}
      <GolfPattern />
      <DynamicGradient />
      <FloatingShapes />
      <ParticleField />
      
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-32 z-10">
        
        <div 
          className="relative z-10 max-w-3xl mx-auto text-center px-6 transition-opacity duration-300"
          style={{ 
            opacity: getOpacity(0),
            transform: getTransform(0.2)
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-800 rounded-full text-masters-pine text-sm font-medium mb-8">
            <Sparkles size={16} />
            <span>Transform Your Golf Experience</span>
          </div>

          <ParallaxSection offset={20}>
            <h1 className="text-4xl md:text-6xl font-bold text-masters-charcoal mb-4 leading-tight">
              Why Play Golf
              <span className="block text-masters-pine">The Same Way?</span>
            </h1>
          </ParallaxSection>

          <ParallaxSection offset={15}>
            <p className="text-xl text-masters-slate max-w-xl mx-auto mb-8 leading-relaxed">
              Discover <span className="font-bold text-masters-pine">{animatedStats.formats || 20}+</span> unique golf formats that turn every round into an adventure. 
              From competitive tournaments to fun team games, find the perfect way to play.
            </p>
          </ParallaxSection>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/formats"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-masters-pine text-white font-medium rounded-lg hover:bg-green-900 transition-colors"
            >
              Explore Formats
              <ArrowRight size={20} />
            </Link>
            <button
              onClick={() => scrollToSection('what-is-this')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-masters-slate font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Learn More
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        {/* Scroll Indicator - Positioned Below Content */}
        <button 
          onClick={() => scrollToSection('what-is-this')}
          className="absolute bottom-32 left-1/2 transform -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform"
          aria-label="Scroll to next section"
        >
          <div className="animate-bounce">
            <ChevronDown size={40} className="text-masters-pine" strokeWidth={3} />
          </div>
        </button>
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
            <RevealOnScroll width="100%">
              <h2 className="text-4xl md:text-5xl font-bold text-masters-charcoal mb-4">
                What is Golf Format Explorer?
              </h2>
            </RevealOnScroll>
            <RevealOnScroll width="100%" delay={0.1}>
              <p className="text-xl text-masters-slate max-w-3xl mx-auto leading-relaxed">
                Your comprehensive guide to making golf more exciting, social, and enjoyable 
                through different playing formats
              </p>
            </RevealOnScroll>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <motion.div 
              className="backdrop-blur-xl bg-white/70 rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all hover:bg-white/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}>
              <div className="w-12 h-12 bg-masters-pine/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-masters-pine" />
              </div>
              <h3 className="text-xl font-bold text-masters-charcoal mb-3">
                Find Your Game
              </h3>
              <p className="text-base text-masters-slate leading-relaxed">
                Match your skill level, group size, and playing style with the perfect format. 
                Whether you&apos;re a beginner or scratch golfer, there&apos;s a format for you.
              </p>
            </motion.div>

            <motion.div 
              className="backdrop-blur-xl bg-white/70 rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all hover:bg-white/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}>
              <div className="w-12 h-12 bg-masters-pine/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-masters-pine" />
              </div>
              <h3 className="text-xl font-bold text-masters-charcoal mb-3">
                Keep It Fresh
              </h3>
              <p className="text-base text-masters-slate leading-relaxed">
                Stop playing the same way every round. Our formats add variety, excitement, 
                and new challenges that keep golf interesting week after week.
              </p>
            </motion.div>

            <motion.div 
              className="backdrop-blur-xl bg-white/70 rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all hover:bg-white/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}>
              <div className="w-12 h-12 bg-masters-pine/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-masters-pine" />
              </div>
              <h3 className="text-xl font-bold text-masters-charcoal mb-3">
                Learn & Improve
              </h3>
              <p className="text-base text-masters-slate leading-relaxed">
                Each format teaches different skills and strategies. Build confidence, 
                learn course management, and become a more complete golfer.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Subtle Section Divider */}
        <button 
          onClick={() => scrollToSection('why-formats')}
          className="flex justify-center mt-4 w-full cursor-pointer hover:scale-110 transition-transform"
          aria-label="Scroll to Why Use Different Formats"
        >
          <ChevronDown size={30} className="text-masters-pine/60 animate-pulse" />
        </button>
      </section>

      {/* Why Use Different Formats Section */}
      <section id="why-formats" className="relative py-12 px-6 bg-white">
        <div 
          className="max-w-4xl mx-auto"
          style={{ 
            opacity: getOpacity(1200),
            transform: getTransform(0.05)
          }}
        >
          <div className="text-center mb-8">
            <RevealOnScroll width="100%">
              <h2 className="text-4xl md:text-5xl font-bold text-masters-charcoal mb-6">
                Why Use Different Golf Formats?
              </h2>
            </RevealOnScroll>
            <RevealOnScroll width="100%" delay={0.1}>
              <p className="text-lg text-masters-slate/70 max-w-3xl mx-auto">
                Transform your regular foursome into an exciting competition or casual fun
              </p>
            </RevealOnScroll>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-masters-pine rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-masters-charcoal mb-2">
                    Level the Playing Field
                  </h3>
                  <p className="text-base text-masters-slate leading-relaxed">
                    Many formats allow players of different skill levels to compete fairly. 
                    Scrambles and best ball formats let beginners contribute while learning from better players.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-masters-pine rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-masters-charcoal mb-2">
                    Speed Up Play
                  </h3>
                  <p className="text-base text-masters-slate leading-relaxed">
                    Formats like scramble and alternate shot can significantly reduce round times 
                    while maintaining the fun and competitive spirit.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-masters-pine rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-masters-charcoal mb-2">
                    Develop New Skills
                  </h3>
                  <p className="text-base text-masters-slate leading-relaxed">
                    Different formats emphasize different aspects of the game. Match play teaches 
                    strategy, while stableford encourages aggressive play.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-masters-pine rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-masters-charcoal mb-2">
                    Build Camaraderie
                  </h3>
                  <p className="text-base text-masters-slate leading-relaxed">
                    Team formats create bonds and memorable moments. Share victories, support 
                    each other through tough shots, and enjoy golf as a social experience.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative h-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}>
              <motion.div 
                className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-lg border border-white/20 p-8 h-full hover:bg-white/80 transition-all"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-masters-charcoal">Did You Know?</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setExpandedFact(expandedFact > 0 ? expandedFact - 1 : 3)}
                      className="p-2 rounded-lg bg-green-50 hover:bg-masters-pine/10 transition-colors"
                    >
                      <ChevronDown size={20} className="text-masters-pine rotate-90" />
                    </button>
                    <button
                      onClick={() => setExpandedFact(expandedFact < 3 ? expandedFact + 1 : 0)}
                      className="p-2 rounded-lg bg-green-50 hover:bg-masters-pine/10 transition-colors"
                    >
                      <ChevronDown size={20} className="text-masters-pine -rotate-90" />
                    </button>
                  </div>
                </div>
                
                <div className="relative h-full">
                  {[
                    [
                      { 
                        icon: Trophy,
                        title: "Ryder Cup Legacy", 
                        fact: "The Ryder Cup uses fourball, foursomes, and singles matches over 3 days",
                        detail: "Creating the most exciting team competition in golf since 1927"
                      },
                      { 
                        icon: Target,
                        title: "Stableford Revolution", 
                        fact: "The Barracuda Championship rewards aggressive play",
                        detail: "It's the only PGA Tour event using Modified Stableford scoring"
                      }
                    ],
                    [
                      { 
                        icon: Clock,
                        title: "Historic Origins", 
                        fact: "Match play dates back to 15th century Scotland",
                        detail: "It remained golf's only format for over 250 years until 1759"
                      },
                      { 
                        icon: Users,
                        title: "Team Efficiency", 
                        fact: `Team formats reduce round times by ${animatedStats.timeReduction || 30}%`,
                        detail: "While allowing players of all skill levels to contribute equally"
                      }
                    ],
                    [
                      { 
                        icon: Award,
                        title: "Corporate Favorite", 
                        fact: "75% of corporate tournaments use Scramble format",
                        detail: "Because it keeps everyone involved and speeds up play"
                      },
                      { 
                        icon: DollarSign,
                        title: "Million Dollar Holes", 
                        fact: `Skins games have awarded over $${animatedStats.tourEvents || 50}M`,
                        detail: "With single holes sometimes worth $1 million"
                      }
                    ],
                    [
                      { 
                        icon: Target,
                        title: "Handicap Magic", 
                        fact: `${animatedStats.handicapRange || 20} handicappers can compete with scratch golfers`,
                        detail: "Best Ball's format levels the playing field perfectly"
                      },
                      { 
                        icon: Zap,
                        title: "Risk & Reward", 
                        fact: "Modified Stableford: 8 points for albatross, 5 for eagle",
                        detail: "Encouraging aggressive play on every single hole"
                      }
                    ]
                  ].map((factPair, index) => {
                    const isActive = expandedFact === index;
                    
                    return (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-500 ${
                          isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
                        }`}
                      >
                        <div className="flex flex-col h-full">
                          <div className="space-y-4">
                            {factPair.map((item, factIndex) => {
                              const Icon = item.icon;
                              return (
                                <div key={factIndex} className="flex items-start gap-4">
                                  <div className="w-10 h-10 bg-masters-pine/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Icon size={20} className="text-masters-pine" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-base font-bold text-masters-charcoal mb-1">{item.title}</h4>
                                    <p className="text-sm text-masters-slate font-medium mb-1">{item.fact}</p>
                                    <p className="text-xs text-masters-slate/70">{item.detail}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          
                          <div className="mt-auto">
                            <div className="flex items-center justify-between">
                              <div className="flex gap-1">
                                {[0, 1, 2, 3].map((dot) => (
                                  <button
                                    key={dot}
                                    onClick={() => setExpandedFact(dot)}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                      dot === index ? 'bg-masters-pine w-8' : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">
                                Slide {index + 1} of 4
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Subtle Section Divider */}
        <button 
          onClick={() => scrollToSection('format-categories')}
          className="flex justify-center mt-4 w-full cursor-pointer hover:scale-110 transition-transform"
          aria-label="Scroll to Format Categories"
        >
          <ChevronDown size={30} className="text-masters-pine/60 animate-pulse" />
        </button>
      </section>

      {/* How Each Category Works */}
      <section id="format-categories" className="relative py-12 px-6 bg-gradient-to-b from-amber-50/20 to-white">
        <div 
          className="max-w-4xl mx-auto"
          style={{ 
            opacity: getOpacity(1800),
            transform: getTransform(0.05)
          }}
        >
          <div className="text-center mb-8">
            <RevealOnScroll width="100%">
              <h2 className="text-4xl md:text-5xl font-bold text-masters-charcoal mb-4">
                How Each Category Works
              </h2>
            </RevealOnScroll>
            <RevealOnScroll width="100%" delay={0.1}>
              <p className="text-xl text-masters-slate max-w-2xl mx-auto leading-relaxed">
                Understanding the different categories helps you choose the right format for your group
              </p>
            </RevealOnScroll>
          </div>

          <div className="space-y-6">
            {/* Tournament Formats */}
            <motion.div 
              className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:bg-white/80 transition-all"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}>
              <div className="bg-gradient-to-r from-masters-pine/10 to-masters-pine/5 border-b border-white/30 p-6">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-masters-pine" />
                  <h3 className="text-2xl font-bold text-masters-charcoal">Tournament Formats</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-base text-masters-slate mb-4 leading-relaxed">
                  Official competitive formats used in professional and amateur competitions. 
                  These formats test true golfing ability and maintain the integrity of the game.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-bold text-masters-charcoal mb-2">Stroke Play</h4>
                    <p className="text-sm text-masters-slate">
                      Count every stroke. Lowest total score wins. The purest test of golf.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-masters-charcoal mb-2">Match Play</h4>
                    <p className="text-sm text-masters-slate">
                      Win individual holes. Strategic format where every hole is a new battle.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-masters-charcoal mb-2">Stableford</h4>
                    <p className="text-sm text-masters-slate">
                      Points-based scoring that rewards aggressive play and minimizes disasters.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Team Formats */}
            <motion.div 
              className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:bg-white/80 transition-all"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}>
              <div className="bg-gradient-to-r from-masters-pine/10 to-masters-pine/5 border-b border-white/30 p-6">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-masters-pine" />
                  <h3 className="text-2xl font-bold text-masters-charcoal">Team Formats</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-base text-masters-slate mb-4 leading-relaxed">
                  Collaborative formats where partners work together. Perfect for building 
                  camaraderie and allowing players of different abilities to contribute.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-bold text-masters-charcoal mb-2">Scramble</h4>
                    <p className="text-sm text-masters-slate">
                      All players hit, team chooses best shot. Great for beginners and fast play.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-masters-charcoal mb-2">Best Ball</h4>
                    <p className="text-sm text-masters-slate">
                      Play your own ball, count best score. Individual play with team support.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-masters-charcoal mb-2">Alternate Shot</h4>
                    <p className="text-sm text-masters-slate">
                      Partners alternate hitting same ball. True teamwork and communication.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Betting Games */}
            <motion.div 
              className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:bg-white/80 transition-all"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}>
              <div className="bg-gradient-to-r from-masters-pine/10 to-masters-pine/5 border-b border-white/30 p-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-masters-pine" />
                  <h3 className="text-2xl font-bold text-masters-charcoal">Betting Games</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-base text-masters-slate mb-4 leading-relaxed">
                  Add excitement with friendly wagers. These formats create drama on every hole 
                  and keep all players engaged throughout the round.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-bold text-masters-charcoal mb-2">Skins</h4>
                    <p className="text-sm text-masters-slate">
                      Win holes to win &quot;skins&quot;. Carryovers create big pots and excitement.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-masters-charcoal mb-2">Nassau</h4>
                    <p className="text-sm text-masters-slate">
                      Three bets in one: front 9, back 9, overall. Classic betting format.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-masters-charcoal mb-2">Wolf</h4>
                    <p className="text-sm text-masters-slate">
                      Rotating captain chooses partners or goes alone. Strategy and risk/reward.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Casual Formats */}
            <motion.div 
              className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:bg-white/80 transition-all"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}>
              <div className="bg-gradient-to-r from-masters-pine/10 to-masters-pine/5 border-b border-white/30 p-6">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8 text-masters-pine" />
                  <h3 className="text-2xl font-bold text-masters-charcoal">Casual Formats</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-base text-masters-slate mb-4 leading-relaxed">
                  Fun, relaxed formats perfect for social golf. These games keep things light 
                  while still providing competition and improvement opportunities.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-bold text-masters-charcoal mb-2">Bingo Bango Bongo</h4>
                    <p className="text-sm text-masters-slate">
                      Points for first on green, closest to pin, first in hole. Levels playing field.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-masters-charcoal mb-2">String Game</h4>
                    <p className="text-sm text-masters-slate">
                      Use string to move ball. Fun format that helps beginners enjoy the game.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-masters-charcoal mb-2">Worst Ball</h4>
                    <p className="text-sm text-masters-slate">
                      Play from worst shot. Challenging format that improves consistency.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
      </section>
    </div>
  );
}