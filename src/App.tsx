import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, type MotionValue } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowDown, 
  TrendingUp, 
  Layers, 
  Cpu, 
  Bot, 
  Calendar,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Menu,
  X,
  ExternalLink,
  Building2,
  Factory,
  Mountain,
  Scissors,
  Music,
  Store
} from 'lucide-react';
import { FACEBOOK_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from './site';
import Promo from './Promo';

// ==========================================
// 1. REUSABLE MICRO-INTERACTIVE COMPONENTS
// ==========================================

// Magnetic Element Wrapper
interface MagneticProps {
  children: React.ReactNode;
  range?: number;
  strength?: number;
}

export const Magnetic: React.FC<MagneticProps> = ({ children, range = 100, strength = 4 }) => {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (distance < range) {
        setIsHovered(true);
        setTransform({
          x: (e.clientX - centerX) / strength,
          y: (e.clientY - centerY) / strength
        });
      } else {
        setIsHovered(false);
        setTransform({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [range, strength]);

  return (
    <div
      ref={ref}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        willChange: 'transform',
        display: 'inline-block'
      }}
    >
      {children}
    </div>
  );
};

// Scroll Reveal Wrapper
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, direction = 'up', duration = 0.6 }) => {
  const getInitialOffset = () => {
    switch (direction) {
      case 'up': return { y: 40, x: 0 };
      case 'down': return { y: -40, x: 0 };
      case 'left': return { x: 40, y: 0 };
      case 'right': return { x: -40, y: 0 };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...getInitialOffset() }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay,
        duration,
        ease: [0.215, 0.61, 0.355, 1] // cubic-out
      }}
    >
      {children}
    </motion.div>
  );
};

// Word-by-word opacity text reveal
interface RevealTextProps {
  text: string;
  className?: string;
}

export const RevealText: React.FC<RevealTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.3']
  });

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, wIdx) => (
        <RevealWord
          key={wIdx}
          word={word}
          progress={scrollYProgress}
          range={[wIdx / words.length, (wIdx + 1) / words.length]}
        />
      ))}
    </p>
  );
};

const RevealWord = ({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <span className="opacity-0">{word}</span>
      <motion.span style={{ opacity }} className="absolute inset-0 select-none">
        {word}
      </motion.span>
    </span>
  );
};

