'use client';

import { useState, useEffect } from 'react';
import { Save, RotateCcw, ChevronRight } from 'lucide-react';

type Settings = {
  handicap: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  groupSize: number;
  theme: 'light' | 'dark' | 'auto';
  animations: boolean;
};

const defaultSettings: Settings = {
  handicap: 15,
  skillLevel: 'intermediate',
  groupSize: 4,
  theme: 'auto',
  animations: true,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('golfSettings');
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('golfSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('golfSettings');
  };

  return (
    <div className="min-h-screen bg-masters-cream">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-playfair text-masters-pine mb-8">Settings</h1>
        
        <div className="bg-white rounded-lg border border-masters-pine/10 divide-y divide-masters-pine/5">
          
          {/* Handicap */}
          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-masters-charcoal">Handicap</h3>
              <p className="text-sm text-masters-slate mt-1">Your golf handicap index</p>
            </div>
            <input
              type="number"
              min="0"
              max="54"
              value={settings.handicap}
              onChange={(e) => setSettings({...settings, handicap: parseInt(e.target.value) || 0})}
              className="w-20 px-3 py-2 border border-masters-pine/20 rounded-md text-center focus:outline-none focus:border-masters-pine/40"
            />
          </div>

          {/* Skill Level */}
          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-masters-charcoal">Skill Level</h3>
              <p className="text-sm text-masters-slate mt-1">Affects format recommendations</p>
            </div>
            <select
              value={settings.skillLevel}
              onChange={(e) => setSettings({...settings, skillLevel: e.target.value as any})}
              className="px-4 py-2 border border-masters-pine/20 rounded-md focus:outline-none focus:border-masters-pine/40 bg-white"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Group Size */}
          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-masters-charcoal">Preferred Group Size</h3>
              <p className="text-sm text-masters-slate mt-1">Default number of players</p>
            </div>
            <div className="flex gap-2">
              {[2, 3, 4].map((size) => (
                <button
                  key={size}
                  onClick={() => setSettings({...settings, groupSize: size})}
                  className={`w-10 h-10 rounded-md border transition-all ${
                    settings.groupSize === size
                      ? 'bg-masters-pine text-white border-masters-pine'
                      : 'bg-white text-masters-charcoal border-masters-pine/20 hover:border-masters-pine/40'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-masters-charcoal">Theme</h3>
              <p className="text-sm text-masters-slate mt-1">Display appearance</p>
            </div>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({...settings, theme: e.target.value as any})}
              className="px-4 py-2 border border-masters-pine/20 rounded-md focus:outline-none focus:border-masters-pine/40 bg-white"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          {/* Animations */}
          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-masters-charcoal">Animations</h3>
              <p className="text-sm text-masters-slate mt-1">Enable UI animations</p>
            </div>
            <button
              onClick={() => setSettings({...settings, animations: !settings.animations})}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                settings.animations ? 'bg-masters-pine' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                settings.animations ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={handleSave}
            className="flex-1 bg-masters-pine text-white px-6 py-3 rounded-md hover:bg-masters-fairway transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 border border-masters-pine/20 rounded-md hover:bg-white transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {/* About Section */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-masters-pine/10">
          <h3 className="font-medium text-masters-charcoal mb-3">About</h3>
          <div className="space-y-2 text-sm text-masters-slate">
            <p>Golf Formats Database v1.0</p>
            <p>© 2024 Golf Formats Team</p>
            <a href="#" className="text-masters-pine hover:text-masters-fairway flex items-center gap-1">
              Privacy Policy <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}