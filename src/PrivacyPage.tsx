import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { FACEBOOK_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from './site';

const UPDATED = '2 de octubre de 2026';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-12">
    <h2 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight mb-4">{title}</h2>
    <div className="flex flex-col gap-3 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">{children}</div>
  </section>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="flex flex-col gap-2">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-purple/75 mt-2.5 shrink-0"></span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

function PrivacyPage() {
  useEffect(() => {
    document.title = 'Aviso de privacidad — After Startups';
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#0A0A0A] text-[#D7E2EA] antialiased overflow-x-hidden selection:bg-accent-purple selection:text-white">
      <nav className="w-full py-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="/" className="flex items-center hover:opacity-90 transition-opacity" aria-label="After Startups, inicio">
            <img src="/logo/lockup-white.svg" alt="After Startups" width={113} height={38} className="h-9 md:h-10 w-auto" />
          </a>
          <a href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-white font-semibold transition-colors">
            <ArrowLeft size={14} />
            <span>Volver</span>
          </a>
        </div>
      </nav>

      <article className="relative max-w-3xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="absolute right-0 top-10 w-[400px] h-[400px] rounded-full bg-radial-glow opacity-40 pointer-events-none"></div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-6">
            <span>Legal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-none mb-4">
            Aviso de privacidad
          </h1>
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Última actualización: {UPDATED}</p>

          <Section title="1. Responsable de tus datos">
            <p>
              <strong className="text-white font-semibold">After Startups</strong>, con domicilio en Monterrey, Nuevo León,
              México, es responsable del tratamiento de los datos personales que nos proporcionas a través de este sitio,
              conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su normativa
              aplicable.
            </p>
            <p>
              Contacto para temas de privacidad: WhatsApp{' '}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-accent-purple transition-colors">
                {WHATSAPP_DISPLAY}
              </a>
              .
            </p>
          </Section>

          <Section title="2. Datos que recabamos">
            <p>Cuando llenas el formulario de contacto, recabamos únicamente:</p>
            <List items={['Nombre completo.', 'Número de WhatsApp.', 'Nombre de tu empresa o proyecto (opcional).', 'El objetivo que nos indiques.']} />
            <p>
              Al enviar el formulario, estos datos se envían como mensaje a nuestro WhatsApp. También recibimos los datos
              que nos compartas directamente por WhatsApp o redes sociales. No solicitamos datos personales sensibles ni
              datos financieros.
            </p>
          </Section>

          <Section title="3. Para qué usamos tus datos">
            <p><strong className="text-white font-semibold">Finalidades necesarias</strong> (para atender tu solicitud):</p>
            <List
              items={[
                'Contactarte para dar seguimiento a tu solicitud y agendar una consultoría.',
                'Entender tu proyecto y, en su caso, elaborar una propuesta de servicios.',
              ]}
            />
            <p><strong className="text-white font-semibold">Finalidades adicionales</strong> (no son necesarias para atenderte):</p>
            <List items={['Enviarte ocasionalmente contenido, novedades o promociones de After Startups.']} />
            <p>
              Si no quieres que usemos tus datos para las finalidades adicionales, escríbenos por WhatsApp en cualquier
              momento y dejaremos de hacerlo. Esto no afecta la atención de tu solicitud.
            </p>
          </Section>

          <Section title="4. Con quién compartimos tus datos">
            <p>
              No vendemos ni compartimos tus datos con terceros para sus propios fines. Para operar este sitio y
              comunicarnos contigo nos apoyamos en proveedores que los tratan por cuenta nuestra, como servicios de
              hospedaje web y de mensajería (WhatsApp). Estos proveedores solo pueden usar tus datos para prestarnos su
              servicio.
            </p>
          </Section>

          <Section title="5. Tus derechos ARCO y revocación del consentimiento">
            <p>
              Tienes derecho a <strong className="text-white font-semibold">acceder</strong> a tus datos,{' '}
              <strong className="text-white font-semibold">rectificarlos</strong>,{' '}
              <strong className="text-white font-semibold">cancelarlos</strong> u{' '}
              <strong className="text-white font-semibold">oponerte</strong> a su uso (derechos ARCO), así como a revocar
              tu consentimiento o limitar su uso. Para ejercerlos, envíanos un mensaje por WhatsApp al {WHATSAPP_DISPLAY}{' '}
              indicando tu nombre, el derecho que quieres ejercer y, en su caso, qué datos quieres corregir. Te
              responderemos en un plazo máximo de 20 días hábiles.
            </p>
          </Section>

          <Section title="6. Cuánto tiempo guardamos tus datos">
            <p>
              Conservamos tus datos mientras sean necesarios para atender tu solicitud y mantener la relación comercial.
              Después los eliminamos de forma segura.
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              Este sitio no utiliza cookies de rastreo ni de publicidad. Si en el futuro las usamos, lo indicaremos en este
              aviso.
            </p>
          </Section>

          <Section title="8. Cambios a este aviso">
            <p>Cualquier cambio a este aviso de privacidad se publicará en esta misma página, con su fecha de actualización.</p>
          </Section>
        </div>
      </article>

      <footer className="max-w-7xl mx-auto px-6 md:px-12 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <span className="text-[10px] font-black uppercase tracking-wider text-neutral-200">AFTER STARTUPS © 2026 · Venture Studio.</span>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
            WhatsApp
          </a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
            Facebook
          </a>
        </div>
      </footer>
    </main>
  );
}

export default PrivacyPage;
