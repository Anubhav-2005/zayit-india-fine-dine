import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring
} from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const gallery = [
  {
    number: '01',
    label: 'The room',
    title: 'Arrive slowly.',
    copy: 'Warm light, low voices, and a table overlooking the Golden City.',
    image: '/images/zayit-ambience-spaces.jpg',
    alt: 'The indoor and terrace spaces at Zayit'
  },
  {
    number: '02',
    label: 'The table',
    title: 'Gather close.',
    copy: 'Indian generosity meets the ease of a Mediterranean evening.',
    image: '/images/zayit-ambience-dining.jpg',
    alt: 'Guests gathered around a table at Zayit'
  },
  {
    number: '03',
    label: 'The fire',
    title: 'Let it burn.',
    copy: 'Char, smoke, spice and the unmistakable energy of an open flame.',
    image: '/images/zayit-kitchen-fire.jpg',
    alt: 'A live flame in the Zayit kitchen'
  },
  {
    number: '04',
    label: 'The plate',
    title: 'Stay curious.',
    copy: 'Familiar flavours, travelled ingredients, and plates made to share.',
    image: '/images/zayit-03.jpg',
    alt: 'A fire-grilled dish served at Zayit'
  }
];

function useJaisalmerStatus() {
  const getStatus = useCallback(() => {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(new Date());
    const hour = Number(parts.find((part) => part.type === 'hour').value);
    const minute = Number(parts.find((part) => part.type === 'minute').value);
    const minutesNow = (hour * 60) + minute;
    const isOpen = minutesNow >= 660 || minutesNow < 30;
    const formatted = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date());
    return { isOpen, formatted };
  }, []);

  const [status, setStatus] = useState(getStatus);
  useEffect(() => {
    const timer = window.setInterval(() => setStatus(getStatus()), 60000);
    return () => window.clearInterval(timer);
  }, [getStatus]);
  return status;
}

function MagneticLink({ children, className = '', strength = 0.16, ...props }) {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.45 });

  const onPointerMove = (event) => {
    if (reducedMotion || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * strength);
    y.set((event.clientY - bounds.top - bounds.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      {...props}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      data-cursor="expand"
    >
      {children}
    </motion.a>
  );
}

function Loader({ onComplete, reducedMotion }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.classList.add('is-loading');
    let active = true;
    let value = 0;
    const repeatVisit = window.sessionStorage.getItem('zayit-visited') === 'true';
    const minimum = reducedMotion ? 180 : repeatVisit ? 520 : 1450;
    const start = performance.now();
    const interval = window.setInterval(() => {
      value = Math.min(92, value + Math.max(1, (94 - value) * 0.055));
      if (active) setProgress(Math.round(value));
    }, 48);

    const hero = document.querySelector('[data-hero-image]');
    const heroReady = hero?.complete
      ? hero.decode?.().catch(() => undefined)
      : new Promise((resolve) => {
          hero?.addEventListener('load', resolve, { once: true });
          hero?.addEventListener('error', resolve, { once: true });
          window.setTimeout(resolve, 2200);
        });

    Promise.all([
      document.fonts?.ready || Promise.resolve(),
      heroReady || Promise.resolve()
    ]).finally(() => {
      const elapsed = performance.now() - start;
      window.setTimeout(() => {
        if (!active) return;
        window.clearInterval(interval);
        setProgress(100);
        window.sessionStorage.setItem('zayit-visited', 'true');
        window.setTimeout(onComplete, reducedMotion ? 80 : 260);
      }, Math.max(0, minimum - elapsed));
    });

    return () => {
      active = false;
      window.clearInterval(interval);
      document.body.classList.remove('is-loading');
    };
  }, [onComplete, reducedMotion]);

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { y: '-100%' }}
      transition={{ duration: reducedMotion ? 0.2 : 0.95, ease: [0.76, 0, 0.24, 1] }}
      aria-label="Loading Zayit India Fine Dine"
    >
      <motion.div
        className="loader-logo-mask"
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={{ clipPath: 'inset(0% 0 0 0)' }}
        transition={{ duration: reducedMotion ? 0.15 : 1.05, ease: [0.76, 0, 0.24, 1] }}
      >
        <img src="/images/zayit-official-logo.webp" alt="" width="1200" height="1200" />
      </motion.div>
      <div className="loader-progress" aria-hidden="true">
        <motion.span animate={{ scaleX: progress / 100 }} />
      </div>
      <div className="loader-meta"><span>Jaisalmer</span><span>{String(progress).padStart(2, '0')}</span></div>
    </motion.div>
  );
}

