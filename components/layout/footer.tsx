import Link from 'next/link';
import { Trophy, Heart, Mail, MapPin, Crown, Star } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    formats: [
      { label: 'All Formats', href: '/formats' },
      { label: 'Tournament', href: '/formats?category=tournament' },
      { label: 'Casual', href: '/formats?category=casual' },
      { label: 'Betting Games', href: '/formats?category=betting' },
      { label: 'Team Formats', href: '/formats?category=team' }
    ],
    tools: [
      { label: 'Format Comparison', href: '/compare' },
      { label: 'Search', href: '/search' },
      { label: 'Favorites', href: '/favorites' },
      { label: 'Random Format', href: '/random' }
    ],
    resources: [
      { label: 'Rules Guide', href: '/rules' },
      { label: 'Scoring Help', href: '/scoring' },
      { label: 'Golf Tips', href: '/tips' },
      { label: 'Equipment Guide', href: '/equipment' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' }
    ]
  };

  return (
    <footer className="bg-masters-pine text-masters-cream masters-pattern">
      {/* Main Footer Content */}
      <div className="container-masters section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-4 mb-8 group">
              <div className="w-14 h-14 bg-masters-cream rounded flex items-center justify-center shadow-large group-hover:shadow-xl transition-all duration-300">
                <Trophy className="w-8 h-8 text-masters-pine" />
              </div>
              <div>
                <h3 className="text-h2 font-serif font-semibold text-masters-cream tracking-tight">
                  Golf Formats
                </h3>
                <p className="text-small text-masters-cream/70 -mt-1 tracking-wide uppercase">
                  Masters Edition
                </p>
              </div>
            </Link>
            
            <p className="text-masters-cream/80 mb-8 leading-relaxed text-body max-w-md">
              Discover the perfect golf format for every occasion. From classic stroke play 
              to exciting betting games, we have comprehensive rules, scoring guides, 
              and strategies for 20+ golf formats in the tradition of excellence.
            </p>
            
            <div className="flex items-center gap-6">
              <Link 
                href="mailto:hello@golfformats.com" 
                className="flex items-center gap-3 px-6 py-3 bg-masters-fairway/20 hover:bg-masters-fairway/30 rounded transition-all duration-300 text-small font-medium"
                aria-label="Contact Us"
              >
                <Mail size={18} />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-serif font-medium text-masters-cream mb-6 flex items-center gap-3 text-h4">
              <Crown size={20} />
              Formats
            </h4>
            <ul className="space-y-3">
              {footerLinks.formats.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-masters-cream/70 hover:text-masters-cream transition-colors text-small hover-lift inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-medium text-masters-cream mb-6 text-h4">Tools</h4>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-masters-cream/70 hover:text-masters-cream transition-colors text-small hover-lift inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-medium text-masters-cream mb-6 text-h4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-masters-cream/70 hover:text-masters-cream transition-colors text-small hover-lift inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-masters-cream/20 mt-16 pt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-display font-serif font-semibold text-masters-gold mb-2">20+</div>
              <div className="text-small text-masters-cream/60 uppercase tracking-wider">Golf Formats</div>
            </div>
            <div className="text-center">
              <div className="text-display font-serif font-semibold text-masters-gold mb-2">1-144</div>
              <div className="text-small text-masters-cream/60 uppercase tracking-wider">Player Range</div>
            </div>
            <div className="text-center">
              <div className="text-display font-serif font-semibold text-masters-gold mb-2">All</div>
              <div className="text-small text-masters-cream/60 uppercase tracking-wider">Skill Levels</div>
            </div>
            <div className="text-center">
              <div className="text-display font-serif font-semibold text-masters-gold mb-2">100%</div>
              <div className="text-small text-masters-cream/60 uppercase tracking-wider">Free Access</div>
            </div>
          </div>
          
          {/* Tradition Badge */}
          <div className="flex justify-center mb-8">
            <div className="badge-tradition text-masters-pine bg-masters-gold/20 border-masters-gold/40">
              <Star size={16} className="text-masters-gold" />
              <span className="font-medium">A Tradition of Excellence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-masters-cream/20 bg-masters-charcoal/20">
        <div className="container-masters py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-small text-masters-cream/60 text-center md:text-left">
              © {currentYear} Golf Formats Database. Crafted with{' '}
              <Heart size={16} className="inline text-masters-azalea mx-1" />
              for the game we love.
            </div>
            
            <div className="flex items-center gap-8 text-small">
              {footerLinks.company.map((link, index) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="text-masters-cream/60 hover:text-masters-cream transition-colors"
                >
                  {link.label}
                  {index < footerLinks.company.length - 1 && <span className="ml-8 text-masters-cream/30">|</span>}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-6 text-tiny text-masters-cream/40">
            <MapPin size={14} className="mr-2" />
            Serving golfers with distinction worldwide
          </div>
        </div>
      </div>
    </footer>
  );
}