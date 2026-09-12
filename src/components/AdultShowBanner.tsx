import React from 'react';
import { motion } from 'motion/react';
import { CowboyHat } from './CowboyHat';

export const AdultShowBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full max-w-xl mx-auto my-3 px-4 text-center"
    >
      <div className="py-3 px-5 rounded-2xl bg-[#FAF7F2] border border-[#D5C2AF]/70 shadow-sm flex items-center justify-center gap-3">
        <CowboyHat size={26} spin spinSpeed={7} variant="leather" />
        <p className="font-rye text-base sm:text-lg text-[#5C2E10] tracking-wide">
          Habrá Show para Adultos
        </p>
        <CowboyHat size={26} spin reverseSpin spinSpeed={7} variant="leather" />
      </div>
    </motion.div>
  );
};
