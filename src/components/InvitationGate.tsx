import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CowboyHat } from './CowboyHat';
import { CowboyBootsIcon, HorseshoeIcon } from './WesternSilhouettes';

interface InvitationGateProps {
  onOpen: () => void;
}

export const InvitationGate: React.FC<InvitationGateProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProceeding, setIsProceeding] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) {
      if (!isProceeding) {
        setIsProceeding(true);
        setTimeout(() => onOpen(), 400);
      }
      return;
    }

    setIsOpen(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#8B4513', '#D4AF37', '#FAF6F0'],
    });

    setTimeout(() => {
      setIsProceeding(true);
      setTimeout(() => {
        onOpen();
      }, 1100);
    }, 1700);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#EDE4D8]/95 backdrop-blur-md overflow-hidden select-none"
      onClick={isOpen ? onOpen : undefined}
    >
      <div className="relative w-full max-w-sm flex flex-col items-center justify-center my-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5"
        >
          <span className="font-outfit uppercase tracking-[0.3em] text-[10px] sm:text-[11px] font-bold text-[#8B4513] block">
            Invitación de Cumpleaños
          </span>
          <h2 className="font-rye text-2xl sm:text-3xl text-[#4A240E] mt-0.5">
            Cumpleaños de Adela
          </h2>
          <p className="text-xs text-[#7A451E] font-outfit mt-0.5">
            {isOpen ? 'Abriendo invitación...' : 'Toca el sobre para abrir'}
          </p>
        </motion.div>

        {/* Letter Envelope Stage */}
        <div
          className="relative w-[300px] sm:w-[350px] h-[210px] sm:h-[230px] cursor-pointer select-none"
          style={{ perspective: '1200px' }}
          onClick={handleOpenEnvelope}
        >
          {/* Envelope Back Plate - Parchment Tone */}
          <div className="absolute inset-0 bg-[#E8DFC8] rounded-2xl border-2 border-[#C5A059] shadow-xl overflow-hidden">
            <div className="absolute inset-2 bg-[#F3ECE0] rounded-xl border border-dashed border-[#C5A059]/60 flex items-center justify-center">
              <span className="font-rye text-[#C5A059]/25 text-6xl select-none pointer-events-none">
                A
              </span>
            </div>
          </div>

          {/* The Invitation Letter Card (slides up out of envelope pocket) */}
          <motion.div
            initial={{ y: 0, scale: 0.95 }}
            animate={
              isOpen
                ? {
                    y: -130,
                    scale: 1,
                    transition: { delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                  }
                : { y: 0, scale: 0.95 }
            }
            className="absolute left-3 right-3 sm:left-4 sm:right-4 top-3 h-[190px] sm:h-[205px] rounded-xl bg-[#FAF7F2] text-[#3B1F0B] p-3.5 sm:p-4 shadow-2xl border-2 border-[#C5A059] z-20 flex flex-col justify-between"
          >
            {/* Elegant hairline border */}
            <div className="absolute inset-2 border border-[#C5A059]/50 rounded-lg pointer-events-none" />

            {/* Letter Header */}
            <div className="text-center pt-0.5">
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#8B4513] font-outfit block">
                Invitación Formal
              </span>

              <h1 className="font-rye text-2xl sm:text-3xl text-[#4A240E] tracking-wider my-0.5">
                ADELA
              </h1>
              <div className="flex items-center justify-center gap-1.5 font-outfit text-[11px] font-semibold text-[#6B3A19]">
                <CowboyBootsIcon size={16} color="#8B4513" />
                <span>51 Años • Temática Vaquera</span>
                <HorseshoeIcon size={14} color="#C5A059" />
              </div>
            </div>

            {/* Letter Details */}
            <div className="text-center my-0.5 py-1.5 border-y border-[#E8DCC8] bg-[#FFFFFF] rounded-md shadow-xs">
              <p className="font-rye text-[11px] sm:text-xs text-[#5C2E10]">
                27 DE SEPTIEMBRE • 5:00 PM
              </p>
              <p className="text-[10px] font-outfit text-[#4A2810] font-medium mt-0.5">
                Hacienda San Sebastián #140 • García, N.L.
              </p>
              <p className="text-[9px] font-outfit text-[#8B4513] font-bold mt-0.5">
                ★ Habrá show para adultos ★
              </p>
            </div>

            {/* Letter Footer */}
            <div className="flex items-center justify-between px-2 pb-0.5 text-[9px] font-outfit text-[#7A451E]">
              <span>García, N.L.</span>
              <div className="flex items-center gap-1">
                <CowboyHat size={18} spin spinSpeed={6} variant="leather" />
                <span className="font-bold">51 Años</span>
              </div>
            </div>
          </motion.div>

          {/* Envelope Front Pocket - Harmonious Ivory/Parchment with Leather & Gold details */}
          <div className="absolute inset-x-0 bottom-0 h-[155px] sm:h-[168px] z-30 pointer-events-none">
            {/* Left side fold */}
            <div
              className="absolute left-0 bottom-0 w-full h-full bg-[#E5DCB8] border-t border-[#C5A059]/60 shadow-sm"
              style={{
                clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
              }}
            />
            {/* Right side fold */}
            <div
              className="absolute right-0 bottom-0 w-full h-full bg-[#DFD5AF] border-t border-[#C5A059]/60 shadow-sm"
              style={{
                clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)',
              }}
            />
            {/* Bottom triangle fold */}
            <div
              className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#D8CCA0] to-[#EAE0C2] border-t-2 border-[#C5A059]"
              style={{
                clipPath: 'polygon(0% 100%, 50% 42%, 100% 100%)',
              }}
            />
            {/* Stitched seam accents */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[#4A240E] text-[9px] font-serif tracking-widest font-bold flex items-center gap-1.5 whitespace-nowrap">
              <HorseshoeIcon size={11} color="#8B4513" />
              <span>HACIENDA SAN SEBASTIÁN</span>
              <HorseshoeIcon size={11} color="#8B4513" />
            </div>
          </div>

          {/* Envelope Top Triangular Flap - Matching Parchment Tone */}
          <motion.div
            initial={false}
            animate={
              isOpen
                ? {
                    rotateX: 180,
                    zIndex: 10,
                    transition: { duration: 0.55, ease: 'easeInOut' },
                  }
                : {
                    rotateX: 0,
                    zIndex: 40,
                    transition: { duration: 0.55, ease: 'easeInOut' },
                  }
            }
            style={{
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-x-0 top-0 h-[125px] sm:h-[140px] drop-shadow-lg"
          >
            {/* Front of flap (visible when closed) */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#EFE6CE] via-[#E2D6B5] to-[#D5C69E] border-t-2 border-b border-[#C5A059]"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                backfaceVisibility: 'hidden',
              }}
            >
              <div
                className="absolute inset-1 opacity-70"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                  borderBottom: '1px dashed #C5A059',
                }}
              />
            </div>

            {/* Back of flap (visible when opened upward) */}
            <div
              className="absolute inset-0 bg-[#E0D4B2] border-b-2 border-[#C5A059]"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
              }}
            />
          </motion.div>

          {/* Golden Wax Seal Stamp */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-1/2 -translate-x-1/2 top-[95px] sm:top-[108px] z-50 flex flex-col items-center pointer-events-auto cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-gradient-to-br from-[#E8CF88] via-[#C5A059] to-[#8C6B26] border-2 border-[#FAF6F0] shadow-xl flex items-center justify-center relative">
                  <div className="absolute inset-1 rounded-full border border-dashed border-[#442008]/40" />
                  <CowboyHat size={28} spin spinSpeed={6} variant="leather" />
                </div>
                <span className="mt-1 bg-[#8B4513] text-[#FFF8EE] text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-[#C5A059] uppercase tracking-wider font-outfit shadow whitespace-nowrap animate-pulse">
                  Toca para abrir
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status Indicator */}
        <div className="h-8 mt-5 flex items-center justify-center text-center">
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-xs text-[#7A451E] font-outfit font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8B4513] animate-spin" />
              <span>{isProceeding ? 'Entrando a la invitación...' : 'Deslizando invitación...'}</span>
            </motion.div>
          ) : (
            <p className="text-[11px] text-[#7A451E] font-outfit flex items-center gap-1.5 font-medium">
              <span>Invitación Formal de Cumpleaños</span>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
