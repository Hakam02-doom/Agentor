'use client';

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';

type IconName = 'sparkles' | 'zap' | 'search' | 'write' | 'link' | 'rocket' | 'diamond' | 'hexagon' | 'sprout' | 'shield' | 'check';

function useScrollReveals() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    root.classList.add('motion-ready');
    const mountReveals = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal-mount]'));
    const scrollReveals = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal-mount])'));
    const allReveals = [...mountReveals, ...scrollReveals];
    allReveals.forEach((element) => element.classList.remove('is-visible'));
    let revealFrame = 0;
    const paintFrame = requestAnimationFrame(() => {
      revealFrame = requestAnimationFrame(() => mountReveals.forEach((element) => element.classList.add('is-visible')));
    });

    const observers = [0, 0.5].map((threshold) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          const requiredThreshold = Number(element.dataset.revealThreshold ?? 0);
          const repeats = element.hasAttribute('data-reveal-repeat');

          if (repeats) {
            if (entry.isIntersecting && entry.intersectionRatio >= requiredThreshold) {
              element.classList.add('is-visible');
            } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
              element.classList.remove('is-visible');
            }
            return;
          }

          if (!entry.isIntersecting || entry.intersectionRatio < requiredThreshold) return;
          element.classList.add('is-visible');
          observer.unobserve(element);
        });
      }, { threshold: threshold === 0 ? [0] : [0, threshold] });

      scrollReveals
        .filter((element) => Number(element.dataset.revealThreshold ?? 0) === threshold)
        .forEach((element) => observer.observe(element));
      return observer;
    });

    return () => {
      cancelAnimationFrame(paintFrame);
      if (revealFrame) cancelAnimationFrame(revealFrame);
      observers.forEach((observer) => observer.disconnect());
      allReveals.forEach((element) => element.classList.remove('is-visible'));
      root.classList.remove('motion-ready');
    };
  }, []);
}

function RevealHeading({
  as: HeadingTag,
  children,
  id,
  mount = false,
  repeat = false,
  breakAfter,
}: {
  as: 'h1' | 'h2';
  children: string;
  id?: string;
  mount?: boolean;
  repeat?: boolean;
  breakAfter?: number;
}) {
  const words = children.split(' ');
  return (
    <HeadingTag
      id={id}
      className="reveal-words"
      data-reveal="words"
      data-reveal-mount={mount ? '' : undefined}
      data-reveal-repeat={repeat ? '' : undefined}
      data-reveal-threshold="0"
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="reveal-word" style={{ transitionDelay: `${50 + index * 50}ms` }}>{word}</span>
          {index === breakAfter ? <br className="desktop-break" /> : index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </HeadingTag>
  );
}

function UiIcon({ name }: { name: IconName }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true">
      {name === 'sparkles' ? <><path {...common} d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z" /><path {...common} d="m18.5 14 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" /></> : null}
      {name === 'zap' ? <path {...common} d="M13.5 2.8 5.8 13h5.4l-.7 8.2L18.2 11h-5.4l.7-8.2Z" /> : null}
      {name === 'search' ? <><circle {...common} cx="10.5" cy="10.5" r="5.5" /><path {...common} d="m15 15 5 5" /></> : null}
      {name === 'write' ? <><path {...common} d="m4 20 4.3-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" /><path {...common} d="m14 7 3 3" /></> : null}
      {name === 'link' ? <><path {...common} d="m9.5 14.5-1.8 1.8a3.6 3.6 0 1 1-5-5l3.1-3.1a3.6 3.6 0 0 1 5 0" /><path {...common} d="m14.5 9.5 1.8-1.8a3.6 3.6 0 1 1 5 5l-3.1 3.1a3.6 3.6 0 0 1-5 0" /><path {...common} d="m8.5 15.5 7-7" /></> : null}
      {name === 'rocket' ? <><path {...common} d="M14.5 4.2c2.3-1.5 4.7-1.2 5.3-1 .2.7.5 3-1 5.3l-5.5 5.5-3.8.5.5-3.8 4.5-6.5Z" /><path {...common} d="m10 10-4.5.8-2.3 2.3 5.3.4M14 14l-.8 4.5-2.3 2.3-.4-5.3" /><circle {...common} cx="15.8" cy="7.2" r="1.3" /></> : null}
      {name === 'diamond' ? <path {...common} d="m12 3 8 9-8 9-8-9 8-9Z" /> : null}
      {name === 'hexagon' ? <path {...common} d="m7 3 10 0 5 9-5 9H7l-5-9 5-9Z" /> : null}
      {name === 'sprout' ? <><path fill="currentColor" d="M11.5 13.5C7.3 13.3 4.9 11.2 4.7 7.1c4.3-.2 6.8 1.8 6.8 6.4ZM12.1 12.2c.4-3.6 2.7-5.2 6.9-4.8-.4 3.8-2.7 5.4-6.9 4.8Z" /><path {...common} strokeWidth="2.2" d="M12 20v-8.2" /></> : null}
      {name === 'shield' ? <path {...common} d="M12 3.2 19 6v5.1c0 4.4-2.6 7.8-7 9.7-4.4-1.9-7-5.3-7-9.7V6l7-2.8Z" /> : null}
      {name === 'check' ? <path {...common} d="m4.5 12.5 4.5 4.5 10.5-11" /> : null}
    </svg>
  );
}

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="Agentor home">
      <img className="brand-mark" src="/agentor-mark.svg" alt="" />
      <span>Agentor</span>
    </a>
  );
}

function PrimaryButton({ children = 'See Demo' }: { children?: React.ReactNode }) {
  return <a className="button button-primary" href="#pricing">{children}</a>;
}

