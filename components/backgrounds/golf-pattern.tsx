'use client';

import { motion } from 'framer-motion';

export default function GolfPattern() {
  // Create a checkered pattern of golf elements
  const pattern = [];
  const rows = 8;
  const cols = 10;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Alternate between golf balls and flagsticks
      const isGolfBall = (row + col) % 2 === 0;
      const x = (col / cols) * 100 + 5;
      const y = (row / rows) * 100 + 5;
      
      pattern.push({
        type: isGolfBall ? 'ball' : 'flag',
        x,
        y,
        delay: (row * cols + col) * 0.05,
        id: `${row}-${col}`
      });
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Beige base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5F2ED] via-[#FAF8F3] to-[#EDE8E0]" />
      
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(0, 75, 54, 0.02) 35px,
            rgba(0, 75, 54, 0.02) 70px
          )`
        }}
      />
      
      {/* Golf elements pattern */}
      <div className="absolute inset-0">
        {pattern.map((item) => (
          <motion.div
            key={item.id}
            className="absolute"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.06,
              scale: 1,
              rotate: item.type === 'ball' ? [0, 5, 0] : [0, -3, 0]
            }}
            transition={{
              opacity: { duration: 1, delay: item.delay },
              scale: { duration: 0.5, delay: item.delay },
              rotate: { 
                duration: 6,
                delay: item.delay + 1,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {item.type === 'ball' ? (
              // Golf Ball
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#004B36" opacity="0.8"/>
                <circle cx="10" cy="10" r="1" fill="#002A1F"/>
                <circle cx="14" cy="10" r="1" fill="#002A1F"/>
                <circle cx="10" cy="14" r="1" fill="#002A1F"/>
                <circle cx="14" cy="14" r="1" fill="#002A1F"/>
                <circle cx="12" cy="12" r="1" fill="#002A1F"/>
              </svg>
            ) : (
              // Flagstick
              <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                <rect x="11" y="8" width="2" height="24" fill="#004B36" opacity="0.8"/>
                <path d="M13 8 L22 10 L20 14 L13 16 Z" fill="#004B36" opacity="0.6"/>
                <circle cx="12" cy="30" r="4" fill="none" stroke="#004B36" strokeWidth="1" opacity="0.4"/>
              </svg>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Animated accent lines */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <svg className="w-full h-full">
          <motion.line
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="rgba(0, 75, 54, 0.02)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.line
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            stroke="rgba(0, 75, 54, 0.02)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </div>
  );
}