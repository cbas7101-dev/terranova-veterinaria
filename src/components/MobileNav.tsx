import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, site } from '../data/site';

export default function MobileNav() {
	const [open, setOpen] = useState(false);

	return (
		<div className="lg:hidden">
			<button
				type="button"
				aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
				aria-expanded={open}
				onClick={() => setOpen((v) => !v)}
				className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform active:scale-95"
			>
				{open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
			</button>

			{open && (
				<div className="absolute inset-x-0 top-full border-t border-brand-deep/20 bg-cream px-5 pb-8 pt-4 shadow-xl">
					<nav aria-label="Menú móvil" className="flex flex-col">
						{navLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								onClick={() => setOpen(false)}
								className="border-b border-brand-deep/15 py-4 text-lg font-semibold text-ink transition-colors hover:text-brand"
							>
								{link.label}
							</a>
						))}
					</nav>
					<a
						href={site.whatsapp}
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => setOpen(false)}
						className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-deep px-6 py-3.5 text-base font-bold text-white transition-transform active:scale-[0.98]"
					>
						Escríbenos por WhatsApp
					</a>
				</div>
			)}
		</div>
	);
}
