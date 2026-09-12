import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { MapPin, CheckCircle2, Mail } from 'lucide-react';
import { CowboyHat } from './components/CowboyHat';
import { CowboyBootsIcon, HorseshoeIcon } from './components/WesternSilhouettes';
import { SpinningHatsBackground } from './components/SpinningHatsBackground';
import { WesternHero } from './components/WesternHero';
import { CountdownTimer } from './components/CountdownTimer';
import { AdultShowBanner } from './components/AdultShowBanner';
import { LocationSection } from './components/LocationSection';
import { RSVPSection } from './components/RSVPSection';
import { InvitationGate } from './components/InvitationGate';

export default function App() {
  const [hasOpened, setHasOpened] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EDE4] text-[#3B1F0B] font-outfit relative selection:bg-[#C5A059] selection:text-[#2B1506] pb-24">
      {/* Background Floating Spinning Hats & Subtle Western Elements */}
      <SpinningHatsBackground />

      {/* Realistic Western Letter Envelope Reveal Gate */}
      <AnimatePresence>
        {!hasOpened && (
          <InvitationGate onOpen={() => setHasOpened(true)} />
        )}
      </AnimatePresence>

      {/* Main Container */}
      <main className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Top Bar */}
        <header className="w-full pt-4 pb-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CowboyHat size={26} spin spinSpeed={8} variant="leather" />
            <span className="font-rye text-xs sm:text-sm text-[#5C2E10] tracking-wider">
              Adela • 51 Años
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHasOpened(false)}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#FAF7F2] hover:bg-[#EFE5D5] border border-[#D5C2AF] text-xs font-semibold text-[#5C2E10] transition-colors shadow-sm cursor-pointer"
              title="Ver sobre de invitación nuevamente"
            >
              <Mail className="w-3.5 h-3.5 text-[#8B4513]" />
              <span>Ver Sobre</span>
            </button>
          </div>
        </header>

        {/* Hero Section with Silhouettes */}
        <WesternHero
          onOpenRSVP={() => scrollToSection('confirmar')}
          onOpenLocation={() => scrollToSection('ubicacion')}
        />

        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Adult Show Announcement without hour */}
        <AdultShowBanner />

        {/* Location & Real Google Maps Direct Access */}
        <LocationSection />

        {/* RSVP Confirmation Section */}
        <RSVPSection />

        {/* Footer with formal note and Western silhouettes */}
        <footer className="w-full max-w-xl mx-auto px-4 mt-6 text-center text-[#7A451E] text-xs space-y-2.5">
          <div className="flex items-center justify-center gap-3">
            <CowboyBootsIcon size={20} color="#8B4513" />
            <div className="h-px w-10 bg-[#C5A059]/60" />
            <CowboyHat size={24} spin spinSpeed={8} variant="leather" />
            <div className="h-px w-10 bg-[#C5A059]/60" />
            <HorseshoeIcon size={18} color="#8B4513" />
          </div>

          <p className="font-rye text-[#4A240E] text-sm">
            ¡Esperamos contar con tu grata presencia!
          </p>
          <p className="text-[11px] text-[#6B3A19] font-outfit">
            Adela • 27 de Septiembre • García, Nuevo León
          </p>

          <div className="pt-1">
            <button
              onClick={() => setHasOpened(false)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#D5C2AF] text-[#5C2E10] hover:bg-[#EFE5D5] text-xs font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#8B4513]" />
              Reabrir Carta de Invitación
            </button>
          </div>
        </footer>
      </main>

      {/* Floating Bottom Navigation Bar (RSVP + Location) */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 w-11/12 max-w-sm bg-[#FAF7F2]/95 backdrop-blur-md border border-[#D5C2AF] rounded-2xl p-2 shadow-xl flex items-center justify-around">
        <button
          onClick={() => scrollToSection('confirmar')}
          className="flex-1 mr-2 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#8B4513] hover:bg-[#72370E] text-[#FFF8EE] font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4 text-[#F3C262]" />
          <span>Confirmar Asistencia</span>
        </button>

        <button
          onClick={() => scrollToSection('ubicacion')}
          className="flex-1 ml-2 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white hover:bg-[#EFE5D5] border border-[#D5C2AF] text-[#4A240E] font-bold text-xs transition-colors active:scale-95 cursor-pointer"
        >
          <MapPin className="w-4 h-4 text-[#8B4513]" />
          <span>Ver Mapa GPS</span>
        </button>
      </div>
    </div>
  );
}
