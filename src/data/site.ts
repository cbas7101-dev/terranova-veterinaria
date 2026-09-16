/**
 * Configuración única del sitio (plantilla reutilizable).
 * Cambia estos valores para instanciar un nuevo cliente:
 * identidad, colores, servicios, textos, contacto y flags de secciones.
 */

export type ThemeConfig = {
	/** Color de marca principal (fondos de bloque claro-oscuro, selección) */
	brand: string;
	/** Color profundo (header, footer, fondos oscuros, botones primarios) */
	brandDeep: string;
	/** Acento claro (fondos de secciones suaves) */
	mint: string;
	/** Fondo crema para secciones neutras */
	cream: string;
	/** Color de texto principal */
	ink: string;
};

export type HeroConfig = {
	/** Etiqueta superior (badge) del hero */
	badge: string;
	/** Título principal (parte sin resaltar) */
	title: string;
	/** Palabra final del título, resaltada con el color de marca */
	titleHighlight: string;
	/** Párrafo de apoyo */
	subtitle: string;
	/** Imagen de fondo del hero */
	image: string;
};

export type Service = {
	title: string;
	description: string;
	/** Clave de icono ver servicesIcons.ts */
	icon: string;
};

export type ServiceCategory = {
	id: string;
	title: string;
	/** Clave de icono ver servicesIcons.ts */
	icon: string;
	/** Badge opcional (p. ej. "Único en la ciudad") */
	badge?: string;
	description: string;
	/** Imagen vertical 4:5 de la vista detalle */
	image: string;
	services: Service[];
};

export type ServicesConfig = {
	/** Subtítulo de la sección de servicios */
	subtitle: string;
	categories: ServiceCategory[];
};

export type Feature = {
	/** Clave de icono ver servicesIcons.ts */
	icon: string;
	title: string;
	description: string;
};

export type AboutConfig = {
	/** Título de la sección (p. ej. "Por qué SERVICAN") */
	title: string;
	/** Subtítulo bajo el título */
	subtitle: string;
	/** Frase destacada en negrita */
	lead: string;
	features: Feature[];
	/** Imagen vertical 4:5 */
	image: string;
	imageAlt: string;
};

export type ScheduleLine = {
	days: string;
	hours: string;
};

export type SocialId = 'instagram' | 'facebook';

export type SocialLink = {
	id: SocialId;
	href: string;
	/** Texto visible (p. ej. @usuario) */
	handle: string;
};

export type ContactConfig = {
	/** Subtítulo de la sección de contacto */
	intro: string;
	address: string;
	mapsEmbed: string;
	mapsTitle: string;
	phoneDisplay: string;
	phoneHref: string;
	whatsappDisplay: string;
	whatsapp: string;
	email: string;
	schedule: ScheduleLine[];
	/** Redes sociales opcionales: omitir las que el cliente no tenga */
	socials: SocialLink[];
	/** URL de catálogo de WhatsApp opcional */
	catalogUrl?: string;
};

export type CasesConfig = {
	/** Activa nav + página + bloque del home de Casos Clínicos */
	enabled: boolean;
	title: string;
	intro: string;
};

export type SurgeryPhase = {
	name: string;
	description: string;
};

export type CaseStudy = {
	id: string;
	title: string;
	patient: string;
	species: string;
	tags: string[];
	protocol: string;
	surgeryTitle: string;
	phases: SurgeryPhase[];
	result: string;
	quote: string;
	image: string;
};

export type SiteConfig = {
	/** Nombre corto de marca (header, footer) */
	name: string;
	/** Subtítulo bajo el nombre (header, footer) */
	subtitle: string;
	/** Nombre legal para el copyright */
	legalName: string;
	/** Logo en public/ */
	logo: string;
	/** Alt del logo */
	logoAlt: string;
	meta: {
		title: string;
		description: string;
	};
	theme: ThemeConfig;
	hero: HeroConfig;
	services: ServicesConfig;
	about: AboutConfig;
	contact: ContactConfig;
	cases: CasesConfig;
	footer: {
		description: string;
	};
};