function MouseFollower() {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(-60);
  const y = useMotionValue(-60);
  const coreX = useSpring(x, { stiffness: 640, damping: 42, mass: 0.18 });
  const coreY = useSpring(y, { stiffness: 640, damping: 42, mass: 0.18 });
  const ringX = useSpring(x, { stiffness: 170, damping: 25, mass: 0.42 });
  const ringY = useSpring(y, { stiffness: 170, damping: 25, mass: 0.42 });
  const [expanded, setExpanded] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (reducedMotion || !finePointer.matches) return undefined;
    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');
    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const onPointerOver = (event) => setExpanded(Boolean(event.target.closest('[data-cursor]')));
    const onLeave = () => {
      x.set(-60);
      y.set(-60);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [reducedMotion, x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div className="cursor-core" style={{ x: coreX, y: coreY }} />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: expanded ? 1.65 : 1, opacity: expanded ? 0.72 : 0.46 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      />
    </>
  );
}

function SandCanvas({ disabled }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (disabled) return undefined;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: true });
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let visible = true;
    let pointerX = 0;
    const particles = [];
    const count = window.innerWidth < 800 ? 12 : 34;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!particles.length) {
        for (let index = 0; index < count; index += 1) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 0.45 + Math.random() * 1.15,
            speed: 0.08 + Math.random() * 0.3,
            drift: Math.random() * Math.PI * 2,
            alpha: 0.12 + Math.random() * 0.32
          });
        }
      }
    };

    const draw = (time) => {
      if (!visible || document.hidden) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      context.clearRect(0, 0, width, height);
      const wind = 0.18 + Math.sin(time * 0.00022) * 0.08 + pointerX * 0.000015;
      particles.forEach((particle) => {
        particle.x += particle.speed + wind;
        particle.y += Math.sin(time * 0.00045 + particle.drift) * 0.11;
        if (particle.x > width + 8) {
          particle.x = -8;
          particle.y = Math.random() * height;
        }
        context.beginPath();
        context.fillStyle = `rgba(222, 193, 137, ${particle.alpha})`;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });
      frame = window.requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }, { threshold: 0 });
    observer.observe(canvas);
    const onPointer = (event) => { pointerX = event.clientX - width / 2; };
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    resize();
    frame = window.requestAnimationFrame(draw);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
    };
  }, [disabled]);

  if (disabled) return null;
  return <canvas ref={canvasRef} className="sand-canvas" aria-hidden="true" />;
}

