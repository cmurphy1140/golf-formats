'use client';

import { Suspense } from 'react';
import ScorecardContent from './scorecard-content';

export default function ScorecardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-white to-green-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-masters-pine">Loading scorecard...</div>
        </div>
      </div>
    }>
      <ScorecardContent />
    </Suspense>
  );
}