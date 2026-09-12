import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, CheckCircle2, Navigation } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CowboyHat } from './CowboyHat';
import { CowboyBootsIcon, HorseshoeIcon } from './WesternSilhouettes';

interface WesternHeroProps {
  onOpenRSVP: () => void;
  onOpenLocation: () => void;
}

export const WesternHero: React.FC<WesternHeroProps> = ({
  onOpenRSVP,
  onOpenLocation,
}) => {
  const triggerHatCelebration = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x, y },
      colors: ['#C5A059', '#8B4513', '#D4AF37', '#FAF6F0'],
    });
  };

  return (
    <div className="relative w-full max-w-xl mx-auto pt-2 pb-2 px-4 text-center">
      {/* Stationery Parchment Card with Western Silhouettes */}
      <div className="relative bg-[#FAF7F2] rounded-3xl border border-[#D5C2AF] p-6 sm:p-9 shadow-xl text-[#3B1F0B] overflow-hidden">
        {/* Subtle Western Watermark / Silhouette Background Accents */}
        <div className="absolute top-4 left-4 opacity-15 pointer-events-none">
          <CowboyBootsIcon size={56} color="#8B4513" />
        </div>
        <div className="absolute top-4 right-4 opacity-15 pointer-events-none">
          <HorseshoeIcon size={44} color="#8B4513" />
        </div>
        <div className="absolute bottom-16 left-4 opacity-15 pointer-events-none">
          <HorseshoeIcon size={40} color="#8B4513" />
        </div>
        <div className="absolute bottom-16 right-4 opacity-15 pointer-events-none">
          <CowboyBootsIcon size={54} color="#8B4513" />
        </div>

        {/* Decorative Top Flourish with Horseshoe */}
        <div className="flex items-center justify-center gap-3 mb-2 relative z-10">
          <div className="h-px w-10 sm:w-16 bg-[#C5A059]/70" />
          <div className="flex items-center gap-1.5 text-[#8B4513]">
            <HorseshoeIcon size={14} color="#8B4513" />
            <span className="font-outfit uppercase tracking-[0.25em] text-[11px] font-bold">
              Invitación de Cumpleaños
            </span>
            <HorseshoeIcon size={14} color="#8B4513" />
          </div>
          <div className="h-px w-10 sm:w-16 bg-[#C5A059]/70" />
        </div>

        {/* Central Western Showcase: Boots, Hats and Horseshoe */}
        <div className="relative my-3 flex justify-center items-center gap-2 sm:gap-4 relative z-10">
          {/* Left Boot Silhouette */}
          <div className="hidden sm:flex flex-col items-center opacity-85">
            <CowboyBootsIcon size={42} color="#8B4513" />
            <span className="text-[9px] font-outfit font-bold text-[#8B4513] uppercase tracking-widest mt-0.5">
              Botas
            </span>
          </div>

          {/* Left Rotating Hat */}
          <div className="opacity-80">
            <CowboyHat size={34} spin spinSpeed={9} variant="leather" />
          </div>

          {/* Center Main Cowboy Hat with interactive celebration */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={triggerHatCelebration}
            className="cursor-pointer relative z-10 p-1"
            title="Toca el sombrero"
          >
            <CowboyHat size={82} spin spinSpeed={12} variant="leather" />
          </motion.div>

          {/* Right Rotating Hat */}
          <div className="opacity-80">
            <CowboyHat size={34} spin reverseSpin spinSpeed={9} variant="leather" />
          </div>

          {/* Right Boot Silhouette */}
          <div className="hidden sm:flex flex-col items-center opacity-85">
            <div className="transform scale-x-[-1]">
              <CowboyBootsIcon size={42} color="#8B4513" />
            </div>
            <span className="text-[9px] font-outfit font-bold text-[#8B4513] uppercase tracking-widest mt-0.5">
              Sombreros
            </span>
          </div>
        </div>

        {/* Invitation Text Hierarchy */}
        <div className="space-y-1.5 my-3 relative z-10">
          <p className="font-serif italic text-sm sm:text-base text-[#7A451E]">
            Te invito cordialmente a celebrar mis
          </p>

          <div className="py-1">
            <span className="font-rye text-2xl sm:text-3xl text-[#8B4513] tracking-widest block">
              51 AÑOS
            </span>
            <h1 className="font-rye text-5xl sm:text-6xl text-[#4A240E] tracking-wider my-0.5">
              ADELA
            </h1>
          </div>

          {/* Western Theme Badge with Boots & Hats */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EBE1] border border-[#D5C2AF] text-[#5C2E10] text-xs font-semibold">
            <CowboyBootsIcon size={16} color="#8B4513" />
            <span>Fiesta con Temática Vaquera • Sombreros y Botas</span>
            <HorseshoeIcon size={14} color="#C5A059" />
          </div>
        </div>

        {/* Divider with Western Horseshoe & Stars */}
        <div className="flex items-center justify-center gap-3 my-4 relative z-10">
          <div className="h-px w-14 bg-[#D5C2AF]" />
          <div className="flex items-center gap-2 text-[#8B4513]">
            <span className="text-xs">★</span>
            <HorseshoeIcon size={16} color="#8B4513" />
            <span className="text-xs">★</span>
          </div>
          <div className="h-px w-14 bg-[#D5C2AF]" />
        </div>

        {/* Event Details Flowing Elegantly */}
        <div className="space-y-3.5 text-left max-w-md mx-auto py-1 font-outfit relative z-10">
          {/* Fecha */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#F0E5D5] text-[#8B4513] shrink-0 mt-0.5">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-[#8B4513] uppercase font-bold tracking-wider block">
                Fecha
              </span>
              <span className="font-bold text-[#4A240E] text-base sm:text-lg">
                Sábado, 27 de Septiembre
              </span>
            </div>
          </div>

          {/* Hora */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#F0E5D5] text-[#8B4513] shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-[#8B4513] uppercase font-bold tracking-wider block">
                Hora
              </span>
              <span className="font-bold text-[#4A240E] text-base sm:text-lg block">
                A partir de las 5:00 PM
              </span>
              <span className="text-xs text-[#8B4513] font-semibold mt-0.5 block">
                ★ Habrá show para adultos ★
              </span>
            </div>
          </div>

          {/* Lugar */}
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#F0E5D5] text-[#8B4513] shrink-0 mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-[#8B4513] uppercase font-bold tracking-wider block">
                Lugar
              </span>
              <span className="font-bold text-[#4A240E] text-base sm:text-lg block">
                Hacienda San Sebastián #140
              </span>
              <p className="text-xs sm:text-sm text-[#6B3A19]">
                Col. Hacienda del Sol en García, N.L.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Boots & Horseshoe accents strip */}
        <div className="flex items-center justify-center gap-6 my-4 pt-1 relative z-10 text-[#8B4513] opacity-80">
          <div className="flex items-center gap-1.5">
            <CowboyBootsIcon size={24} color="#8B4513" />
            <span className="text-[11px] font-bold font-outfit">Botas</span>
          </div>
          <span className="text-[#C5A059]">•</span>
          <div className="flex items-center gap-1.5">
            <CowboyHat size={22} spin spinSpeed={8} variant="leather" />
            <span className="text-[11px] font-bold font-outfit">Sombreros</span>
          </div>
          <span className="text-[#C5A059]">•</span>
          <div className="flex items-center gap-1.5">
            <HorseshoeIcon size={20} color="#8B4513" />
            <span className="text-[11px] font-bold font-outfit">García, N.L.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-[#E8DCC8] relative z-10">
          <button
            id="hero-confirm-btn"
            onClick={onOpenRSVP}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#8B4513] to-[#6B320B] hover:from-[#7A3A0E] hover:to-[#5A2908] text-[#FFF8EE] font-bold text-sm shadow-md transition-transform active:scale-95 font-outfit cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-[#F3C262]" />
            <span>Confirmar Asistencia</span>
          </button>

          <button
            id="hero-location-btn"
            onClick={onOpenLocation}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white hover:bg-[#F3EBE1] border border-[#D5C2AF] text-[#4A240E] font-bold text-sm transition-transform active:scale-95 font-outfit shadow-sm cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-[#8B4513]" />
            <span>Ver Ubicación (Mapa)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