function GalleryCard({ item, reducedMotion }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 24 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 24 });
  const cardRef = useRef(null);

  const onPointerMove = (event) => {
    if (reducedMotion || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    rotateX.set((0.5 - py) * 4.2);
    rotateY.set((px - 0.5) * 4.2);
    cardRef.current?.style.setProperty('--glare-x', `${px * 100}%`);
    cardRef.current?.style.setProperty('--glare-y', `${py * 100}%`);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="gallery-card-shell">
      <motion.article
        ref={cardRef}
        className="gallery-card"
        style={{ rotateX: springX, rotateY: springY }}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        whileHover={reducedMotion ? undefined : { y: -7 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        data-cursor="expand"
      >
        <div className="gallery-media reveal-image parallax-image">
          <img src={item.image} alt={item.alt} width="640" height="640" loading="lazy" decoding="async" />
          <span className="glass-reflection" aria-hidden="true" />
        </div>
        <div className="gallery-card-meta"><span>{item.number}</span><span>{item.label}</span></div>
        <h3>{item.title}</h3>
        <p>{item.copy}</p>
      </motion.article>
    </div>
  );
}

function useCinematicExperience(rootRef, ready, reducedMotion) {
  useLayoutEffect(() => {
    if (!ready || reducedMotion) return undefined;
    const root = rootRef.current;
    let disposed = false;
    const splitInstances = [];
    const mm = gsap.matchMedia();
    let lenis;
    let ticker;

    lenis = new Lenis({
      duration: 1.12,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.05,
      wheelMultiplier: 0.92,
      anchors: { duration: 1.28 }
    });
    ticker = (time) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      const setup = () => {
        if (disposed) return;
        const heroHeading = root.querySelector('.hero h1');
        const heroSplit = new SplitType(heroHeading, { types: 'lines, words' });
        splitInstances.push(heroSplit);
        gsap.set(heroSplit.lines, { overflow: 'hidden' });

        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .from('.site-header', { y: -24, opacity: 0, duration: 0.9 })
          .from('.hero-meta', { y: 15, opacity: 0, duration: 0.75 }, '-=.55')
          .from('.hero-kicker', { y: 16, opacity: 0, duration: 0.7 }, '-=.45')
          .from(heroSplit.words, {
            yPercent: 115,
            opacity: 0,
            rotateX: -24,
            duration: 1.05,
            stagger: 0.055,
            transformOrigin: '50% 100%'
          }, '-=.4')
          .from('.hero-bottom > *', { y: 14, opacity: 0, duration: 0.72, stagger: 0.09 }, '-=.6');

        gsap.to('.hero-media img', {
          yPercent: 9,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 }
        });

        gsap.to('.hero-title-wrap', {
          yPercent: -12,
          opacity: 0.18,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: '35% top', end: 'bottom top', scrub: 0.65 }
        });

        ScrollTrigger.create({
          trigger: '.hero',
          start: 'bottom top+=70',
          onEnter: () => root.querySelector('.site-header')?.classList.add('is-floating'),
          onLeaveBack: () => root.querySelector('.site-header')?.classList.remove('is-floating')
        });

        root.querySelectorAll('[data-split-scroll]').forEach((element) => {
          const split = new SplitType(element, { types: 'lines, words' });
          splitInstances.push(split);
          gsap.set(split.lines, { overflow: 'hidden' });
          gsap.from(split.words, {
            yPercent: 108,
            opacity: 0,
            rotateX: -18,
            duration: 1,
            stagger: 0.025,
            ease: 'power3.out',
            transformOrigin: '50% 100%',
            scrollTrigger: { trigger: element, start: 'top 78%', once: true }
          });
        });

        gsap.utils.toArray('.fade-up', root).forEach((element) => {
          gsap.from(element, {
            y: 28,
            opacity: 0,
            filter: 'blur(5px)',
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 84%', once: true }
          });
        });

        gsap.utils.toArray('.reveal-image', root).forEach((element) => {
          gsap.fromTo(element,
            { clipPath: 'inset(100% 0 0 0)' },
            {
              clipPath: 'inset(0% 0 0 0)',
              duration: 1.25,
              ease: 'power4.inOut',
              scrollTrigger: { trigger: element, start: 'top 82%', once: true }
            }
          );
          const image = element.querySelector('img');
          if (image) {
            gsap.from(image, {
              scale: 1.13,
              duration: 1.45,
              ease: 'power3.out',
              scrollTrigger: { trigger: element, start: 'top 82%', once: true }
            });
          }
        });

        gsap.utils.toArray('.parallax-image', root).forEach((element) => {
          const image = element.querySelector('img');
          if (!image) return;
          gsap.fromTo(image, { yPercent: -4 }, {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
          });
        });

        gsap.to('.manifesto-seal', {
          rotation: 52,
          ease: 'none',
          scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: 1 }
        });

        gsap.from('.testimony-ring', {
          scale: 0.72,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.testimony', start: 'top 80%', end: 'center center', scrub: 1 }
        });

        gsap.from('.booking-card', {
          y: 70,
          opacity: 0,
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.reservation', start: 'top 58%', once: true }
        });

        root.querySelectorAll('.section-transition').forEach((section) => {
          gsap.from(section, {
            opacity: 0.86,
            y: 34,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 94%', once: true }
          });
        });

        mm.add('(min-width: 901px)', () => {
          const section = root.querySelector('.gallery-section');
          const track = root.querySelector('.gallery-track');
          const progress = root.querySelector('.gallery-progress span');
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * 0.06);
          const horizontal = gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.85,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => gsap.set(progress, { scaleX: self.progress })
            }
          });

          gsap.utils.toArray('.gallery-card-shell', root).forEach((card) => {
            gsap.fromTo(card, { opacity: 0.48, scale: 0.94 }, {
              opacity: 1,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontal,
                start: 'left 85%',
                end: 'center center',
                scrub: true
              }
            });
          });

          ScrollTrigger.create({
            trigger: '.testimony',
            start: 'top top',
            end: '+=70%',
            pin: '.testimony-inner',
            anticipatePin: 1
          });
        });

        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => gsap.set('.progress span', { scaleX: self.progress })
        });

        window.setTimeout(() => ScrollTrigger.refresh(), 80);
      };

      document.fonts.ready.then(() => context.add(setup));
    }, root);

    const onVisibility = () => {
      if (document.hidden) {
        lenis.stop();
        gsap.globalTimeline.pause();
      } else {
        lenis.start();
        gsap.globalTimeline.resume();
        ScrollTrigger.refresh();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      disposed = true;
      document.removeEventListener('visibilitychange', onVisibility);
      splitInstances.forEach((instance) => instance.revert());
      mm.revert();
      context.revert();
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, [ready, reducedMotion, rootRef]);
}

