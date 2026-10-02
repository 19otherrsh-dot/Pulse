import { useState, useEffect, useRef } from 'react'
import CampaignCard from '../components/CampaignCard'
import EcosystemCard from '../components/EcosystemCard'
import './LandingPage.css'

/* Animated counter hook */
function useCountUp(target, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!startOnView) {
      setStarted(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started, startOnView])

  useEffect(() => {
    if (!started) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return { count, ref }
}

/* Scroll-triggered animation hook */
function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

const campaigns = [
  { brandEmoji: '🎵', brandName: 'Spotify India', title: 'Share Your Playlist Story', description: 'Create an Instagram story sharing your most-played playlist and tag @SpotifyIndia. Authentic vibes only.', payout: '₹800', spotsLeft: 47, city: 'All Cities', tags: ['Content', 'Instagram'] },
  { brandEmoji: '🛵', brandName: 'Rapido', title: 'Campus Ambassador Program', description: 'Be the face of Rapido on your campus. Weekly tasks, weekly pay. Real marketing experience.', payout: '₹2,400/week', spotsLeft: 15, city: 'Mumbai', tags: ['Campus', 'Weekly'] },
  { brandEmoji: '🍕', brandName: 'Zomato', title: 'Campus Canteen Review', description: 'Film a 30-second honest review of your campus canteen. Keep it real, keep it funny.', payout: '₹500', spotsLeft: 89, city: 'All Cities', tags: ['Content', 'Video'] },
  { brandEmoji: '🎧', brandName: 'boAt', title: 'Rockerz Unbox & Review', description: 'Unbox and review the new Rockerz 255 Pro. You keep the product. Real reactions only.', payout: '₹1,200', spotsLeft: 12, city: 'All Cities', tags: ['Content', 'Product'], featured: true },
]

const ecosystemItems = [
  { emoji: '🎓', name: 'PulseCampus', tagline: 'The student union, reimagined.', description: 'White-labelled hyperlocal campus app for every college. Notice boards, events, buy/sell, and seamless Pulse integration.' },
  { emoji: '🎤', name: 'PulseStage', tagline: 'Where creators are born.', description: 'Content accelerator and talent agency for student creators. 12-week cohorts, brand deals, and original content series.' },
  { emoji: '🏆', name: 'PulseLeague', tagline: 'The IPL of marketing.', description: 'National campus marketing championship. Real brands, real budgets, real campaigns. Compete. Win. Get hired.' },
  { emoji: '💳', name: 'PulseCard', tagline: 'Earn first. Spend smart.', description: 'India\'s first credit card designed for students who earn. Borrow against your campaign earnings at 0% interest.' },
  { emoji: '🏢', name: 'PulseSpaces', tagline: 'Your campus office.', description: 'Co-working and creator studios near major universities. Podcast rooms, photo studios, brand activation zones.' },
  { emoji: '📊', name: 'PulseInsight', tagline: 'The Bloomberg of Gen Z.', description: 'B2B intelligence dashboard. Weekly youth sentiment, brand perception scores, and early trend signals.' },
  { emoji: '🌏', name: 'PulseGlobal', tagline: 'India\'s playbook, Asia\'s stage.', description: 'Expanding to Indonesia, Philippines, and Vietnam. Same model, new markets, massive opportunity.' },
  { emoji: '🎓', name: 'PulseU', tagline: 'The Anti-MBA.', description: '6-month career accelerator. 3 rotations inside real brands. More practical, more affordable, more connected.' },
]

const testimonials = [
  { quote: 'Made ₹18,000 in my first semester. Pulse literally changed my college life.', name: 'Priya M.', college: 'VJTI Mumbai', initials: 'PM', color: '#6C3AFF' },
  { quote: 'I went from making reels for fun to getting paid by actual brands. Wild.', name: 'Arjun K.', college: 'Christ University, Bengaluru', initials: 'AK', color: '#00D4AA' },
  { quote: 'The Rapido campaign alone covered my hostel fees for two months.', name: 'Sneha R.', college: 'Symbiosis Pune', initials: 'SR', color: '#FF5757' },
]

const pillars = [
  { emoji: '🔥', word: 'Realness', sub: 'Authentic', desc: 'Unfiltered student life. Real places, real faces, real wins. No stock photos, no corporate speak.' },
  { emoji: '⚡', word: 'Momentum', sub: 'Forward', desc: 'Every interaction leaves you better equipped, better connected, or better paid than before.' },
  { emoji: '🤝', word: 'Community', sub: 'Together', desc: 'Individual growth amplified by collective belonging. Every campus has its tribe on Pulse.' },
  { emoji: '🚀', word: 'Opportunity', sub: 'Open', desc: 'A student from Tier 3 Bihar gets the same shot at a Spotify campaign as an IIM Mumbai student.' },
  { emoji: '💜', word: 'Playfulness', sub: 'Alive', desc: 'We take growth seriously but never take ourselves too seriously. Like a smart friend, not a document.' },
]

export default function LandingPage({ onNavigate }) {
  const reveal1 = useReveal()
  const reveal2 = useReveal()
  const reveal3 = useReveal()
  const reveal4 = useReveal()
  const reveal5 = useReveal()
  const reveal6 = useReveal()
  const reveal7 = useReveal()

  const stat1 = useCountUp(240, 2000)
  const stat2 = useCountUp(500, 2000)
  const stat3 = useCountUp(3, 1000)
  const stat4 = useCountUp(10, 1500)

  return (
    <div className="landing">
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__gradient"></div>
          <svg className="hero__ekg" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path
              className="hero__ekg-line"
              d="M0,100 L200,100 L240,100 L260,30 L280,170 L300,60 L320,140 L340,100 L400,100 L600,100 L640,100 L660,20 L680,180 L700,50 L720,150 L740,100 L900,100 L1000,100 L1200,100"
              fill="none"
              stroke="url(#ekgGradient)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="ekgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(108,58,255,0)" />
                <stop offset="20%" stopColor="rgba(108,58,255,0.6)" />
                <stop offset="50%" stopColor="rgba(0,212,170,0.8)" />
                <stop offset="80%" stopColor="rgba(108,58,255,0.6)" />
                <stop offset="100%" stopColor="rgba(108,58,255,0)" />
              </linearGradient>
            </defs>
          </svg>
          {/* Floating particles */}
          <div className="hero__particles">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="hero__particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                  opacity: 0.15 + Math.random() * 0.35,
                }}
              />
            ))}
          </div>
        </div>

        <div className="hero__content container">
          <div className="hero__badge animate-fadeInUp">
            <span className="badge badge-violet">🚀 Now Live in Mumbai, Pune & Bengaluru</span>
          </div>

          <h1 className="hero__title animate-fadeInUp delay-1">
            <span className="hero__title-line">Earn Your</span>
            <span className="hero__title-pulse text-gradient-violet">Pulse</span>
          </h1>

          <p className="hero__subtitle animate-fadeInUp delay-2">
            India's first platform that pays students to represent the brands they love.
            <br />
            <span className="hero__subtitle-bold">Not an internship. Not a side hustle. A launchpad.</span>
          </p>

          <div className="hero__stats animate-fadeInUp delay-3">
            <div className="hero__stat">
              <span className="hero__stat-number">₹2.4 Cr+</span>
              <span className="hero__stat-label">Earned by students</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-number">10K+</span>
              <span className="hero__stat-label">Active ambassadors</span>
            </div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat">
              <span className="hero__stat-number">500+</span>
              <span className="hero__stat-label">Brand campaigns</span>
            </div>
          </div>

          <div className="hero__ctas animate-fadeInUp delay-4">
            <button className="btn btn-primary btn-lg hero__cta-primary" onClick={() => onNavigate('dashboard')}>
              Start Earning
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => onNavigate('campaigns')}>
              Explore Campaigns
            </button>
          </div>

          <p className="hero__note animate-fadeIn delay-5">Free to join · No commitments · Get paid within 48 hours</p>
        </div>

        <div className="hero__scroll-indicator animate-fadeIn delay-6">
          <div className="hero__scroll-line"></div>
        </div>
      </section>

      {/* ===== BRAND PILLARS ===== */}
      <section className="section pillars" ref={reveal1.ref}>
        <div className={`container ${reveal1.visible ? 'revealed' : 'hidden-section'}`}>
          <div className="section-header">
            <span className="section-label">The Foundation</span>
            <h2 className="section-title section-title--serif">Why Pulse Exists</h2>
            <p className="section-subtitle">Five principles that make us different from every other platform.</p>
          </div>

          <div className="pillars__grid">
            {pillars.map((pillar, i) => (
              <div key={pillar.word} className="pillar-card glass" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="pillar-card__emoji">{pillar.emoji}</span>
                <h3 className="pillar-card__word">{pillar.word}</h3>
                <span className="pillar-card__sub">{pillar.sub}</span>
                <p className="pillar-card__desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section how-it-works" ref={reveal2.ref}>
        <div className={`container ${reveal2.visible ? 'revealed' : 'hidden-section'}`}>
          <div className="section-header">
            <span className="section-label">Simple as 1-2-3</span>
            <h2 className="section-title">Three Steps. Real Money.</h2>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step__number">1</div>
              <div className="step__icon">📱</div>
              <h3 className="step__title">Sign Up</h3>
              <p className="step__desc">Create your profile in 60 seconds. Add your college, skills, and social handles. Done.</p>
            </div>

            <div className="steps__connector">
              <div className="steps__connector-line"></div>
              <div className="steps__connector-dot"></div>
            </div>

            <div className="step">
              <div className="step__number">2</div>
              <div className="step__icon">🎯</div>
              <h3 className="step__title">Pick Campaigns</h3>
              <p className="step__desc">Browse campaigns from brands you actually like. Apply with one tap. Get matched instantly.</p>
            </div>

            <div className="steps__connector">
              <div className="steps__connector-line"></div>
              <div className="steps__connector-dot"></div>
            </div>

            <div className="step">
              <div className="step__number">3</div>
              <div className="step__icon">💰</div>
              <h3 className="step__title">Get Paid</h3>
              <p className="step__desc">Complete the brief. Submit your work. Money hits your wallet within 48 hours. Ka-ching.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LIVE CAMPAIGNS ===== */}
      <section className="section live-campaigns" ref={reveal3.ref}>
        <div className={`container ${reveal3.visible ? 'revealed' : 'hidden-section'}`}>
          <div className="section-header">
            <span className="section-label">Right Now</span>
            <h2 className="section-title">What's Live Right Now</h2>
            <p className="section-subtitle">Real campaigns. Real brands. Real money. Apply in seconds.</p>
          </div>

          <div className="campaigns-grid grid grid-2">
            {campaigns.map((c, i) => (
              <CampaignCard key={i} {...c} onApply={() => onNavigate('dashboard')} />
            ))}
          </div>

          <div className="live-campaigns__cta">
            <button className="btn btn-secondary btn-lg" onClick={() => onNavigate('campaigns')}>
              View All Campaigns →
            </button>
          </div>
        </div>
      </section>

      {/* ===== FIRE CITIES ===== */}
      <section className="section fire-cities" ref={reveal4.ref}>
        <div className={`container ${reveal4.visible ? 'revealed' : 'hidden-section'}`}>
          <div className="section-header">
            <span className="section-label">The Fire City Model</span>
            <h2 className="section-title">Launching in India's Boldest Cities</h2>
          </div>

          <div className="fire-cities__map">
            <div className="fire-cities__phase">
              <h3 className="fire-cities__phase-title">
                <span className="fire-cities__fire">🔥</span> Fire — Now Live
              </h3>
              <div className="fire-cities__list">
                {['Mumbai', 'Pune', 'Bengaluru'].map(city => (
                  <div key={city} className="fire-city fire-city--active">
                    <div className="fire-city__pulse"></div>
                    <span className="fire-city__name">{city}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="fire-cities__phase">
              <h3 className="fire-cities__phase-title">
                <span>📡</span> Spread — Month 4-6
              </h3>
              <div className="fire-cities__list">
                {['Delhi', 'Hyderabad', 'Chennai'].map(city => (
                  <div key={city} className="fire-city fire-city--upcoming">
                    <span className="fire-city__name">{city}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="fire-cities__phase">
              <h3 className="fire-cities__phase-title">
                <span>🌊</span> Deep — Month 7-12
              </h3>
              <div className="fire-cities__list fire-cities__list--wrap">
                {['Jaipur', 'Lucknow', 'Ahmedabad', 'Nagpur', 'Coimbatore', 'Bhubaneswar', 'Patna'].map(city => (
                  <div key={city} className="fire-city fire-city--future">
                    <span className="fire-city__name">{city}</span>
                  </div>
                ))}
                <div className="fire-city fire-city--future">
                  <span className="fire-city__name">+ 23 more</span>
                </div>
              </div>
            </div>
          </div>

          <div className="fire-cities__target">
            <span className="fire-cities__target-number text-gradient-violet">75,000+</span>
            <span className="fire-cities__target-label">Ambassadors by Year 1</span>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid" ref={stat1.ref}>
            <div className="stat-item">
              <span className="stat-item__number text-gradient-violet">₹{(stat1.count / 100).toFixed(1)} Cr+</span>
              <span className="stat-item__label">Earned by students</span>
            </div>
            <div className="stat-item" ref={stat2.ref}>
              <span className="stat-item__number text-gradient-violet">{stat2.count}+</span>
              <span className="stat-item__label">Brand campaigns</span>
            </div>
            <div className="stat-item" ref={stat3.ref}>
              <span className="stat-item__number text-gradient-violet">{stat3.count}</span>
              <span className="stat-item__label">Fire cities</span>
            </div>
            <div className="stat-item" ref={stat4.ref}>
              <span className="stat-item__number text-gradient-violet">{stat4.count}K+</span>
              <span className="stat-item__label">Active ambassadors</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ECOSYSTEM ===== */}
      <section className="section ecosystem-section" ref={reveal5.ref}>
        <div className={`container ${reveal5.visible ? 'revealed' : 'hidden-section'}`}>
          <div className="section-header">
            <span className="section-label">The Bigger Picture</span>
            <h2 className="section-title section-title--serif">More Than a Platform</h2>
            <p className="section-subtitle">A complete ecosystem designed to power India's student economy.</p>
          </div>

          <div className="eco-grid grid grid-4">
            {ecosystemItems.map((item, i) => (
              <EcosystemCard key={item.name} {...item} />
            ))}
          </div>

          <div className="eco-cta">
            <button className="btn btn-secondary btn-lg" onClick={() => onNavigate('ecosystem')}>
              Explore the Ecosystem →
            </button>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section testimonials" ref={reveal6.ref}>
        <div className={`container ${reveal6.visible ? 'revealed' : 'hidden-section'}`}>
          <div className="section-header">
            <span className="section-label">Proof</span>
            <h2 className="section-title">Real Students. Real Earnings.</h2>
          </div>

          <div className="testimonials-grid grid grid-3">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card glass">
                <div className="testimonial-card__quote">
                  <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                    <path d="M0 24V14.4C0 10.4 0.8 7.2 2.4 4.8C4.16 2.4 6.72 0.64 10.08 0L12 3.84C10.08 4.48 8.56 5.6 7.44 7.2C6.4 8.72 5.88 10.48 5.88 12.48H12V24H0ZM20 24V14.4C20 10.4 20.8 7.2 22.4 4.8C24.16 2.4 26.72 0.64 30.08 0L32 3.84C30.08 4.48 28.56 5.6 27.44 7.2C26.4 8.72 25.88 10.48 25.88 12.48H32V24H20Z" fill="rgba(108,58,255,0.2)"/>
                  </svg>
                </div>
                <p className="testimonial-card__text">{t.quote}</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar" style={{ background: t.color }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__college">{t.college}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="section cta-section" ref={reveal7.ref}>
        <div className={`container ${reveal7.visible ? 'revealed' : 'hidden-section'}`}>
          <div className="cta-block">
            <h2 className="cta-block__title">
              Your next opportunity is <br/>
              <span className="text-gradient-violet">3 seconds away.</span>
            </h2>
            <p className="cta-block__desc">
              Join 10,000+ students already earning with India's boldest brands.
            </p>
            <div className="cta-block__actions">
              <button className="btn btn-teal btn-lg" onClick={() => onNavigate('dashboard')}>
                Start Earning Now →
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => onNavigate('campaigns')}>
                See Live Campaigns
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div className="footer__brand">
              <div className="footer__logo">
                <span className="footer__logo-text">PULSE</span>
                <span className="footer__logo-dot"></span>
              </div>
              <p className="footer__tagline">Built for the Bold.</p>
              <p className="footer__desc">India's first platform that pays students to represent the brands they love.</p>
            </div>

            <div className="footer__links-group">
              <h4 className="footer__links-title">For Students</h4>
              <a href="#" className="footer__link">Start Earning</a>
              <a href="#" className="footer__link">Browse Campaigns</a>
              <a href="#" className="footer__link">Ambassador Tiers</a>
              <a href="#" className="footer__link">Pulse Pro</a>
            </div>

            <div className="footer__links-group">
              <h4 className="footer__links-title">For Brands</h4>
              <a href="#" className="footer__link">Launch a Campaign</a>
              <a href="#" className="footer__link">Pricing</a>
              <a href="#" className="footer__link">Case Studies</a>
              <a href="#" className="footer__link">Enterprise</a>
            </div>

            <div className="footer__links-group">
              <h4 className="footer__links-title">Company</h4>
              <a href="#" className="footer__link">About</a>
              <a href="#" className="footer__link">Careers</a>
              <a href="#" className="footer__link">Blog</a>
              <a href="#" className="footer__link">Contact</a>
            </div>
          </div>

          <div className="footer__bottom">
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="footer__social" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className="footer__social" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="footer__social" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
            </div>
            <p className="footer__made">Made with 💜 for India's students</p>
            <p className="footer__copy">© 2026 Pulse Technologies Pvt. Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
