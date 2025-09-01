'use client';

import { useState } from 'react';
import { Share2, Check, Copy, Link2 } from 'lucide-react';

interface ShareButtonProps {
  formatId: string;
  formatName: string;
  formatDescription?: string;
}

export default function ShareButton({ formatId, formatName, formatDescription }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const copyLink = async () => {
    const url = `${window.location.origin}/formats/${formatId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyFormatInfo = async () => {
    const text = `Check out ${formatName} - a golf format on Golf Format Explorer!\n\n${formatDescription || ''}\n\nLearn more: ${window.location.origin}/formats/${formatId}`;
    await navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-masters-pine/20 rounded-lg hover:bg-masters-sand/20 transition-all group"
        title="Copy link to clipboard"
      >
        {copied ? (
          <>
            <Check size={18} className="text-green-600" />
            <span className="text-sm font-medium text-green-600">Copied!</span>
          </>
        ) : (
          <>
            <Link2 size={18} className="text-masters-pine group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-masters-charcoal">Copy Link</span>
          </>
        )}
      </button>

      <button
        onClick={copyFormatInfo}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-masters-pine/20 rounded-lg hover:bg-masters-sand/20 transition-all group"
        title="Copy format details"
      >
        {copiedText ? (
          <>
            <Check size={18} className="text-green-600" />
            <span className="text-sm font-medium text-green-600">Copied!</span>
          </>
        ) : (
          <>
            <Copy size={18} className="text-masters-pine group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-masters-charcoal">Copy Info</span>
          </>
        )}
      </button>
    </div>
  );
}