function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const compactRef = useRef(false);
  const previousLayoutRef = useRef<{ surface: DOMRect; items: DOMRect[] } | null>(null);
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(max-width: 700px)').matches) return;
    let previousY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const currentY = window.scrollY;
      const delta = currentY - previousY;

      if (Math.abs(delta) >= 2) {
        const nextCompact = delta > 0;
        if (nextCompact !== compactRef.current) {
          const header = headerRef.current;
          if (header) {
            const surface = header.querySelector<HTMLElement>('.header-surface');
            const items = Array.from(header.querySelectorAll<HTMLElement>('.header-motion-item'));
            if (surface) {
              previousLayoutRef.current = {
                surface: surface.getBoundingClientRect(),
                items: items.map((item) => item.getBoundingClientRect()),
              };
              [surface, ...items].forEach((item) => item.getAnimations().forEach((animation) => animation.cancel()));
            }
          }
          compactRef.current = nextCompact;
          setCompact(nextCompact);
        }
        previousY = currentY;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    if (previousY > 0) {
      compactRef.current = true;
      setCompact(true);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  useLayoutEffect(() => {
    const header = headerRef.current;
    const previousLayout = previousLayoutRef.current;
    previousLayoutRef.current = null;
    if (!header || !previousLayout || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(max-width: 700px)').matches) return;

    const surface = header.querySelector<HTMLElement>('.header-surface');
    const items = Array.from(header.querySelectorAll<HTMLElement>('.header-motion-item'));
    if (!surface) return;

    const animateLayout = (element: HTMLElement, previousRect: DOMRect) => {
      const nextRect = element.getBoundingClientRect();
      const scaleX = previousRect.width / nextRect.width;
      const scaleY = previousRect.height / nextRect.height;
      const translateX = previousRect.left + previousRect.width / 2 - (nextRect.left + nextRect.width / 2);
      const translateY = previousRect.top + previousRect.height / 2 - (nextRect.top + nextRect.height / 2);

      element.style.willChange = 'transform';
      const animation = element.animate([
        { transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})` },
        { transform: 'translate3d(0, 0, 0) scale(1, 1)' },
      ], {
        duration: 520,
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
      });
      animation.onfinish = () => { element.style.willChange = ''; };
      animation.oncancel = () => { element.style.willChange = ''; };
      return animation;
    };

    const animations = [animateLayout(surface, previousLayout.surface)];
    items.forEach((item, index) => {
      const previousRect = previousLayout.items[index];
      if (previousRect) animations.push(animateLayout(item, previousRect));
    });
    return () => animations.forEach((animation) => animation.cancel());
  }, [compact]);

  return (
    <header
      ref={headerRef}
      className={`site-header${compact ? ' is-compact' : ''}${menuOpen ? ' is-menu-open' : ''}`}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest('a')) setMenuOpen(false);
      }}
    >
      <span className="header-surface" aria-hidden="true" />
      <div className="header-motion-item"><Logo /></div>
      <nav id="primary-navigation" className="header-motion-item" aria-label="Primary navigation">
        <a href="#features">Why Us</a>
        <a href="#process">How it works</a>
        <a href="#testimonials">Testimonial</a>
        <a href="#pricing">Pricing</a>
      </nav>
      <div className="header-motion-item header-action"><PrimaryButton /></div>
      <button
        className="menu-button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-controls="primary-navigation"
        aria-expanded={menuOpen}
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
      ><span /><span /><span /></button>
    </header>
  );
}

const avatarUrls = [
  'https://framerusercontent.com/images/f4zMDGKgne3z2CabNv59yFC5Ts.png?width=112&height=112',
  'https://framerusercontent.com/images/1OibBLCSU0OvduozAJlOkPHS84.png?width=112&height=112',
  'https://framerusercontent.com/images/ynm21TuS2o1RokaGHWNzIQZxY.png?width=112&height=112',
  'https://framerusercontent.com/images/nHMfWlkelM6UfgUNmnBnDgkW720.png?width=112&height=112',
];

function TrustPill() {
  return (
    <div className="trust-pill" data-reveal="rise" data-reveal-mount>
      <span className="avatar-stack" aria-hidden="true">
        {avatarUrls.map((url) => <img key={url} src={url} alt="" />)}
      </span>
      <span>Trusted by 100+ Users</span>
    </div>
  );
}

function SourceLogo({ kind }: { kind: 'google' | 'wikipedia' | 'reddit' }) {
  if (kind === 'google') {
    return (
      <span className="source-logo google" aria-hidden="true">
        <svg viewBox="0 0 18 18">
          <path fill="#4285f4" d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.482h4.844a4.14 4.14 0 0 1-1.797 2.716v2.258h2.908c1.703-1.567 2.685-3.874 2.685-6.615Z" />
          <path fill="#34a853" d="M9 18c2.43 0 4.468-.806 5.955-2.18l-2.908-2.258c-.806.54-1.836.859-3.047.859-2.344 0-4.328-1.585-5.037-3.714H.956v2.332A9 9 0 0 0 9 18Z" />
          <path fill="#fbbc05" d="M3.963 10.707A5.42 5.42 0 0 1 3.682 9c0-.593.102-1.17.281-1.707V4.961H.956A9 9 0 0 0 0 9c0 1.452.347 2.827.956 4.039l3.007-2.332Z" />
          <path fill="#ea4335" d="M9 3.58c1.322 0 2.508.455 3.441 1.346l2.582-2.582C13.464.892 11.426 0 9 0A9 9 0 0 0 .956 4.961l3.007 2.332C4.672 5.165 6.656 3.58 9 3.58Z" />
        </svg>
      </span>
    );
  }
  if (kind === 'wikipedia') {
    return (
      <span className="source-logo wikipedia" aria-hidden="true">
        <svg viewBox="0 0 32 32"><text x="1" y="27">W</text></svg>
      </span>
    );
  }
  return (
    <span className="source-logo reddit" aria-hidden="true">
      <svg viewBox="0 0 548 512">
        <path fill="currentColor" d="M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.7-42.4L288 71.5l73.2 16.3c0 18.2 14.8 33 33 33s33-14.8 33-33-14.8-33-33-33c-12.9 0-24.1 7.4-29.5 18.2l-81.3-18.1a8.8 8.8 0 0 0-10.7 6.8L247 176.9c-55.6 1.5-105.8 17.3-142.5 42.4-9.8-9.9-23.3-16-38.2-16-33.7 0-61.1 27.4-61.1 61.1 0 24.8 14.8 46.1 36 55.7-1.1 5.7-1.7 11.5-1.7 17.4 0 88.9 103.9 160.9 232 160.9s232-72 232-160.9c0-6.1-.5-12.1-1.8-17.9 20.6-9.7 34.9-30.8 34.9-55.2 0-33.5-27.4-60.9-61.2-60.9Zm-313.6 105.9c0-18.2 14.8-33 33-33s33 14.8 33 33-14.8 33-33 33-33-14.8-33-33Zm233.7 91.1c-26.4 26.4-77.2 28.4-85.9 28.4s-59.4-2-85.9-28.4a10.2 10.2 0 0 1 14.4-14.4c16.9 16.9 52.5 22.9 71.5 22.9s54.6-6 71.5-22.9a10.2 10.2 0 0 1 14.4 14.4Zm28.2-58.1c-18.2 0-33-14.8-33-33s14.8-33 33-33 33 14.8 33 33-14.8 33-33 33Z" />
      </svg>
    </span>
  );
}

const agentTabs = ['Research', 'Support', 'Sales', 'Code Review'] as const;

function AgentConsole() {
  const consoleRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [countProgress, setCountProgress] = useState(0);

  useEffect(() => {
    const element = consoleRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.28 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasEntered) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCountProgress(1);
      return;
    }

    setCountProgress(0);
    const duration = 1050;
    const startedAt = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const linear = Math.min((now - startedAt) / duration, 1);
      setCountProgress(1 - Math.pow(1 - linear, 3));
      if (linear < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [activeTab, hasEntered]);

  const count = (from: number, to: number) => Math.round(from + (to - from) * countProgress);
  const panels = [
    {
      title: 'Research Agent',
      content: (
        <div className="sources">
          <div className="source-card"><SourceLogo kind="google" /><span>Google</span><b className="success"><UiIcon name="check" /></b></div>
          <div className="source-card"><SourceLogo kind="wikipedia" /><span>Wikipedia</span><b className="loading" aria-label="Loading" /></div>
          <div className="source-card muted"><SourceLogo kind="reddit" /><span>Reddit</span><b className="loading" aria-label="Loading" /></div>
        </div>
      ),
      metrics: [[`${count(0, 42)}`, 'Sources', ''], [`${count(20, 42)}s`, 'Avg Fetch', ''], [`${count(80, 90)}%`, 'Accuracy', '']],
    },
    {
      title: 'Support Agent',
      content: (
        <div className="support-thread">
          <div className="support-line support-line-user"><i className="support-avatar">A</i><p>My API key stopped working after the plan upgrade<br />— getting 403 on every request.</p></div>
          <div className="support-line support-line-agent"><p>I see the issue — your key was provisioned before the upgrade. I&apos;ve rotated it to your new plan scope. Try this key: nxs_prod_k9m2...</p><i className="support-avatar support-avatar-agent"><UiIcon name="sparkles" /></i></div>
          <div className="support-line support-line-user support-line-muted"><i className="support-avatar">A</i><p>It works, thanks!</p></div>
        </div>
      ),
      metrics: [[`${count(0, 28)}s`, 'Avg First Response', ''], [`${count(80, 98)}%`, 'Resolution Rate', '']],
    },
    {
      title: 'Sales Agent',
      content: (
        <div className="sales-leads">
          <div className="lead-card"><div><i>SC</i><span><strong>Sarah Chen</strong><small>via Slack</small></span><b>Sent</b></div><p>Personalized intro based on her recent talk on edge compute + your case study...</p></div>
          <div className="lead-card"><div><i>ML</i><span><strong>Marcus Liu</strong><small>via Notion</small></span><b className="lead-draft">In Draft</b></div><p>Follow-up sequence triggered after 3-day no response. Tone adjusted...</p></div>
        </div>
      ),
      metrics: [[count(0, 5000).toLocaleString('en-US'), 'Prospects', ''], [`$${count(0, 20)}M`, 'Revenue', ''], [`${count(0, 50)}%`, 'Growth', '']],
    },
    {
      title: 'Code Review Agent',
      content: (
        <div className="review-card">
          <strong>src/auth/middleware.ts — 3 suggestions</strong>
          <pre><span className="code-purple">const</span> <mark>agent = <span className="code-purple">new</span> <span className="code-blue">NexusAgent</span>({'{'}</mark>{'\n'}  <span className="code-blue">model</span>: <span className="code-green">&quot;nexus-v3&quot;</span>,{'\n'}  <span className="code-blue">tools</span>: [<span className="code-blue">search</span>, <span className="code-blue">code</span>],{'\n'}  <em><span className="code-blue">memory</span>: <span className="code-purple">true</span>,</em>{'\n'}{'});'}{'\n\n'}<span className="code-purple">await</span> <span className="code-blue">agent</span>.<span className="code-orange">run</span>(<span className="code-blue">task</span>);{'\n'}<small>// deployed to edge network</small></pre>
        </div>
      ),
      metrics: [[`${count(0, 10)}`, 'Security', 'danger'], [`${count(0, 20)}`, 'Warning', 'warning'], [`${count(0, 50)}`, 'Suggestion', 'good']],
    },
  ];

  return (
    <div ref={consoleRef} className="agent-console" data-reveal="rise" data-reveal-threshold="0" aria-label="Agent demonstrations">
      <div className="console-tabs" role="tablist" aria-label="Agent type">
        {agentTabs.map((tab, index) => (
          <button
            key={tab}
            id={`agent-tab-${index}`}
            className={activeTab === index ? 'active' : ''}
            type="button"
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`agent-panel-${index}`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="console-window">
        <div className="console-bar">
          <span className="traffic"><i /><i /><i /></span>
          <strong>{panels[activeTab].title}</strong>
          <span className="status"><i /> Running</span>
        </div>
        <div className="console-body">
          {panels.map((panel, index) => (
            <div
              key={panel.title}
              id={`agent-panel-${index}`}
              className={`console-panel${activeTab === index ? ' is-active' : ''}`}
              role="tabpanel"
              aria-labelledby={`agent-tab-${index}`}
              aria-hidden={activeTab !== index}
            >
              <div className="console-content">{panel.content}</div>
              <div className={`metrics${panel.metrics.length === 2 ? ' metrics-two' : ''}`}>
                {panel.metrics.map(([value, label, tone]) => (
                  <div key={label}><strong className={tone}>{value}</strong><span>{label}</span></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  label,
  title,
  description,
  sparkle = false,
}: {
  label: string;
  title: string;
  description?: string;
  sparkle?: boolean;
}) {
  return (
    <div className="section-heading">
      <div className={`section-label${sparkle ? ' sparkle-label' : ''}`}>
        <span aria-hidden="true">{sparkle ? <ProcessIcon name="sparkles" /> : null}</span>
        {label}
      </div>
      <RevealHeading as="h2">{title}</RevealHeading>
      {description ? <p data-reveal="rise" data-reveal-threshold="0.5">{description}</p> : null}
    </div>
  );
}

function Pipeline() {
  const nodes: Array<[string, IconName]> = [
    ['Trigger', 'zap'],
    ['Research', 'search'],
    ['Write', 'write'],
  ];
  return (
    <div className="pipeline" aria-label="Trigger, research, and write agents connected in a pipeline">
      {nodes.map(([name, icon], index) => (
        <div className="pipeline-group" key={name}>
          <div className="pipeline-node">
            <div className="node-title"><i><UiIcon name={icon} /></i><strong>{name}</strong></div>
            <div className="node-meta"><span>Model</span><b>GPT 4</b></div>
          </div>
          {index < 2 ? <span className="pipeline-link" aria-hidden="true"><i /><i /><i /></span> : null}
        </div>
      ))}
    </div>
  );
}

function CodeWindow() {
  return (
    <div className="code-window" aria-label="TypeScript agent example">
      <div className="code-title"><span className="traffic"><i /><i /><i /></span><code>agent.ts</code></div>
      <pre><code><span className="pink">const</span> agent = <span className="pink">new</span> <span className="cyan">AgentorAgent</span>({'{'}{`\n`}  model: <span className="green">&quot;Agentor-v3&quot;</span>,{`\n`}  tools: [<span className="blue">search</span>, <span className="blue">code</span>],{`\n`}  memory: <span className="pink">true</span>,{`\n`}{'}'});{`\n\n`}<span className="pink">await</span> agent.<span className="cyan">run</span>(task);{`\n`}<span className="comment">// deployed to edge network</span></code></pre>
    </div>
  );
}

type IntegrationLogoName = 'teams' | 'telegram' | 'drive' | 'github' | 'notion' | 'slack';

function IntegrationLogo({ name }: { name: IntegrationLogoName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {name === 'teams' ? <>
        <circle cx="16.8" cy="6" r="2.4" fill="#7b83eb" />
        <circle cx="20.2" cy="8.2" r="1.7" fill="#5059c9" />
        <path d="M13.7 9h5.8v5.6a3.7 3.7 0 0 1-7.4 0V10.6A1.6 1.6 0 0 1 13.7 9Z" fill="#6264a7" />
        <rect x="3" y="7.2" width="11.5" height="11.5" rx="2.2" fill="#4f5bd5" />
        <path d="M6 10h6v1.8H9.9v4.6H8v-4.6H6Z" fill="#fff" />
      </> : null}
      {name === 'telegram' ? <>
        <circle cx="12" cy="12" r="10" fill="#27a7e7" />
        <path d="m6.1 11.6 11.2-4.3c.5-.2 1 .1.8.9l-1.9 8.9c-.1.6-.5.7-1 .4l-2.9-2.1-1.4 1.3c-.2.2-.3.3-.6.3l.2-3 5.5-5c.2-.2-.1-.4-.4-.2l-6.8 4.3-2.9-.9c-.6-.2-.6-.5.2-.8Z" fill="#fff" />
      </> : null}
      {name === 'drive' ? <>
        <path d="M8.7 3h6.4l6 10.4h-6.3Z" fill="#fbbc04" />
        <path d="m8.7 3 3.2 5.5-6 10.4H0Z" transform="translate(1.5 0)" fill="#34a853" />
        <path d="M7.4 14.1h12.1L16.2 20H4Z" fill="#4285f4" />
      </> : null}
      {name === 'github' ? <>
        <circle cx="12" cy="12" r="10" fill="#111827" />
        <path d="M12 5.1a6.1 6.1 0 0 0-1.9 11.9v-1.4c-1.6.3-1.9-.7-1.9-.7-.3-.7-.7-.9-.7-.9-.6-.4 0-.4 0-.4.6 0 1 .7 1 .7.6 1 1.5.7 1.9.5.1-.4.2-.7.4-.9-1.3-.1-2.7-.6-2.7-3a2.3 2.3 0 0 1 .6-1.6 2.2 2.2 0 0 1 .1-1.6s.5-.2 1.7.6a5.8 5.8 0 0 1 3 0c1.2-.8 1.7-.6 1.7-.6.3.8.1 1.4.1 1.6.4.4.6 1 .6 1.6 0 2.4-1.4 2.9-2.7 3 .3.2.4.7.4 1.3V17A6.1 6.1 0 0 0 12 5.1Z" fill="#fff" />
      </> : null}
      {name === 'notion' ? <>
        <path d="M5 3.3 17.4 2l2.1 1.7v16L7 21.1 4.5 19.3V4.7Z" fill="#fff" stroke="#111" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="m5 4.7 12.3-1.3 2.2 1.7L7 6.5Z" fill="#fff" stroke="#111" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M8.2 8.2v8.6l1.8-.2v-5.1l4.3 5 1.6-.2V7.8l-1.7.2v5.1l-4.3-5.2Z" fill="#111" />
      </> : null}
      {name === 'slack' ? <>
        <rect x="9.7" y="2.5" width="4.1" height="9" rx="2" fill="#36c5f0" />
        <rect x="12.2" y="9.7" width="9" height="4.1" rx="2" fill="#2eb67d" />
        <rect x="10.2" y="12.2" width="4.1" height="9" rx="2" fill="#ecb22e" />
        <rect x="2.8" y="10.2" width="9" height="4.1" rx="2" fill="#e01e5a" />
        <circle cx="7.7" cy="7.7" r="2" fill="#e01e5a" />
        <circle cx="16.3" cy="7.7" r="2" fill="#36c5f0" />
        <circle cx="16.3" cy="16.3" r="2" fill="#2eb67d" />
        <circle cx="7.7" cy="16.3" r="2" fill="#ecb22e" />
      </> : null}
    </svg>
  );
}

function IntegrationSparkMark() {
  return (
    <svg className="integration-spark" viewBox="0 0 40 40" aria-hidden="true">
      <path fill="currentColor" d="M14.5 11.5c.9 7.4 4.1 10.6 11.5 11.5-7.4.9-10.6 4.1-11.5 11.5C13.6 27.1 10.4 23.9 3 23c7.4-.9 10.6-4.1 11.5-11.5Z" />
      <path fill="currentColor" d="M28 2c.6 4.7 2.7 6.8 7.4 7.4-4.7.6-6.8 2.7-7.4 7.4-.6-4.7-2.7-6.8-7.4-7.4C25.3 8.8 27.4 6.7 28 2Z" />
    </svg>
  );
}

function ProcessIcon({ name }: { name: 'sparkles' | 'link' | 'rocket' }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      {name === 'sparkles' ? (
        <path fill="currentColor" d="M9.863 4.85c.842-2.462 4.243-2.536 5.241-.223l.084.225 1.135 3.319a5.54 5.54 0 0 0 3.201 3.392l.306.113 3.319 1.135c2.462.84 2.536 4.242.226 5.239l-.226.085-3.319 1.135a5.54 5.54 0 0 0-3.393 3.201l-.114.304-1.134 3.321c-.841 2.462-4.242 2.536-5.238.225l-.088-.225-1.133-3.32a5.54 5.54 0 0 0-3.201-3.392l-.304-.114-3.32-1.134c-2.463-.841-2.537-4.242-.225-5.238l.225-.087 3.32-1.135a5.54 5.54 0 0 0 3.391-3.201l.114-.304L9.863 4.85ZM23.78 0c.537 0 1.026.306 1.262.788l.068.165.493 1.443 1.444.492a1.4 1.4 0 0 1 .166 2.595l-.166.068-1.443.492-.492 1.445a1.4 1.4 0 0 1-2.596.164l-.067-.164-.492-1.443-1.445-.492a1.4 1.4 0 0 1-.166-2.596l.166-.067 1.443-.493.492-1.444A1.4 1.4 0 0 1 23.78 0Z" />
      ) : null}
      {name === 'link' ? (
        <>
          <path fill="currentColor" d="M19.97 8.392a1.556 1.556 0 0 1 0 2.2l-9.338 9.337a1.556 1.556 0 1 1-2.199-2.199l9.337-9.338a1.556 1.556 0 0 1 2.2 0Z" />
          <path fill="currentColor" d="M25.276 2.736a9.34 9.34 0 0 1-.081 13.281l-.831.722a1.556 1.556 0 0 1-2.041-2.35l.751-.647a6.226 6.226 0 0 0 0-8.804 6.22 6.22 0 0 0-8.725-.084l-.721.834a1.556 1.556 0 0 1-2.356-2.035l.798-.918a9.337 9.337 0 0 1 13.206.001ZM5.836 11.421a1.556 1.556 0 0 1-.137 2.196l-.752.661a6.226 6.226 0 0 0 0 8.792 6.22 6.22 0 0 0 8.837.058l.528-.712a1.556 1.556 0 1 1 2.5 1.858l-.618.831-.155.178a9.337 9.337 0 0 1-13.28 0 9.337 9.337 0 0 1 .064-13.276l.816-.721a1.556 1.556 0 0 1 2.197.135Z" />
        </>
      ) : null}
      {name === 'rocket' ? (
        <path fill="currentColor" d="M10.109 5.617c-2.96 3.323-4.992 8.096-5.18 8.546L1.65 12.755a1.45 1.45 0 0 1-.451-2.364l4.368-4.368a2.9 2.9 0 0 1 2.626-.798Zm2.161 14.742a1.45 1.45 0 0 0 1.625.289c1.683-.783 5.296-2.626 7.632-4.962 6.659-6.659 6.718-12.085 6.326-14.407a1.45 1.45 0 0 0-1.147-1.147c-2.321-.391-7.747-.333-14.407 6.327-2.336 2.335-4.164 5.948-4.962 7.632a1.45 1.45 0 0 0 .291 1.624Zm10.113-2.468c-3.323 2.96-8.096 4.992-8.546 5.18l1.408 3.279a1.45 1.45 0 0 0 2.364.451l4.368-4.368a2.9 2.9 0 0 0 .798-2.626ZM9.746 21.664a4.35 4.35 0 0 1-1.19 3.932c-1.117 1.117-4.585 1.945-6.834 2.38a1.45 1.45 0 0 1-1.698-1.698c.435-2.249 1.249-5.717 2.38-6.834a4.35 4.35 0 0 1 7.342 2.22Zm5.891-12.202a2.902 2.902 0 1 1 5.803 0 2.902 2.902 0 0 1-5.803 0Z" />
      ) : null}
    </svg>
  );
}

function IntegrationOrbit() {
  const logos: IntegrationLogoName[] = ['teams', 'telegram', 'drive', 'github', 'notion', 'slack'];

  return (
    <div className="integration-orbit" aria-hidden="true">
      <div className="integration-track">
        {[...logos, ...logos].map((name, index) => (
          <span key={`${name}-${index}`}><IntegrationLogo name={name} /></span>
        ))}
      </div>
      <b><IntegrationSparkMark /></b>
    </div>
  );
}

function ObservabilityGraphic() {
  return (
    <div className="observability-graphic" aria-hidden="true">
      <img src="https://framerusercontent.com/images/07EZQoGcJtJ1vVn13q4M5TW7yW4.png?scale-down-to=512&width=936&height=640" alt="" />
    </div>
  );
}

const uptimeFrames = [
  { value: 99, bars: [58, 86, 42, 74, 48, 55, 24, 77, 58] },
  { value: 97, bars: [46, 68, 82, 54, 77, 43, 64, 35, 70] },
  { value: 94, bars: [71, 43, 61, 84, 38, 72, 49, 66, 31] },
  { value: 90, bars: [35, 59, 76, 44, 69, 30, 82, 51, 64] },
];

function UptimeCard() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = window.setInterval(() => setFrame((current) => (current + 1) % uptimeFrames.length), 850);
    return () => window.clearInterval(interval);
  }, []);

  const current = uptimeFrames[frame];
  return (
    <article className="feature-card uptime-card" data-reveal="pop" data-reveal-threshold="0.5">
      <p>Uptime</p>
      <strong>{current.value}%</strong>
      <p>SLA-backed. Multi-region failover built in.</p>
      <div className="uptime-bars" aria-hidden="true">
        {current.bars.map((height, index) => <i key={index} style={{ height: `${height}px` }} />)}
      </div>
    </article>
  );
}

function Features() {
  return (
    <section className="features section-shell" id="features">
      <SectionHeading
        label="Features"
        title="Everything agents need to handle real complexity"
        description="From multi-step orchestration to full observability. Production-ready from day one."
      />
      <div className="feature-grid">
        <div className="feature-row feature-row-top">
          <article className="feature-card orchestration-card" data-reveal="pop" data-reveal-threshold="0.5">
            <h3>Multi-agent orchestration</h3>
            <p>Chain specialized agents into dynamic pipelines. Pass context, branch on conditions, handle failures automatically.</p>
            <Pipeline />
          </article>
          <article className="feature-card code-card" data-reveal="pop" data-reveal-threshold="0.5">
            <h3>Code-first SDK</h3>
            <p>TypeScript and Python. Full type safety. One command to deploy to the edge.</p>
            <CodeWindow />
          </article>
        </div>
        <div className="feature-row feature-row-bottom">
          <article className="feature-card integrations-card" data-reveal="pop" data-reveal-threshold="0.5">
            <h3>500+ integrations</h3>
            <p>Connect every tool your team uses. OAuth handled automatically.</p>
            <IntegrationOrbit />
          </article>
          <article className="feature-card observability-card" data-reveal="pop" data-reveal-threshold="0.5">
            <h3>Full observability</h3>
            <p>Every step, token, and tool call traced and searchable.</p>
            <ObservabilityGraphic />
          </article>
          <UptimeCard />
        </div>
      </div>
    </section>
  );
}

const processSteps: Array<{ icon: IconName; number: string; title: string; body: string }> = [
  {
    icon: 'sparkles',
    number: '01',
    title: 'Define your agent',
    body: 'Describe the goal in plain language or use the visual builder. Set tools, memory depth, and model.',
  },
  {
    icon: 'link',
    number: '02',
    title: 'Connect your tools',
    body: 'Link your APIs, databases, and SaaS apps in one click. OAuth is handled automatically. 500+ integrations ready to go.',
  },
  {
    icon: 'rocket',
    number: '03',
    title: 'Deploy & scale',
    body: 'Push to the edge network with one command. Agents run 24/7, handle failures automatically, and scale with your workload.',
  },
];

function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const processRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateStep = () => {
      frame = 0;
      const section = processRef.current;
      if (!section) return;
      const scrollArea = section.querySelector<HTMLElement>('.process-scroll');
      const stickyPanel = section.querySelector<HTMLElement>('.process-sticky');
      if (!scrollArea || !stickyPanel) return;

      const scrollStyles = window.getComputedStyle(scrollArea);
      const panelStyles = window.getComputedStyle(stickyPanel);
      const paddingTop = Number.parseFloat(scrollStyles.paddingTop) || 0;
      const stickyTop = Number.parseFloat(panelStyles.top) || 0;
      const stickyStart = Math.max(paddingTop - stickyTop, 0);
      const stickyTravel = Math.max(scrollArea.offsetHeight - paddingTop - stickyPanel.offsetHeight, 1);
      const sectionScroll = window.scrollY - section.offsetTop - stickyStart;
      const progress = Math.min(1, Math.max(0, sectionScroll / stickyTravel));
      setActiveStep(progress < 0.4 ? 0 : progress < 0.78 ? 1 : 2);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateStep);
    };

    updateStep();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  const step = processSteps[activeStep];

  return (
    <section className="process-section" id="process" ref={processRef}>
      <div className="process-scroll">
        <div className="process-sticky">
          <SectionHeading label="Process" title="From idea to running agent in minutes" />
          <div className={`process-ring process-ring-${activeStep}`} aria-hidden="true">
            <div className="process-arc" />
            {processSteps.map((item, index) => (
              <i className={`process-marker process-marker-${index + 1}`} key={item.number}>
                <ProcessIcon name={item.icon as 'sparkles' | 'link' | 'rocket'} />
              </i>
            ))}
          </div>
          <article className="process-content" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote: 'Agentor completely changed how our team handles data pipelines. What used to take three engineers a full sprint now runs autonomously in the background. The multi-agent orchestration is genuinely impressive — it just works.',
    name: 'Sarah Mitchell',
    role: 'Head of Engineering',
    image: 'https://framerusercontent.com/images/wgE6hya7v8kZNWOVdQLvuEKypY.png?scale-down-to=512&width=592&height=592',
  },
  {
    quote: "We evaluated five agent platforms before choosing Agentor. The TypeScript SDK is clean, the observability dashboard is best-in-class, and we haven't had a single outage in eight months. It's the foundation our product is built on.",
    name: 'Marcus Chen',
    role: 'CTO, Loopline',
    image: 'https://framerusercontent.com/images/fFJ3L0aHtxyaXKiXvnq8YiEVQ.png?scale-down-to=512&width=592&height=592',
  },
  {
    quote: "I was skeptical about handing off complex workflows to agents, but Agentor's tracing tools gave us the confidence to do it. Every decision is logged, every tool call is visible. We shipped our first autonomous feature in under a week.",
    name: 'Priya Nair',
    role: 'Product Lead, Stackflow',
    image: 'https://framerusercontent.com/images/74iLNcb5JdtIU2JKaPZyNUeZGU.png?scale-down-to=512&width=592&height=592',
  },
];

function TestimonialCard({ item, index }: { item: (typeof testimonials)[number]; index: number }) {
  return (
    <article
      className="testimonial-card"
      data-reveal="pop"
      data-reveal-repeat
      data-reveal-threshold="0.5"
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <p>{item.quote}</p>
      <footer><img src={item.image} alt="" /><div><strong>{item.name}</strong><span>{item.role}</span></div></footer>
    </article>
  );
}

function Testimonials() {
  const [position, setPosition] = useState(0);

  return (
    <section className="testimonials section-shell" id="testimonials">
      <div className="testimonial-heading">
        <div className="section-label testimonial-label" data-reveal="rise" data-reveal-repeat data-reveal-threshold="0">
          <span aria-hidden="true"><ProcessIcon name="sparkles" /></span>
          Testimonial
        </div>
        <RevealHeading as="h2" repeat>Teams that run on Agentor</RevealHeading>
      </div>
      <div className="testimonial-carousel">
        <div className="testimonial-viewport">
          <div className={`testimonial-track testimonial-position-${position}`}>
            {testimonials.map((item, index) => <TestimonialCard item={item} index={index} key={item.name} />)}
          </div>
        </div>
        <button
          className="testimonial-arrow testimonial-prev"
          type="button"
          aria-label="Previous testimonials"
          disabled={position === 0}
          onClick={() => setPosition((current) => Math.max(0, current - 1))}
        ><span /></button>
        <button
          className="testimonial-arrow testimonial-next"
          type="button"
          aria-label="Next testimonials"
          disabled={position === 2}
          onClick={() => setPosition((current) => Math.min(2, current + 1))}
        ><span /></button>
      </div>
    </section>
  );
}

const plans: Array<{ name: string; icon: IconName; monthly: number; description: string; features: string[]; popular?: boolean }> = [
  {
    name: 'Starter',
    icon: 'sprout',
    monthly: 10,
    description: 'Explore the platform. No credit card required.',
    features: ['3 agents', '10,000 tasks/month', 'Community integrations', '7-day memory', 'SLA guarantee'],
  },
  {
    name: 'Pro',
    icon: 'zap',
    monthly: 75,
    description: 'For teams shipping production grade workflows.',
    features: ['Unlimited agents', 'All 500+ integrations', 'Advanced Analytics & Alpha alerts', '2M tasks/month', '99.9% SLA'],
    popular: true,
  },
  {
    name: 'Enterprise',
    icon: 'shield',
    monthly: 150,
    description: 'Advanced security, compliance for large teams.',
    features: ['Everything in Pro', 'Unlimited tasks', 'VPC deployment', 'Unlimited memory', 'Dedicated CSM'],
  },
];

function Pricing() {
  const [annual, setAnnual] = useState(false);
  return (
    <section className="pricing section-shell" id="pricing">
      <SectionHeading label="Pricing" title="Simple pricing, no surprises" description="Start free. Scale as you grow. All plans include the full SDK." />
      <div className="billing-toggle" data-reveal="rise" data-reveal-threshold="0.5" role="group" aria-label="Billing frequency">
        <button className={!annual ? 'active' : ''} type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button>
        <button className={annual ? 'active' : ''} type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>Annual</button>
      </div>
      <div className="pricing-grid">
        {plans.map((plan) => (
          <article className={`plan${plan.popular ? ' popular' : ''}`} data-reveal="pop" data-reveal-threshold="0.5" key={plan.name}>
            {plan.popular ? <span className="popular-label">Most Popular</span> : null}
            <header><i><UiIcon name={plan.icon} /></i><h3>{plan.name}</h3></header>
            <div className="plan-inner">
              <strong>${annual ? Math.round(plan.monthly * 0.8) : plan.monthly}<small>/mo</small></strong>
              <p>{plan.description}</p>
              <ul>{plan.features.map((feature) => <li key={feature}><span aria-hidden="true" />{feature}</li>)}</ul>
              <PrimaryButton />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const faqs = [
  ['What is Agentor and how does it work?', 'Agentor is a cloud-native platform for building, deploying, and orchestrating AI agents. You define your agents using our TypeScript or Python SDK, connect them to tools and data sources, and deploy with a single command to our global edge network — where they run 24/7 autonomously.'],
  ['What programming languages does the SDK support?', 'We support TypeScript and Python with full type safety. Our code-first SDK gives you complete control over agent logic, tool definitions, and orchestration flows — while handling memory, retries, and parallel tool execution out of the box.'],
  ['How does multi-agent orchestration work?', 'You chain specialized agents into dynamic pipelines where each agent handles a specific task. Agents can pass context, branch on conditions, spawn sub-agents, and recover from failures automatically — all managed by our orchestration runtime with no extra infrastructure to maintain.'],
  ['What integrations are available?', "Agentor supports 500+ integrations including Slack, GitHub, Notion, Salesforce, databases, and more. OAuth is handled automatically, so connecting your existing tools takes minutes. If we don't have a native integration, you can build custom tools directly in the SDK."],
  ['How does pricing work? Can I start for free?', 'Yes — you can start for free and scale as you grow. All plans include the full SDK and core integrations. Higher tiers unlock advanced orchestration, priority support, and enterprise SLAs. Usage is capped by default so there are no surprise bills.'],
];

function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());

  const toggleItem = (index: number) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section className="faq section-shell" id="faq">
      <SectionHeading label="FAQ" title="Ask us" sparkle />
      <div className="faq-list">
        {faqs.map(([question, answer], index) => {
          const isOpen = openItems.has(index);
          const answerId = `faq-answer-${index}`;
          return (
            <article className={`faq-item${isOpen ? ' is-open' : ''}`} key={question}>
              <button className="faq-question" type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => toggleItem(index)}>
                <span>{question}</span><i aria-hidden="true" />
              </button>
              <div className="faq-answer" id={answerId} aria-hidden={!isOpen}>
                <div><p>{answer}</p></div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="closing-cta" data-reveal="cta-pop" data-reveal-threshold="0.5">
      <div className="closing-content">
        <div className="closing-logo-window" aria-hidden="true">
          <div className="closing-logo-track">
            {Array.from({ length: 4 }, (_, index) => <img src="/closing-integrations.svg" alt="" key={index} />)}
          </div>
        </div>
        <img className="closing-bolt" src="/closing-bolt.svg" alt="" aria-hidden="true" />
        <h2>Supercharge your workflow with our AI Agent</h2>
        <a className="button button-secondary" href="#pricing">See Demo</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-main">
          <a className="footer-brand" href="#top" aria-label="Agentor home"><img src="/agentor-mark.svg" alt="" />Agentor</a>
          <p>Build, deploy, and scale intelligent agents that automate your most complex workflows — with a code-first SDK, 500+ integrations, and enterprise-grade reliability across every environment.</p>
        </div>
        <div><strong>Socials</strong><a href="#top">Twitter (X)</a><a href="#top">Instagram</a><a href="#top">Linkedin</a></div>
        <div><strong>Pages</strong><a href="#top">404</a><a href="#top">Terms and Conditions</a><a href="#top">Privacy Policy</a></div>
      </div>
    </footer>
  );
}

const composerMessages = [
  'Meet Agentor. Your AI for smarter work.',
  'Welcome to Agentor automation',
  'Agentor is ready. Let’s automate',
];

const loaderWord = 'AGENTOR';

function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let progressTimer = 0;
    let exitTimer = 0;
    let hideTimer = 0;

    const finish = () => {
      root.classList.remove('page-is-loading');
      setVisible(false);
    };

    root.classList.add('page-is-loading');
    setRunning(true);

    if (reducedMotion) {
      setProgress(100);
      exitTimer = window.setTimeout(() => setExiting(true), 120);
      hideTimer = window.setTimeout(finish, 320);
    } else {
      progressTimer = window.setTimeout(() => {
        const startedAt = performance.now();
        const duration = 480;

        const tick = (now: number) => {
          const elapsed = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - elapsed, 4);
          setProgress(Math.round(eased * 100));
          if (elapsed < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
      }, 450);
      exitTimer = window.setTimeout(() => setExiting(true), 3000);
      hideTimer = window.setTimeout(finish, 3420);
    }

    return () => {
      root.classList.remove('page-is-loading');
      cancelAnimationFrame(frame);
      window.clearTimeout(progressTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`site-loader${running ? ' is-running' : ''}${exiting ? ' is-exiting' : ''}`}
      aria-hidden="true"
    >
      <div className="site-loader-panel site-loader-panel-top">
        <div className="site-loader-word">
          {loaderWord.split('').map((letter, index) => (
            <span key={`${letter}-${index}`} style={{ animationDelay: `${300 + index * 50}ms` }}>{letter}</span>
          ))}
        </div>
      </div>
      <div className="site-loader-panel site-loader-panel-bottom">
        <div className="site-loader-progress">[{progress}%]</div>
      </div>
    </div>
  );
}

function HeroComposer() {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setTypedText(composerMessages[0]);
      return;
    }

    let messageIndex = 0;
    let characterIndex = 0;
    let phase: 'typing' | 'holding' | 'deleting' | 'waiting' = 'typing';
    let timer = 0;

    const tick = () => {
      const message = composerMessages[messageIndex];
      let delay = 70;

      if (phase === 'typing') {
        characterIndex += 1;
        setTypedText(message.slice(0, characterIndex));
        if (characterIndex >= message.length) {
          phase = 'holding';
          delay = 1100;
        }
      } else if (phase === 'holding') {
        phase = 'deleting';
        delay = 45;
      } else if (phase === 'deleting') {
        characterIndex -= 1;
        setTypedText(message.slice(0, characterIndex));
        if (characterIndex <= 0) {
          phase = 'waiting';
          delay = 450;
        } else {
          delay = 45;
        }
      } else {
        messageIndex = (messageIndex + 1) % composerMessages.length;
        characterIndex = 0;
        phase = 'typing';
        delay = 70;
      }

      timer = window.setTimeout(tick, delay);
    };

    timer = window.setTimeout(tick, 240);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="hero-composer" data-reveal="pop" data-reveal-mount aria-label="Animated AI prompt example">
      <div className="hero-composer-prompt" aria-hidden="true">
        <img src="/flowgent-orb.png" alt="" />
        <span>{typedText}</span>
        <i />
      </div>
      <div className="hero-composer-footer">
        <div className="hero-model" aria-hidden="true">
          <svg viewBox="0 0 15 15">
            <path d="M13.9245 6.139C14.265 5.118 14.148 3.999 13.603 3.07a3.77 3.77 0 0 0-4.07-1.813A3.76 3.76 0 0 0 6.714 0a3.78 3.78 0 0 0-3.605 2.617A3.77 3.77 0 0 0 1.075 8.86a3.77 3.77 0 0 0 .321 3.07 3.77 3.77 0 0 0 4.071 1.813A3.76 3.76 0 0 0 8.285 15a3.78 3.78 0 0 0 3.607-2.619 3.77 3.77 0 0 0 2.499-1.813 3.77 3.77 0 0 0-.466-4.43ZM8.286 14.02a2.8 2.8 0 0 1-1.8-.651l3.076-1.775a.49.49 0 0 0 .246-.425v-4.21l1.262.728.025.035v3.486a2.81 2.81 0 0 1-2.809 2.812Zm-6.039-2.58a2.8 2.8 0 0 1-.335-1.884l3.075 1.778a.49.49 0 0 0 .491 0l3.646-2.105v1.458l-.018.039-3.019 1.743a2.81 2.81 0 0 1-3.84-1.03ZM1.461 4.92a2.8 2.8 0 0 1 1.463-1.232L2.922 7.24c0 .175.093.338.246.425l3.646 2.105-1.262.73-.043.004L2.489 8.759A2.81 2.81 0 0 1 1.46 4.92Zm10.371 2.414L8.186 5.228l1.262-.728.043-.004 3.02 1.743a2.81 2.81 0 0 1-.434 5.073V7.758a.49.49 0 0 0-.245-.424Zm1.257-1.891-3.076-1.778a.49.49 0 0 0-.49 0L5.876 5.77V4.313l.018-.04 3.019-1.741a2.81 2.81 0 0 1 4.176 2.91ZM5.19 8.041l-1.263-.729-.025-.035V3.79a2.81 2.81 0 0 1 4.61-2.159L5.437 3.406a.49.49 0 0 0-.245.425L5.19 8.04Zm.686-1.478L7.5 5.625l1.624.937v1.876L7.5 9.375l-1.624-.938V6.563Z" fill="currentColor" />
          </svg>
          <span>GPT-5.3</span>
          <svg className="hero-model-chevron" viewBox="0 0 12 12"><path d="M2 4 6 8l4-4" /></svg>
        </div>
        <a className="hero-composer-submit" href="#process" aria-label="Run prompt">
          <svg viewBox="0 0 33 33" aria-hidden="true"><path d="m16.5 23 .001-13M11.05 15.45l5.45-5.45 5.45 5.45" /></svg>
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  useScrollReveals();

  return (
    <>
      <PageLoader />
      <main id="top">
        <Header />
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <TrustPill />
            <RevealHeading as="h1" id="hero-title" mount breakAfter={3}>Deploy agents that do the actual work</RevealHeading>
            <p data-reveal="rise" data-reveal-mount>Build, orchestrate, and scale intelligent agents that integrate with every tool, run 24/7, and handle your most complex workflows.</p>
            <HeroComposer />
          </div>
          <AgentConsole />
        </section>
        <Features />
        <Process />
        <Testimonials />
        <Pricing />
        <FAQ />
        <ClosingCTA />
        <Footer />
      </main>
    </>
  );
}
