import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'

export const Route = createFileRoute('/')({
  component: Home,
})

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function GlitchText({ text }: { text: string }) {
  return (
    <span className="glitch" data-text={text}>{text}</span>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">
          <span className="nav-logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="2" width="10" height="10" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="16" y="2" width="10" height="10" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="2" y="16" width="10" height="10" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="16" y="16" width="10" height="10" fill="currentColor"/>
            </svg>
          </span>
          <span>DIGITAL<span className="accent">WORLD</span></span>
        </a>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {['Services','Pricing','Amenities','Gallery','Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <a href="#contact" className="nav-cta">Book a Session</a>
        </div>
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span/><span/><span/>
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  const [tick, setTick] = useState(0)
  const [typed, setTyped] = useState('')
  const taglines = ['High-Speed Internet.', 'Pro Gaming Rigs.', 'Print & Scan Services.', 'Your Digital Hub.']
  const [tagIdx, setTagIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const target = taglines[tagIdx]
    if (typed.length < target.length) {
      const t = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 60)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setTyped('')
        setTagIdx(i => (i + 1) % taglines.length)
      }, 2200)
      return () => clearTimeout(t)
    }
  }, [typed, tagIdx])

  return (
    <section className="hero" id="hero">
      <div className="hero-grid-bg" aria-hidden />
      <div className="hero-scanlines" aria-hidden />
      <div className="hero-content">
        <div className="hero-tag">
          <span className="hero-tag-dot" />
          Open 24/7 — Walk-ins Welcome
        </div>
        <h1 className="hero-title">
          <GlitchText text="DIGITAL" /><br />
          <span className="hero-title-sub">WORLD</span>
        </h1>
        <p className="hero-tagline">
          <span className="hero-prompt">{'>'}</span>
          <span className="hero-typed">{typed}</span>
          <span className="hero-cursor" style={{ opacity: tick % 20 < 10 ? 1 : 0 }}>_</span>
        </p>
        <p className="hero-desc">
          45 high-performance workstations. 1Gbps fibre. Premium gaming gear.<br />
          The city's fastest, most capable cyber cafe — built for those who demand more.
        </p>
        <div className="hero-actions">
          <a href="#pricing" className="btn btn-primary">View Pricing</a>
          <a href="#services" className="btn btn-ghost">Explore Services</a>
        </div>
        <div className="hero-stats">
          {[
            { value: '45', label: 'Workstations' },
            { value: '1Gbps', label: 'Fibre Speed' },
            { value: '24/7', label: 'Open Always' },
            { value: '8+', label: 'Years Running' },
          ].map(s => (
            <div className="hero-stat" key={s.label}>
              <span className="hero-stat-value">{s.value}</span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-visual" aria-hidden>
        <div className="hero-monitor">
          <div className="monitor-screen">
            <div className="monitor-code">
              {['> booting system...','> net speed: 1024 Mbps','> ping: 3ms','> GPU: RTX 4090','> RAM: 64GB DDR5','> STATUS: READY'].map((l, i) => (
                <div key={i} className="monitor-line" style={{ animationDelay: `${i * 0.3}s` }}>{l}</div>
              ))}
            </div>
          </div>
          <div className="monitor-base" />
        </div>
      </div>
    </section>
  )
}

const services = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <rect x="4" y="8" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M14 30l-2 4h16l-2-4" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="20" cy="19" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 13h4M8 19h2M8 25h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'High-Speed Internet',
    desc: '1Gbps dedicated fibre connection with no throttling. Browse, stream, download at full speed on every single workstation.',
    badge: '1Gbps',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <rect x="3" y="12" width="28" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M31 18h4a2 2 0 012 2v8a2 2 0 01-2 2h-4" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="6" y="15" width="22" height="12" rx="1" fill="currentColor" fillOpacity=".12"/>
        <circle cx="34" cy="24" r="2" fill="currentColor"/>
        <path d="M10 10V8M17 10V6M24 10V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Pro Gaming Rigs',
    desc: 'RTX 4090-powered machines with 240Hz monitors, mechanical keyboards, and pro-grade peripherals for competitive play.',
    badge: 'RTX 4090',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <rect x="6" y="4" width="22" height="28" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M10 32v4h20V32" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M10 12h14M10 17h14M10 22h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <rect x="22" y="26" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M25 31h6M25 33h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Print & Scan',
    desc: 'Colour and mono printing, A4 to A3. High-resolution scanning, photocopying, and document lamination available.',
    badge: 'Color & Mono',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <rect x="4" y="8" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M4 14h32" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="10" cy="11" r="1.5" fill="currentColor"/>
        <circle cx="16" cy="11" r="1.5" fill="currentColor"/>
        <circle cx="22" cy="11" r="1.5" fill="currentColor"/>
        <path d="M9 22l5 4 10-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Web & Software',
    desc: 'Pre-installed suite of productivity apps, browsers, design tools, and development environments. Full admin access available.',
    badge: 'Full Suite',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <path d="M20 4l14 8v16L20 36 6 28V12L20 4z" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M20 4v32M6 12l14 8 14-8" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    ),
    title: 'Private Booths',
    desc: 'Four soundproofed private booths for video calls, presentations, or distraction-free work. Book by the hour.',
    badge: '4 Booths',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
        <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M20 10v10l6 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M8 20h4M28 20h4M20 8v4M20 28v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Cafe & Refreshments',
    desc: 'Hot drinks, cold beverages, and light snacks. Stay fuelled during long sessions without leaving your seat.',
    badge: 'Open All Day',
  },
]

