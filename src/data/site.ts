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
	name: "BASSET'S",
	subtitle: 'Clínica Veterinaria',
	legalName: 'Clínica Veterinaria Basset’s',
	logo: '/basset_logo.jpg',
	logoAlt: 'Logo de Clínica Veterinaria Basset’s',
	meta: {
		title: 'Basset’s | Clínica Veterinaria en La Floresta, Quito',
		description:
			'Clínica Veterinaria Basset’s: atención, consulta y servicios profesionales veterinarios para perros y gatos en La Floresta, Quito. Pontevedra N24-368 y Vizcaya.',
	},
	theme: {
		brand: '#3e6632',
		brandDeep: '#23391f',
		mint: '#f2b705',
		cream: '#f5f1e3',
		ink: '#232b20',
	},
	hero: {
		badge: 'En La Floresta, Quito — perros y gatos',
		title: 'Cuidar su salud también es',
		titleHighlight: 'amor',
		subtitle:
			'Atención, consulta y servicios profesionales veterinarios para perros y gatos. Anticiparte y mantener sus controles al día puede marcar la diferencia.',
		image: '/imagen_basset.png',
	},
	services: {
		subtitle:
			'Prevención, diagnóstico y tratamiento para perros y gatos: vacunas, desparasitación, otitis, salud felina y más.',
		categories: [
			{
				id: 'consulta-veterinaria',
				title: 'Consulta Veterinaria',
				icon: 'stethoscope',
				description: 'Atención y consulta profesional para perros y gatos. Controles al día para anticiparte a cualquier problema.',
				image: '/imagen_basset.png',
				services: [
					{
						title: 'Consulta general',
						description: 'Revisión completa para perros y gatos, con plan de cuidado a su medida.',
						icon: 'stethoscope',
					},
					{
						title: 'Controles preventivos',
						description: 'Chequeos periódicos para detectar a tiempo cambios de comportamiento, apetito o ánimo.',
						icon: 'calendar-check',
					},
					{
						title: 'Alimentación y bienestar',
						description: 'Orientación frente a riesgos como alimentos grasosos y prevención de pancreatitis.',
						icon: 'heart-pulse',
					},
				],
			},
			{
				id: 'vacunas-desparasitacion',
				title: 'Vacunas y Desparasitación',
				icon: 'syringe',
				description: 'Mantén sus vacunas al día y protégelo de pulgas y parásitos con el cuidado adecuado.',
				image: '/imagen_basset.png',
				services: [
					{
						title: 'Vacuna antirrábica y plan de vacunas',
						description: 'No esperes a que te lo recuerde: mantén sus vacunas al día.',
						icon: 'syringe',
					},
					{
						title: 'Control de pulgas y parásitos',
						description: 'Tu mascota no necesita ese tipo de huésped. Te ayudamos a elegir la mejor protección.',
						icon: 'shield-check',
					},
				],
			},
			{
				id: 'diagnostico-tratamiento',
				title: 'Diagnóstico y Tratamiento',
				icon: 'microscope',
				description: 'Diagnóstico preciso para saber si es bacterias, hongos o alergias, y tratamiento adecuado.',
				image: '/imagen_basset.png',
				services: [
					{
						title: 'Otitis y rascado excesivo',
						description: 'El rascado no es “normal”. Revisión otoscópica completa y tratamiento adecuado.',
						icon: 'ear',
					},
					{
						title: 'Detección oportuna',
						description: 'Si comió algo indebido o cambia su ánimo, detectar a tiempo importa.',
						icon: 'search',
					},
				],
			},
			{
				id: 'salud-felina',
				title: 'Salud Felina y Bienestar',
				icon: 'cat',
				description: 'Si tu gato deja de comer o busca esconderse, visítanos para una revisión preventiva.',
				image: '/imagen_basset.png',
				services: [
					{
						title: 'Revisión preventiva felina',
						description: 'Cambios drásticos de comportamiento son una señal. Te ayudamos a interpretarla.',
						icon: 'cat',
					},
					{
						title: 'Tenencia responsable',
						description: 'Cuidado diario, vacunación y controles para una compañía sana por muchos años.',
						icon: 'heart-handshake',
					},
				],
			},
		],
	},
	about: {
		title: 'Por qué Basset’s',
		subtitle: 'Atención, consulta y servicios profesionales veterinarios para perros y gatos.',
		lead: 'Cuidar su salud también es una forma de demostrarle cuánto lo quieres.',
		features: [
			{
				icon: 'stethoscope',
				title: 'Perros y gatos',
				description: 'Atención profesional para tus compañeros de cuatro patas.',
			},
			{
				icon: 'shield-check',
				title: 'Prevención al día',
				description: 'Vacunas, desparasitación y controles que marcan la diferencia.',
			},
			{
				icon: 'heart-pulse',
				title: '100% recomendado',
				description: '5 de 5 en reseñas: cuidado cercano que las familias recomiendan.',
			},
			{
				icon: 'map-pin',
				title: 'En La Floresta',
				description: 'Pontevedra N24-368 y Vizcaya, Quito, Ecuador.',
			},
		],
		image: '/imagen_basset.png',
		imageAlt: 'Veterinaria de Basset’s atendiendo a un perro y un gato',
	},
	contact: {
		intro: 'Estamos en La Floresta. Para consultas y citas, contáctanos al 098 376 3535.',
		address: 'Pontevedra N24-368 y Vizcaya, La Floresta, Quito, Ecuador',
		mapsEmbed:
			'https://www.google.com/maps?q=Pontevedra%20N24-368%20y%20Vizcaya%2C%20La%20Floresta%2C%20Quito%2C%20Ecuador&z=16&output=embed',
		mapsTitle: 'Mapa de Clínica Veterinaria Basset’s en La Floresta, Quito',
		phoneDisplay: '(02) 222-5230',
		phoneHref: 'tel:+59322225230',
		whatsappDisplay: '098 376 3535',
		whatsapp: 'https://wa.me/593983763535',
		email: 'clinicaveterinariabassets@hotmail.com',
		schedule: [
			{ days: 'Lun - Vie', hours: '9:00 - 18:00' },
			{ days: 'Sáb', hours: '9:00 - 14:00' },
		],
		socials: [
			{
				id: 'facebook',
				href: 'https://www.facebook.com/clinicaveterinariabassets',
				handle: 'clinicaveterinariabassets',
			},
		],
	},
	cases: {
		enabled: false,
		title: 'Casos Clínicos',
		intro:
			'Casos reales de nuestra práctica, contados con transparencia. Este espacio crece con cada caso que atendemos.',
	},
	footer: {
		description:
			'Clínica Veterinaria Basset’s en La Floresta, Quito. Atención, consulta y servicios profesionales para perros y gatos.',
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
