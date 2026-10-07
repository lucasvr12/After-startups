import { Bot, CalendarDays, Megaphone } from 'lucide-react';
import { PROMO, WHATSAPP_URL } from './site';

// Datos compartidos por el popup y la sección de la promoción.
export const promoIncludes = [
  { icon: Bot, text: 'Configuración de IA que responde los mensajes de tu Facebook.' },
  { icon: Megaphone, text: 'Creación de anuncios (la pauta publicitaria la pones tú).' },
  { icon: CalendarDays, text: '3 posts por semana durante 3 semanas.' },
];

export const remaining = Math.max(PROMO.total - PROMO.taken, 0);
export const isPromoActive = () => remaining > 0 && Date.now() < new Date(PROMO.endsAt).getTime();

export const formatMXN = (n: number) => `$${n.toLocaleString('es-MX')}`;

export const promoWhatsappLink = `${WHATSAPP_URL}?text=${encodeURIComponent(
  `Hola, quiero apartar mi lugar en la Promoción Flash de ${PROMO.month.toLowerCase()} (${formatMXN(PROMO.price)} MXN).`,
)}`;
