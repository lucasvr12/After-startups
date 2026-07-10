import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

// ==========================================
// 1. REUSABLE COMPONENTS
// ==========================================

// Gradient Contact Button
export const ContactButton = () => {
  return (
    <a
      href="mailto:hello@afterstartups.agency"
      className="rounded-full font-semibold uppercase tracking-widest text-white px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-transform hover:scale-[1.03] active:scale-[0.98] inline-block text-center select-none"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px'
      }}
    >
      Contact Me
    </a>
  )
}

// Outline Ghost Button for Projects
interface LiveProjectButtonProps {
  href: string
}

export const LiveProjectButton = ({ href }: LiveProjectButtonProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-semibold uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors inline-block text-center select-none"
    >
      Live Project
    </a>
  )
}

// FadeIn Viewport Trigger Component
interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  as?: string
  className?: string
}

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className = ''
}: FadeInProps) => {
  const MotionComponent = (motion as any)[as] || motion.div
  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  )
}

// Mouse-following Magnetic Hover Component
interface MagnetProps {
  children: React.ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
}

export const Magnet = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out"
}: MagnetProps) => {
  const [transform, setTransform] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const elementCenterX = rect.left + rect.width / 2
      const elementCenterY = rect.top + rect.height / 2
      const distanceX = e.clientX - elementCenterX
      const distanceY = e.clientY - elementCenterY
      const distance = Math.hypot(distanceX, distanceY)
      
      const maxRange = Math.max(rect.width, rect.height) / 2 + padding

      if (distance < maxRange) {
        setIsHovered(true)
        setTransform({
          x: distanceX / strength,
          y: distanceY / strength
        })
      } else {
        setIsHovered(false)
        setTransform({ x: 0, y: 0 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [padding, strength])

  return (
    <div
      ref={ref}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isHovered ? activeTransition : inactiveTransition,
        willChange: 'transform',
        display: 'inline-block'
      }}
    >
      {children}
    </div>
  )
}

// Character-by-character Scroll Opacity Animation Component
interface AnimatedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export const AnimatedText = ({ text, className = '', style = {} }: AnimatedTextProps) => {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  })

  // Split by words to prevent word clipping/wrapping in half
  const words = text.split(" ")
  
  // Calculate total characters to map scroll progress correctly
  const totalChars = words.reduce((acc, word) => acc + word.length, 0)
  let charIndexCounter = 0

  return (
    <p 
      ref={containerRef} 
      className={`flex flex-wrap justify-center text-center leading-relaxed font-medium ${className}`}
      style={style}
    >
      {words.map((word, wIdx) => {
        const wordChars = word.split("")
        
        return (
          <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0">
            {wordChars.map((char) => {
              const currentCharIndex = charIndexCounter
              charIndexCounter++
              
              const start = currentCharIndex / totalChars
              const end = (currentCharIndex + 1) / totalChars
              const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1])

              return (
                <span key={currentCharIndex} className="relative inline-block select-none">
                  <span className="opacity-0">{char}</span>
                  <motion.span style={{ opacity }} className="absolute inset-0">
                    {char}
                  </motion.span>
                </span>
              )
            })}
          </span>
        )
      })}
    </p>
  )
}


// ==========================================
// 2. SECTIONS
// ==========================================

