import React from 'react';
import { motion } from 'motion/react';

interface CowboyHatProps {
  className?: string;
  size?: number;
  variant?: 'leather' | 'pink-cowgirl' | 'tan' | 'gold';
  spin?: boolean;
  spinSpeed?: number; // duration in seconds
  reverseSpin?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

export const CowboyHat: React.FC<CowboyHatProps> = ({
  className = '',
  size = 64,
  variant = 'leather',
  spin = false,
  spinSpeed = 8,
  reverseSpin = false,
  interactive = false,
  onClick,
}) => {
  // Color themes for a distinguished, mature western aesthetic
  const themes = {
    leather: {
      crown: '#8B4513',
      crownDark: '#5C2D0C',
      crownLight: '#A65D28',
      brim: '#9E4E18',
      brimUnderside: '#63300D',
      band: '#2B170B',
      bandAccent: '#D4AF37',
      star: '#FFD700',
    },
    'pink-cowgirl': {
      // Kept key name for backwards compatibility, styled as rich dark mahogany/wine leather
      crown: '#682835',
      crownDark: '#451621',
      crownLight: '#8C3849',
      brim: '#571F2B',
      brimUnderside: '#381019',
      band: '#240A10',
      bandAccent: '#D4AF37',
      star: '#D4AF37',
    },
    tan: {
      crown: '#C89D66',
      crownDark: '#8E6738',
      crownLight: '#DEC092',
      brim: '#BFA06D',
      brimUnderside: '#7A5528',
      band: '#5C381E',
      bandAccent: '#E5C158',
      star: '#FFF',
    },
    gold: {
      crown: '#D4AF37',
      crownDark: '#997E25',
      crownLight: '#F3E5AB',
      brim: '#E2BD44',
      brimUnderside: '#7D6414',
      band: '#4E2C0C',
      bandAccent: '#FFF8DC',
      star: '#FFFFFF',
    },
  };

  const c = themes[variant];

  const svgContent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg overflow-visible"
    >
      <defs>
        {/* Crown gradient */}
        <linearGradient id={`hat-crown-${variant}`} x1="30" y1="20" x2="90" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={c.crownLight} />
          <stop offset="50%" stopColor={c.crown} />
          <stop offset="100%" stopColor={c.crownDark} />
        </linearGradient>

        {/* Brim gradient */}
        <radialGradient id={`hat-brim-${variant}`} cx="60" cy="72" r="55" fx="60" fy="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={c.brim} />
          <stop offset="70%" stopColor={c.crown} />
          <stop offset="100%" stopColor={c.brimUnderside} />
        </radialGradient>

        {/* Crease shadow */}
        <linearGradient id={`crease-${variant}`} x1="60" y1="15" x2="60" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={c.crownDark} stopOpacity="0.8" />
          <stop offset="100%" stopColor={c.crownDark} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Brim (Curved western brim rolled up on the sides) */}
      <path
        d="M 5 76 C 18 64, 38 68, 60 70 C 82 68, 102 64, 115 76 C 118 79, 108 86, 92 89 C 72 92, 48 92, 28 89 C 12 86, 2 79, 5 76 Z"
        fill={`url(#hat-brim-${variant})`}
        stroke={c.crownDark}
        strokeWidth="1.5"
      />

      {/* Brim Edge Highlight / Stitching */}
      <path
        d="M 12 75 C 26 67, 44 70, 60 71 C 76 70, 94 67, 108 75"
        stroke={c.crownLight}
        strokeWidth="1"
        strokeDasharray="2 2"
        fill="none"
      />

      {/* Crown body with western pinch/crease */}
      <path
        d="M 36 70 C 35 55, 33 32, 42 22 C 48 16, 54 24, 60 25 C 66 24, 72 16, 78 22 C 87 32, 85 55, 84 70 Z"
        fill={`url(#hat-crown-${variant})`}
        stroke={c.crownDark}
        strokeWidth="1.5"
      />

      {/* Center Cattleman Crown Crease / Indentation */}
      <path
        d="M 60 25 C 57 32, 57 48, 60 56 C 63 48, 63 32, 60 25 Z"
        fill={`url(#crease-${variant})`}
      />

      {/* Side pinches */}
      <path
        d="M 44 32 C 47 40, 48 50, 47 62"
        stroke={c.crownDark}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M 76 32 C 73 40, 72 50, 73 62"
        stroke={c.crownDark}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Leather Hat Band */}
      <path
        d="M 35 66 C 45 68, 75 68, 85 66 C 85 71, 75 73, 60 73 C 45 73, 35 71, 35 66 Z"
        fill={c.band}
        stroke={c.bandAccent}
        strokeWidth="0.8"
      />

      {/* Decorative Sheriff Star / Buckle in center of band */}
      <polygon
        points="60,65 62,69 66,69 63,72 64,76 60,73 56,76 57,72 54,69 58,69"
        fill={c.star}
        stroke={c.crownDark}
        strokeWidth="0.5"
      />
    </svg>
  );

  if (spin) {
    return (
      <motion.div
        className={`inline-flex items-center justify-center ${interactive ? 'cursor-pointer' : ''} ${className}`}
        animate={{ rotate: reverseSpin ? -360 : 360 }}
        transition={{
          repeat: Infinity,
          duration: spinSpeed,
          ease: 'linear',
        }}
        whileHover={interactive ? { scale: 1.15 } : undefined}
        whileTap={interactive ? { scale: 0.9 } : undefined}
        onClick={onClick}
      >
        {svgContent}
      </motion.div>
    );
  }

  if (interactive) {
    return (
      <motion.div
        className={`inline-flex items-center justify-center cursor-pointer ${className}`}
        whileHover={{ scale: 1.12, rotate: reverseSpin ? -12 : 12 }}
        whileTap={{ scale: 0.92, rotate: 180 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        onClick={onClick}
      >
        {svgContent}
      </motion.div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {svgContent}
    </div>
  );
};
