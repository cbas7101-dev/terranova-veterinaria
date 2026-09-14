import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, Stethoscope } from 'lucide-react';
import { site, type ServiceCategory } from '../data/site';
import { SERVICE_ICONS } from './servicesIcons';

interface Props {
	category: ServiceCategory;
	onBack: () => void;
}

export default function ServicesDetail({ category, onBack }: Props) {
	const rootRef = useRef<HTMLDivElement>(null);
	const backRef = useRef<HTMLButtonElement>(null);

	useLayoutEffect(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) return;
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.detail-anim',
				{ opacity: 0, y: 24 },
				{ opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power2.out' }
			);
			gsap.fromTo(
				'.detail-anim-img',
				{ opacity: 0, scale: 0.98 },
				{ opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out', delay: 0.12 }
			);
		}, rootRef);
		return () => ctx.revert();
	}, [category.id]);

	useEffect(() => {
		backRef.current?.focus();
	}, []);

	return (
		<div ref={rootRef}>
			<button
				type="button"
				ref={backRef}
				onClick={onBack}
				aria-label="Volver a la lista de servicios"
				className="detail-anim inline-flex items-center gap-2 rounded-full border-2 border-brand-deep px-5 py-2.5 text-sm font-bold text-brand-deep transition-colors hover:bg-brand-deep hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
			>
				<ArrowLeft className="h-4 w-4" aria-hidden="true" />
				Volver
			</button>

			<div className="mt-8 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
				<div>
					<h2 className="detail-anim font-display text-4xl font-bold leading-[1.05] tracking-tight text-brand-deep sm:text-5xl">
						{category.title}
					</h2>

					{category.badge && (
						<span className="detail-anim mt-4 inline-block rounded-full bg-mint px-4 py-1.5 text-sm font-bold text-ink">
							{category.badge}
						</span>
					)}

					<p className="detail-anim mt-5 max-w-xl text-lg leading-relaxed text-ink/80">{category.description}</p>

					{category.services.length > 0 && (
						<ul className="mt-9 flex flex-col gap-6">
							{category.services.map((service) => {
								const Icon = SERVICE_ICONS[service.icon] ?? Stethoscope;
								return (
									<li key={service.title} className="detail-anim flex gap-4">
										<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint/50 text-brand-deep">
											<Icon className="h-5 w-5" aria-hidden="true" />
										</span>
										<div>
											<h3 className="text-lg font-bold text-ink">{service.title}</h3>
											<p className="mt-1 text-[15px] leading-relaxed text-ink/80">{service.description}</p>
										</div>
									</li>
								);
							})}
						</ul>
					)}
				</div>

				<div className="detail-anim-img">
					<img
						src={category.image}
						alt={`${category.title} en ${site.name}`}
						width="900"
						height="1100"
						loading="eager"
						className="aspect-[4/5] w-full rounded-[2rem] object-cover"
					/>
				</div>
			</div>
		</div>
	);
}
