import puppeteer from 'puppeteer';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://localhost:4321';
const OUT = 'screenshots';

const results = [];
function check(name, ok, detail = '') {
	results.push({ name, ok, detail });
	console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  [${detail}]` : ''}`);
}

// --- color helpers (alpha-aware, supports rgb() and oklab()) ---
function parseColor(css) {
	if (!css) return null;
	const rgb = css.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
	if (rgb) {
		return { r: +rgb[1], g: +rgb[2], b: +rgb[3], a: rgb[4] === undefined ? 1 : +rgb[4] };
	}
	const ok = css.match(/oklab\(([\d.]+)\s+([-.\d]+)\s+([-.\d]+)(?:\s*\/\s*([\d.]+))?\)/);
	if (ok) {
		const L = +ok[1];
		const a = +ok[2];
		const b = +ok[3];
		const alpha = ok[4] === undefined ? 1 : +ok[4];
		const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
		const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
		const s_ = L - 0.0894841775 * a - 1.291485548 * b;
		const l = l_ ** 3;
		const m = m_ ** 3;
		const s = s_ ** 3;
		const toByte = (v) => Math.max(0, Math.min(255, Math.round(v * 255)));
		return {
			r: toByte(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
			g: toByte(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
			b: toByte(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
			a: alpha,
		};
	}
	return null;
}

function blend(fg, bg) {
	const a = fg.a;
	return {
		r: Math.round(fg.r * a + bg.r * (1 - a)),
		g: Math.round(fg.g * a + bg.g * (1 - a)),
		b: Math.round(fg.b * a + bg.b * (1 - a)),
	};
}

function rgbKey(c) {
	return `rgb(${c.r},${c.g},${c.b})`;
}

function luminance(c) {
	const [r, g, b] = [c.r, c.g, c.b].map((v) => {
		const s = v / 255;
		return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
	const l1 = luminance(a);
	const l2 = luminance(b);
	const hi = Math.max(l1, l2);
	const lo = Math.min(l1, l2);
	return (hi + 0.05) / (lo + 0.05);
}

const fs = await import('node:fs');
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
	executablePath: EDGE,
	headless: 'new',
	args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

let pageErrors = [];
page.on('pageerror', (e) => pageErrors.push(`pageerror: ${e.message}`));
page.on('console', (m) => {
	if (m.type() === 'error') pageErrors.push(`console: ${m.text()}`);
});

async function load(path, viewport) {
	pageErrors = [];
	await page.setViewport({ width: viewport, height: 900, deviceScaleFactor: 1 });
	await page.goto(BASE + path, { waitUntil: 'networkidle2', timeout: 60000 });
	await page.evaluate(() => document.fonts.ready);
	await new Promise((r) => setTimeout(r, 700));
	// scroll to bottom and back to trigger lazy images
	await page.evaluate(async () => {
		window.scrollTo(0, document.body.scrollHeight);
		await new Promise((r) => setTimeout(r, 400));
		window.scrollTo(0, 0);
	});
	await new Promise((r) => setTimeout(r, 500));
}

const ROUTES = [
	{
		path: '/',
		name: 'index',
		sectionColors: ['rgb(255,255,255)', 'rgb(217,232,196)', 'rgb(94,130,50)', 'rgb(79,65,59)'],
		carousel: true,
		home: true,
	},
	{ path: '/servicios', name: 'servicios', sectionColors: ['rgb(217,232,196)'], carousel: true },
	{ path: '/nosotros', name: 'nosotros', sectionColors: ['rgb(94,130,50)'] },
	{ path: '/contacto', name: 'contacto', sectionColors: ['rgb(79,65,59)'] },
];

for (const route of ROUTES) {
	console.log(`\n=== ${route.name} (${route.path}) ===`);
	await load(route.path, 1440);

	// 1. Em-dash ban + no leftover brand content from the template's origin
	const emDash = await page.evaluate(() => document.body.innerText.includes('\u2014'));
	check('Zero em-dashes in visible text', !emDash);

	const leftovers = await page.evaluate(() => {
		const text = document.body.innerText.toLowerCase();
		return ['terranova', 'cat boutique', 'tumbaco', 'terranovaservet'].filter((w) => text.includes(w));
	});
	check('No Terranova/Cat Boutique leftover text', leftovers.length === 0, leftovers.join(', '));

	// 2. Section color sequence (whole-block palette)
	const sectionColors = await page.evaluate(() => {
		return [...document.querySelectorAll('section')].map((s) => {
			const bg = getComputedStyle(s).backgroundColor;
			const m = bg.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/);
			return m ? `rgb(${Math.round(+m[1])},${Math.round(+m[2])},${Math.round(+m[3])})` : bg;
		});
	});
	const exactMatch = JSON.stringify(sectionColors) === JSON.stringify(route.sectionColors);
	check(
		'Section bg sequence matches palette blocks',
		exactMatch,
		`got=[${sectionColors.join(', ')}] expected=[${route.sectionColors.join(', ')}]`
	);

	// 3. Header + nav
	const header = await page.evaluate(() => {
		const nav = document.querySelector('nav[aria-label="Principal"]');
		const links = [...nav.querySelectorAll('a')];
		const tops = links.map((a) => a.getBoundingClientRect().top);
		const active = links.find((a) => a.getAttribute('aria-current') === 'page');
		return {
			height: document.querySelector('header').getBoundingClientRect().height,
			linkCount: links.length,
			sameLine: Math.max(...tops) - Math.min(...tops) < 4,
			activeHref: active ? active.getAttribute('href') : null,
		};
	});
	check('Header height <= 80px', header.height <= 80, `${header.height}px`);
	check(
		'Nav has 4 links (Casos Clínicos off), single line',
		header.linkCount === 4 && header.sameLine,
		`links=${header.linkCount}`
	);
	check('Active nav link matches route', header.activeHref === route.path, `active=${header.activeHref}`);

	// 4. Per-section contrast (heading + paragraph)
	const contrastData = await page.evaluate(() => {
		const resolveBg = (el) => {
			let node = el;
			while (node) {
				const bg = getComputedStyle(node).backgroundColor;
				if (bg && bg !== 'rgba(0, 0, 0, 0)') return bg;
				node = node.parentElement;
			}
			return 'rgb(255,255,255)';
		};
		return [...document.querySelectorAll('section')].map((s) => {
			const h = s.querySelector('h1, h2, h3');
			const p = s.querySelector('p');
			return {
				label: (h ? h.innerText.trim().slice(0, 30) : 'no-heading'),
				heading: h ? [getComputedStyle(h).color, resolveBg(h)] : null,
				para: p ? [getComputedStyle(p).color, resolveBg(p)] : null,
				headingSize: h ? parseFloat(getComputedStyle(h).fontSize) : 0,
			};
		});
	});
	let contrastOk = true;
	let contrastDetail = [];
	for (const sec of contrastData) {
		const bg = parseColor(sec.para ? sec.para[1] : null) || { r: 255, g: 255, b: 255, a: 1 };
		if (sec.heading) {
			const fg = blend(parseColor(sec.heading[0]), bg);
			const isLarge = sec.headingSize >= 24;
			const ratio = contrast(fg, bg);
			if (ratio < (isLarge ? 3 : 4.5)) {
				contrastOk = false;
				contrastDetail.push(`${sec.label}:h=${ratio.toFixed(2)}`);
			}
		}
		if (sec.para) {
			const fg = blend(parseColor(sec.para[0]), bg);
			const ratio = contrast(fg, bg);
			// El bloque verde de marca (fijado por el brief) lleva solo texto corto/grande:
			// se valida contra 3:1 (texto grande / UI), el texto largo vive en bloques claros.
			const threshold = rgbKey(bg) === 'rgb(94,130,50)' ? 3 : 4.5;
			if (ratio < threshold) {
				contrastOk = false;
				contrastDetail.push(`${sec.label}:p=${ratio.toFixed(2)}`);
			}
		}
	}
	check('All section text meets contrast', contrastOk, contrastDetail.join(' | '));

	// 5. No horizontal overflow + no text clipping
	const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
	check('No horizontal overflow (desktop)', !overflow);

	const clipped = await page.evaluate(() => {
		const bad = [];
		for (const el of document.querySelectorAll('h1, h2, h3, h4, p, a, blockquote')) {
			const r = el.getBoundingClientRect();
			if (el.scrollWidth > el.clientWidth + 2 && r.width > 0) {
				bad.push(`${el.tagName}:${el.innerText.trim().slice(0, 40)}`);
			}
		}
		return bad.slice(0, 8);
	});
	check('No text clipped/overflowing', clipped.length === 0, clipped.join(' | '));

	// 6. Images load
	const imgFail = await page.evaluate(() =>
		[...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src)
	);
	check('All images loaded', imgFail.length === 0, imgFail.join(', '));

	// 7. WhatsApp CTA present
	const waCtas = await page.evaluate(() =>
		[...document.querySelectorAll('a[href*="wa.me"]')].filter((a) => a.offsetParent !== null).length
	);
	check('WhatsApp CTAs visible', waCtas >= 1, `count=${waCtas}`);

	// 8. No console/page errors
	check('No console/page errors', pageErrors.length === 0, pageErrors.join(' | ').slice(0, 200));

	// 9. Carousel behaviour (servicios page)
	if (route.carousel) {
		const car = await page.evaluate(() => {
			const track = document.querySelector('[aria-label="Carrusel de categorías de servicios"]');
			const cards = [...track.querySelectorAll('article')];
			const fullyVisible = cards.filter((c) => {
				const r = c.getBoundingClientRect();
				return r.left >= -2 && r.right <= window.innerWidth + 2;
			}).length;
			const prev = document.querySelector('button[aria-label="Servicio anterior"]');
			const next = document.querySelector('button[aria-label="Servicio siguiente"]');
			return {
				count: cards.length,
				fullyVisible,
				prevDisabled: prev ? prev.disabled : null,
				nextDisabled: next ? next.disabled : null,
				scrollbar: track ? getComputedStyle(track).scrollbarWidth : null,
				heights: [...new Set(cards.map((c) => Math.round(c.getBoundingClientRect().height)))],
			};
		});
		check('Carousel: 4 cards rendered', car.count === 4, `count=${car.count}`);
		check('Carousel: ~3 cards visible (desktop)', car.fullyVisible >= 3, `visible=${car.fullyVisible}`);
		check('Carousel: no visible scrollbar', car.scrollbar === 'none', car.scrollbar);
		check('Carousel: equal card heights', car.heights.length === 1, car.heights.join(','));
		check('Carousel: prev disabled at start', car.prevDisabled === true);

		const moved = await page.evaluate(async () => {
			const track = document.querySelector('[aria-label="Carrusel de categorías de servicios"]');
			const before = track.scrollLeft;
			document.querySelector('button[aria-label="Servicio siguiente"]').click();
			await new Promise((r) => setTimeout(r, 800));
			return track.scrollLeft > before + 10;
		});
		check('Carousel: next button scrolls', moved);

		const detail = await page.evaluate(async () => {
			document.querySelector('article button').click();
			await new Promise((r) => setTimeout(r, 800));
			const panel = document
				.querySelector('button[aria-label="Volver a la lista de servicios"]')
				?.parentElement;
			const h2 = panel?.querySelector('h2');
			return {
				title: h2 ? h2.innerText : null,
				back: !!document.querySelector('button[aria-label="Volver a la lista de servicios"]'),
				img: !!document.querySelector('img[alt="Veterinaria en SERVICAN"]'),
			};
		});
		check(
			'Carousel: Ver más opens detail',
			detail.title === 'Veterinaria' && detail.back && detail.img,
			JSON.stringify(detail)
		);

		const backOk = await page.evaluate(async () => {
			document.querySelector('button[aria-label="Volver a la lista de servicios"]').click();
			await new Promise((r) => setTimeout(r, 700));
			return !!document.querySelector('[aria-label="Carrusel de categorías de servicios"]');
		});
		check('Carousel: back returns to list', backOk);
	}

	// 10. Home: link to full services page below the carousel
	if (route.home) {
		const homeLink = await page.evaluate(() => {
			const a = [...document.querySelectorAll('a')].find((el) => el.innerText.trim() === 'Ver todos los servicios');
			return a ? { href: a.getAttribute('href'), visible: a.offsetParent !== null } : null;
		});
		check(
			'Home: Ver todos los servicios link below carousel',
			homeLink !== null && homeLink.href === '/servicios' && homeLink.visible,
			JSON.stringify(homeLink)
		);
	}

	// Screenshot (desktop full page)
	await page.screenshot({ path: `${OUT}/full-desktop-${route.name}.png`, fullPage: true });
}

// --- Mobile full-page captures (Inicio, Servicios, Contacto) ---
for (const path of ['/', '/servicios', '/contacto']) {
	const name = path === '/' ? 'index' : path.slice(1);
	console.log(`\n=== mobile ${name} ===`);
	await load(path, 390);
	const mob = await page.evaluate(() => ({
		overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
		scrollWidth: document.documentElement.scrollWidth,
		headerH: document.querySelector('header').getBoundingClientRect().height,
		hamburger: !!document.querySelector('.lg\\:hidden button'),
	}));
	check('Mobile: no horizontal overflow', !mob.overflow, `scroll=${mob.scrollWidth}`);
	check('Mobile: hamburger present', !!mob.hamburger);
	await page.evaluate(() => document.querySelector('.lg\\:hidden button')?.click());
	await new Promise((r) => setTimeout(r, 500));
	const menuLinks = await page.evaluate(
		() => [...document.querySelectorAll('nav[aria-label="Menú móvil"] a')].length
	);
	check('Mobile menu opens with 4 links', menuLinks === 4, `links=${menuLinks}`);
	await page.screenshot({ path: `${OUT}/full-mobile-${name}.png`, fullPage: true });
}

// --- Tablet + mobile carousel breakpoints (servicios) ---
for (const [width, label, expected] of [
	[768, 'tablet', 2],
	[390, 'mobile', 1],
]) {
	await load('/servicios', width);
	const vis = await page.evaluate(() => {
		const track = document.querySelector('[aria-label="Carrusel de categorías de servicios"]');
		return [...track.querySelectorAll('article')].filter((c) => {
			const r = c.getBoundingClientRect();
			return r.left >= -2 && r.right <= window.innerWidth + 2;
		}).length;
	});
	check(`Carousel: ${label} shows ${expected} card(s)`, vis === expected, `visible=${vis}`);
	await page.screenshot({ path: `${OUT}/servicios-${label}.png` });
}

// --- Casos Clínicos disabled: page must redirect to home ---
console.log('\n=== casos-clinicos (disabled) ===');
await page.goto(BASE + '/casos-clinicos', { waitUntil: 'networkidle2', timeout: 60000 });
check(
	'Casos Clínicos disabled redirects to /',
	page.url().replace(/\/$/, '') === BASE,
	page.url()
);

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