export const site: SiteConfig = {
	name: 'SERVICAN',
	subtitle: 'Clínica Veterinaria y Peluquería Canina',
	legalName: 'SERVICAN',
	logo: '/logo.png',
	logoAlt: 'Logo de SERVICAN, clínica veterinaria y peluquería canina',
	meta: {
		title: 'SERVICAN | Clínica Veterinaria y Peluquería Canina en Quito',
		description:
			'SERVICAN: clínica veterinaria, peluquería canina, hospedaje y farmacia en Quito. Desde 1999 cuidando a tu mascota con amor, fe y experiencia.',
	},
	theme: {
		brand: '#5e8232',
		brandDeep: '#4f413b',
		mint: '#d9e8c4',
		cream: '#f6f4ea',
		ink: '#3a322d',
	},
	hero: {
		badge: 'Desde 1999 cuidando a tu mascota',
		title: 'Amor, fe y',
		titleHighlight: 'experiencia',
		subtitle:
			'Clínica veterinaria, peluquería canina, hospedaje y farmacia en Quito. Amor, fe y experiencia al servicio de tu mascota.',
		image: 'https://placehold.co/1920x1080/d9e8c4/5e8232/png?text=SERVICAN',
	},
	services: {
		subtitle:
			'Veterinaria, peluquería, hospedaje y farmacia: todo lo que tu mascota necesita en un mismo lugar.',
		categories: [
			{
				id: 'veterinaria',
				title: 'Veterinaria',
				icon: 'stethoscope',
				description: 'Consultas médicas, vacunas y desparasitación para la salud de tu mascota.',
				image:
					'https://placehold.co/900x1100/f6f4ea/4f413b/png?text=Veterinaria',
				services: [],
			},
			{
				id: 'peluqueria-canina',
				title: 'Peluquería Canina',
				icon: 'scissors',
				description: 'Estética y bienestar para tu mascota.',
				image:
					'https://placehold.co/900x1100/f6f4ea/4f413b/png?text=Peluqueria+Canina',
				services: [],
			},
			{
				id: 'hospedaje',
				title: 'Hospedaje',
				icon: 'house',
				description: 'Cuidado y alojamiento mientras viajas.',
				image:
					'https://placehold.co/900x1100/f6f4ea/4f413b/png?text=Hospedaje',
				services: [],
			},
			{
				id: 'farmacia-pet-shop',
				title: 'Farmacia y Pet Shop',
				icon: 'pill',
				description: 'Productos y medicamentos a un clic.',
				image:
					'https://placehold.co/900x1100/f6f4ea/4f413b/png?text=Farmacia+y+Pet+Shop',
				services: [],
			},
		],
	},
	about: {
		title: 'Por qué SERVICAN',
		subtitle: 'Una clínica con historia, dedicada a cuidar a tu mascota como se merece.',
		lead: 'Amor, fe y experiencia: desde 1999 cuidando a tu mascota.',
		features: [
			{
				icon: 'calendar-check',
				title: 'Desde 1999',
				description: 'Más de 25 años de experiencia cuidando mascotas en Quito.',
			},
			{
				icon: 'stethoscope',
				title: 'Atención integral',
				description: 'Veterinaria, peluquería, hospedaje y farmacia en un mismo lugar.',
			},
			{
				icon: 'heart-pulse',
				title: 'Amor y dedicación',
				description: 'Cada mascota recibe un cuidado cercano y personalizado.',
			},
			{
				icon: 'map-pin',
				title: 'Ubicación de fácil acceso',
				description: 'Av. Diego de Vásquez N77-424, en el norte de Quito.',
			},
		],
		image: 'https://placehold.co/900x1100/d9e8c4/4f413b/png?text=SERVICAN',
		imageAlt: 'Equipo de SERVICAN atendiendo a una mascota',
	},
	contact: {
		intro: 'Visítanos en el norte de Quito o escríbenos por cualquiera de nuestros canales.',
		address: 'Av. Diego de Vásquez N77-424, Quito 170303, Ecuador',
		mapsEmbed:
			'https://www.google.com/maps?q=Av.%20Diego%20de%20V%C3%A1squez%20N77-424%2C%20Quito%2C%20Ecuador&z=16&output=embed',
		mapsTitle: 'Mapa de SERVICAN en Quito',
		phoneDisplay: '(02) 247-7152',
		phoneHref: 'tel:+59322477152',
		whatsappDisplay: '+593 98 765 4181',
		whatsapp: 'https://wa.me/593987654181',
		email: 'gruposervican@gmail.com',
		schedule: [
			{ days: 'Lun - Sáb', hours: '8:00 - 20:00' },
			{ days: 'Dom y feriados', hours: '9:00 - 19:00' },
		],
		socials: [],
	},
	cases: {
		enabled: false,
		title: 'Casos Clínicos',
		intro:
			'Casos reales de nuestra práctica, contados con transparencia. Este espacio crece con cada caso que atendemos.',
	},
	footer: {
		description:
			'Clínica veterinaria y peluquería canina en Quito. Desde 1999 cuidando a tu mascota con amor, fe y experiencia.',
	},
};

/** Enlaces de navegación: Casos Clínicos solo aparece si está activado en el config */
export const navLinks: { label: string; href: string }[] = [
	{ label: 'Inicio', href: '/' },
	{ label: 'Servicios', href: '/servicios' },
	...(site.cases.enabled
		? [{ label: site.cases.title, href: '/casos-clinicos' }]
		: []),
	{ label: 'Nosotros', href: '/nosotros' },
	{ label: 'Contacto', href: '/contacto' },
];

/**
 * Casos clínicos de ejemplo (plantilla). Reemplazar con casos reales
 * del cliente y activar `cases.enabled` en el config.
 */
export const caseStudies: CaseStudy[] = [
	{
		id: 'caso-ejemplo',
		title: 'Ejemplo de caso clínico: título del procedimiento',
		patient: 'Paciente',
		species: 'Canino',
		tags: ['Especialidad', 'Cirugía'],
		protocol:
			'Exámenes sanguíneos y radiografías de control para una correcta estadificación antes de operar.',
		surgeryTitle: 'Procedimiento en dos fases',
		phases: [
			{
				name: 'Fase 1',
				description: 'Descripción de la primera fase del procedimiento.',
			},
			{
				name: 'Fase 2',
				description: 'Descripción de la segunda fase del procedimiento.',
			},
		],
		result: 'Paciente en recuperación, con controles evolucionando de forma excelente.',
		quote: 'Mientras más rápido se diagnostica, el tratamiento es menos invasivo.',
		image: 'https://placehold.co/900x1100/f6f4ea/4f413b/png?text=Caso+clinico',
	},
];
