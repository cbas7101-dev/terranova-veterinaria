import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
	children: ReactNode;
	className?: string;
	delay?: number;
	y?: number;
};

export default function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				el,
				{ opacity: 0, y },
				{
					opacity: 1,
					y: 0,
					duration: 0.7,
					delay,
					ease: 'power2.out',
					scrollTrigger: { trigger: el, start: 'top 85%', once: true },
				}
			);
		}, el);

		return () => ctx.revert();
	}, [delay, y]);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}
