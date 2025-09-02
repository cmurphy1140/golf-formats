'use client';

import { useState, useEffect } from 'react';
import { Smartphone, Monitor, Tablet, X } from 'lucide-react';

interface Viewport {
  name: string;
  width: number;
  height: number;
  icon: typeof Smartphone;
}

const viewports: Viewport[] = [
  { name: 'iPhone SE', width: 375, height: 667, icon: Smartphone },
  { name: 'iPhone 12 Pro', width: 390, height: 844, icon: Smartphone },
  { name: 'iPhone 14 Pro Max', width: 428, height: 926, icon: Smartphone },
  { name: 'iPad', width: 768, height: 1024, icon: Tablet },
  { name: 'iPad Pro', width: 1024, height: 1366, icon: Tablet },
  { name: 'Desktop', width: 1920, height: 1080, icon: Monitor },
];

export default function MobileViewportDebugger() {
  const [currentViewport, setCurrentViewport] = useState<Viewport | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [debugInfo, setDebugInfo] = useState({
    innerWidth: 0,
    innerHeight: 0,
    devicePixelRatio: 1,
    orientation: '',
    userAgent: '',
  });

  useEffect(() => {
    const updateDebugInfo = () => {
      setDebugInfo({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
        orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
        userAgent: navigator.userAgent,
      });
    };

    updateDebugInfo();
    window.addEventListener('resize', updateDebugInfo);
    window.addEventListener('orientationchange', updateDebugInfo);

    return () => {
      window.removeEventListener('resize', updateDebugInfo);
      window.removeEventListener('orientationchange', updateDebugInfo);
    };
  }, []);

  const toggleViewport = (viewport: Viewport) => {
    if (currentViewport?.name === viewport.name) {
      setCurrentViewport(null);
      document.body.style.maxWidth = '';
      document.body.style.margin = '';
      document.body.style.border = '';
      document.body.style.boxShadow = '';
    } else {
      setCurrentViewport(viewport);
      document.body.style.maxWidth = `${viewport.width}px`;
      document.body.style.margin = '0 auto';
      document.body.style.border = '2px solid #004B36';
      document.body.style.boxShadow = '0 0 20px rgba(0, 75, 54, 0.3)';
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-masters-pine text-white rounded-full shadow-lg"
        aria-label="Toggle viewport debugger"
      >
        {isVisible ? <X size={20} /> : <Smartphone size={20} />}
      </button>

      {/* Debugger Panel */}
      {isVisible && (
        <div className="fixed bottom-20 right-4 z-50 bg-white rounded-lg shadow-2xl border border-masters-pine/20 p-4 w-80">
          <h3 className="text-sm font-semibold text-masters-charcoal mb-3">
            Viewport Debugger
          </h3>

          {/* Current Info */}
          <div className="mb-4 p-3 bg-masters-sand/20 rounded text-xs space-y-1">
            <div>Width: {debugInfo.innerWidth}px</div>
            <div>Height: {debugInfo.innerHeight}px</div>
            <div>DPR: {debugInfo.devicePixelRatio}</div>
            <div>Orientation: {debugInfo.orientation}</div>
            <div className="truncate">UA: {debugInfo.userAgent}</div>
          </div>

          {/* Viewport Presets */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-masters-slate mb-2">
              Test Viewports:
            </div>
            {viewports.map((viewport) => {
              const Icon = viewport.icon;
              return (
                <button
                  key={viewport.name}
                  onClick={() => toggleViewport(viewport)}
                  className={`w-full flex items-center justify-between p-2 rounded transition-colors ${
                    currentViewport?.name === viewport.name
                      ? 'bg-masters-pine text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-masters-charcoal'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} />
                    <span className="text-sm">{viewport.name}</span>
                  </div>
                  <span className="text-xs opacity-70">
                    {viewport.width}×{viewport.height}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Color Check */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-xs font-medium text-masters-slate mb-2">
              Color Check:
            </div>
            <div className="grid grid-cols-4 gap-1">
              <div className="h-8 bg-masters-pine rounded" title="#004B36" />
              <div className="h-8 bg-masters-charcoal rounded" title="#2C312E" />
              <div className="h-8 bg-masters-slate rounded" title="#4A5247" />
              <div className="h-8 bg-masters-sand rounded" title="#F5F2ED" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}