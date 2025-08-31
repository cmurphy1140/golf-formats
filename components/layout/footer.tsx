import Link from 'next/link';
import { Trophy, Heart, Github, Twitter, Mail, MapPin } from 'lucide-react';

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
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-centered py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Golf Formats
                </span>
                <p className="text-sm text-gray-400 mt-1">
                  Your complete golf game resource
                </p>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Discover the perfect golf format for every occasion. From classic stroke play 
              to exciting betting games, we&apos;ve got comprehensive rules, scoring guides, 
              and strategies for 20+ golf formats.
            </p>
            
            <div className="flex items-center gap-4">
              <Link 
                href="https://github.com/golf-formats" 
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </Link>
              <Link 
                href="https://twitter.com/golfformats" 
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </Link>
              <Link 
                href="mailto:hello@golfformats.com" 
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </Link>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Trophy size={16} />
              Formats
            </h3>
            <ul className="space-y-2">
              {footerLinks.formats.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Tools</h3>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-700 mt-12 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">20+</div>
              <div className="text-sm text-gray-400">Golf Formats</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">1-144</div>
              <div className="text-sm text-gray-400">Player Range</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">All</div>
              <div className="text-sm text-gray-400">Skill Levels</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400 mb-1">100%</div>
              <div className="text-sm text-gray-400">Free Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container-centered py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {currentYear} Golf Formats Database. Made with{' '}
              <Heart size={14} className="inline text-red-400 mx-1" />
              for golfers everywhere.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              {footerLinks.company.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
            <MapPin size={12} className="mr-1" />
            Serving golfers worldwide
          </div>
        </div>
      </div>
    </footer>
  );
}