import React, { useState, useEffect } from 'react';
import { CowboyHat } from './CowboyHat';

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // September 27 at 17:00 (5:00 PM)
    const now = new Date();
    let targetYear = now.getFullYear();
    let targetDate = new Date(targetYear, 8, 27, 17, 0, 0); // Month 8 is September

    if (now.getTime() > targetDate.getTime() + 24 * 60 * 60 * 1000) {
      targetYear += 1;
      targetDate = new Date(targetYear, 8, 27, 17, 0, 0);
    }

    const calculateTime = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto my-4 px-4">
      <div className="text-center py-4 px-4 bg-[#FAF7F2] rounded-2xl border border-[#D5C2AF]/70 shadow-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CowboyHat size={22} spin spinSpeed={7} variant="leather" />
          <span className="font-rye text-xs text-[#5C2E10] tracking-widest uppercase">
            Faltan para el festejo
          </span>
          <CowboyHat size={22} spin reverseSpin spinSpeed={7} variant="leather" />
        </div>

        {/* Typographic classic counter */}
        <div className="flex items-baseline justify-center gap-3 sm:gap-6 text-[#4A240E] font-rye">
          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-bold block">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-outfit uppercase tracking-wider text-[#7A451E] font-semibold">
              Días
            </span>
          </div>

          <span className="text-lg text-[#C5A059] font-sans font-bold">:</span>

          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-bold block">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-outfit uppercase tracking-wider text-[#7A451E] font-semibold">
              Horas
            </span>
          </div>

          <span className="text-lg text-[#C5A059] font-sans font-bold">:</span>

          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-bold block">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-outfit uppercase tracking-wider text-[#7A451E] font-semibold">
              Minutos
            </span>
          </div>

          <span className="text-lg text-[#C5A059] font-sans font-bold">:</span>

          <div className="text-center">
            <span className="text-2xl sm:text-3xl font-bold block">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-outfit uppercase tracking-wider text-[#7A451E] font-semibold">
              Segundos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
