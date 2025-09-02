'use client';

import GolfAnimationSystem from '@/components/golf-animation/golf-animation-system';
import Link from 'next/link';
import { ArrowLeft, Info } from 'lucide-react';

export default function AnimationDemoPage() {
  return (
    <div className="min-h-screen bg-masters-cream">
      {/* Header */}
      <div className="bg-white border-b border-masters-stone/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center gap-2 text-masters-pine hover:text-masters-pine/80 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Home</span>
            </Link>
            
            <h1 className="text-2xl font-light text-masters-charcoal">
              Interactive Format Demonstrations
            </h1>
            
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="mb-8 bg-white rounded-lg shadow-md border border-masters-pine/10 p-6">
          <div className="flex items-start gap-3">
            <Info className="text-masters-pine mt-1 flex-shrink-0" size={20} />
            <div>
              <h2 className="text-lg font-semibold text-masters-charcoal mb-2">
                How to Use This Demo
              </h2>
              <ul className="space-y-1 text-sm text-masters-slate">
                <li>• Select a format above to see how it works</li>
                <li>• Use play/pause controls or step through frame-by-frame</li>
                <li>• Click on players to filter their shots</li>
                <li>• Hover over shots to see details</li>
                <li>• Watch the live scorecard update as play progresses</li>
                <li>• On mobile: Swipe left/right to navigate frames</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Animation System */}
        <GolfAnimationSystem initialFormat="scramble" />

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Understanding the Visuals */}
          <div className="bg-white rounded-lg shadow-md border border-masters-pine/10 p-6">
            <h3 className="text-lg font-semibold text-masters-charcoal mb-3">
              Understanding the Visuals
            </h3>
            <div className="space-y-2 text-sm text-masters-slate">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gradient-to-b from-green-500 to-green-700 rounded" />
                <span>Fairway - Ideal landing area</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded" />
                <span>Bunker - Sand hazard</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded" />
                <span>Water - Penalty area</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-0.5 bg-masters-pine" />
                <span>Solid line - Selected shot (Scramble)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-0.5 border-t-2 border-dashed border-masters-slate" />
                <span>Dashed line - Non-selected shot</span>
              </div>
            </div>
          </div>

          {/* Format Quick Reference */}
          <div className="bg-white rounded-lg shadow-md border border-masters-pine/10 p-6">
            <h3 className="text-lg font-semibold text-masters-charcoal mb-3">
              Format Quick Reference
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium text-masters-pine">Scramble</h4>
                <p className="text-masters-slate">Team format where all play from best shot</p>
              </div>
              <div>
                <h4 className="font-medium text-masters-gold">Best Ball</h4>
                <p className="text-masters-slate">Play own ball, best score counts</p>
              </div>
              <div>
                <h4 className="font-medium text-masters-charcoal">Stableford</h4>
                <p className="text-masters-slate">Points based on score vs par</p>
              </div>
              <div>
                <h4 className="font-medium text-masters-slate">Match Play</h4>
                <p className="text-masters-slate">Hole-by-hole competition</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}