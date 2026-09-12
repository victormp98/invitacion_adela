import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Disc3, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CowboyHat } from './CowboyHat';

interface Track {
  id: string;
  name: string;
  tempo: number; // BPM
  style: string;
}

const TRACKS: Track[] = [
  { id: 'banjo-fiesta', name: 'Fiesta Country & Banjo', tempo: 128, style: 'Alegre / Honky Tonk' },
  { id: 'rodeo-trail', name: 'Rodeo Campirano', tempo: 116, style: 'Tradicional Vaquero' },
  { id: 'guitarra-acustica', name: 'Guitarras de Monterrey & Nashville', tempo: 136, style: 'Zapateado / Country' },
];

export const AudioPlayer: React.FC<{
  autoPrompt?: boolean;
  onFirstPlay?: () => void;
}> = ({ autoPrompt = true, onFirstPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(autoPrompt);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize Web Audio Context
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const gain = ctx.createGain();
      gain.gain.value = isMuted ? 0 : 0.35;
      gain.connect(ctx.destination);
      audioCtxRef.current = ctx;
      gainNodeRef.current = gain;
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Helper for country plucked acoustic / banjo note
  const playBanjoNote = (ctx: AudioContext, dest: AudioNode, freq: number, time: number, duration: number, brightness = 1.0) => {
    // Fundamental oscillator with triangle/sawtooth mix
    const osc = ctx.createOscillator();
    const oscHarmonic = ctx.createOscillator();
    const noteGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    oscHarmonic.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);
    oscHarmonic.frequency.setValueAtTime(freq * 2, time);

    // Banjo characteristic sharp pluck envelope & filter
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 2.2 * brightness, time);
    filter.Q.setValueAtTime(3.5, time);

    noteGain.gain.setValueAtTime(0.001, time);
    noteGain.gain.exponentialRampToValueAtTime(0.28, time + 0.008);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    oscHarmonic.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(dest);

    osc.start(time);
    oscHarmonic.start(time);
    osc.stop(time + duration);
    oscHarmonic.stop(time + duration);
  };

  // Bass guitar note (Walking country bass: 1 - 5 alternate)
  const playBassNote = (ctx: AudioContext, dest: AudioNode, freq: number, time: number, duration: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(260, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(0.38, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    osc.start(time);
    osc.stop(time + duration);
  };

  // Country acoustic drum brush / snare / tap
  const playBrushPercussion = (ctx: AudioContext, dest: AudioNode, time: number, isKick: boolean) => {
    if (isKick) {
      // Warm western kick thump
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(110, time);
      osc.frequency.exponentialRampToValueAtTime(35, time + 0.08);

      gain.gain.setValueAtTime(0.35, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

      osc.connect(gain);
      gain.connect(dest);
      osc.start(time);
      osc.stop(time + 0.12);
    } else {
      // Acoustic brush hi-hat / wash
      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.3;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(4500, time);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(dest);

      whiteNoise.start(time);
      whiteNoise.stop(time + 0.05);
    }
  };

  // Step sequencer for country music loops
  const runSequencer = () => {
    if (!isPlayingRef.current || !audioCtxRef.current || !gainNodeRef.current) return;
    const ctx = audioCtxRef.current;
    const dest = gainNodeRef.current;
    const now = ctx.currentTime;
    const track = TRACKS[currentTrackIndex];
    const beatInterval = 60 / track.tempo / 4; // 16th notes

    const step = stepRef.current;

    // Chord progression: G - C - D - G (Standard joyful western country in G Major)
    // 16 steps per bar (4 bars = 64 steps)
    const bar = Math.floor((step % 64) / 16);
    const stepInBar = step % 16;

    // Frequencies
    // G major chord: G3 (196), B3 (246.94), D4 (293.66), G4 (392), B4 (493.88), D5 (587.33)
    // C major chord: C3 (130.81), C4 (261.63), E4 (329.63), G4 (392), C5 (523.25)
    // D major chord: D3 (146.83), D4 (293.66), F#4 (369.99), A4 (440), D5 (587.33)

    let bassNote = 98; // G2
    let arpeggioNotes = [196, 246.94, 293.66, 392, 493.88, 587.33];

    if (bar === 0 || bar === 3) {
      // G major
      bassNote = (stepInBar < 8) ? 98 : 146.83; // G2 or D3
      arpeggioNotes = [196, 246.94, 293.66, 392, 493.88, 587.33];
    } else if (bar === 1) {
      // C major
      bassNote = (stepInBar < 8) ? 130.81 : 196; // C3 or G3
      arpeggioNotes = [261.63, 329.63, 392, 523.25, 659.25];
    } else if (bar === 2) {
      // D major
      bassNote = (stepInBar < 8) ? 146.83 : 110; // D3 or A2
      arpeggioNotes = [293.66, 369.99, 440, 587.33, 739.99];
    }

    // Walking country bass on beat 1 and 3 (steps 0, 8)
    if (stepInBar === 0 || stepInBar === 8) {
      playBassNote(ctx, dest, bassNote, now, beatInterval * 3.5);
    }

    // Percussion on beats
    if (stepInBar === 0 || stepInBar === 8) {
      playBrushPercussion(ctx, dest, now, true); // Kick
    } else if (stepInBar === 4 || stepInBar === 12) {
      playBrushPercussion(ctx, dest, now, false); // Snare / Brush slap
    } else if (stepInBar % 2 === 0) {
      playBrushPercussion(ctx, dest, now, false); // Shaker tick
    }

    // Banjo picking / Country arpeggios (syncopated Scruggs style banjo roll)
    // Rolls hit on steps 0, 2, 4, 6, 8, 10, 12, 14 with rhythmic accents
    const banjoPattern = [0, 2, 4, 1, 3, 0, 2, 4];
    const pickIdx = banjoPattern[(stepInBar / 2) % banjoPattern.length];
    if (stepInBar % 2 === 0 && pickIdx < arpeggioNotes.length) {
      const noteFreq = arpeggioNotes[pickIdx];
      // Occasional lively western slide / grace note
      playBanjoNote(ctx, dest, noteFreq, now, beatInterval * 2.2, (stepInBar % 4 === 0) ? 1.2 : 0.9);
    }

    stepRef.current = (step + 1) % 64;

    // Schedule next beat
    timerRef.current = window.setTimeout(runSequencer, beatInterval * 1000);
  };

  const startMusic = () => {
    initAudio();
    isPlayingRef.current = true;
    setIsPlaying(true);
    setShowPrompt(false);
    onFirstPlay?.();
    runSequencer();
  };

  const stopMusic = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  const toggleMute = () => {
    if (!gainNodeRef.current) return;
    if (isMuted) {
      gainNodeRef.current.gain.value = 0.35;
      setIsMuted(false);
    } else {
      gainNodeRef.current.gain.value = 0;
      setIsMuted(true);
    }
  };

  const nextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    stepRef.current = 0;
  };

  useEffect(() => {
    return () => {
      stopMusic();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <>
      {/* Floating Prompt Bar if music is not yet started */}
      <AnimatePresence>
        {showPrompt && !isPlaying && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-md"
          >
            <div
              id="activate-music-banner"
              onClick={startMusic}
              className="bg-gradient-to-r from-[#7a3b14] via-[#9e4e18] to-[#6d300d] border-2 border-amber-300/60 rounded-2xl p-3.5 shadow-2xl flex items-center justify-between cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform text-white group"
            >
              <div className="flex items-center gap-3">
                <CowboyHat size={36} spin spinSpeed={5} variant="gold" />
                <div>
                  <p className="font-rye text-amber-200 text-sm tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                    ¡Música Country Disponible!
                  </p>
                  <p className="text-xs text-amber-100/90 font-outfit">
                    Toca aquí para ambientar la fiesta de Adela 🎵
                  </p>
                </div>
              </div>
              <button
                id="play-first-sound-btn"
                className="bg-amber-400 hover:bg-amber-300 text-[#3b1a06] font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md group-hover:shadow-amber-400/50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Reproducir
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Compact Audio Player Widget */}
      <div className="fixed top-4 right-4 z-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#FAF6F0]/95 backdrop-blur-md border-2 border-[#C5A059] shadow-lg rounded-2xl p-2 sm:p-2.5 flex items-center gap-2 text-[#3B1F0B]"
        >
          {/* Rotating hat or vinyl icon */}
          <button
            id="audio-main-toggle-btn"
            onClick={togglePlay}
            className={`relative p-2 rounded-xl transition-all ${
              isPlaying
                ? 'bg-[#8B4513] text-[#FFF8EE] shadow-md'
                : 'bg-[#F0E4D0] hover:bg-[#E5D6BF] text-[#5C2E10]'
            }`}
            title={isPlaying ? 'Pausar música country' : 'Reproducir música country'}
          >
            {isPlaying ? (
              <div className="relative">
                <CowboyHat size={22} spin spinSpeed={4} variant="leather" />
              </div>
            ) : (
              <Play className="w-5 h-5 fill-current text-[#8B4513]" />
            )}
          </button>

          {/* Info text & visualizer bars */}
          <div className="hidden sm:flex flex-col text-left pr-1 cursor-pointer" onClick={nextTrack} title="Toca para cambiar de melodía country">
            <div className="flex items-center gap-1.5">
              <span className="font-rye text-xs text-[#4A240E] tracking-wider">
                {TRACKS[currentTrackIndex].name}
              </span>
              <Disc3 className={`w-3 h-3 text-[#8B4513] ${isPlaying ? 'animate-spin-slow' : ''}`} />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#7A451E] font-outfit">
                {TRACKS[currentTrackIndex].style}
              </span>

              {/* Animated Equalizer */}
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-1 bg-[#8B4513] rounded-full animate-pulse h-2" />
                  <span className="w-1 bg-[#C5A059] rounded-full animate-pulse h-3 [animation-delay:150ms]" />
                  <span className="w-1 bg-[#8B4513] rounded-full animate-pulse h-1.5 [animation-delay:300ms]" />
                  <span className="w-1 bg-[#C5A059] rounded-full animate-pulse h-2.5 [animation-delay:75ms]" />
                </div>
              )}
            </div>
          </div>

          {/* Mute button */}
          <button
            id="audio-mute-btn"
            onClick={toggleMute}
            className="p-1.5 rounded-lg hover:bg-[#F0E4D0] text-[#7A451E] transition-colors"
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-600" /> : <Volume2 className="w-4 h-4 text-[#8B4513]" />}
          </button>
        </motion.div>
      </div>
    </>
  );
};
