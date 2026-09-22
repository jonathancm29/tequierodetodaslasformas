import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Mail, Sparkles, MapPin, Calendar, Compass, Play, Video } from 'lucide-react';

// Auto-importar fotos y videos del viaje a México si existen
const mexicoMediaImport = import.meta.glob(
  '../mexicoPhotos/*.{jpeg,jpg,png,webp,mp4,webm,mov,m4v,JPEG,JPG,PNG,WEBP,MP4,WEBM,MOV,M4V}', 
  { eager: true, import: 'default' }
);
const initialMexicoMedia = Object.values(mexicoMediaImport);

const isVideoFile = (url) => {
  if (typeof url !== 'string') return false;
  return /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url) || url.startsWith('data:video');
};

// Fecha del aniversario: 13 de Septiembre de 2025
const ANNIVERSARY_DATE = new Date('2025-09-13T00:00:00');

// Efecto de corazones flotantes
const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      delay: Math.random() * 4,
      duration: Math.random() * 4 + 4,
      size: Math.random() * 14 + 10,
      opacity: Math.random() * 0.4 + 0.2,
      xOffset: (Math.random() - 0.5) * 60,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-rose-400 select-none"
          style={{ 
            left: `${h.left}%`, 
            bottom: '-10%', 
            fontSize: `${h.size}px`,
            opacity: h.opacity 
          }}
          animate={{ 
            y: ['0vh', '-120vh'], 
            opacity: [0, h.opacity, 0],
            x: [0, h.xOffset, 0] 
          }}
          transition={{ 
            duration: h.duration, 
            repeat: Infinity, 
            delay: h.delay, 
            ease: "easeOut" 
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

// Fuegos artificiales para la carta
const FireworksEffect = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = ['#f43f5e', '#ec4899', '#a855f7', '#60a5fa', '#fbbf24', '#34d399'];
    const generated = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 1.5,
      size: Math.random() * 6 + 3,
      moveX: (Math.random() - 0.5) * 140,
      moveY: (Math.random() - 0.5) * 140,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ 
            left: `${p.x}%`, 
            top: `${p.y}%`, 
            width: p.size, 
            height: p.size, 
            backgroundColor: p.color,
            boxShadow: `0 0 12px ${p.color}`
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.8, 0], 
            opacity: [0, 1, 0],
            x: [0, p.moveX],
            y: [0, p.moveY]
          }}
          transition={{ 
            duration: 1.8, 
            delay: p.delay, 
            repeat: Infinity,
            repeatDelay: 0.8
          }}
        />
      ))}
    </div>
  );
};

