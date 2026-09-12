import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink } from 'lucide-react';
import { CowboyHat } from './CowboyHat';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const address = "Hacienda San Sebastián #140, Col. Hacienda del Sol en García, N.L.";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Hacienda san Sebastián 140 col Hacienda del sol Garcia NL")}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="ubicacion" className="w-full max-w-xl mx-auto my-6 px-4">
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#D5C2AF] p-6 sm:p-8 shadow-xl text-[#3B1F0B]">
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-2 mb-1">
            <CowboyHat size={32} spin spinSpeed={9} variant="leather" />
          </div>
          <h3 className="font-rye text-2xl sm:text-3xl text-[#4A240E]">
            Lugar del Festejo
          </h3>
          <p className="font-semibold text-base sm:text-lg text-[#5C2E10] font-outfit mt-1">
            Hacienda San Sebastián #140
          </p>
          <p className="text-sm text-[#7A451E] font-outfit">
            Col. Hacienda del Sol en García, N.L.
          </p>
        </div>

        {/* Copy Address Button */}
        <div className="mb-4">
          <button
            id="copy-address-btn"
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-[#F3EBE1] border border-[#D5C2AF] text-xs font-semibold text-[#5C3317] shadow-sm transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">¡Dirección copiada en el portapapeles!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#8B4513]" />
                <span>Copiar dirección completa</span>
              </>
            )}
          </button>
        </div>

        {/* Real Interactive Google Maps Embed */}
        <div className="rounded-2xl overflow-hidden border border-[#D5C2AF] shadow-md mb-5 bg-[#E8DFC8]">
          <iframe
            title="Ubicación Hacienda San Sebastián en Google Maps"
            src="https://maps.google.com/maps?q=Hacienda+san+Sebasti%C3%A1n+140+col+Hacienda+del+sol+Garcia+NL&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-64 sm:h-72 border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>

        {/* Direct Button to Google Maps Only */}
        <div>
          <a
            id="open-google-maps-btn"
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#8B4513] to-[#6B320B] hover:from-[#7A3A0E] hover:to-[#5A2908] text-[#FFF8EE] font-bold text-sm shadow-md transition-all active:scale-[0.98] font-outfit cursor-pointer"
          >
            <Navigation className="w-4 h-4 fill-current text-[#F3C262]" />
            <span>Abrir ruta en Google Maps</span>
            <ExternalLink className="w-4 h-4 text-[#F3C262]" />
          </a>
        </div>
      </div>
    </section>
  );
};
