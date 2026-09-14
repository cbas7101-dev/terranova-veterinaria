import {
	Stethoscope,
	Brain,
	HeartPulse,
	FlaskConical,
	ScanLine,
	Syringe,
	ShoppingBag,
	Scissors,
	Cat,
	House,
	Pill,
	MapPin,
	CalendarCheck,
	Clock,
	Mail,
	Phone,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/** Iconos disponibles para servicios y features del config (src/data/site.ts) */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
	stethoscope: Stethoscope,
	brain: Brain,
	'heart-pulse': HeartPulse,
	'flask-conical': FlaskConical,
	'scan-line': ScanLine,
	syringe: Syringe,
	'shopping-bag': ShoppingBag,
	scissors: Scissors,
	cat: Cat,
	house: House,
	pill: Pill,
	'map-pin': MapPin,
	'calendar-check': CalendarCheck,
	clock: Clock,
	mail: Mail,
	phone: Phone,
};
