export const site = {
	name: 'Terranova Servicios Veterinarios',
	legalName: 'Clínica Veterinaria Terranova',
	tagline: 'Cuidamos con amor',
	address: 'Los Arupos S4-143 y de los Cipreses, Tumbaco, Pichincha, Ecuador',
	phoneDisplay: '+593 99 579 3846',
	whatsapp: 'https://wa.me/593995793846',
	whatsappCatalog: 'https://wa.me/c/593995793846',
	instagram: 'https://www.instagram.com/terranovaservet/',
	facebook: 'https://www.facebook.com/terranovaservet/',
	mapsEmbed:
		'https://www.google.com/maps?q=Los%20Arupos%20S4-143%20y%20de%20los%20Cipreses%2C%20Tumbaco%2C%20Ecuador&z=16&output=embed',
} as const;

export type ServiceGroup = {
	label: string;
	services: Service[];
};

export type Service = {
	title: string;
	description: string;
	icon: string;
	highlight?: boolean;
};

export const serviceGroups: ServiceGroup[] = [
	{
		label: 'Atención clínica',
		services: [
			{
				title: 'Consultas y Domicilios',
				description: 'Atención en la clínica o a domicilio para el cuidado de tu mascota.',
				icon: 'stethoscope',
			},
			{
				title: 'Especialidades',
				description: 'Atención especializada según la necesidad de cada paciente.',
				icon: 'brain',
			},
			{
				title: 'Emergencias',
				description: 'Atención de urgencias para actuar rápido cuando más se necesita.',
				icon: 'heart-pulse',
			},
		],
	},
	{
		label: 'Diagnóstico y cirugía',
		services: [
			{
				title: 'Laboratorio',
				description: 'Hematología y química sanguínea para un diagnóstico preciso.',
				icon: 'flask-conical',
			},
			{
				title: 'Rayos X',
				description: 'Equipos de última generación para diagnóstico por imagen confiable.',
				icon: 'scan-line',
			},
			{
				title: 'Cirugía',
				description: 'Procedimientos quirúrgicos con protocolos seguros y seguimiento cercano.',
				icon: 'syringe',
			},
		],
	},
	{
		label: 'Bienestar y estilo',
		services: [
			{
				title: 'Pet Shop',
				description: 'Productos y accesorios para el bienestar diario de tu mascota.',
				icon: 'shopping-bag',
			},
			{
				title: 'Peluquería y baños medicados',
				description: 'Grooming y baños medicados para una piel y un pelaje saludables.',
				icon: 'scissors',
			},
			{
				title: 'Cat Boutique',
				description: 'Boutique dedicada a los gatos, única a nivel nacional.',
				icon: 'cat',
				highlight: true,
			},
		],
	},
];

export type ServiceCategory = {
	id: string;
	title: string;
	icon: string;
	badge?: string;
	description: string;
	image: string;
	services: Service[];
};

export const serviceCategories: ServiceCategory[] = [
	{
		id: 'atencion-clinica',
		title: 'Atención Clínica',
		icon: 'stethoscope',
		description: 'Consultas, emergencias y especialidades para cuidar de tu mascota.',
		image: 'https://picsum.photos/seed/terranova-consulta-veterinaria/900/1100',
		services: [
			{
				title: 'Consultas y Domicilios',
				description: 'Atención en la clínica o a domicilio para el cuidado de tu mascota.',
				icon: 'stethoscope',
			},
			{
				title: 'Emergencias',
				description: 'Atención de urgencias para actuar rápido cuando más se necesita.',
				icon: 'heart-pulse',
			},
			{
				title: 'Especialidades',
				description: 'Atención especializada según la necesidad de cada paciente.',
				icon: 'brain',
			},
		],
	},
	{
		id: 'diagnostico-cirugia',
		title: 'Diagnóstico y Cirugía',
		icon: 'scan-line',
		description: 'Diagnóstico preciso y procedimientos con protocolos seguros.',
		image: 'https://picsum.photos/seed/terranova-diagnostico-rayos-x/900/1100',
		services: [
			{
				title: 'Laboratorio',
				description: 'Hematología y química sanguínea para un diagnóstico preciso.',
				icon: 'flask-conical',
			},
			{
				title: 'Rayos X',
				description: 'Equipos de última generación para diagnóstico por imagen confiable.',
				icon: 'scan-line',
			},
			{
				title: 'Cirugía',
				description: 'Procedimientos quirúrgicos con protocolos seguros y seguimiento cercano.',
				icon: 'syringe',
			},
		],
	},
	{
		id: 'bienestar-estilo',
		title: 'Bienestar y Estilo',
		icon: 'scissors',
		description: 'Productos y grooming para el bienestar y el estilo de tu mascota.',
		image: 'https://picsum.photos/seed/terranova-peluqueria-petshop/900/1100',
		services: [
			{
				title: 'Pet Shop',
				description: 'Productos y accesorios para el bienestar diario de tu mascota.',
				icon: 'shopping-bag',
			},
			{
				title: 'Peluquería y baños medicados',
				description: 'Grooming y baños medicados para una piel y un pelaje saludables.',
				icon: 'scissors',
			},
		],
	},
	{
		id: 'cat-boutique',
		title: 'Cat Boutique',
		icon: 'cat',
		badge: 'Única a nivel nacional',
		description: 'Boutique dedicada a los gatos, única a nivel nacional.',
		image: 'https://picsum.photos/seed/terranova-cat-boutique/900/1100',
		services: [],
	},
];

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

export const caseStudies: CaseStudy[] = [
	{
		id: 'santino-sarcoma-microchip',
		title: 'Manejo quirúrgico de sarcoma en sitio de inyección (microchip)',
		patient: 'Santino',
		species: 'Felino',
		tags: ['Oncología Veterinaria', 'Cirugía', 'Felinos'],
		protocol:
			'Exámenes sanguíneos y radiografías de control con medio de contraste, para visualizar y evaluar los ganglios centinelas: clave para una correcta estadificación y para descartar metástasis antes de operar.',
		surgeryTitle: 'Cirugía en dos fases',
		phases: [
			{
				name: 'Exéresis',
				description:
					'Extracción del tumor respetando márgenes quirúrgicos amplios, clave para el control local de la enfermedad.',
			},
			{
				name: 'Reconstrucción',
				description:
					'Cirugía plástica reconstructiva mediante un colgajo de avance de patrón subdérmico monopediculado, que permitió cubrir la zona con piel vascularizada y sin tensión.',
			},
		],
		result: 'Santino en recuperación, con controles evolucionando de forma excelente.',
		quote: 'Mientras más rápido se diagnostica, el tratamiento es menos complicado e invasivo.',
		image: '/caso1.jpeg',
	},
];

export const navLinks = [
	{ label: 'Inicio', href: '/' },
	{ label: 'Servicios', href: '/servicios' },
	{ label: 'Casos Clínicos', href: '/casos-clinicos' },
	{ label: 'Nosotros', href: '/nosotros' },
	{ label: 'Contacto', href: '/contacto' },
] as const;
