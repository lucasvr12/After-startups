import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Building2,
  ChevronDown,
  Clapperboard,
  ExternalLink,
  Factory,
  Layers,
  LayoutGrid,
  Lock,
  Megaphone,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  Mountain,
  Music,
  Palette,
  Scissors,
  Smartphone,
  Sparkles,
  Store,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react';
import { FACEBOOK_URL, PROMO, WHATSAPP_DISPLAY, WHATSAPP_URL } from './site';
import { formatMXN, isPromoActive, promoIncludes, promoWhatsappLink, remaining } from './promoData';
import Promo, { Slots } from './Promo';

// ==========================================
// HELPERS
// ==========================================

const Reveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ delay, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({ icon: Icon, children, tone = 'primary' }: { icon?: React.ElementType; children: React.ReactNode; tone?: 'primary' | 'secondary' }) => (
  <div
    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-label text-xs font-bold uppercase tracking-widest ${
      tone === 'primary'
        ? 'text-primary bg-primary-container/20 border border-primary/30 shadow-[0_0_20px_rgba(192,38,211,0.2)]'
        : 'text-secondary bg-secondary/10 border border-secondary/30'
    }`}
  >
    {Icon && <Icon size={14} />}
    {children}
  </div>
);

const promoActive = isPromoActive();

// ==========================================
// HEADER
// ==========================================

const links = [
  { name: 'Casos', href: '#casos' },
  { name: 'Creativos & Ads', href: '#creativos' },
  { name: 'Servicios', href: '#servicios' },
  ...(promoActive ? [{ name: 'Promo', href: '#promo' }] : []),
  { name: 'FAQ', href: '#faq' },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-glass backdrop-blur-xl border-b border-subtle shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="h-20 max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between gap-5">
        <a href="/#hero" className="flex items-center shrink-0 hover:opacity-90 transition-opacity" aria-label="After Startups, inicio">
          <img src="/logo/lockup-white.svg" alt="After Startups" width={113} height={38} className="h-9 md:h-10 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-1 px-1 py-1 rounded-xl bg-container-lowest/60 border border-subtle" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="px-3 py-2 rounded-lg text-[13px] text-on-surface-variant hover:text-crisp hover:bg-container-high transition-colors">
              {l.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {promoActive && (
            <a href="#promo" className="hidden md:flex flex-col items-end leading-tight">
              <span className="font-label text-[11px] font-bold uppercase tracking-wider text-crimson flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-ping"></span>
                Quedan {remaining} lugares
              </span>
              <span className="font-label text-[11px] text-on-surface-variant">Promo flash · {PROMO.month}</span>
            </a>
          )}
          <a
            href="#contacto"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary-container text-crisp font-display text-[13px] font-bold shadow-[0_0_24px_rgba(192,38,211,0.5)] hover:shadow-[0_0_36px_rgba(192,38,211,0.85)] hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
          >
            Iniciar Proyecto →
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-1.5 text-crisp" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-obsidian border-b border-subtle"
          >
            <div className="px-5 py-6 flex flex-col gap-1">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-3 py-3 rounded-lg text-on-surface-variant hover:text-crisp hover:bg-container-high font-semibold">
                  {l.name}
                </a>
              ))}
              <a href="#contacto" onClick={() => setOpen(false)} className="mt-3 py-3 rounded-lg bg-primary-container text-center text-crisp font-display font-bold">
                Iniciar Proyecto →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// ==========================================
// HERO
// ==========================================

const heroStats = [
  { label: 'Proyectos lanzados', value: '7', desc: 'Sitios, plataformas y campañas en vivo para marcas reales.', badge: 'En portafolio', tone: 'secondary' },
  { label: 'Industrias', value: '6', desc: 'Inmobiliario, acero, turismo, servicios, música y comercio.', icon: LayoutGrid, tone: 'primary' },
  { label: 'Sistema completo', value: '4 pilares', desc: 'Estrategia, marca, producto digital y growth con IA.', badge: 'Todo en casa', tone: 'primary' },
] as const;

const HeroSection = () => (
  <section id="hero" className="relative w-full overflow-hidden bg-obsidian pt-32 pb-24 md:pt-40 md:pb-28 min-h-[92vh] flex items-center justify-center">
    {/* Fondo: luz de estudio y orbes */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(192,38,211,0.18)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"></div>
    </div>
    <div className="pointer-events-none absolute -top-24 left-1/4 w-[600px] h-[500px] bg-primary-container/20 blur-[150px] rounded-full animate-orb"></div>
    <div className="pointer-events-none absolute top-1/2 -right-24 w-[500px] h-[450px] bg-purple-600/15 blur-[140px] rounded-full animate-float"></div>
    <div className="pointer-events-none absolute bottom-12 -left-28 w-[450px] h-[400px] bg-secondary-container/15 blur-[130px] rounded-full animate-float-rev"></div>

    {/* Badges flotantes */}
    <div className="hidden xl:flex items-center gap-2 absolute top-32 left-12 px-3.5 py-2 rounded-xl bg-glass border border-highlight shadow-[0_0_25px_rgba(192,38,211,0.3)] backdrop-blur-md animate-float z-20">
      <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_#4edea3] animate-pulse"></span>
      <span className="font-label text-xs text-crisp font-bold uppercase tracking-wider">Agentes IA en WhatsApp</span>
    </div>
    <div className="hidden xl:flex items-center gap-2 absolute top-44 right-14 px-3.5 py-2 rounded-xl bg-glass border border-secondary/40 shadow-[0_0_25px_rgba(78,222,163,0.25)] backdrop-blur-md animate-float-rev z-20">
      <TrendingUp size={14} className="text-secondary" />
      <span className="font-label text-xs text-crisp font-bold uppercase tracking-wider">Meta Ads · Web · Branding</span>
    </div>

    <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10 flex flex-col items-center text-center">
      <Reveal>
        <a
          href={promoActive ? '#promo' : '#casos'}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-raised/90 border border-highlight shadow-[0_0_30px_rgba(192,38,211,0.35)] mb-8 backdrop-blur-md hover:scale-105 transition-transform"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_#4edea3]"></span>
          <span className="font-label text-[11px] sm:text-xs uppercase tracking-wider text-crisp font-semibold">
            Venture Studio · Monterrey
            {promoActive && (
              <>
                {' '}· <span className="text-crimson font-bold">Quedan {remaining} lugares en {PROMO.month.toLowerCase()}</span>
              </>
            )}
          </span>
        </a>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="font-display font-extrabold text-[40px] leading-[46px] md:text-[72px] md:leading-[78px] tracking-[-0.03em] text-crisp max-w-5xl drop-shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
          CONSTRUIMOS MARCAS.
          <br />
          CREAMOS PRODUCTOS.
          <br />
          <span className="bg-gradient-to-r from-primary via-primary-container via-purple-400 to-secondary bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(192,38,211,0.4)]">
            MULTIPLICAMOS TUS VENTAS.
          </span>
        </h1>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mt-6 max-w-3xl text-base md:text-lg text-muted leading-relaxed">
          Transformamos ideas y empresas tradicionales en marcas que venden, con estrategia de negocio, diseño digital de alto nivel, automatización con Inteligencia Artificial y campañas de adquisición.
        </p>
      </Reveal>

      <Reveal delay={0.3} className="w-full sm:w-auto">
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#contacto"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary-container text-crisp font-display text-base md:text-lg font-bold shadow-[0_0_36px_rgba(192,38,211,0.6)] hover:shadow-[0_0_54px_rgba(192,38,211,0.95)] hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            Agendar diagnóstico (30 min)
            <ArrowRight size={20} />
          </a>
          <a
            href="#casos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg bg-container-high/80 backdrop-blur-md text-crisp font-display font-semibold hover:bg-container-highest hover:border-highlight transition-all border border-subtle shadow-lg"
          >
            <TrendingUp size={18} className="text-secondary" />
            Ver casos reales
          </a>
        </div>
      </Reveal>

      <div className="mt-5 flex items-center gap-2 text-muted text-[13px]">
        <BadgeCheck size={16} className="text-secondary" />
        Sin costo ni compromiso · Te respondemos por WhatsApp en menos de 24 h
      </div>

      <Reveal delay={0.4} className="w-full max-w-4xl">
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 p-3.5 rounded-2xl bg-glass border border-highlight/60 shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {heroStats.map((s) => (
            <div key={s.label} className="p-5 rounded-xl bg-container-lowest/90 border border-subtle text-left flex flex-col justify-between hover:border-secondary/40 transition-all">
              <div className="flex items-center justify-between gap-2">
                <span className="font-label text-[11px] font-bold uppercase tracking-wider text-muted">{s.label}</span>
                {'badge' in s ? (
                  <span className={`px-2 py-0.5 rounded-full font-label text-[11px] font-bold ${s.tone === 'secondary' ? 'bg-secondary/15 text-secondary' : 'bg-primary-container/20 text-primary'}`}>
                    {s.badge}
                  </span>
                ) : (
                  <s.icon size={18} className="text-primary" />
                )}
              </div>
              <div className="mt-3">
                <div className="font-display text-[32px] leading-[38px] font-extrabold text-crisp">{s.value}</div>
                <p className="text-[13px] text-muted mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

// ==========================================
// MARQUEE
// ==========================================

const marqueeItems = [
  { text: 'Sur Steel', tone: 'crisp' },
  { text: 'Agentes IA en WhatsApp', tone: 'secondary', dot: true },
  { text: 'Cascada Life', tone: 'crisp' },
  { text: 'Meta Ads', tone: 'primary', icon: Zap },
  { text: 'EcoSuites', tone: 'crisp' },
  { text: 'Landing pages que convierten', tone: 'primary', icon: BadgeCheck },
  { text: 'Men & Boys', tone: 'crisp' },
  { text: 'Branding & identidad', tone: 'secondary', dot: true },
  { text: 'Print Cards', tone: 'crisp' },
  { text: 'Venture Creative Studio', tone: 'primary' },
];

const MarqueeRow = ({ hidden }: { hidden?: boolean }) => (
  <div className="flex items-center gap-8 shrink-0 pr-8" aria-hidden={hidden}>
    {marqueeItems.map((m) => (
      <React.Fragment key={m.text}>
        <span
          className={`font-label text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
            m.tone === 'primary' ? 'text-primary' : m.tone === 'secondary' ? 'text-secondary' : 'text-crisp'
          }`}
        >
          {'dot' in m && <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#4edea3]"></span>}
          {'icon' in m && m.icon && <m.icon size={14} />}
          {m.text}
        </span>
        <span className="text-outline-variant">✦</span>
      </React.Fragment>
    ))}
  </div>
);

const Marquee = () => (
  <div className="w-full bg-container-lowest border-y border-highlight/40 py-4 overflow-hidden relative shadow-[0_0_30px_rgba(192,38,211,0.15)]">
    <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-container-lowest to-transparent z-10"></div>
    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-container-lowest to-transparent z-10"></div>
    <div className="marquee-track animate-marquee flex w-max whitespace-nowrap">
      <MarqueeRow />
      <MarqueeRow hidden />
    </div>
  </div>
);

// ==========================================
// PROMO (SPRINT)
// ==========================================

const PromoSection = () => {
  if (!promoActive) return null;
  return (
    <section id="promo" className="w-full bg-container-lowest py-20 relative scroll-mt-20">
      <div className="pointer-events-none absolute top-10 right-10 w-96 h-96 bg-primary-container/20 blur-[130px] rounded-full"></div>
      <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-raised via-container-low to-obsidian border border-highlight p-7 md:p-14 shadow-[0_20px_50px_rgba(192,38,211,0.25)]">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary-container/30 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-crimson/15 text-crimson border border-crimson/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-crimson animate-ping"></span>
                  <span className="font-label text-xs font-bold uppercase tracking-wider">
                    Promoción flash · Quedan {remaining} de {PROMO.total} lugares
                  </span>
                </div>
                <h2 className="font-display text-[32px] leading-[38px] md:text-[48px] md:leading-[54px] tracking-[-0.03em] text-crisp font-extrabold">
                  Pon tu marketing en piloto automático este {PROMO.month.toLowerCase()}.
                </h2>
                <p className="text-base md:text-lg text-muted leading-relaxed">
                  Un paquete de arranque para que tu negocio responda mensajes al instante, tenga anuncios listos para pautar y publique contenido constante, sin que tengas que hacerlo tú.
                </p>
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {promoIncludes.map((item) => (
                    <div key={item.text} className="p-3.5 rounded-xl bg-container-high/40 border border-subtle hover:border-secondary/40 transition-all flex items-start gap-3">
                      <item.icon size={20} className="text-secondary shrink-0 mt-0.5" />
                      <span className="text-[15px] text-on-surface">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="p-7 md:p-8 rounded-xl bg-obsidian/95 border border-highlight/70 shadow-2xl backdrop-blur-xl hover:shadow-[0_0_40px_rgba(192,38,211,0.3)] transition-all">
                  <div className="flex items-center justify-between gap-3 pb-4 border-b border-subtle">
                    <span className="font-label text-xs text-muted uppercase font-semibold">Inversión · {PROMO.month}</span>
                    <span className="px-2.5 py-1 rounded bg-secondary/15 text-secondary font-label text-xs font-bold shadow-[0_0_12px_rgba(78,222,163,0.3)]">
                      Ahorras {formatMXN(PROMO.originalPrice - PROMO.price)}
                    </span>
                  </div>
                  <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-5xl text-crisp font-black tracking-tight">
                      <span className="sr-only">Precio de promoción: </span>
                      {formatMXN(PROMO.price)}
                    </span>
                    <span className="font-display text-lg text-muted line-through decoration-crimson decoration-2 font-semibold">
                      <span className="sr-only">Precio normal: </span>
                      {formatMXN(PROMO.originalPrice)} MXN
                    </span>
                  </div>
                  <p className="text-[13px] text-muted mt-1">Precio en pesos mexicanos. Válido en {PROMO.month.toLowerCase()} o hasta agotar lugares.</p>

                  <div className="mt-6 p-4 rounded-lg bg-raised border border-subtle">
                    <div className="flex justify-between font-label text-xs mb-3">
                      <span className="text-crisp">Lugares reservados:</span>
                      <span className="text-crimson font-bold">
                        {PROMO.taken} / {PROMO.total}
                      </span>
                    </div>
                    <Slots />
                  </div>

                  <a
                    href={promoWhatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 w-full py-4 rounded-lg bg-primary-container text-crisp font-display text-lg font-bold flex items-center justify-center gap-2 shadow-[0_0_28px_rgba(192,38,211,0.6)] hover:shadow-[0_0_42px_rgba(192,38,211,0.9)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Apartar mi lugar ahora
                    <Zap size={18} />
                  </a>
                  <p className="mt-3 text-center font-label text-[11px] text-muted uppercase tracking-wider">Te confirmamos disponibilidad por WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ==========================================
// CREATIVOS & ADS
// ==========================================

const adServices = [
  { icon: Clapperboard, tag: 'Creativos', title: 'Anuncios que detienen el scroll', desc: 'Diseño de piezas para feed, historias y reels con ganchos pensados para que tu cliente ideal se detenga y actúe.' },
  { icon: TrendingUp, tag: 'Pauta', title: 'Campañas en Meta Ads', desc: 'Estructura de campañas, segmentación y pruebas de anuncios para que cada peso de pauta trabaje mejor.' },
  { icon: Bot, tag: 'Automatización', title: 'Del anuncio a WhatsApp', desc: 'Campañas conectadas con un asistente de IA que responde, resuelve dudas y agenda citas en segundos.' },
];

const CreativosSection = () => (
  <section id="creativos" className="w-full bg-obsidian py-24 relative overflow-hidden scroll-mt-20">
    <div className="pointer-events-none absolute top-1/3 -left-32 w-[550px] h-[550px] bg-primary-container/15 blur-[160px] rounded-full"></div>
    <div className="pointer-events-none absolute bottom-10 right-0 w-[500px] h-[500px] bg-secondary-container/10 blur-[150px] rounded-full"></div>

    <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
      <Reveal>
        <div className="max-w-2xl mb-14">
          <Eyebrow icon={Clapperboard}>Creativos & Ads que venden</Eyebrow>
          <h2 className="mt-4 font-display text-[32px] leading-[38px] md:text-[48px] md:leading-[54px] tracking-[-0.03em] text-crisp font-extrabold">
            Campañas comerciales y pauta de alto rendimiento.
          </h2>
          <p className="text-base md:text-lg text-muted mt-3">
            Combinamos dirección de arte, diseño de producto y psicología de respuesta directa para convertir atención en mensajes, cotizaciones y ventas.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="relative group rounded-2xl overflow-hidden border border-highlight/70 shadow-[0_20px_60px_rgba(192,38,211,0.3)] bg-raised">
          <img src="/stitch/ads-montage.jpg" alt="Referencias de estilo de anuncios para redes sociales" className="w-full h-64 sm:h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent pointer-events-none"></div>
          <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-obsidian/90 text-crisp font-label text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border border-subtle">
            Referencias de estilo · imágenes ilustrativas
          </span>
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-5 rounded-xl bg-glass border border-subtle backdrop-blur-md">
            <h3 className="font-display text-lg text-crisp font-bold">Campañas multicanal de conversión directa</h3>
            <p className="text-[13px] text-muted">Variaciones para Meta Ads, Instagram Stories y Reels, con ganchos y llamados a la acción pensados para tu cliente.</p>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Reveal>
          <div className="h-full rounded-2xl bg-raised border border-highlight/60 p-6 flex flex-col gap-4 shadow-xl group">
            <div className="flex items-center justify-between gap-3">
              <span className="font-label text-xs text-crisp font-bold uppercase tracking-wider flex items-center gap-2">
                <Smartphone size={18} className="text-primary" /> Formato vertical 9:16
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-primary-container/20 text-primary font-label text-[11px] font-bold">Ilustrativo</span>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-subtle group-hover:border-primary/40 transition-colors">
              <img src="/stitch/ads-vertical.jpg" alt="Ejemplo ilustrativo de anuncios verticales para Reels y TikTok" className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="font-display text-lg text-crisp font-bold">Anuncios nativos para Reels, Historias y TikTok</h3>
            <p className="text-[13px] text-muted leading-relaxed">Piezas diseñadas para verse como contenido, no como publicidad: producto en uso, beneficios claros y un llamado a escribir por WhatsApp.</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full rounded-2xl bg-raised border border-highlight/60 p-6 flex flex-col gap-4 shadow-xl group">
            <div className="flex items-center justify-between gap-3">
              <span className="font-label text-xs text-crisp font-bold uppercase tracking-wider flex items-center gap-2">
                <Megaphone size={18} className="text-secondary" /> Caso real · Print Cards
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-label text-[11px] font-bold">Cliente activo</span>
            </div>
            <div className="grid grid-cols-2 gap-3 h-80 sm:h-96">
              {['/print_cards_ig1.png', '/print_cards_ig2.png'].map((src, i) => (
                <div key={src} className="rounded-xl overflow-hidden border border-subtle group-hover:border-secondary/40 transition-colors bg-container-lowest">
                  <img src={src} alt={i === 0 ? 'Perfil de Instagram de Print Cards' : 'Feed de Instagram de Print Cards'} className="w-full h-full object-cover object-top" />
                </div>
              ))}
            </div>
            <h3 className="font-display text-lg text-crisp font-bold">Contenido y pauta para generar clientes</h3>
            <p className="text-[13px] text-muted leading-relaxed">Gestión de campañas en Meta y contenido para Instagram enfocados en conseguir clientes potenciales para una marca local.</p>
          </div>
        </Reveal>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {adServices.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <div className="h-full p-6 rounded-2xl bg-raised border border-subtle hover:border-highlight transition-all shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
                  <s.icon size={20} />
                </span>
                <span className="font-label text-xs text-secondary font-bold uppercase">{s.tag}</span>
              </div>
              <h3 className="font-display text-lg text-crisp font-bold">{s.title}</h3>
              <p className="text-[13px] text-muted mt-2 leading-relaxed">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ==========================================
// CASOS
// ==========================================

type Project = {
  name: string;
  category: string;
  kicker: string;
  desc: string;
  tags: string[];
  link?: string;
  image?: string;
  imagePosition?: string;
  gallery?: string[];
  phones?: string[];
};

const projects: Project[] = [
  {
    name: 'Sur Steel',
    category: 'Sitio web · Industria del acero',
    kicker: 'B2B · Venta de acero',
    desc: 'Diseño y desarrollo de un sitio web cinematográfico que avanza con el scroll, con catálogo de materiales y cotización directa para la venta de lámina y acero en Santiago, N.L.',
    tags: ['Diseño web', 'Desarrollo', 'Catálogo', 'Cotización por WhatsApp'],
    image: '/sursteel_web.png',
    imagePosition: 'left center',
    link: 'https://www.sursteel.com.mx/',
  },
  {
    name: 'Cascada Life',
    category: 'Plataforma web · Música y eventos',
    kicker: 'Eventos · Comunidad',
    desc: 'Rediseño del sitio de una comunidad de música electrónica en Monterrey: cartelera de eventos, archivo multimedia, panel de socios y experiencia de boletos.',
    tags: ['Rediseño', 'Cartelera', 'Panel de socios', 'Boletos'],
    image: '/cascada_web.png',
    imagePosition: 'left center',
    link: 'https://www.cascada.life/',
  },
  {
    name: 'EcoSuites',
    category: 'Venture studio · Inmobiliario',
    kicker: 'Hospitalidad · Real estate',
    desc: 'Estrategia de negocio, branding, marketing digital, estudios de factibilidad y generación de demanda para un desarrollo de hospedaje.',
    tags: ['Estrategia', 'Branding', 'Marketing digital', 'Factibilidad'],
    image: '/ecosuites_web.png',
    link: 'https://www.eco-suites.com/',
  },
  {
    name: 'Men & Boys',
    category: 'SaaS · Reservaciones',
    kicker: 'Servicios · Automatización',
    desc: 'Diseño UX/UI, estrategia de producto y desarrollo de un sistema de reservaciones y gestión interna para una barbería.',
    tags: ['UX/UI', 'Producto', 'Reservaciones', 'Gestión interna'],
    image: '/barber_web.png',
    link: 'https://men-and-boys-reservations.vercel.app/',
  },
  {
    name: 'Print Cards',
    category: 'Paid media · Generación de leads',
    kicker: 'Comercio · Marca local',
    desc: 'Gestión integral y optimización de campañas publicitarias de paid media para la generación de clientes potenciales.',
    tags: ['Meta Ads', 'Contenido', 'Leads'],
    gallery: ['/print_cards_ig1.png', '/print_cards_ig2.png'],
  },
  {
    name: 'DJ Lu Valenzuela',
    category: 'Producto digital · Press kit',
    kicker: 'Música · Marca personal',
    desc: 'Diseño, desarrollo de producto y UX/UI de un press kit digital interactivo enfocado en posicionamiento y booking en la industria musical.',
    tags: ['UX/UI', 'Desarrollo', 'Marca personal'],
    phones: ['/dj_lu_screen1.png', '/dj_lu_screen2.png', '/dj_lu_screen3.png', '/dj_lu_screen4.png'],
  },
  {
    name: 'Ecoprojects',
    category: 'Branding · Turismo',
    kicker: 'Turismo de aventura',
    desc: 'Posicionamiento de marca, branding y campañas de marketing para turismo de aventura.',
    tags: ['Branding', 'Posicionamiento', 'Campañas'],
    image: '/ecoprojects_original.jpg',
  },
];

const ProjectVisual = ({ p }: { p: Project }) => {
  if (p.phones) {
    return (
      <div className="flex items-center justify-center gap-2 sm:gap-3.5 h-full py-4 px-4 bg-container-lowest">
        {p.phones.map((src, i) => (
          <motion.div
            key={src}
            className="w-[22%] aspect-[9/16] rounded-xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-white/10 shrink-0 bg-container-low"
            initial={{ rotate: [-4, -1, 2, 5][i], y: i % 2 === 0 ? 6 : -6 }}
            whileHover={{ scale: 1.2, zIndex: 10, rotate: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 18 }}
          >
            <img src={src} alt={`Pantalla ${i + 1} del press kit de ${p.name}`} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>
    );
  }
  if (p.gallery) {
    return (
      <div className="grid grid-cols-2 gap-3 p-4 h-full bg-container-lowest">
        {p.gallery.map((src, i) => (
          <img key={src} src={src} alt={`${p.name}, imagen ${i + 1}`} className="w-full h-full object-cover object-top rounded-lg border border-subtle" />
        ))}
      </div>
    );
  }
  return (
    <img
      src={p.image}
      alt={`Sitio de ${p.name}`}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined}
    />
  );
};

const CasosSection = () => (
  <section id="casos" className="w-full bg-obsidian py-24 relative scroll-mt-20">
    <div className="pointer-events-none absolute top-1/2 left-0 w-96 h-96 bg-primary-container/10 blur-[140px] rounded-full"></div>
    <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-primary font-label text-xs uppercase tracking-widest mb-2 font-bold">
              <BadgeCheck size={14} /> Casos de trabajo reales
            </div>
            <h2 className="font-display text-[32px] leading-[38px] md:text-[48px] md:leading-[54px] tracking-[-0.03em] text-crisp font-extrabold">
              No vendemos humo. Mostramos el trabajo.
            </h2>
            <p className="text-base md:text-lg text-muted max-w-xl mt-2">Marcas reales, sitios en vivo y campañas activas. Entra y compruébalo tú mismo.</p>
          </div>
          <div className="font-label text-xs text-muted uppercase tracking-wider md:text-right">
            Modelos de negocio &
            <br />
            interfaces de alto rendimiento
          </div>
        </div>
      </Reveal>

      <div className="space-y-10">
        {projects.map((p, idx) => (
          <Reveal key={p.name}>
            <article className="p-5 md:p-8 rounded-2xl bg-raised border border-subtle hover:border-highlight transition-all duration-300 shadow-xl group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 overflow-hidden rounded-xl bg-container-high relative h-72 sm:h-96">
                  <ProjectVisual p={p} />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-obsidian/80 text-crisp font-label text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md border border-subtle">
                      {p.category}
                    </span>
                    {p.link && (
                      <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary font-label text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border border-secondary/30 shadow-[0_0_10px_rgba(78,222,163,0.3)]">
                        En vivo
                      </span>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <span className="font-label text-xs text-primary uppercase font-bold tracking-wider">
                    Proyecto {String(idx + 1).padStart(2, '0')} · {p.kicker}
                  </span>
                  <h3 className="font-display text-[32px] leading-[38px] text-crisp font-extrabold uppercase">{p.name}</h3>
                  <p className="text-[15px] text-muted leading-relaxed">{p.desc}</p>
                  <div className="p-4 rounded-lg bg-container-lowest border border-subtle group-hover:border-secondary/40 transition-colors">
                    <div className="font-label text-xs text-secondary font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Layers size={14} /> Qué hicimos
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-md bg-container-high text-on-surface text-xs font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-1">
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-display font-bold hover:text-crisp transition-colors group/link">
                        Ver proyecto en vivo
                        <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    ) : (
                      <a href="#contacto" className="inline-flex items-center gap-2 text-primary font-display font-bold hover:text-crisp transition-colors group/link">
                        Quiero algo así
                        <ArrowRight size={16} className="group-hover/link:translate-x-1.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ==========================================
// SERVICIOS (4 PILARES)
// ==========================================

const pilares = [
  {
    icon: TrendingUp,
    title: 'Venture Building & Strategy',
    subtitle: 'Antes de diseñar cualquier cosa, entendemos el negocio.',
    desc: 'Estructuramos las bases comerciales, financieras y analíticas para asegurar la viabilidad de cada proyecto antes de ejecutar una sola línea de código o diseño.',
    bullets: ['Modelos de negocio', 'Validación de ideas', 'Posicionamiento', 'Pricing y lanzamiento'],
  },
  {
    icon: Palette,
    title: 'Brand Architecture & Design',
    subtitle: 'Marcas con propósito y visión de largo plazo.',
    desc: 'Diseñamos ecosistemas visuales y narrativos completos que dan autoridad inmediata en mercados competitivos.',
    bullets: ['Estrategia y ADN de marca', 'Naming y Brand Books', 'Identidad visual', 'Pitch decks'],
  },
  {
    icon: MonitorSmartphone,
    title: 'Digital Products & UX/UI',
    subtitle: 'Experiencias digitales enfocadas en la conversión.',
    desc: 'Diseñamos e implementamos interfaces modernas que no solo lucen espectaculares, sino que guían al usuario hacia el objetivo comercial.',
    bullets: ['Sitios y landing pages', 'Apps y dashboards', 'UX/UI en Figma', 'SEO técnico y velocidad'],
  },
  {
    icon: Bot,
    title: 'Growth, AI & Automation',
    subtitle: 'Sistemas inteligentes para vender más con menos fricción.',
    desc: 'Implementamos tecnología e inteligencia artificial para automatizar la atención comercial y escalar la captación de clientes.',
    bullets: ['Agentes IA en WhatsApp', 'Meta Ads y Google Ads', 'CRM, Sheets y Calendar', 'Embudos y copywriting'],
  },
];

const ServiciosSection = () => (
  <section id="servicios" className="w-full bg-container-lowest py-24 relative overflow-hidden scroll-mt-20">
    <div className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary-container/10 blur-[150px] rounded-full"></div>
    <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7">
            <Eyebrow icon={Layers}>Pilares operativos</Eyebrow>
            <h2 className="mt-4 font-display text-[32px] leading-[38px] md:text-[48px] md:leading-[54px] tracking-[-0.03em] text-crisp font-extrabold">
              Sistemas integrales de negocio.
              <br />
              <span className="text-primary">¿Qué hacemos exactamente?</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-[15px] text-muted leading-relaxed">
            Las grandes empresas no nacen de una campaña aislada. Nacen de una estrategia clara, una marca sólida, un producto intuitivo y un motor tecnológico que escale con IA.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pilares.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="h-full p-7 md:p-8 rounded-2xl bg-raised border border-subtle hover:border-highlight transition-all duration-300 flex flex-col justify-between group shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-12 h-12 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-container/30 transition-all shadow-[0_0_15px_rgba(192,38,211,0.2)]">
                    <p.icon size={24} />
                  </span>
                  <span className="font-display text-[32px] font-black text-outline-variant group-hover:text-primary transition-colors">0{i + 1}</span>
                </div>
                <h3 className="font-display text-[22px] leading-7 text-crisp font-bold uppercase">{p.title}</h3>
                <p className="font-label text-xs text-primary uppercase tracking-wider mt-1 mb-4">{p.subtitle}</p>
                <p className="text-[15px] text-muted leading-relaxed">{p.desc}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-8 pt-6 border-t border-subtle text-crisp font-label text-xs">
                {p.bullets.map((b) => (
                  <div key={b} className="flex items-center gap-1.5">
                    <span className="text-secondary font-bold">✓</span> {b}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ==========================================
// INDUSTRIAS
// ==========================================

const industrias = [
  { icon: Building2, name: 'Inmobiliario & desarrollos', desc: 'Branding de desarrollos, presentaciones premium y captación de inversionistas.', caso: 'EcoSuites' },
  { icon: Factory, name: 'Industria, acero & B2B', desc: 'Sitios que convierten visitas en cotizaciones para venta B2B y mayoreo.', caso: 'Sur Steel' },
  { icon: Mountain, name: 'Turismo & experiencias', desc: 'Posicionamiento y campañas para atraer viajeros y reservas.', caso: 'Ecoprojects' },
  { icon: Scissors, name: 'Servicios & belleza', desc: 'Sistemas de reservaciones, CRM y agenda automatizada.', caso: 'Men & Boys' },
  { icon: Music, name: 'Música, eventos & ocio', desc: 'Plataformas de eventos y boletos, press kits y marca para la escena musical.', caso: 'Cascada Life · DJ Lu' },
  { icon: Store, name: 'Comercio & marcas locales', desc: 'Paid media y contenido para generar clientes potenciales.', caso: 'Print Cards' },
];

const IndustriasSection = () => (
  <section id="industrias" className="w-full bg-obsidian py-24 relative scroll-mt-20">
    <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
      <Reveal>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-label text-xs uppercase tracking-wider text-secondary font-bold">Versatilidad de ejecución</span>
          <h2 className="mt-2 font-display text-[32px] leading-[38px] md:text-[48px] md:leading-[54px] tracking-[-0.03em] text-crisp font-extrabold">
            Un mismo sistema,
            <br />
            <span className="text-primary">cualquier industria.</span>
          </h2>
          <p className="text-base md:text-lg text-muted mt-3">Estrategia, marca, tecnología e IA adaptadas a cómo compra el cliente de tu giro.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industrias.map((ind, i) => (
          <Reveal key={ind.name} delay={i * 0.06}>
            <div className="h-full p-6 rounded-xl bg-raised border border-subtle hover:border-highlight transition-all hover:scale-[1.02] shadow-xl">
              <div className="w-10 h-10 rounded-lg bg-container-high flex items-center justify-center text-primary mb-4 shadow-[0_0_12px_rgba(192,38,211,0.2)]">
                <ind.icon size={20} />
              </div>
              <h3 className="font-display text-lg text-crisp font-bold">{ind.name}</h3>
              <p className="text-[13px] text-muted mt-2 leading-relaxed">{ind.desc}</p>
              <span className="inline-block mt-4 font-label text-xs text-primary font-bold uppercase tracking-wider">Caso: {ind.caso}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ==========================================
// METODOLOGÍA
// ==========================================

const fases = [
  { title: 'Discovery & Benchmark', desc: 'Analizamos antes de ejecutar: investigamos tu mercado, tu competencia y validamos la viabilidad del negocio.' },
  { title: 'Architecture & Design', desc: 'Definimos el ADN visual, la narrativa y diseñamos prototipos digitales de alta gama (UX/UI) para tu aprobación.' },
  { title: 'Deployment & AI', desc: 'Desarrollamos la plataforma, conectamos tus sistemas e integramos automatizaciones y agentes de IA.' },
  { title: 'Growth & Scale', desc: 'Activamos campañas de paid media, medimos resultados y optimizamos de forma continua.' },
];

const MetodologiaSection = () => (
  <section id="metodologia" className="w-full bg-container-lowest py-24 relative overflow-hidden scroll-mt-20">
    <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
      <Reveal>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Eyebrow>Metodología</Eyebrow>
          <h2 className="mt-4 font-display text-[32px] leading-[38px] md:text-[48px] md:leading-[54px] tracking-[-0.03em] text-crisp font-extrabold">
            El camino de la idea al escalamiento.
          </h2>
          <p className="text-base md:text-lg text-muted mt-3">Un proceso de 4 fases para pasar de la incertidumbre a un sistema comercial que funciona.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {fases.map((f, i) => {
          const last = i === fases.length - 1;
          return (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className={`h-full p-6 rounded-xl bg-raised border border-subtle ${last ? 'hover:border-secondary' : 'hover:border-highlight'} transition-all flex flex-col justify-between shadow-xl`}>
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl font-label text-lg font-black flex items-center justify-center mb-6 ${
                      last ? 'bg-secondary text-on-secondary shadow-[0_0_20px_rgba(78,222,163,0.4)]' : 'bg-primary-container text-crisp shadow-[0_0_20px_rgba(192,38,211,0.4)]'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-display text-lg text-crisp font-bold">{f.title}</h3>
                  <p className="text-[13px] text-muted mt-3 leading-relaxed">{f.desc}</p>
                </div>
                <div className={`mt-6 pt-4 border-t border-subtle font-label text-[11px] font-bold uppercase tracking-wider ${last ? 'text-secondary' : 'text-primary'}`}>
                  Fase 0{i + 1}
                  {last && ' · Continua'}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

// ==========================================
// FAQ
// ==========================================

const faqs = [
  {
    q: '¿Cuánto tiempo toma tener todo funcionando?',
    a: 'Depende del alcance. Un paquete como la promoción del mes arranca en días; un sitio o plataforma completa toma algunas semanas. En el diagnóstico te damos tiempos concretos para tu caso.',
  },
  {
    q: '¿Tienen experiencia en mi tipo de negocio?',
    a: 'Hemos trabajado con marcas de acero, inmobiliario, turismo, barberías, música y comercio local. Los principios de estrategia, tecnología y tráfico se adaptan a cada giro.',
  },
  {
    q: '¿La pauta publicitaria está incluida?',
    a: 'No. Nosotros creamos y gestionamos los anuncios; el presupuesto de pauta lo pagas tú directamente a Meta o Google, así siempre sabes exactamente cuánto se invierte.',
  },
  {
    q: '¿Cómo empiezo?',
    a: `Llena el formulario o escríbenos al WhatsApp ${WHATSAPP_DISPLAY}. Agendamos un diagnóstico de 30 minutos sin costo para revisar tu negocio y proponerte un plan.`,
  },
];

const FaqSection = () => (
  <section id="faq" className="w-full bg-obsidian py-24 relative scroll-mt-20">
    <div className="max-w-4xl mx-auto px-5 md:px-6 relative z-10">
      <Reveal>
        <div className="text-center mb-10">
          <span className="font-label text-xs text-primary uppercase font-bold tracking-wider">Dudas frecuentes</span>
          <h2 className="font-display text-[32px] leading-[38px] text-crisp font-bold mt-1">Preguntas antes de agendar tu diagnóstico</h2>
        </div>
      </Reveal>
      <div className="space-y-4">
        {faqs.map((f) => (
          <details key={f.q} className="group p-6 rounded-xl bg-raised border border-subtle hover:border-highlight transition-all [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-display text-lg text-crisp font-bold">
              {f.q}
              <ChevronDown size={20} className="text-muted shrink-0 group-open:rotate-180 transition-transform" />
            </summary>
            <p className="text-[15px] text-muted mt-4 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

// ==========================================
// CONTACTO
// ==========================================

const objetivos = ['Nueva marca & web', 'Automatización con IA', 'Más ventas con anuncios'];

const inputClass =
  'w-full px-4 py-3.5 rounded-lg bg-container-lowest border border-subtle text-crisp text-[15px] placeholder:text-muted/70 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all';

const ContactSection = () => {
  const [form, setForm] = useState({ objetivo: objetivos[0], nombre: '', whatsapp: '', empresa: '' });
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!sent) return;
    const t = setTimeout(() => setSent(false), 8000);
    return () => clearTimeout(t);
  }, [sent]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [k]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim()) return setError('Escribe tu nombre.');
    if (form.whatsapp.replace(/\D/g, '').length < 10) return setError('Escribe un WhatsApp de 10 dígitos.');

    const text = [
      'Hola After Startups, quiero agendar mi diagnóstico.',
      '',
      `*Nombre:* ${form.nombre.trim()}`,
      `*WhatsApp:* ${form.whatsapp.trim()}`,
      `*Empresa:* ${form.empresa.trim() || 'Sin especificar'}`,
      `*Objetivo:* ${form.objetivo}`,
    ].join('\n');
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
    setForm({ objetivo: objetivos[0], nombre: '', whatsapp: '', empresa: '' });
  };

  return (
    <section id="contacto" className="w-full bg-container-lowest py-24 relative overflow-hidden scroll-mt-20">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-primary-container/25 blur-[160px] rounded-full"></div>
      <div className="max-w-4xl mx-auto px-5 md:px-6 relative z-10">
        <Reveal>
          <div className="p-7 md:p-14 rounded-2xl bg-raised/95 border border-highlight shadow-[0_20px_60px_rgba(192,38,211,0.3)] text-center backdrop-blur-xl">
            <Eyebrow icon={Sparkles} tone="secondary">
              Diagnóstico sin costo · 30 min
            </Eyebrow>
            <h2 className="mt-6 font-display text-[32px] leading-[38px] md:text-[48px] md:leading-[54px] tracking-[-0.03em] text-crisp font-extrabold max-w-2xl mx-auto">
              ¿Listo para que tu negocio venda a su verdadero potencial?
            </h2>
            <p className="text-base md:text-lg text-muted max-w-xl mx-auto mt-4 leading-relaxed">
              Agenda una sesión de 30 minutos. Revisamos cómo consigues clientes hoy y te damos un plan de acción concreto.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-10 text-left space-y-6">
              <fieldset>
                <legend className="block font-label text-xs text-crisp uppercase tracking-wider mb-3 font-semibold">1. ¿Cuál es tu objetivo principal?</legend>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {objetivos.map((o) => (
                    <label
                      key={o}
                      className={`p-3.5 rounded-lg border cursor-pointer flex items-center gap-2 transition-colors ${
                        form.objetivo === o ? 'bg-primary-container/15 border-primary-container' : 'bg-container-high/60 border-subtle hover:border-primary'
                      }`}
                    >
                      <input type="radio" name="objetivo" value={o} checked={form.objetivo === o} onChange={set('objetivo')} className="accent-[#c026d3]" />
                      <span className="text-[13px] text-crisp">{o}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="block font-label text-xs text-muted mb-2 uppercase tracking-wider">Nombre completo</span>
                  <input type="text" autoComplete="name" value={form.nombre} onChange={set('nombre')} placeholder="Ej. Roberto Garza" className={inputClass} />
                </label>
                <label className="block">
                  <span className="block font-label text-xs text-muted mb-2 uppercase tracking-wider">WhatsApp</span>
                  <input type="tel" inputMode="numeric" autoComplete="tel-national" value={form.whatsapp} onChange={set('whatsapp')} placeholder="81 1234 5678" className={inputClass} />
                </label>
              </div>
              <label className="block">
                <span className="block font-label text-xs text-muted mb-2 uppercase tracking-wider">Empresa o proyecto (opcional)</span>
                <input type="text" autoComplete="organization" value={form.empresa} onChange={set('empresa')} placeholder="Ej. Grupo Industrial MTY" className={inputClass} />
              </label>

              {error && (
                <p role="alert" className="text-crimson text-sm font-medium">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-4 rounded-lg bg-primary-container text-crisp font-display text-lg font-bold shadow-[0_0_36px_rgba(192,38,211,0.65)] hover:shadow-[0_0_52px_rgba(192,38,211,0.95)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Solicitar diagnóstico por WhatsApp
                <Zap size={20} />
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-between text-muted text-[11px] font-label uppercase tracking-wider gap-2">
                <span className="flex items-center gap-1.5">
                  <Lock size={13} className="text-secondary" />
                  Al enviar aceptas nuestro{' '}
                  <a href="/aviso-de-privacidad" target="_blank" className="underline hover:text-crisp">
                    aviso de privacidad
                  </a>
                </span>
                <span className="text-secondary font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  Respuesta en menos de 24 h
                </span>
              </div>

              {sent && (
                <div role="status" className="p-4 rounded-lg bg-secondary/10 border border-secondary/30 text-secondary text-center text-[15px]">
                  ✓ Abrimos WhatsApp con tu mensaje listo. Solo pulsa enviar y te contactamos en breve.
                </div>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ==========================================
// FOOTER
// ==========================================

const Footer = () => (
  <footer className="w-full bg-obsidian border-t border-subtle">
    <div className="max-w-7xl mx-auto px-5 md:px-6 pt-14 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div className="lg:col-span-2 space-y-4">
          <img src="/logo/lockup-white.svg" alt="After Startups" width={119} height={40} className="h-10 w-auto" />
          <p className="text-[13px] text-muted max-w-sm">
            Venture Studio creativo y agencia de growth. Diseñamos, construimos y escalamos los activos digitales de marcas que quieren crecer.
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="font-label text-xs uppercase tracking-wider text-crisp font-bold">Explora</h4>
          <ul className="space-y-2 text-[13px]">
            {[
              ['Casos de éxito', '#casos'],
              ['Creativos & Ads', '#creativos'],
              ['Servicios', '#servicios'],
              ['Metodología', '#metodologia'],
              ['Preguntas frecuentes', '#faq'],
            ].map(([label, href]) => (
              <li key={href}>
                <a href={href} className="text-on-surface-variant hover:text-crisp transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="font-label text-xs uppercase tracking-wider text-crisp font-bold">Contacto directo</h4>
          <ul className="space-y-2 text-[13px]">
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline flex items-center gap-1.5">
                <MessageCircle size={15} /> WhatsApp · {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-crisp flex items-center gap-1.5">
                <ExternalLink size={15} /> Facebook
              </a>
            </li>
            <li className="text-muted flex items-center gap-1.5">
              <Building2 size={15} /> Monterrey, Nuevo León
            </li>
          </ul>
        </div>
      </div>
      <div className="pt-6 border-t border-subtle flex flex-col md:flex-row items-center justify-between gap-3 text-[13px] text-muted">
        <span>© 2026 After Startups. Todos los derechos reservados.</span>
        <a href="/aviso-de-privacidad" className="hover:text-crisp transition-colors">
          Aviso de privacidad
        </a>
      </div>
    </div>
  </footer>
);

// ==========================================
// APP
// ==========================================

function App() {
  return (
    <div className="w-full bg-obsidian text-on-surface antialiased overflow-x-hidden selection:bg-primary-container selection:text-crisp">
      <Header />
      <main>
        <HeroSection />
        <Marquee />
        <CasosSection />
        <PromoSection />
        <CreativosSection />
        <ServiciosSection />
        <IndustriasSection />
        <MetodologiaSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <Promo />
    </div>
  );
}

export default App;
