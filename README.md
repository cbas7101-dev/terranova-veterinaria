# Plantilla web para clínicas veterinarias · Instancia: SERVICAN

Sitio de una página múltiples secciones (Astro + React + Tailwind v4 + GSAP),
convertido en plantilla reutilizable para clientes del rubro pet:
veterinarias, peluquerías caninas y hospedaje de mascotas.

## Cómo instanciar un nuevo cliente

Todo el contenido vive en un único archivo tipado:
[`src/data/site.ts`](src/data/site.ts). Sin tocar componentes puedes cambiar:

- **Identidad**: nombre, subtítulo, logo (`public/`), metadatos SEO.
- **Colores de marca**: `site.theme` (brand, brandDeep, mint, cream, ink).
  Se inyectan como variables CSS en runtime desde `Layout.astro`;
  `src/styles/global.css` solo mantiene los fallbackos de build.
- **Hero**: badge, título (con palabra resaltada), subtítulo e imagen de fondo.
- **Servicios**: arreglo libre de categorías (título, ícono, badge opcional,
  descripción, imagen). El carrusel se adapa a la cantidad de ítems.
  Íconos disponibles en `src/components/servicesIcons.ts`.
- **Por qué [marca]**: lead, features (ícono + título + descripción) e imagen.
- **Contacto**: dirección, teléfono, WhatsApp, email, horario, redes sociales
  (opcionales, omitir las que no existan), catálogo de WhatsApp (opcional)
  y embed de Google Maps.
- **Casos Clínicos**: `site.cases.enabled` (por defecto `false`). Al activarlo
  aparecen el enlace de nav, el bloque del home y la página `/casos-clinicos`
  (usa `caseStudies` del mismo archivo; sin activar, la página redirige a `/`).

Imágenes placeholder vía [placehold.co](https://placehold.co) hasta tener
fotos reales del cliente.

## Comandos

| Comando           | Acción                                            |
| :---------------- | :------------------------------------------------ |
| `npm install`     | Instala dependencias                              |
| `npm run dev`     | Dev server en `localhost:4321`                    |
| `npm run build`   | Build de producción a `./dist/`                   |
| `npm run preview` | Preview del build                                 |
| `node scripts/verify.mjs` | QA visual + funcional con Puppeteer (requiere dev server activo) |

El QA genera capturas full-page desktop (1440px) y mobile (390px) en
`screenshots/` y valida: paleta por sección, contraste, overflow, carrusel,
nav, redirección de Casos Clínicos y ausencia de contenido de la marca
original de la plantilla.
