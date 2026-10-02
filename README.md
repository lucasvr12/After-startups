# After Startups — Venture Studio Creativo

Landing de After Startups (Monterrey, México). React + TypeScript + Vite, Tailwind CSS y Framer Motion.

## Desarrollo

```bash
npm install
npm run dev
```

## Estructura

- `src/App.tsx`: la landing (navbar, hero, manifiesto, capacidades, enfoque, proyectos, proceso y contacto).
- `src/PrivacyPage.tsx`: aviso de privacidad, servido en `/aviso-de-privacidad`.
- `src/site.ts`: WhatsApp y Facebook.
- `public/logo/`: logo de After Startups.
- `vercel.json`: hace que `/aviso-de-privacidad` funcione en Vercel.

## Contacto

El formulario abre WhatsApp con un mensaje ya escrito dirigido al WhatsApp Business (81 3858 6288).

## Despliegue en Vercel

Importa el repo en vercel.com (**Add New → Project**). Vercel detecta Vite automáticamente (build `npm run build`, salida `dist`).

## Pendiente

- Razón social y domicilio completo para el aviso de privacidad (recomendable que lo revise un abogado).
