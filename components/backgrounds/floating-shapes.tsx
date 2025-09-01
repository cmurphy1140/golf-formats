'use client';

import { motion } from 'framer-motion';

const shapes = [
  { 
    size: 80, 
    x: '10%', 
    y: '20%', 
    duration: 25,
    delay: 0,
    path: 'M12 2L2 7L12 12L22 7L12 2Z', // Diamond
    color: 'rgba(0, 75, 54, 0.05)'
  },
  { 
    size: 60, 
    x: '85%', 
    y: '15%', 
    duration: 30,
    delay: 5,
    path: 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z', // Star
    color: 'rgba(212, 165, 116, 0.05)'
  },
  { 
    size: 100, 
    x: '75%', 
    y: '70%', 
    duration: 35,
    delay: 10,
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z', // Circle
    color: 'rgba(0, 103, 71, 0.03)'
  },
  { 
    size: 70, 
    x: '15%', 
    y: '80%', 
    duration: 28,
    delay: 15,
    path: 'M3 3h18v18H3V3z', // Square
    color: 'rgba(0, 75, 54, 0.04)'
  },
  { 
    size: 90, 
    x: '50%', 
    y: '50%', 
    duration: 40,
    delay: 7,
    path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', // Star
    color: 'rgba(212, 165, 116, 0.03)'
  }
];

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={shape.color}
            className="w-full h-full"
          >
            <path d={shape.path} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}