// ==========================================
// 2. CORE SECTIONS
// ==========================================

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Manifiesto', href: '#manifesto' },
    { name: 'Capacidades', href: '#capacidades' },
    { name: 'Enfoque', href: '#enfoque' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Proceso', href: '#proceso' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-[#0A0A0AD0] backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="/#hero" className="flex items-center hover:opacity-90 transition-opacity" aria-label="After Startups, inicio">
          <img src="/logo/lockup-white.svg" alt="After Startups" width={113} height={38} className="h-9 md:h-10 w-auto" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white font-semibold transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Contact CTA (Desktop) */}
        <div className="hidden md:block">
          <Magnetic>
            <a 
              href="#contact" 
              className="px-6 py-2.5 rounded-full border border-white/10 hover:border-accent-purple text-xs font-bold uppercase tracking-wider text-white transition-all bg-white/5 hover:bg-accent-purple/10"
            >
              Iniciar Proyecto
            </a>
          </Magnetic>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white p-1 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden w-full bg-[#0A0A0A] border-b border-white/5"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-sm uppercase tracking-widest text-neutral-300 hover:text-white font-bold"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 rounded-full bg-accent-purple text-xs font-bold uppercase tracking-wider text-white"
              >
                Iniciar Proyecto
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 pt-28 pb-20 overflow-hidden bg-[#0A0A0A]">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[20%] left-[10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-radial-glow opacity-60 pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-radial-glow-orange opacity-40 pointer-events-none z-0"></div>
      
      {/* Decorative Interactive Floating Cards */}
      <div className="absolute top-[30%] right-[8%] hidden xl:block pointer-events-none z-10">
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="glass-panel p-6 rounded-2xl w-72 border border-white/5 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-accent-purple">AI Agent status</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
          </div>
          <p className="text-xs text-neutral-300 font-mono leading-relaxed mb-3">{"$ agent.execute('scale_operations')"}</p>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: ['0%', '100%'] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-accent-purple to-accent-orange"
            ></motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-[25%] left-[6%] hidden xl:block pointer-events-none z-10">
        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="glass-panel p-5 rounded-2xl w-64 border border-white/5 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-accent-orange/10 text-accent-orange">
              <TrendingUp size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase">Growth Accelerated</p>
              <p className="text-[10px] text-neutral-400">Monthly Revenue</p>
            </div>
          </div>
          <p className="text-lg font-black text-white">+312% <span className="text-xs text-green-400 font-medium">YoY</span></p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-5xl text-center z-10 flex flex-col items-center">
        {/* Intro tag */}
        <Reveal delay={0.1} direction="down">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-extrabold uppercase tracking-widest text-neutral-300 mb-8">
            <Sparkles size={10} className="text-accent-purple" />
            <span>Venture Studio Creativo</span>
          </div>
        </Reveal>

        {/* H1 Heading */}
        <Reveal delay={0.2}>
          <h1 className="hero-heading font-black tracking-tight uppercase leading-[1.05] max-w-4xl text-center mb-8" style={{ fontSize: 'clamp(2.2rem, 6.2vw, 5.5rem)' }}>
            Construimos marcas.<br />
            Creamos productos.<br />
            Aceleramos tu <span className="text-gradient">crecimiento</span>.
          </h1>
        </Reveal>

        {/* Subheadline */}
        <Reveal delay={0.3} duration={0.8}>
          <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-3xl leading-relaxed font-light mb-12">
            No somos una agencia tradicional. Somos el <strong className="text-white font-semibold">Venture Studio Creativo</strong> que transforma ideas en empresas de alto valor mediante la intersección perfecta entre estrategia de negocio, diseño de vanguardia, automatización e Inteligencia Artificial.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center gap-5 justify-center">
            {/* Primary Magnetic CTA */}
            <Magnetic>
              <a 
                href="#contact" 
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-accent-purple to-accent-violet hover:brightness-110 active:scale-98 rounded-full text-white font-bold uppercase tracking-widest text-xs px-10 py-4.5 border border-white/20 transition-all shadow-[0_0_30px_rgba(182,0,168,0.3)]"
              >
                <span>Iniciar Proyecto</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-200" />
              </a>
            </Magnetic>

            {/* Secondary Magnetic CTA */}
            <Magnetic>
              <a 
                href="#projects" 
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 text-neutral-300 font-bold uppercase tracking-widest text-xs px-10 py-4.5 hover:bg-white/10 hover:text-white transition-all"
              >
                <span>Ver Casos de Éxito</span>
                <ArrowDown size={12} className="animate-bounce" />
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// Manifesto Section
const ManifestoSection = () => {
  return (
    <section id="manifesto" className="relative py-28 md:py-40 bg-[#0A0A0A] border-t border-white/5 overflow-hidden">
      <div className="absolute right-[5%] top-[10%] w-[400px] h-[400px] rounded-full bg-radial-glow opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Sticky Title */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-purple"></span>
              <span className="text-[10px] uppercase font-black tracking-widest text-neutral-400">Nuestra Filosofía</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight leading-tight max-w-md">
              La filosofía detrás del crecimiento sostenible.
            </h2>
          </div>

          {/* Copy Body */}
          <div className="lg:col-span-8 lg:pl-10">
            <div className="border-l-2 border-accent-purple/30 pl-6 md:pl-10 py-2">
              <RevealText 
                text="Creemos que las grandes empresas no nacen únicamente de un buen logotipo o de una campaña publicitaria aislada. Nacen de una estrategia clara, una marca sólida, una experiencia de usuario excepcional y un sistema operativo capaz de evolucionar con el mercado." 
                className="text-lg sm:text-xl md:text-2xl text-neutral-300 leading-relaxed font-light mb-8"
              />
              
              <RevealText 
                text="En After Startups nos convertimos en tu socio estratégico. Nos involucramos desde la validación de la idea inicial hasta la consolidación y el escalamiento de tu negocio, fusionando el criterio humano con el poder técnico de la IA." 
                className="text-lg sm:text-xl md:text-2xl text-neutral-300 leading-relaxed font-light"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Bento Capacidades Section
const CapacidadesSection = () => {
  const pilares = [
    {
      num: '01',
      title: 'Venture Building & Strategy',
      subtitle: 'Antes de diseñar cualquier marca, entendemos el negocio.',
      desc: 'Estructuramos las bases comerciales, financieras y analíticas para asegurar la viabilidad de cada proyecto antes de ejecutar una sola línea de código o diseño.',
      bullets: [
        'Modelos de negocio y propuestas de valor de alto impacto.',
        'Validación de ideas, estudios de factibilidad y arquitectura.',
        'Posicionamiento de mercado y roadmaps de crecimiento.',
        'Estrategias de lanzamiento, monetización y pricing avanzado.'
      ],
      icon: <TrendingUp size={24} />,
      colorClass: 'group-hover:text-cyan-400 group-hover:bg-cyan-950/30 border-cyan-500/10',
      glow: 'shadow-[0_0_30px_rgba(34,211,238,0.05)]'
    },
    {
      num: '02',
      title: 'Brand Architecture & Design',
      subtitle: 'Creamos marcas con propósito y visión de largo plazo.',
      desc: 'Diseñamos ecosistemas visuales y narrativos completos que otorgan autoridad inmediata en entornos competitivos.',
      bullets: [
        'Estrategia de marca, ADN, storytelling y personalidad.',
        'Naming, arquitectura de marca y Brand Books.',
        'Sistemas visuales completos: Logos, paletas y tipografía.',
        'Dirección creativa, de arte y Pitch Decks de inversión.'
      ],
      icon: <Layers size={24} />,
      colorClass: 'group-hover:text-accent-purple group-hover:bg-accent-purple/10 border-accent-purple/10',
      glow: 'shadow-[0_0_30px_rgba(182,0,168,0.05)]'
    },
    {
      num: '03',
      title: 'Digital Products & UX/UI',
      subtitle: 'Experiencias digitales de alta gama enfocadas en la conversión.',
      desc: 'Diseñamos e implementamos interfaces modernas que no solo lucen espectaculares, sino que guían al usuario hacia el objetivo comercial.',
      bullets: [
        'Investigación UX, arquitectura de información y flujos.',
        'Diseño UI responsivo en Figma para apps y dashboards.',
        'Desarrollo web moderno: Sitios corporativos, Landing Pages y Funnels.',
        'Optimización SEO técnica, velocidad de carga y CRO.'
      ],
      icon: <Cpu size={24} />,
      colorClass: 'group-hover:text-violet-400 group-hover:bg-violet-950/30 border-violet-500/10',
      glow: 'shadow-[0_0_30px_rgba(139,92,246,0.05)]'
    },
    {
      num: '04',
      title: 'Growth, AI & Automation',
      subtitle: 'Sistemas inteligentes para acelerar empresas y reducir fricción.',
      desc: 'Implementamos tecnología e inteligencia artificial para automatizar la operación comercial y escalar la captación de clientes.',
      bullets: [
        'Agentes inteligentes, chatbots y prompts profesionales.',
        'Automatización con WhatsApp Business, CRM, sheets y calendar.',
        'Paid Media & Publicidad en Google Ads y Meta Ads (ROI).',
        'Growth Marketing: embudos de captación y copywriting persuasivo.'
      ],
      icon: <Bot size={24} />,
      colorClass: 'group-hover:text-accent-orange group-hover:bg-accent-orange/10 border-accent-orange/10',
      glow: 'shadow-[0_0_30px_rgba(190,76,0,0.05)]'
    }
  ];

  return (
    <section id="capacidades" className="relative py-28 md:py-36 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="w-full text-center mb-20">
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-4">
              <span>Pilares Operativos</span>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Sistemas integrales de negocio.
            </h2>
            <p className="text-accent-purple font-black text-2xl uppercase tracking-widest mt-2">
              ¿Qué hacemos?
            </p>
          </Reveal>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {pilares.map((pilar, idx) => (
            <Reveal key={pilar.num} delay={idx * 0.15}>
              <div 
                className={`group glass-panel glass-panel-hover p-8 sm:p-10 rounded-[32px] h-full flex flex-col justify-between border border-white/5 hover:border-white/10 overflow-hidden relative ${pilar.glow}`}
              >
                {/* Background glow node */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-white/2 rounded-full blur-2xl group-hover:bg-white/5 transition-all duration-500"></div>

                <div>
                  {/* Top Bar */}
                  <div className="flex justify-between items-start mb-8">
                    <div className={`p-4 rounded-2xl border bg-white/2 text-neutral-300 transition-all duration-300 ${pilar.colorClass}`}>
                      {pilar.icon}
                    </div>
                    <span className="font-mono text-3xl font-black text-white/10 group-hover:text-white/20 transition-colors">
                      {pilar.num}
                    </span>
                  </div>

                  {/* Headers */}
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight leading-none mb-2">
                    {pilar.title}
                  </h3>
                  <p className="text-xs font-semibold text-accent-orange/90 uppercase tracking-widest mb-4">
                    {pilar.subtitle}
                  </p>
                  
                  {/* Description */}
                  <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {pilar.desc}
                  </p>
                </div>

                {/* Bullet list */}
                <div className="border-t border-white/5 pt-6 mt-4">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] uppercase tracking-wider text-neutral-300 font-medium">
                    {pilar.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-purple/75 mt-1 shrink-0"></span>
                        <span className="leading-tight">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};

// Enfoque Vertical Section
const EnfoqueSection = () => {
  const industrias = [
    { icon: <Building2 size={22} />, name: 'Inmobiliario', desc: 'Branding de desarrollos, presentaciones premium y captación de inversionistas.', cliente: 'EcoSuites' },
    { icon: <Factory size={22} />, name: 'Industria y acero', desc: 'Sitios que convierten visitas en cotizaciones para venta B2B y mayoreo.', cliente: 'Sur Steel' },
    { icon: <Mountain size={22} />, name: 'Turismo y experiencias', desc: 'Posicionamiento y campañas para atraer viajeros y reservas.', cliente: 'Ecoprojects' },
    { icon: <Scissors size={22} />, name: 'Servicios y belleza', desc: 'Sistemas de reservaciones, CRM y agenda automatizada.', cliente: 'Men & Boys' },
    { icon: <Music size={22} />, name: 'Música y entretenimiento', desc: 'Plataformas de eventos y boletos, press kits digitales y marca para la escena musical.', cliente: 'Cascada Life · DJ Lu' },
    { icon: <Store size={22} />, name: 'Comercio y marcas locales', desc: 'Paid media y contenido para generar clientes potenciales.', cliente: 'Print Cards' },
  ];

  return (
    <section id="enfoque" className="relative py-28 md:py-36 bg-[#0A0A0A] border-t border-white/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-glow-orange opacity-40 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Intro */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange/10 border border-accent-orange/20 text-[9px] font-bold uppercase tracking-widest text-accent-orange mb-6">
                <Sparkles size={10} />
                <span>Industrias que impulsamos</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight leading-none mb-6">
                Un mismo sistema,<br />
                <span className="text-gradient">cualquier industria</span>
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed font-light mb-8">
                Estrategia, marca, tecnología e IA adaptadas a cómo vende tu giro. Ya lo aplicamos en sectores muy distintos, desde desarrollos inmobiliarios hasta venta de acero, turismo y servicios.
              </p>

              <Magnetic>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 rounded-full border border-accent-orange/30 bg-accent-orange/10 hover:bg-accent-orange/20 text-white font-bold uppercase tracking-widest text-xs px-8 py-4 transition-all"
                >
                  <span>Platícanos de tu negocio</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-200" />
                </a>
              </Magnetic>
            </Reveal>
          </div>

          {/* Industry grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {industrias.map((ind, idx) => (
              <Reveal key={ind.name} delay={idx * 0.08}>
                <div className="group glass-panel glass-panel-hover h-full p-6 rounded-3xl border border-white/5 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="p-3 rounded-2xl border border-accent-orange/15 bg-accent-orange/5 text-accent-orange group-hover:text-white group-hover:bg-accent-purple/20 group-hover:border-accent-purple/30 transition-all duration-300">
                      {ind.icon}
                    </div>
                    <span className="font-mono text-xs font-black text-white/10 group-hover:text-white/25 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-black uppercase text-white tracking-tight mb-2">{ind.name}</h4>
                    <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">{ind.desc}</p>
                  </div>
                  <span className="mt-auto pt-4 border-t border-white/5 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    Caso: <span className="text-neutral-300">{ind.cliente}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const projects = [
    {
      name: 'Sur Steel',
      category: 'Sitio Web / Industria del Acero',
      desc: 'Diseño y desarrollo de un sitio web cinematográfico que avanza con el scroll, con catálogo de materiales y cotización directa para la venta de lámina y acero en Santiago, N.L.',
      image: '/sursteel_web.png',
      imagePosition: 'left center',
      link: 'https://www.sursteel.com.mx/'
    },
    {
      name: 'Cascada Life',
      category: 'Plataforma Web / Música y Eventos',
      desc: 'Rediseño del sitio de una comunidad de música electrónica en Monterrey: cartelera de eventos, archivo multimedia, panel de socios y experiencia de boletos.',
      image: '/cascada_web.png',
      imagePosition: 'left center',
      link: 'https://www.cascada.life/'
    },
    {
      name: 'EcoSuites',
      category: 'Venture Studio / Inmobiliario',
      desc: 'Estrategia de negocio, branding, marketing digital, estudios de factibilidad y generación de demanda.',
      image: '/ecosuites_web.png',
      link: 'https://www.eco-suites.com/'
    },
    {
      name: 'Men & Boys',
      category: 'SaaS / CRM / Reservaciones',
      desc: 'Diseño UX/UI, estrategia de producto y desarrollo de sistema de reservaciones y gestión interna.',
      image: '/barber_web.png',
      link: 'https://men-and-boys-reservations.vercel.app/'
    },
    {
      name: 'Print Cards',
      category: 'Paid Media / Lead Gen',
      desc: 'Gestión integral y optimización de campañas publicitarias de paid media para generación de clientes potenciales.',
      image: '',
      link: '#'
    },
    {
      name: 'DJ Lu Valenzuela',
      category: 'Digital Product / Press Kit',
      desc: 'Diseño, desarrollo de producto y UX/UI para un Press Kit digital interactivo de alta gama enfocado en posicionamiento y booking de la industria musical.',
      image: '',
      link: '#'
    },
    {
      name: 'Ecoprojects',
      category: 'Branding / Marketing',
      desc: 'Posicionamiento de marca, branding y campañas de marketing para turismo de aventura.',
      image: '/ecoprojects_original.jpg',
      link: '#'
    }
  ];

  return (
    <section id="projects" className="relative py-28 md:py-36 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-4">
              <span>Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Casos de Trabajo.
            </h2>
          </div>
          <p className="text-xs uppercase tracking-widest text-neutral-400 font-semibold max-w-xs md:text-right">
            Modelos de negocio e interfaces interactivas de alto rendimiento.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="flex flex-col gap-12">
          {projects.map((project, idx) => (
            <Reveal key={project.name} delay={idx * 0.1}>
              <div 
                className="group glass-panel rounded-[32px] border border-white/5 hover:border-accent-purple/20 transition-all duration-300 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Visual Side (60% width -> col-span-7) */}
                  <div className="lg:col-span-7 relative h-72 sm:h-96 md:h-[450px] overflow-hidden bg-[#0D0D0F] border-b lg:border-b-0 lg:border-r border-white/5">
                    {project.name === 'DJ Lu Valenzuela' ? (
                      /* Overlapping Interactive iOS Phone Simulator Screenshots */
                      <div className="flex items-center justify-center gap-2 sm:gap-3.5 h-full bg-neutral-950/80 py-4 px-4 overflow-hidden relative select-none">
                        {[
                          '/dj_lu_screen1.png',
                          '/dj_lu_screen2.png',
                          '/dj_lu_screen3.png',
                          '/dj_lu_screen4.png'
                        ].map((src, sIdx) => (
                          <motion.div
                            key={sIdx}
                            className="w-[20%] sm:w-[22%] aspect-[9/16] rounded-xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-white/10 shrink-0 bg-neutral-900"
                            whileHover={{ 
                              scale: 1.25, 
                              zIndex: 10,
                              rotate: 0,
                              y: -12
                            }}
                            initial={{ 
                              rotate: sIdx === 0 ? -4 : sIdx === 1 ? -1 : sIdx === 2 ? 2 : 5,
                              y: sIdx % 2 === 0 ? 6 : -6
                            }}
                            transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                          >
                            <img 
                              src={src} 
                              alt={`Retro iOS Screen ${sIdx + 1}`} 
                              className="w-full h-full object-cover select-none pointer-events-none" 
                            />
                          </motion.div>
                        ))}
                      </div>
                    ) : project.name === 'Print Cards' ? (
                      /* Side-by-side Instagram Mock Showcase */
                      <div className="grid grid-cols-2 gap-4 p-5 h-full bg-[#0C0C0E]">
                        <div className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl h-full relative group/ig1 bg-[#101012]">
                          <img 
                            src="/print_cards_ig1.png" 
                            alt="Print Cards Instagram Profile" 
                            className="w-full h-full object-cover group-hover/ig1:scale-104 transition-transform duration-500" 
                          />
                        </div>
                        <div className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl h-full relative group/ig2 bg-[#101012]">
                          <img 
                            src="/print_cards_ig2.png" 
                            alt="Print Cards Instagram Feed" 
                            className="w-full h-full object-cover group-hover/ig2:scale-104 transition-transform duration-500" 
                          />
                        </div>
                      </div>
                    ) : (
                      /* Standard cover image layout (EcoSuites, Men & Boys, Ecoprojects) */
                      <img 
                        src={project.image} 
                        alt={project.name} 
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                        style={"imagePosition" in project ? { objectPosition: project.imagePosition } : undefined}
                      />
                    )}
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                    
                    {/* Badge */}
                    <div className="absolute bottom-6 left-6 flex items-center gap-2 pointer-events-none">
                      <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-white border border-white/10">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Info Side (40% width -> col-span-5) */}
                  <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-accent-purple uppercase tracking-widest">
                        Proyecto 0{idx + 1}
                      </span>
                      <h3 className="text-3xl font-black uppercase text-white tracking-tight mt-2 mb-6 group-hover:text-accent-purple transition-colors">
                        {project.name}
                      </h3>
                      
                      <div className="border-t border-white/5 pt-6">
                        <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                          Alcance Estratégico & Técnico
                        </span>
                        <p className="text-sm text-neutral-300 font-light leading-relaxed mt-2.5">
                          {project.desc}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                      {project.link !== '#' ? (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-white hover:text-accent-purple transition-colors"
                        >
                          <span>Ver Proyecto Live</span>
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                          Press Kit Digital / Confidencial
                        </span>
                      )}
                    </div>

                  </div>

                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};

// Proceso Section
const ProcesoSection = () => {
  const steps = [
    {
      num: '1',
      title: 'Discovery & Benchmark',
      desc: 'Analizamos antes de ejecutar. Investigamos el mercado, la competencia y validamos la viabilidad del negocio.'
    },
    {
      num: '2',
      title: 'Architecture & Design',
      desc: 'Definimos el ADN visual, la narrativa y diseñamos prototipos digitales de alta gama (UX/UI).'
    },
    {
      num: '3',
      title: 'Deployment & Automation',
      desc: 'Desarrollamos la plataforma web, conectamos tus sistemas e integramos automatizaciones y agentes de IA.'
    },
    {
      num: '4',
      title: 'Growth & Scale',
      desc: 'Activamos la maquinaria comercial mediante campañas de paid media, optimización continua y crecimiento sostenible.'
    }
  ];

  return (
    <section id="proceso" className="relative py-28 md:py-36 bg-[#0A0A0A] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="w-full text-center mb-24">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-4">
              <span>Metodología</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              El camino de la idea al escalamiento.
            </h2>
          </Reveal>
        </div>

        {/* Process Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, idx) => (
            <Reveal key={step.num} delay={idx * 0.15}>
              <div className="relative group">
                
                {/* Connector Line (Desktop) */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-7 left-14 w-full h-[1px] bg-gradient-to-r from-accent-purple/20 to-transparent z-0"></div>
                )}

                <div className="relative z-10 flex flex-col gap-4">
                  {/* Number bubble */}
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 group-hover:border-accent-purple/40 group-hover:bg-accent-purple/5 transition-all duration-300 flex items-center justify-center">
                    <span className="font-mono text-xl font-black text-white group-hover:text-accent-purple transition-colors">
                      {step.num}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg font-black uppercase text-white tracking-tight mt-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};

// Contact Footer Section
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      // Format structured message for WhatsApp
      const textMessage = `Hola After Startups, me gustaría iniciar un proyecto.

*Nombre:* ${formData.name}
*Email:* ${formData.email}
*Mensaje:* ${formData.message || 'Sin mensaje adicional'}`;

      const encodedMessage = encodeURIComponent(textMessage);
      const whatsappUrl = `${WHATSAPP_URL}?text=${encodedMessage}`;

      // Open WhatsApp link in a new window/tab
      window.open(whatsappUrl, '_blank');

      // Show success/redirection state
      setSubmitted(true);
      
      // Auto-reset form state after a delay
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 7000);
    }
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-[#080808] border-t border-white/5 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-radial-glow opacity-30 pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Header text */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-6">
              <span>Hablemos</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-none mb-6">
              ¿Listo para construir el futuro de tu empresa?
            </h2>
            
            <p className="text-sm text-neutral-400 leading-relaxed font-light mb-8 max-w-md">
              Dejemos atrás las metodologías tradicionales de las agencias comunes. Construyamos un activo digital escalable, automatizado y listo para competir en el mercado actual.
            </p>

            <div className="flex flex-col gap-4 text-xs font-semibold uppercase tracking-wider text-neutral-300">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-accent-purple transition-colors">
                <MessageCircle size={16} className="text-accent-purple" />
                <span>WhatsApp · {WHATSAPP_DISPLAY}</span>
              </a>
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-accent-purple" />
                <span>Lunes a Viernes · Consultorías Estratégicas</span>
              </div>
            </div>
          </div>

          {/* Form / CTA button */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-8 sm:p-10 rounded-[32px] border border-white/5 bg-[#0D0D10]/50 relative">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="flex flex-col gap-5"
                  >
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-neutral-400 mb-2">Nombre Completo</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe" 
                        className="w-full bg-white/5 border border-white/10 focus:border-accent-purple focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-all font-light"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-neutral-400 mb-2">Email Corporativo</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com" 
                        className="w-full bg-white/5 border border-white/10 focus:border-accent-purple focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-all font-light"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-neutral-400 mb-2">Platícanos sobre tu proyecto</label>
                      <textarea 
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Escribe brevemente tu visión o requerimientos..." 
                        className="w-full bg-white/5 border border-white/10 focus:border-accent-purple focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-all font-light resize-none"
                      />
                    </div>

                    <Magnetic>
                      <button 
                        type="submit" 
                        className="w-full text-center py-4 rounded-xl bg-gradient-to-r from-accent-purple to-accent-violet hover:brightness-110 text-white font-bold uppercase tracking-widest text-xs border border-white/10 transition-all shadow-[0_0_20px_rgba(182,0,168,0.2)] cursor-pointer"
                      >
                        Agendar Consultoría Estratégica
                      </button>
                    </Magnetic>
                    <p className="text-[10px] text-neutral-500 leading-relaxed text-center">
                      Al enviar aceptas nuestro{' '}
                      <a href="/aviso-de-privacidad" target="_blank" className="underline hover:text-white transition-colors">aviso de privacidad</a>.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center flex flex-col items-center justify-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple border border-accent-purple/20">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-black uppercase text-white tracking-tight">¡Redirigiendo a WhatsApp!</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light max-w-xs">
                      Hemos abierto una ventana de WhatsApp para que nos envíes tu consulta directamente. ¡Hablemos de inmediato!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Microcopy & Brand footer */}
        <footer className="mt-28 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-200">
              AFTER STARTUPS © 2026 · Venture Studio.
            </span>
            <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-semibold">
              Branding · Growth · AI · Digital Products.
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
              WhatsApp
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
              Facebook
            </a>
            <a href="/aviso-de-privacidad" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
              Aviso de privacidad
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};

// ==========================================
// 3. MAIN APPLICATION WRAPPER
// ==========================================
function App() {
  return (
    <main className="w-full bg-[#0A0A0A] text-[#D7E2EA] antialiased overflow-x-hidden selection:bg-accent-purple selection:text-white">
      <Navbar />
      <HeroSection />
      <ManifestoSection />
      <CapacidadesSection />
      <EnfoqueSection />
      <ProjectsSection />
      <ProcesoSection />
      <ContactSection />
      <Promo />
    </main>
  );
}

export default App;
