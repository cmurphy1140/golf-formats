'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GolfFormat } from '@/types/golf';

interface MiuxCardProps {
  format: GolfFormat;
  index?: number;
}

export default function MiuxCard({ format, index = 0 }: MiuxCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/formats/${format.id}`}>
      <article 
        className="miux-card group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Minimalist Design */}
        <div className="p-8 md:p-10">
          {/* Category Tag */}
          <div className="mb-6">
            <span className="text-xs uppercase tracking-wider text-masters-slate/60">
              {format.category}
            </span>
          </div>

          {/* Title with Elegant Typography */}
          <h3 className="text-2xl md:text-3xl font-light text-masters-charcoal mb-4 transition-colors group-hover:text-masters-pine">
            {format.name}
          </h3>

          {/* Subtle Description */}
          <p className="miux-body text-masters-slate/80 mb-8 line-clamp-2">
            {format.description}
          </p>

          {/* Minimal Meta Information */}
          <div className="flex items-center justify-between">
            <div className="flex gap-6 text-sm text-masters-slate/60">
              <span>{format.players.min}-{format.players.max} players</span>
              <span>{format.duration}</span>
            </div>
            
            {/* Elegant Arrow */}
            <div className={`transition-all duration-500 ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`}>
              <ArrowUpRight size={20} className="text-masters-pine/60" />
            </div>
          </div>

          {/* Hover Line Effect */}
          <div className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-masters-pine/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        </div>

        {/* Sophisticated Hover State */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-masters-pine/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        />
      </article>
    </Link>
  );
}