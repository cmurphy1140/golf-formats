'use client';

import { useState, useEffect } from 'react';
import { X, Command } from 'lucide-react';

export default function KeyboardShortcutsHelp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleShowShortcuts = () => setIsVisible(true);
    window.addEventListener('show-shortcuts', handleShowShortcuts);
    return () => window.removeEventListener('show-shortcuts', handleShowShortcuts);
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-masters-pine/20 hover:border-masters-pine/40 transition-all z-40"
        aria-label="Keyboard shortcuts"
      >
        <Command size={20} className="text-masters-pine" />
      </button>
    );
  }

  const shortcuts = [
    { keys: ['/', ], description: 'Focus search bar' },
    { keys: ['f'], description: 'Toggle filters' },
    { keys: ['g', 'h'], description: 'Go home' },
    { keys: ['g', 'f'], description: 'Go to formats' },
    { keys: ['g', 's'], description: 'Go to settings' },
    { keys: ['Esc'], description: 'Clear search / Close' },
    { keys: ['?'], description: 'Show this help' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-masters-charcoal">Keyboard Shortcuts</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-2">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex gap-1">
                {shortcut.keys.map((key, i) => (
                  <span key={i}>
                    <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
                      {key}
                    </kbd>
                    {i < shortcut.keys.length - 1 && <span className="mx-1 text-gray-400">then</span>}
                  </span>
                ))}
              </div>
              <span className="text-sm text-masters-slate">{shortcut.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}