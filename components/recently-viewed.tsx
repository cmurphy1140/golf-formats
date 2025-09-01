'use client';

import { useFormatStore } from '@/src/store';
import { golfFormats } from '@/data/formats';
import Link from 'next/link';
import { Clock, ChevronRight } from 'lucide-react';

export default function RecentlyViewed() {
  const { recentlyViewed } = useFormatStore();
  
  if (recentlyViewed.length === 0) return null;

  const recentFormats = recentlyViewed
    .map(id => golfFormats.find(f => f.id === id))
    .filter(Boolean)
    .slice(0, 5);

  if (recentFormats.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-masters-pine/10 p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={18} className="text-masters-pine" />
        <h3 className="font-semibold text-masters-charcoal">Recently Viewed</h3>
      </div>
      
      <div className="space-y-2">
        {recentFormats.map((format) => (
          <Link
            key={format!.id}
            href={`/formats/${format!.id}`}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-masters-sand/20 transition-colors group"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-masters-charcoal group-hover:text-masters-pine transition-colors">
                {format!.name}
              </p>
              <p className="text-xs text-masters-slate">
                {format!.category} • {format!.difficulty}
              </p>
            </div>
            <ChevronRight size={16} className="text-masters-slate/50 group-hover:text-masters-pine transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}