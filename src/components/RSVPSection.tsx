import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CowboyHat } from './CowboyHat';

export const RSVPSection: React.FC = () => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState(false);
  const [nameError, setNameError] = useState(false);

  const organizerPhone = '528184598919'; // 8184598919

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError(true);
      const input = document.getElementById('rsvp-name-input');
      if (input) input.focus();
      return;
    }

    setNameError(false);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#8B4513', '#D4AF37', '#FAF6F0'],
    });

    const waText = attending
      ? `¡Hola Adela! 🤠 Confirmo mi asistencia a tu cumpleaños de 51 años con temática vaquera en Hacienda San Sebastián para este 27 de septiembre a las 5:00 PM.\n\n` +
        `👤 Nombre: ${name.trim()}\n\n` +
        `¡Nos vemos para festejar y disfrutar el show!`
      : `Hola Adela, muchas gracias por la invitación a tu cumpleaños de 51 años. En esta ocasión no podré acompañarte, pero te mando un afectuoso saludo y mis mejores deseos en tu festejo.`;

    const waUrl = `https://api.whatsapp.com/send?phone=${organizerPhone}&text=${encodeURIComponent(waText)}`;

    setSubmitted(true);
    window.open(waUrl, '_blank');
  };

  return (
    <section id="confirmar" className="w-full max-w-xl mx-auto my-6 px-4">
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#D5C2AF] p-6 sm:p-8 shadow-xl text-[#3B1F0B] relative">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CowboyHat size={36} spin spinSpeed={9} variant="leather" />
          </div>
          <h3 className="font-rye text-2xl sm:text-3xl text-[#4A240E]">
            Confirmación de Asistencia
          </h3>
          <p className="text-sm text-[#7A451E] font-outfit mt-1">
            Por favor confirma antes del evento • WhatsApp: <strong>8184598919</strong>
          </p>
        </div>

        {submitted ? (
          <div className="bg-white border-2 border-emerald-500/60 rounded-2xl p-6 text-center space-y-3 shadow-md">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-rye text-xl text-[#3B1F0B]">
              ¡Confirmación Preparada!
            </h4>
            <p className="text-sm text-[#5C3317] font-outfit">
              Se ha abierto WhatsApp para enviar tu mensaje directo al número <strong>8184598919</strong>.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs text-[#8B4513] hover:text-[#5C2E10] underline font-semibold mt-2"
            >
              Modificar o enviar de nuevo
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirmSubmit} className="space-y-5">
            {/* Nombre */}
            <div>
              <label htmlFor="rsvp-name-input" className="block text-xs font-bold text-[#4A240E] mb-1.5 uppercase tracking-wider">
                Tu nombre completo *
              </label>
              <input
                id="rsvp-name-input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError && e.target.value.trim()) setNameError(false);
                }}
                placeholder="Escribe tu nombre y apellido"
                className={`w-full px-4 py-3 rounded-xl bg-white border ${
                  nameError ? 'border-red-500 ring-1 ring-red-400' : 'border-[#D5C2AF]'
                } text-[#3B1F0B] placeholder-[#A88B73] focus:outline-none focus:border-[#8B4513] text-sm shadow-sm transition-all`}
              />
              {nameError && (
                <p className="text-xs text-red-600 font-semibold flex items-center gap-1 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Por favor escribe tu nombre para enviar la confirmación.</span>
                </p>
              )}
            </div>

            {/* Asistencia Toggle */}
            <div>
              <label className="block text-xs font-bold text-[#4A240E] mb-1.5 uppercase tracking-wider">
                ¿Nos acompañas?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
                    attending
                      ? 'bg-[#8B4513] text-[#FFF8EE] shadow-md'
                      : 'bg-white border border-[#D5C2AF] text-[#6B3A19] hover:bg-[#F3EBE1]'
                  }`}
                >
                  ✓ Sí asistiré
                </button>

                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
                    !attending
                      ? 'bg-[#8B4513] text-[#FFF8EE] shadow-md'
                      : 'bg-white border border-[#D5C2AF] text-[#6B3A19] hover:bg-[#F3EBE1]'
                  }`}
                >
                  No podré asistir
                </button>
              </div>
            </div>

            {/* Botón de Confirmar — SIEMPRE HABILITADO Y VISIBLE */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-[#8B4513] via-[#7A3A0E] to-[#5C2A08] hover:from-[#7A3A0E] hover:to-[#4A2005] text-[#FFF8EE] font-bold text-base shadow-lg hover:shadow-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Send className="w-5 h-5 text-[#F3C262]" />
                <span>Confirmar Asistencia por WhatsApp</span>
              </button>
              <p className="text-center text-xs text-[#7A451E] font-medium mt-2">
                Envía tu mensaje directo al número <strong>8184598919</strong>
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
