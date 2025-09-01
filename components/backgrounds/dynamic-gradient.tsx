'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function DynamicGradient() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Dynamic Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Base gradient that shifts with mouse */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(0, 75, 54, 0.03) 0%, 
              rgba(212, 165, 116, 0.02) 40%, 
              rgba(245, 242, 237, 0.5) 100%)`
          }}
          transition={{ type: "tween", ease: "linear", duration: 0 }}
        />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-masters-pine/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-masters-gold/5 rounded-full blur-3xl" />
        </motion.div>
        
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </>
  );
}