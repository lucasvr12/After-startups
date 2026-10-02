import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Bot, CalendarDays, Megaphone, Zap, X } from 'lucide-react';
import { PROMO, WHATSAPP_URL } from './site';

const SEEN_KEY = 'promo-flash-octubre-visto';

const includes = [
  { icon: <Bot size={16} />, text: 'Configuración de IA que responde los mensajes de tu Facebook.' },
  { icon: <Megaphone size={16} />, text: 'Creación de anuncios (la pauta publicitaria la pones tú).' },
  { icon: <CalendarDays size={16} />, text: '3 posts por semana durante 3 semanas.' },
];

const remaining = Math.max(PROMO.total - PROMO.taken, 0);
const isActive = () => remaining > 0 && Date.now() < new Date(PROMO.endsAt).getTime();

const whatsappLink = `${WHATSAPP_URL}?text=${encodeURIComponent(
  `Hola, quiero apartar mi lugar en la Promoción Flash de octubre ($${PROMO.price.toLocaleString('es-MX')} MXN).`,
)}`;

function readSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    // Sin almacenamiento disponible: el popup puede volver a aparecer, no pasa nada.
  }
}

// Fila de lugares: los ocupados se van llenando uno por uno al abrir el popup.
const Slots = () => {
  const reduce = useReducedMotion();
  return (
    <div className="flex gap-1.5" aria-hidden>
      {Array.from({ length: PROMO.total }, (_, i) => {
        const taken = i < PROMO.taken;
        return (
          <div key={i} className="relative h-3 flex-1 rounded-full bg-white/10 overflow-hidden">
            {taken && (
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-purple to-accent-orange"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ originX: 0 }}
                transition={{ delay: 0.5 + i * 0.25, duration: 0.35, ease: 'easeOut' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

function Promo() {
  const [open, setOpen] = useState(false);
  const [active] = useState(isActive);

  // Se abre solo una vez por visita, unos segundos después de cargar.
  useEffect(() => {
    if (!active || readSeen()) return;
    const t = setTimeout(() => setOpen(true), 4000);
    return () => clearTimeout(t);
  }, [active]);

  useEffect(() => {
    if (!open) return;
    markSeen();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!active) return null;

  return (
    <>
      {/* Botón flotante para volver a abrir la promo */}
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-purple to-accent-violet border border-white/20 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_0_30px_rgba(182,0,168,0.35)] hover:brightness-110 transition-all cursor-pointer"
          >
            <Zap size={14} className="text-accent-orange fill-accent-orange" />
            <span>Promo flash · quedan {remaining}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="promo-title"
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto glass-panel rounded-[32px] border border-accent-purple/30 bg-[#0D0D10]/95 p-7 sm:p-9 shadow-[0_0_60px_rgba(182,0,168,0.25)]"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-radial-glow opacity-80 pointer-events-none"></div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="absolute top-5 right-5 p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange/10 border border-accent-orange/25 text-[10px] font-bold uppercase tracking-widest text-accent-orange mb-5">
                  <Zap size={11} className="fill-accent-orange" />
                  <span>Promoción flash · {PROMO.month}</span>
                </div>

                <h2 id="promo-title" className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight leading-none mb-2">
                  Quedan <span className="text-gradient">{remaining} lugares</span>
                </h2>
                <p className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-6">
                  {PROMO.taken} de {PROMO.total} ya reservados
                </p>

                <Slots />

                <div className="mt-7 flex items-end gap-2">
                  <span className="text-5xl font-black text-white tracking-tight">${PROMO.price.toLocaleString('es-MX')}</span>
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold pb-2">MXN · {PROMO.month}</span>
                </div>

                <ul className="mt-6 flex flex-col gap-3 border-t border-white/5 pt-6">
                  {includes.map((item) => (
                    <li key={item.text} className="flex items-start gap-3 text-sm text-neutral-300 font-light leading-snug">
                      <span className="p-1.5 rounded-lg bg-accent-purple/15 text-accent-purple shrink-0">{item.icon}</span>
                      <span className="pt-1">{item.text}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 w-full inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-accent-purple to-accent-violet hover:brightness-110 border border-white/20 text-white font-bold uppercase tracking-widest text-xs py-4 shadow-[0_0_30px_rgba(182,0,168,0.3)] transition-all"
                >
                  <span>Apartar mi lugar</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-200" />
                </a>
                <p className="mt-3 text-center text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">
                  Válido hasta el 31 de octubre o hasta agotar lugares
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Promo;