// 1. Hero del Aniversario con Contador en Vivo
const AnniversaryHero = () => {
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, now - ANNIVERSARY_DATE);
      setElapsed({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 py-16">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950/70 via-purple-950/60 to-slate-900/80 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" />
      
      <FloatingHearts />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-200 text-sm md:text-base font-medium mb-6 shadow-[0_0_20px_rgba(244,63,94,0.3)] backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-rose-300" />
          <span>13 de Septiembre · 1 Año Juntos</span>
          <Sparkles className="w-4 h-4 text-rose-300" />
        </motion.div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-['Great_Vibes'] text-rose-100 drop-shadow-[0_0_25px_rgba(244,63,94,0.5)] mb-4 tracking-wide">
          1 Año Bailando Juntos
        </h1>

        <p className="text-lg md:text-2xl text-rose-200/90 font-light max-w-2xl mx-auto leading-relaxed mb-10 font-serif italic">
          Celebramos nuestro primer año de novios y todo el amor que sigue floreciendo cada día.
        </p>

        {/* Counter cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-2xl mb-8">
          {[
            { value: elapsed.days, label: 'Días' },
            { value: elapsed.hours, label: 'Horas' },
            { value: elapsed.minutes, label: 'Minutos' },
            { value: elapsed.seconds, label: 'Segundos' },
          ].map(({ value, label }) => (
            <motion.div 
              key={label}
              whileHover={{ scale: 1.05, y: -4 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col items-center justify-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-3xl sm:text-5xl font-extrabold text-white tabular-nums drop-shadow-md tracking-tight">
                {String(value).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-rose-200/80 mt-1">
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="text-sm md:text-base text-rose-200/70 font-light italic">
          ...y cada latido confirma que quiero bailar toda la vida contigo 🤍
        </p>
      </motion.div>
    </div>
  );
};

// 2. Galería de Fotos y Videos del Viaje a México (Polaroid & Live Memories)
const MexicoGallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaList] = useState(initialMexicoMedia);

  // Rotaciones aleatorias para efecto Polaroid
  const [rotations] = useState(() => 
    [ -4, 3, -2, 5, -3, 4, -5, 2, -3, 4, -2, 3 ]
  );

  return (
    <div className="relative min-h-screen w-full py-20 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-emerald-950/40 to-slate-900/90 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 container max-w-5xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs md:text-sm font-medium mb-3 backdrop-blur-sm">
            <Compass className="w-4 h-4 text-emerald-300" />
            <span>Junio 2026 · Nuestra Primera Aventura Fuera</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-['Great_Vibes'] text-emerald-100 drop-shadow-[0_0_20px_rgba(16,185,129,0.4)] mb-2">
            Saliendo del pedazo....Viajecito a México 🇲🇽
          </h2>
          <p className="text-emerald-200/80 text-sm sm:text-base font-light max-w-xl mx-auto">
            Recuerdos congelados en el tiempo bajo el sol mexicano, descubriendo nuevos lugares pero mirándote siempre a ti.
          </p>
        </motion.div>

        {mediaList.length > 0 ? (
          /* Grid de polaroids con fotos y videos */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full max-w-4xl px-2">
            {mediaList.map((src, idx) => {
              const rot = rotations[idx % rotations.length];
              const isVideo = isVideoFile(src);

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.06, rotate: 0, zIndex: 30 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedMedia(src)}
                  style={{ rotate: `${rot}deg` }}
                  className="cursor-pointer bg-slate-100/95 p-3 pb-8 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] border border-white/40 transition-all duration-300 flex flex-col group relative"
                >
                  <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-slate-200 shadow-inner">
                    {isVideo ? (
                      <>
                        <video 
                          src={src} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Live video indicator */}
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white font-medium flex items-center gap-1 shadow-md border border-white/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                          <span>Video</span>
                        </div>
                      </>
                    ) : (
                      <img 
                        src={src} 
                        alt={`Viaje a México recuerdo ${idx + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                  </div>
                  <div className="mt-3 flex items-center justify-between px-1 text-slate-700">
                    <span className="font-['Great_Vibes'] text-xl text-slate-800">
                      {isVideo ? "Tu Sonrisa 🤍" : "México 🤍"}
                    </span>
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Estado interactivo cuando el usuario aún colocará sus fotos/videos */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 text-center shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto mb-4 text-emerald-300">
              <Video className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Espacio Listo para Fotos y Videos de México 🇲🇽</h3>
            <p className="text-emerald-200/80 text-sm md:text-base leading-relaxed mb-6 font-light">
              Guarda tus fotos y videos favoritos (como un video de ella sonriendo) en la carpeta <code className="bg-emerald-950/60 px-2 py-1 rounded text-emerald-300 font-mono text-xs">src/mexicoPhotos/</code>. Aparecerán automáticamente como recuerdos animados con sonido y zoom.
            </p>
          </motion.div>
        )}

        {/* Dedicatoria del viaje */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 max-w-2xl w-full bg-slate-900/60 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-3xl text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <p className="text-lg md:text-xl text-emerald-100 font-serif italic leading-relaxed">
            "365 días, muchos recuerdos, mil abrazos que nacieron desde la necesidad del amor, de lo que siento por ti y una certeza que crece cada mañana: que este apenas fue el primer capítulo de algo infinito. Gracias por bailar conmigo sin parar."
          </p>
          <div className="w-16 h-0.5 bg-emerald-400/50 mx-auto mt-5 rounded-full" />
        </motion.div>
      </div>

      {/* Modal Zoom Fullscreen */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.button 
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 backdrop-blur-sm transition-colors z-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={28} />
            </motion.button>
            
            {isVideoFile(selectedMedia) ? (
              <motion.video
                src={selectedMedia}
                controls
                autoPlay
                loop
                playsInline
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.img
                src={selectedMedia}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 3. Carta Sorpresa Interactiva (Sobre que se abre con fuegos artificiales)
const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      setShowCelebration(true);
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full py-20 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-rose-950/40 to-slate-950 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      {showCelebration && <FireworksEffect />}

      <div className="relative z-10 max-w-2xl w-full mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-4xl sm:text-6xl font-['Great_Vibes'] text-rose-100 drop-shadow-[0_0_20px_rgba(244,63,94,0.4)] mb-2">
            Una Carta Para Ti
          </h2>
          <p className="text-rose-200/70 text-sm sm:text-base font-light">
            Un secreto guardado con amor para este primer aniversario
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Sobre cerrado interactivo */
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="cursor-pointer group flex flex-col items-center p-8 rounded-3xl bg-white/5 border border-rose-400/20 backdrop-blur-md shadow-2xl hover:border-rose-400/40 transition-all duration-500 max-w-sm w-full"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="relative mb-6"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-500/30 to-purple-600/30 flex items-center justify-center border border-rose-400/30 shadow-[0_0_30px_rgba(244,63,94,0.3)] group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-12 h-12 text-rose-200" strokeWidth={1.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold animate-pulse shadow-md">
                  1
                </div>
              </motion.div>

              <h3 className="text-xl font-medium text-white mb-2 group-hover:text-rose-200 transition-colors">
                Toca para abrir tu carta ✉️
              </h3>
              <p className="text-xs text-rose-200/60 font-light">
                Contiene palabras directo desde el corazón
              </p>
            </motion.div>
          ) : (
            /* Carta abierta */
            <motion.div
              key="opened-letter"
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 25 }}
              className="relative w-full bg-amber-50/95 backdrop-blur-lg rounded-3xl p-7 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-amber-200 text-left text-slate-800 overflow-hidden"
            >
              {/* Sello decorativo */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-rose-500/15 border border-rose-400/30 flex items-center justify-center text-rose-600">
                <Heart className="w-6 h-6 fill-rose-500" />
              </div>

              <div className="flex items-center gap-2 text-rose-700/80 text-xs font-semibold uppercase tracking-widest mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>13 de Septiembre · 1 Año</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-['Great_Vibes'] text-amber-950 mb-4">
                Mi amor hermoso,
              </h3>

              <div className="space-y-4 text-slate-700 font-['Inter'] font-normal text-sm sm:text-base leading-relaxed">
                <p>
                  Parece que fue ayer cuando todo comenzó, aquella caminata en Murillo con los suegros,
                   cada conversacion por ig con algo de picardia, mucha cautela al principio, pero mucho interes detras de cada mensaje,
                  y mira ya... 1 año.... de risas compartidas, quien lo creeria?
                  1 año de complicidad infinita y momentos que no cambiaría por nada.
                </p>
                <p>
                  Aquellos viajes en moto que han sido testigo de nuestro amor en silencio,
                  solos tu y yo contra caminos desconocidos, lugares que siempre viviran en nuestra mente,
                  salir por primera vez del pais juntos fue algo muy especial,
                  ese viaje confirmó lo hermoso que es descubrir lugares contigo, aprendiendo el uno del otro y disfrutando cada instante.
                </p>
                <p>
                  Gracias por darme alegría, eres mi cómplice favorita. En este aniversario y en el mes del amor y la amistad, quiero prometerte que seguiré bailando a tu ritmo, sin importar el clima ni la distancia.
                </p>
                <p>
                  Quiero pedirte perdon por ser tan frio estos ultimos dias, por no demostrarte 
                  lo que siento pot ti en ocasiones o cuando tu lo esperas, mi cabeza por mementos aun
                  es un caos, pero quiero que sepas que te amo con todo mi
                  corazon y estoy en una lucha costante por ser mejor, te amo por amarme 
                  aun conociendo mis defectos y mis errores.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-2xl sm:text-3xl font-['Great_Vibes'] text-rose-700">
                  Te amo con locura mi Reina 🤍
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowCelebration(false);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 underline self-end sm:self-auto transition-colors"
                >
                  Guardar en el sobre
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Componente Exportado Principal
const AnniversarySection = () => {
  return (
    <section className="w-full relative z-20">
      <AnniversaryHero />
      <MexicoGallery />
      <LoveLetter />
    </section>
  );
};

export default AnniversarySection;
