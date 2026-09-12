import React from 'react';

interface WesternSilhouettesProps {
  className?: string;
  size?: number;
  color?: string;
}

// Cowboy Boots silhouette
export const CowboyBootsIcon: React.FC<WesternSilhouettesProps> = ({
  className = '',
  size = 32,
  color = '#8B4513',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left boot */}
      <path
        d="M12 12C12 10.5 14 9 17 9C20 9 22 10.5 22 12V32C22 35 24 38 27 40L32 44C35 46.5 35 50 32 52L24 53C20 53.5 16 52 14 48L12 36V12Z"
        fill={color}
        fillOpacity="0.85"
      />
      {/* Boot heel & sole */}
      <path
        d="M11 48H18V55H11C9.5 55 9 53 11 48Z"
        fill={color}
      />
      <path
        d="M11 53L32 53C35 53 36 50 34 49L32 48L11 48V53Z"
        fill={color}
      />
      {/* Decorative embroidery stitch on shaft */}
      <path
        d="M16 16C18 20 18 26 15 30"
        stroke="#FAF6F0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
      <path
        d="M18 18C20 22 20 27 18 31"
        stroke="#C5A059"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Right boot pair offset */}
      <path
        d="M32 10C32 8.5 34 7 37 7C40 7 42 8.5 42 10V30C42 33 44 36 47 38L52 42C55 44.5 55 48 52 50L44 51C40 51.5 36 50 34 46L32 34V10Z"
        fill={color}
      />
      <path
        d="M31 46H38V53H31C29.5 53 29 51 31 46Z"
        fill={color}
      />
      <path
        d="M31 51L52 51C55 51 56 48 54 47L52 46L31 46V51Z"
        fill={color}
      />
      {/* Right boot stitching */}
      <path
        d="M36 14C38 18 38 24 35 28"
        stroke="#FAF6F0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
      <path
        d="M38 16C40 20 40 25 38 29"
        stroke="#C5A059"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

// Horseshoe silhouette with warm styling
export const HorseshoeIcon: React.FC<WesternSilhouettesProps> = ({
  className = '',
  size = 28,
  color = '#C5A059',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7 6V13C7 18 10.5 24 16 24C21.5 24 25 18 25 13V6H20V12C20 15 18.5 18 16 18C13.5 18 12 15 12 12V6H7Z"
        fill={color}
      />
      {/* Nail holes */}
      <circle cx="9.5" cy="10" r="0.9" fill="#FAF6F0" />
      <circle cx="9.5" cy="14" r="0.9" fill="#FAF6F0" />
      <circle cx="11" cy="18" r="0.9" fill="#FAF6F0" />
      <circle cx="22.5" cy="10" r="0.9" fill="#FAF6F0" />
      <circle cx="22.5" cy="14" r="0.9" fill="#FAF6F0" />
      <circle cx="21" cy="18" r="0.9" fill="#FAF6F0" />
    </svg>
  );
};
