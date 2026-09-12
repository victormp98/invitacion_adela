import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CowboyHat } from './CowboyHat';
import { CowboyBootsIcon, HorseshoeIcon } from './WesternSilhouettes';
import confetti from 'canvas-confetti';

interface FloatingItem {
  id: number;
  type: 'hat' | 'boot' | 'horseshoe';
  x: number;
  y: number;
  size: number;
  duration: number;
  spinSpeed?: number;
  reverse?: boolean;
  opacity: number;
}

export const SpinningHatsBackground: React.FC = () => {
  const [interactiveSparks, setInteractiveSparks] = useState<{ id: number; x: number; y: number }[]>([]);

  // Array of floating spinning hats, boots, and horseshoes distributed across the viewport
  const items: FloatingItem[] = [
    { id: 1, type: 'hat', x: 6, y: 12, size: 54, duration: 9, spinSpeed: 7, reverse: false, opacity: 0.75 },
    { id: 2, type: 'boot', x: 88, y: 14, size: 46, duration: 11, reverse: true, opacity: 0.7 },
    { id: 3, type: 'horseshoe', x: 10, y: 44, size: 36, duration: 10, reverse: true, opacity: 0.65 },
    { id: 4, type: 'hat', x: 88, y: 48, size: 50, duration: 12, spinSpeed: 8, reverse: false, opacity: 0.75 },
    { id: 5, type: 'boot', x: 5, y: 76, size: 48, duration: 10, reverse: false, opacity: 0.7 },
    { id: 6, type: 'horseshoe', x: 90, y: 80, size: 38, duration: 8, reverse: false, opacity: 0.65 },
  ];

  const handleItemClick = (e: React.MouseEvent, itemId: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x, y },
      colors: ['#D4AF37', '#8B4513', '#FAF6F0', '#C5A059'],
      shapes: ['circle', 'square'],
      scalar: 0.8,
    });

    const sparkId = Date.now() + itemId;
    setInteractiveSparks((prev) => [...prev, { id: sparkId, x: rect.left, y: rect.top }]);
    setTimeout(() => {
      setInteractiveSparks((prev) => prev.filter((s) => s.id !== sparkId));
    }, 1000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Warm ambient parchment gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-gradient-to-b from-[#C5A059]/12 via-[#8B4513]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Floating Western Items */}
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute pointer-events-auto cursor-pointer"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            opacity: item.opacity,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, item.reverse ? -8 : 8, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          onClick={(e) => handleItemClick(e, item.id)}
          title="Toca para interactuar"
        >
          {item.type === 'hat' && (
            <motion.div
              animate={{ rotate: item.reverse ? -360 : 360 }}
              transition={{
                repeat: Infinity,
                duration: item.spinSpeed || 8,
                ease: 'linear',
              }}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.85 }}
            >
              <CowboyHat
                size={item.size}
                variant="leather"
                className="filter drop-shadow-md"
              />
            </motion.div>
          )}

          {item.type === 'boot' && (
            <motion.div
              animate={{ rotate: item.reverse ? [-6, 6, -6] : [6, -6, 6] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.85 }}
            >
              <CowboyBootsIcon
                size={item.size}
                color="#8B4513"
                className="filter drop-shadow-md"
              />
            </motion.div>
          )}

          {item.type === 'horseshoe' && (
            <motion.div
              animate={{ rotate: item.reverse ? [-10, 10, -10] : [10, -10, 10] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.85 }}
            >
              <HorseshoeIcon
                size={item.size}
                color="#C5A059"
                className="filter drop-shadow-md"
              />
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Interactive Floating Sparks indicator */}
      <AnimatePresence>
        {interactiveSparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ opacity: 1, scale: 0.5, y: 0 }}
            animate={{ opacity: 0, scale: 1.4, y: -30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed pointer-events-none font-rye text-[#8B4513] text-sm z-50 font-bold drop-shadow"
            style={{ left: spark.x, top: spark.y }}
          >
            ✦ 51 Años Adela ✦
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