// Hero Section
const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-hidden px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 bg-[#0C0C0C]">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="w-full flex justify-between items-center pt-6 md:pt-8 z-30">
        <a href="#about" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">
          About
        </a>
        <a href="#services" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">
          Services
        </a>
        <a href="#projects" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">
          Projects
        </a>
        <a href="#contact" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">
          Contact
        </a>
      </FadeIn>

      {/* Hero Heading Container - Adjusted size to avoid clipping */}
      <div className="w-full overflow-hidden z-20 flex justify-center items-center mt-6 sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40} className="w-full text-center">
          <h1 
            className="hero-heading font-black uppercase tracking-tight leading-[1.1] whitespace-nowrap w-full text-center"
            style={{ fontSize: 'clamp(2rem, 6.6vw, 120px)' }}
          >
            after startups
          </h1>
        </FadeIn>
      </div>

      {/* Interactive Magnet Rocket Portrait (Mobile centered, Desktop pinned bottom) */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0"
      >
        <FadeIn delay={0.6} y={30} className="w-full flex justify-center">
          <Magnet padding={150} strength={3}>
            <img
              src="/rocket_takeoff.png"
              alt="Rocket taking off from Earth"
              className="w-full h-auto object-contain select-none pointer-events-none"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="w-full flex justify-between items-end z-20">
        {/* Left tagline */}
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-left max-w-[160px] sm:max-w-[220px] md:max-w-[260px]" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
            a venture studio driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        {/* Right Contact button */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}

// Marquee Section
const row1Images = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif"
]

const row2Images = [
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
]

const MarqueeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const sectionTop = sectionRef.current ? sectionRef.current.offsetTop : 0
  const offset = (scrollY - sectionTop + window.innerHeight) * 0.3

  const transformRow1 = `translateX(${offset - 200}px)`
  const transformRow2 = `translateX(${-(offset - 200)}px)`

  const tripledRow1 = [...row1Images, ...row1Images, ...row1Images]
  const tripledRow2 = [...row2Images, ...row2Images, ...row2Images]

  return (
    <section ref={sectionRef} className="w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3">
      {/* Row 1 */}
      <div className="w-full overflow-hidden">
        <div
          style={{
            transform: transformRow1,
            willChange: 'transform',
            display: 'flex',
            gap: '12px',
            width: 'max-content'
          }}
          className="transition-transform duration-75 ease-out"
        >
          {tripledRow1.map((url, idx) => (
            <img
              key={`r1-${idx}`}
              src={url}
              alt={`Client Project ${idx}`}
              loading="lazy"
              className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="w-full overflow-hidden">
        <div
          style={{
            transform: transformRow2,
            willChange: 'transform',
            display: 'flex',
            gap: '12px',
            width: 'max-content'
          }}
          className="transition-transform duration-75 ease-out"
        >
          {tripledRow2.map((url, idx) => (
            <img
              key={`r2-${idx}`}
              src={url}
              alt={`Digital Project ${idx}`}
              loading="lazy"
              className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="relative min-h-screen w-full bg-[#0C0C0C] flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-20 text-center overflow-hidden z-20">
      
      {/* Absolute Decorative 3D Images in Corners */}
      {/* Top Left: Moon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Moon Icon"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain"
          />
        </FadeIn>
      </div>

      {/* Bottom Left: 3D Object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Object"
            className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain"
          />
        </FadeIn>
      </div>

      {/* Top Right: Lego */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Lego Icon"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain"
          />
        </FadeIn>
      </div>

      {/* Bottom Right: 3D Group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Graphics Group"
            className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain"
          />
        </FadeIn>
      </div>

      {/* About Main Content */}
      <div className="flex flex-col items-center z-20 max-w-5xl">
        <FadeIn delay={0} y={40}>
          <h2 
            className="hero-heading font-black uppercase leading-none tracking-tight mb-10 sm:mb-14 md:mb-16" 
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About us
          </h2>
        </FadeIn>

        {/* Scroll-reveal Paragraph */}
        <AnimatedText
          text="Creemos que las grandes empresas no nacen únicamente de un buen logotipo o una campaña publicitaria. Nacen de una estrategia clara, una marca sólida, una experiencia de usuario excepcional y un sistema de crecimiento capaz de evolucionar con el mercado. Por eso, en After Startups integramos negocio, diseño, tecnología, marketing e inteligencia artificial para construir empresas preparadas para competir, crecer y perdurar."
          className="text-[#D7E2EA] font-medium leading-relaxed max-w-[560px] uppercase tracking-wide select-none"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />

        <div className="mt-16 sm:mt-20 md:mt-24">
          <FadeIn delay={0.1} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// Services Section
const servicesData = [
  {
    num: "01",
    name: "Branding & Brand Design",
    desc: "CREACIÓN DE ESTRATEGIAS DE MARCA, ADNS, NAMING Y SISTEMAS VISUALES PARA COMUNICAR UNA PRESENCIA MEMORABLE Y PERDURABLE."
  },
  {
    num: "02",
    name: "UX / UI Design",
    desc: "DISEÑO DE EXPERIENCIAS DE USUARIO Y COMPONENTES ENFOCADOS EN CONVERSIÓN CON PROTOTIPOS E INTERFACES A MEDIDA."
  },
  {
    num: "03",
    name: "Development",
    desc: "DESARROLLO DE SOFTWARE Y WEBS A CÓDIGO PURO CON REACT, NEXT.JS Y TAILWIND CSS PARA LA MÁXIMA VELOCIDAD Y SEO."
  },
  {
    num: "04",
    name: "Digital Publicity",
    desc: "GESTIÓN DE MEDIOS PAGADOS (PAID MEDIA) EN GOOGLE ADS Y META ADS PARA MAXIMIZAR EL RETORNO DE INVERSIÓN (ROI)."
  },
  {
    num: "05",
    name: "AI & Automations",
    desc: "INTEGRACIÓN DE INTELIGENCIA ARTIFICIAL, AGENTES INTELIGENTES, ASISTENTES Y AUTOMATIZACIÓN DE PROCESOS INTERNOS."
  }
]

const ServicesSection = () => {
  return (
    <section id="services" className="w-full bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-20 text-black">
      {/* Heading */}
      <div className="w-full text-center mb-16 sm:mb-20 md:mb-28">
        <FadeIn delay={0} y={40}>
          <h2 className="font-black uppercase text-[#0C0C0C]" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            Services
          </h2>
        </FadeIn>
      </div>

      {/* Services List */}
      <div className="max-w-5xl mx-auto flex flex-col">
        {servicesData.map((service, idx) => (
          <FadeIn
            key={service.num}
            delay={idx * 0.1}
            y={30}
            className="flex items-center gap-6 sm:gap-10 py-8 sm:py-10 md:py-12 border-b border-[#0C0C0C]/15 last:border-b-0"
          >
            {/* Number on Left */}
            <span 
              className="font-black text-[#0C0C0C] select-none shrink-0"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {service.num}
            </span>

            {/* Name + Desc stacked on Right */}
            <div className="flex flex-col gap-2">
              <h3 
                className="font-medium uppercase text-black"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {service.name}
              </h3>
              <p 
                className="font-light leading-relaxed max-w-2xl text-black/60 uppercase"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
              >
                {service.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

// Projects Section
const projectCardsData = [
  {
    num: "01",
    name: "EcoSuites",
    category: "Venture Studio / Inmobiliario",
    link: "https://www.eco-suites.com/",
    col1img1: "/ecosuites_mobile.png",
    col1img2: "/ecosuites_detail.png",
    col2img: "/ecosuites_web.png"
  },
  {
    num: "02",
    name: "Sistema para barberías",
    category: "SaaS / CRM",
    link: "https://men-and-boys-reservations.vercel.app/",
    col1img1: "/barber_mobile.png",
    col1img2: "/barber_detail.png",
    col2img: "/barber_web.png"
  },
  {
    num: "03",
    name: "VeroCash",
    category: "Fintech / Digital Product",
    link: "https://www.verocash.net/",
    col1img1: "/verocash_mobile.png",
    col1img2: "/verocash_detail.png",
    col2img: "/verocash_web.png"
  }
]

interface ProjectCardProps {
  project: typeof projectCardsData[0]
  index: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // 3 sticky cards: target scales are 0.94, 0.97, 1.00
  const targetScale = 1 - (3 - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div 
      ref={containerRef} 
      className="h-[85vh] flex items-center justify-center sticky top-24 md:top-32"
    >
      <motion.div
        style={{
          scale,
          top: `calc(96px + ${index * 28}px)`
        }}
        className="w-full max-w-5xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col gap-6"
      >
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span 
              className="font-black text-[#D7E2EA] opacity-25 leading-none shrink-0"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              {project.num}
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-accent uppercase tracking-widest font-semibold">
                {project.category}
              </span>
              <h3 className="text-lg sm:text-2xl font-bold uppercase text-[#D7E2EA]">
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton href={project.link} />
        </div>

        {/* Bottom Row - Two Column Image Grid */}
        <div className="grid grid-cols-10 gap-4 sm:gap-6 flex-1 min-h-0">
          {/* Left Column (40% width -> col-span-4) */}
          <div className="col-span-10 md:col-span-4 flex flex-col gap-4 sm:gap-6 h-full justify-between">
            <img
              src={project.col1img1}
              alt={`${project.name} Details 1`}
              className="w-full rounded-[24px] sm:rounded-[32px] md:rounded-[40px] object-cover h-[130px] sm:h-[160px] md:h-[180px] lg:h-[200px]"
            />
            <img
              src={project.col1img2}
              alt={`${project.name} Details 2`}
              className="w-full rounded-[24px] sm:rounded-[32px] md:rounded-[40px] object-cover flex-1 min-h-[140px] sm:min-h-[180px]"
            />
          </div>

          {/* Right Column (60% width -> col-span-6) */}
          <div className="col-span-10 md:col-span-6 h-full">
            <img
              src={project.col2img}
              alt={`${project.name} Hero`}
              className="w-full h-full rounded-[24px] sm:rounded-[32px] md:rounded-[40px] object-cover min-h-[220px] md:min-h-[300px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-24 pb-32 z-30">
      {/* Heading */}
      <div className="w-full text-center mb-16 sm:mb-20">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            Project
          </h2>
        </FadeIn>
      </div>

      {/* Sticky Stacking Cards Container */}
      <div className="flex flex-col gap-0 select-none">
        {projectCardsData.map((project, idx) => (
          <ProjectCard key={project.num} project={project} index={idx} />
        ))}
      </div>

      {/* Footer / Contact Anchor */}
      <footer id="contact" className="w-full mt-24 border-t border-[#D7E2EA]/10 pt-10 flex flex-col sm:flex-row justify-between items-center gap-6 text-[#D7E2EA]/40 text-xs sm:text-sm tracking-widest font-medium uppercase">
        <span>© 2026 AFTER STARTUPS. ALL RIGHTS RESERVED.</span>
        <a href="mailto:hello@afterstartups.agency" className="hover:text-white transition-colors">
          HELLO@AFTERSTARTUPS.AGENCY
        </a>
      </footer>
    </section>
  )
}


// ==========================================
// 3. MAIN APP WRAPPER
// ==========================================
function App() {
  return (
    <main className="w-full bg-[#0C0C0C] min-h-screen text-[#D7E2EA] overflow-x-clip">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  )
}

export default App