function App() {
  const rootRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const status = useJaisalmerStatus();

  useCinematicExperience(rootRef, ready, reducedMotion);

  useEffect(() => {
    document.documentElement.classList.toggle('motion-reduced', Boolean(reducedMotion));
    return () => document.documentElement.classList.remove('motion-reduced');
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="site-shell">
      <AnimatePresence mode="wait" onExitComplete={() => setReady(true)}>
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} reducedMotion={reducedMotion} />}
      </AnimatePresence>

      <MouseFollower />
      <div className="progress" aria-hidden="true"><span /></div>

      <header className="site-header" data-header>
        <p className="header-location">Fort Road<br />Jaisalmer</p>
        <MagneticLink className="brand-logo-magnet" href="#top" aria-label="Zayit India Fine Dine, home" strength={0.06}>
          <span className="brand-logo">
            <img src="/images/zayit-official-logo.webp" alt="Zayit India Fine Dine" width="1200" height="1200" />
          </span>
        </MagneticLink>
        <MagneticLink className="header-book" href="#reserve">Reserve a table <i>↗</i></MagneticLink>
      </header>

      <main id="top">
        <section className="hero section-dark" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <picture>
              <source
                type="image/webp"
                srcSet="/images/jaisalmer-night-1280.webp 1280w, /images/jaisalmer-night-2560.webp 2560w"
                sizes="100vw"
              />
              <img
                data-hero-image
                src="/images/jaisalmer-night-panorama.jpg"
                alt=""
                width="3840"
                height="1569"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
          <SandCanvas disabled={reducedMotion} />
          <div className="sand-veil" aria-hidden="true" />
          <p className="eyebrow hero-meta">Jaisalmer, Rajasthan <span /> 26°55&apos; N</p>
          <div className="hero-title-wrap">
            <p className="hero-kicker">Indian &amp; Mediterranean kitchen</p>
            <h1 id="hero-title">The golden hour,<br /><em>served after dark.</em></h1>
          </div>
          <div className="hero-bottom">
            <div className={`live-status ${status.isOpen ? 'is-open' : ''}`}>
              <span className="live-dot" aria-hidden="true" />
              <p><b>{status.isOpen ? 'Now serving' : 'Doors open at 11 AM'}</b><small>Local time {status.formatted}</small></p>
            </div>
            <MagneticLink className="circle-link" href="#story" aria-label="Begin the story"><span>↓</span></MagneticLink>
            <p className="hero-time">For nights that deserve<br />to take their time.</p>
          </div>
        </section>

        <section id="story" className="manifesto section-light section-pad section-transition">
          <div className="section-label fade-up"><span>01</span><span>Our way of gathering</span></div>
          <div className="manifesto-copy">
            <p className="overline fade-up">Not another dinner reservation</p>
            <h2 data-split-scroll>Come hungry.<br /><em>Leave a little later</em><br />than you planned.</h2>
            <div className="manifesto-note fade-up">
              <span className="note-rule" />
              <p>Set above the old city, Zayit brings together fire-led Indian flavours, a Mediterranean ease, and the kind of conversation that does not watch the clock.</p>
            </div>
          </div>
          <div className="manifesto-seal fade-up" aria-label="Zayit fine dine Jaisalmer">
            <span>ZAYIT · ZAYIT · ZAYIT · ZAYIT ·</span><b>Z</b>
          </div>
        </section>

        <section className="table-story section-light section-transition">
          <div className="image-essay">
            <figure className="essay-image image-fire reveal-image parallax-image">
              <img src="/images/zayit-03.jpg" alt="A fire-grilled dish served at Zayit" width="640" height="640" loading="lazy" decoding="async" />
            </figure>
            <figure className="essay-image image-night reveal-image parallax-image">
              <img src="/images/zayit-06.jpg" alt="Whole fish prepared at Zayit" width="640" height="640" loading="lazy" decoding="async" />
            </figure>
            <div className="image-caption fade-up"><span>After sundown</span><span>Jaisalmer / India</span></div>
            <p className="image-number">02</p>
          </div>
          <div className="table-copy">
            <p className="overline fade-up">The table is the destination</p>
            <h2 data-split-scroll>Slow.<br /><em>Glowing.</em><br />A little wild.</h2>
            <p className="fade-up">There is a particular kind of magic in the city after dusk: stone softens, spice warms, and the table becomes the place everyone wants to stay.</p>
            <MagneticLink className="text-link fade-up" href="#reserve">Make an evening of it <i>↗</i></MagneticLink>
          </div>
        </section>

        <section className="gallery-section section-dark section-transition" aria-labelledby="gallery-title">
          <div className="gallery-track">
            <div className="gallery-intro">
              <div className="section-label"><span>02</span><span>A night at Zayit</span></div>
              <h2 id="gallery-title" data-split-scroll>One evening.<br /><em>Four chapters.</em></h2>
              <p>Scroll to follow the night.</p>
              <div className="gallery-progress" aria-hidden="true"><span /></div>
            </div>
            {gallery.map((item) => <GalleryCard key={item.number} item={item} reducedMotion={reducedMotion} />)}
          </div>
        </section>

        <section className="testimony section-sand section-transition">
          <div className="testimony-inner section-pad">
            <div className="testimony-ring" aria-hidden="true" />
            <div className="testimony-rating fade-up"><span>4.8</span><small>Google rating<br />from 490+ reviews</small></div>
            <blockquote data-split-scroll>“The food, the warmth,<br />the <em>whole evening.</em>”</blockquote>
            <p className="testimony-detail fade-up">A local favourite for Indian and Mediterranean flavours,<br />thoughtful service and an easy, unhurried atmosphere.</p>
          </div>
        </section>

        <section id="reserve" className="reservation section-dark section-pad section-transition" aria-labelledby="reserve-title">
          <div className="reservation-orb" aria-hidden="true" />
          <div className="reservation-copy">
            <div className="section-label fade-up"><span>03</span><span>Come to the table</span></div>
            <h2 id="reserve-title" data-split-scroll>Save the<br /><em>best part</em><br />of the day.</h2>
            <p className="fade-up">Reservations are warmly welcomed. Tell us when you would like to join us, and we will take care of the rest.</p>
          </div>
          <motion.div
            className="booking-card glass-card"
            whileHover={reducedMotion ? undefined : { y: -6 }}
            transition={{ type: 'spring', stiffness: 210, damping: 25 }}
          >
            <span className="booking-glare" aria-hidden="true" />
            <p className="booking-title">A table at Zayit</p>
            <MagneticLink className="booking-button booking-primary" href="https://wa.me/917073096695" target="_blank" rel="noreferrer"><span>Reserve on WhatsApp</span><i>↗</i></MagneticLink>
            <MagneticLink className="booking-button" href="tel:+917073096695"><span>Call +91 70730 96695</span><i>↗</i></MagneticLink>
            <div className="booking-foot"><span>Daily</span><span>11 AM — 12:30 AM</span></div>
          </motion.div>
        </section>

        <section className="arrival section-light section-pad section-transition">
          <div className="section-label fade-up"><span>04</span><span>Find us in the Golden City</span></div>
          <div className="arrival-grid">
            <div className="arrival-title">
              <h2 data-split-scroll>Follow the<br /><em>fort road.</em></h2>
              <MagneticLink className="text-link fade-up" href="https://www.google.com/maps/search/?api=1&query=Zayit%20India%20Fine%20Dine%20Jaisalmer" target="_blank" rel="noreferrer">Open in maps <i>↗</i></MagneticLink>
            </div>
            <div className="arrival-details fade-up"><p>Parking, Art Museum<br />First Floor, Fort Road<br />Dibhapara, Jaisalmer<br />Rajasthan 345001</p><p>Every day<br />11:00 AM — 12:30 AM</p></div>
          </div>
        </section>
      </main>

      <footer className="footer section-dark section-transition">
        <div className="footer-brand reveal-image">
          <img src="/images/zayit-official-logo.webp" alt="Zayit India Fine Dine" width="1200" height="1200" loading="lazy" decoding="async" />
        </div>
        <div className="footer-bottom"><p>India Fine Dine · Jaisalmer</p><a href="https://www.instagram.com/zayitindiafinedine/" target="_blank" rel="noreferrer" data-cursor="expand">Instagram ↗</a><p>© {new Date().getFullYear()} Zayit</p></div>
        <p className="photo-credit">Hero photograph: Jitendra Parande / Wikimedia Commons · CC BY-SA</p>
      </footer>
    </div>
  );
}

export default App;