function Services() {
  const { ref, visible } = useInView()
  return (
    <section className="section services-section" id="services" ref={ref}>
      <div className="section-inner">
        <div className={`section-header fade-up ${visible ? 'in' : ''}`}>
          <div className="section-tag">// SERVICES</div>
          <h2 className="section-title">Everything You Need,<br/><em>Under One Roof</em></h2>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`service-card fade-up ${visible ? 'in' : ''}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="service-icon">{s.icon}</div>
              <div className="service-badge">{s.badge}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const plans = [
  {
    name: 'Casual',
    hourly: '1.50',
    desc: 'Perfect for quick tasks, email, browsing, and light work.',
    features: ['Standard workstation', '1Gbps internet', 'Print credits: 5 pages', 'Drink included'],
    highlight: false,
  },
  {
    name: 'Power User',
    hourly: '2.80',
    desc: 'RTX 4090 gaming rig, high-refresh monitor, priority seating.',
    features: ['RTX 4090 gaming rig', '240Hz monitor', '1Gbps internet', 'Print credits: 15 pages', '2 drinks included', 'Headset included'],
    highlight: true,
  },
  {
    name: 'Night Owl',
    hourly: null,
    flat: '12.00',
    period: 'per night',
    desc: '10pm–6am flat rate. Unlimited use for night-shift warriors.',
    features: ['Any workstation', 'Unlimited internet', 'Print credits: 20 pages', 'Snack pack included', 'Locker storage'],
    highlight: false,
  },
]

function Pricing() {
  const { ref, visible } = useInView()
  return (
    <section className="section pricing-section" id="pricing" ref={ref}>
      <div className="section-inner">
        <div className={`section-header fade-up ${visible ? 'in' : ''}`}>
          <div className="section-tag">// PRICING</div>
          <h2 className="section-title">Transparent Rates,<br/><em>No Hidden Fees</em></h2>
        </div>
        <div className="pricing-grid">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`pricing-card fade-up ${visible ? 'in' : ''} ${p.highlight ? 'pricing-card--highlight' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {p.highlight && <div className="pricing-badge">Most Popular</div>}
              <div className="pricing-name">{p.name}</div>
              <div className="pricing-amount">
                <span className="pricing-currency">$</span>
                <span className="pricing-value">{p.flat ?? p.hourly}</span>
                <span className="pricing-period">/{p.period ?? 'hour'}</span>
              </div>
              <p className="pricing-desc">{p.desc}</p>
              <ul className="pricing-features">
                {p.features.map(f => (
                  <li key={f}>
                    <span className="pricing-check">›</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`btn ${p.highlight ? 'btn-primary' : 'btn-ghost'} pricing-btn`}>
                Get Started
              </a>
            </div>
          ))}
        </div>
        <p className={`pricing-note fade-up ${visible ? 'in' : ''}`} style={{ transitionDelay: '0.35s' }}>
          Day passes, weekly memberships, and student discounts available. Ask at the desk.
        </p>
      </div>
    </section>
  )
}

const amenities = [
  { label: '45 Workstations', detail: 'Windows 11 + Linux dual-boot on select rigs' },
  { label: 'RTX 4090 Rigs', detail: '10 dedicated gaming stations' },
  { label: '240Hz Displays', detail: '27" IPS panels with 1ms response' },
  { label: '1Gbps Fibre', detail: 'Unthrottled, dedicated line' },
  { label: 'Mechanical Keys', detail: 'HyperX & Razer options' },
  { label: 'Surround Sound', detail: 'Audiophile-grade headsets' },
  { label: 'HD Webcams', detail: 'For streaming and video calls' },
  { label: 'Colour Printing', detail: 'A4 & A3, laser quality' },
  { label: 'Laminator', detail: 'Instant same-day' },
  { label: 'Private Booths', detail: '4 soundproofed rooms' },
  { label: 'Secure Lockers', detail: '32 personal lockers' },
  { label: 'USB Charging', detail: 'USB-A, USB-C at every seat' },
  { label: 'Air Conditioning', detail: 'Climate-controlled all year' },
  { label: 'Cafe Counter', detail: 'Coffee, snacks, cold drinks' },
  { label: 'Free Parking', detail: '20 spaces out front' },
  { label: 'CCTV Security', detail: 'Monitored 24/7' },
]

