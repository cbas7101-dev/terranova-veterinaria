import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, ArrowRight, Stethoscope } from 'lucide-react';
import { serviceCategories, type ServiceCategory } from '../data/site';
import { SERVICE_ICONS } from './servicesIcons';
import ServicesDetail from './ServicesDetail';

gsap.registerPlugin(ScrollTrigger);

const GAP = 24;

export default function ServicesCarousel() {
	const [selected, setSelected] = useState<ServiceCategory | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [perView, setPerView] = useState(1);

	const rootRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const listWrapRef = useRef<HTMLDivElement>(null);
	const lastFocusIdRef = useRef<string | null>(null);
	const firstRenderRef = useRef(true);

	const positions = Math.max(1, serviceCategories.length - perView + 1);
	const canPrev = activeIndex > 0;
	const canNext = activeIndex < positions - 1;

	const getStep = useCallback(() => {
		const first = trackRef.current?.firstElementChild;
		return first ? first.getBoundingClientRect().width + GAP : 0;
	}, []);

	const computePerView = useCallback(() => {
		const w = trackRef.current?.clientWidth ?? 0;
		if (w >= 1024) return 3;
		if (w >= 640) return 2;
		return 1;
	}, []);

	const scrollToIndex = useCallback(
		(i: number) => {
			const track = trackRef.current;
			if (!track) return;
			const step = getStep();
			track.scrollTo({ left: i * step, behavior: 'smooth' });
		},
		[getStep]
	);

	const handleScroll = useCallback(() => {
		const track = trackRef.current;
		if (!track) return;
		const step = getStep();
		if (step === 0) return;
		const idx = Math.max(0, Math.min(positions - 1, Math.round(track.scrollLeft / step)));
		setActiveIndex(idx);
	}, [getStep, positions]);

	useLayoutEffect(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) return;
		const ctx = gsap.context(() => {
			gsap.fromTo(
				'[data-card]',
				{ opacity: 0, y: 24 },
				{
					opacity: 1,
					y: 0,
					stagger: 0.08,
					duration: 0.6,
					ease: 'power2.out',
					scrollTrigger: { trigger: rootRef.current, start: 'top 80%', once: true },
				}
			);
		}, rootRef);
		return () => ctx.revert();
	}, []);

	useEffect(() => {
		const update = () => {
			setPerView(computePerView());
			const track = trackRef.current;
			if (track) {
				const step = getStep();
				if (step > 0) {
					setActiveIndex(
						Math.max(0, Math.min(serviceCategories.length - 1, Math.round(track.scrollLeft / step)))
					);
				}
			}
		};
		update();
		window.addEventListener('resize', update);
		return () => window.removeEventListener('resize', update);
	}, [computePerView, getStep]);

	useLayoutEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false;
			return;
		}
		if (!selected) {
			const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			if (reduce) return;
			gsap.fromTo(
				listWrapRef.current,
				{ opacity: 0, y: 16 },
				{ opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
			);
		}
	}, [selected]);

	useLayoutEffect(() => {
		if (selected) return;
		const btn = lastFocusIdRef.current
			? rootRef.current?.querySelector<HTMLButtonElement>(`[data-vermas="${lastFocusIdRef.current}"]`)
			: null;
		btn?.focus();
	}, [selected]);

	useEffect(() => {
		if (!selected) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setSelected(null);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [selected]);

	const open = (cat: ServiceCategory) => () => {
		lastFocusIdRef.current = cat.id;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) {
			setSelected(cat);
			return;
		}
		gsap.to(listWrapRef.current, {
			opacity: 0,
			y: -16,
			duration: 0.3,
			ease: 'power2.in',
			onComplete: () => setSelected(cat),
		});
	};

	const close = () => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) {
			setSelected(null);
			return;
		}
		setSelected(null);
	};

	const prev = () => {
		if (canPrev) scrollToIndex(activeIndex - 1);
	};

	const next = () => {
		if (canNext) scrollToIndex(activeIndex + 1);
	};

	return (
		<div ref={rootRef} className="mt-14">
			{selected ? (
				<ServicesDetail category={selected} onBack={close} />
			) : (
				<div ref={listWrapRef}>
					<div
						ref={trackRef}
						onScroll={handleScroll}
						tabIndex={0}
						role="region"
						aria-label="Carrusel de categorías de servicios"
						className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-deep"
					>
						{serviceCategories.map((cat) => {
							const Icon = SERVICE_ICONS[cat.icon] ?? Stethoscope;
							return (
								<article
									key={cat.id}
									data-card
									className="flex w-full shrink-0 snap-start flex-col items-center rounded-[1.75rem] bg-white px-7 py-10 text-center shadow-lg shadow-brand-deep/10 sm:w-[calc(50%_-_14px)] lg:w-[calc(33.333%_-_20px)]"
								>
									<span className="flex h-24 w-24 items-center justify-center rounded-full bg-mint/50 text-brand-deep">
										<Icon className="h-12 w-12" strokeWidth={1.6} aria-hidden="true" />
									</span>
									<h3 className="mt-7 font-display text-2xl font-bold leading-tight text-ink">
										{cat.title}
									</h3>
									{cat.badge && (
										<span className="mt-3 rounded-full bg-mint px-3.5 py-1 text-xs font-bold text-ink">
											{cat.badge}
										</span>
									)}
									<div className="flex-1" />
									<button
										type="button"
										data-vermas={cat.id}
										onClick={open(cat)}
										className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-deep px-7 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
									>
										Ver más
										<ArrowRight className="h-4 w-4" aria-hidden="true" />
									</button>
								</article>
							);
						})}
					</div>

					<div className="mt-10 flex items-center justify-center gap-4">
						<button
							type="button"
							onClick={prev}
							disabled={!canPrev}
							aria-label="Servicio anterior"
							className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-deep text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
						>
							<ChevronLeft className="h-6 w-6" aria-hidden="true" />
						</button>

						<div className="flex items-center gap-2" role="tablist" aria-label="Posición del carrusel">
							{Array.from({ length: positions }).map((_, i) => (
								<button
									key={i}
									type="button"
									onClick={() => scrollToIndex(i)}
									aria-label={`Ir a la categoría ${i + 1}`}
									aria-current={activeIndex === i}
									className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep ${
										activeIndex === i ? 'w-8 bg-brand-deep' : 'w-2.5 bg-brand-deep/30 hover:bg-brand-deep/50'
									}`}
								/>
							))}
						</div>

						<button
							type="button"
							onClick={next}
							disabled={!canNext}
							aria-label="Servicio siguiente"
							className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-deep text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep"
						>
							<ChevronRight className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}