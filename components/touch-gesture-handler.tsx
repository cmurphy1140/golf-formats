'use client';

import { useRef, useEffect, ReactNode, useState } from 'react';

interface TouchGestureHandlerProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onLongPress?: () => void;
  onPinch?: (scale: number) => void;
  onRotate?: (rotation: number) => void;
  className?: string;
  threshold?: number;
}

export default function TouchGestureHandler({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onLongPress,
  onPinch,
  onRotate,
  className = '',
  threshold = 50
}: TouchGestureHandlerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0, time: 0 });
  const [isPressing, setIsPressing] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const lastTouchDistance = useRef<number>(0);
  const lastRotation = useRef<number>(0);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      setTouchStart({ 
        x: touch.clientX, 
        y: touch.clientY, 
        time: Date.now() 
      });
      setIsPressing(true);

      // Long press detection
      if (onLongPress) {
        longPressTimer.current = setTimeout(() => {
          onLongPress();
          setIsPressing(false);
        }, 500);
      }

      // Multi-touch gesture setup
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        lastTouchDistance.current = Math.sqrt(dx * dx + dy * dy);
        lastRotation.current = Math.atan2(dy, dx) * 180 / Math.PI;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Cancel long press on move
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }

      // Handle pinch and rotate for multi-touch
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const rotation = Math.atan2(dy, dx) * 180 / Math.PI;

        if (onPinch && lastTouchDistance.current > 0) {
          const scale = distance / lastTouchDistance.current;
          onPinch(scale);
        }

        if (onRotate && lastRotation.current !== 0) {
          const rotationDelta = rotation - lastRotation.current;
          onRotate(rotationDelta);
        }

        lastTouchDistance.current = distance;
        lastRotation.current = rotation;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Clear long press timer
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }

      setIsPressing(false);

      // Reset multi-touch tracking
      if (e.touches.length === 0) {
        lastTouchDistance.current = 0;
        lastRotation.current = 0;
      }

      // Swipe detection
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStart.x;
      const deltaY = touch.clientY - touchStart.y;
      const deltaTime = Date.now() - touchStart.time;

      // Only register as swipe if it was a quick gesture (< 300ms)
      if (deltaTime < 300) {
        if (Math.abs(deltaX) > threshold) {
          if (deltaX > 0 && onSwipeRight) {
            onSwipeRight();
          } else if (deltaX < 0 && onSwipeLeft) {
            onSwipeLeft();
          }
        }

        if (Math.abs(deltaY) > threshold) {
          if (deltaY > 0 && onSwipeDown) {
            onSwipeDown();
          } else if (deltaY < 0 && onSwipeUp) {
            onSwipeUp();
          }
        }
      }
    };

    const handleTouchCancel = () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
      setIsPressing(false);
      lastTouchDistance.current = 0;
      lastRotation.current = 0;
    };

    // Add event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });
    element.addEventListener('touchcancel', handleTouchCancel, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchCancel);
      
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
    };
  }, [touchStart, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onLongPress, onPinch, onRotate, threshold]);

  return (
    <div 
      ref={containerRef} 
      className={`touch-gesture-container ${className} ${isPressing ? 'pressing' : ''}`}
      style={{
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
    >
      {children}
    </div>
  );
}