function Amenities() {
  const { ref, visible } = useInView()
  return (
    <section className="section amenities-section" id="amenities" ref={ref}>
      <div className="section-inner">
        <div className={`section-header fade-up ${visible ? 'in' : ''}`}>
          <div className="section-tag">// AMENITIES</div>
          <h2 className="section-title">The Full Spec Sheet</h2>
        </div>
        <div className="amenities-grid">
          {amenities.map((a, i) => (
            <div
              key={a.label}
              className={`amenity-item fade-up ${visible ? 'in' : ''}`}
              style={{ transitionDelay: `${Math.min(i * 0.04, 0.5)}s` }}
            >
              <span className="amenity-dot" />
              <div>
                <div className="amenity-label">{a.label}</div>
                <div className="amenity-detail">{a.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const { ref, visible } = useInView()
  const cells = [
    { label: 'Gaming Floor', span: 'wide', hue: '185' },
    { label: 'Pro Rigs', span: 'tall', hue: '220' },
    { label: 'Cafe Counter', span: 'normal', hue: '40' },
    { label: 'Private Booth', span: 'normal', hue: '270' },
    { label: 'Print Station', span: 'normal', hue: '155' },
    { label: 'Night Sessions', span: 'wide', hue: '15' },
  ]

  return (
    <section className="section gallery-section" id="gallery" ref={ref}>
      <div className="section-inner">
        <div className={`section-header fade-up ${visible ? 'in' : ''}`}>
          <div className="section-tag">// GALLERY</div>
          <h2 className="section-title">Step Inside<br/><em>Digital World</em></h2>
        </div>
        <div className="gallery-grid">
          {cells.map((c, i) => (
            <div
              key={c.label}
              className={`gallery-cell gallery-cell--${c.span} fade-up ${visible ? 'in' : ''}`}
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div
                className="gallery-placeholder"
                style={{
                  background: `radial-gradient(ellipse at 30% 40%, hsl(${c.hue}, 70%, 18%) 0%, hsl(${c.hue}, 40%, 7%) 70%)`,
                }}
              >
                <div className="gallery-grid-lines" aria-hidden />
                <div className="gallery-label">{c.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { ref, visible } = useInView()
  const [form, setForm] = useState({ name: '', email: '', msg: '' })
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="section contact-section" id="contact" ref={ref}>
      <div className="section-inner contact-inner">
        <div className={`contact-info fade-up ${visible ? 'in' : ''}`}>
          <div className="section-tag">// CONTACT</div>
          <h2 className="section-title">Find Us,<br/><em>Any Time</em></h2>
          <div className="contact-details">
            {[
              { icon: '◈', label: 'Address', val: '47 Circuit Lane, Tech Quarter\nCity Centre, DW1 4XX' },
              { icon: '◉', label: 'Hours', val: 'Open 24 hours, 7 days a week\nNo booking required' },
              { icon: '◎', label: 'Phone', val: '+1 (555) 204-8800' },
              { icon: '◇', label: 'Email', val: 'hello@digitalworld.cafe' },
            ].map(d => (
              <div className="contact-detail" key={d.label}>
                <span className="contact-detail-icon">{d.icon}</span>
                <div>
                  <div className="contact-detail-label">{d.label}</div>
                  <div className="contact-detail-val">{d.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`contact-form-wrap fade-up ${visible ? 'in' : ''}`} style={{ transitionDelay: '0.15s' }}>
          {sent ? (
            <div className="contact-success">
              <div className="contact-success-icon">✓</div>
              <h3>Message Received</h3>
              <p>We'll get back to you within 24 hours. See you soon!</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name" type="text" required placeholder="Your full name"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email" type="email" required placeholder="you@example.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="msg">Message</label>
                <textarea
                  id="msg" required rows={5} placeholder="Questions, group bookings, bulk printing..."
                  value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary contact-submit">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="nav-logo-icon" style={{ display: 'inline-flex' }}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="2" width="10" height="10" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="16" y="2" width="10" height="10" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="2" y="16" width="10" height="10" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="16" y="16" width="10" height="10" fill="currentColor"/>
            </svg>
          </span>
          <span>DIGITAL<span className="accent">WORLD</span></span>
        </div>
        <p className="footer-tagline">Your digital hub — open 24/7, 365 days a year.</p>
        <div className="footer-links">
          {['Services','Pricing','Amenities','Gallery','Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="footer-link">{l}</a>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2025 Digital World Cyber Cafe. All rights reserved.</span>
          <span className="footer-sep">·</span>
          <span>47 Circuit Lane, City Centre</span>
        </div>
      </div>
    </footer>
  )
}

function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <Amenities />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
