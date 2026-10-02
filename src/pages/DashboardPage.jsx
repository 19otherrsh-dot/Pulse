import { useState, useEffect } from 'react'
import CampaignCard from '../components/CampaignCard'
import TierBadge from '../components/TierBadge'
import './DashboardPage.css'

const activeCampaigns = [
  { brandEmoji: '🎵', brandName: 'Spotify', title: 'Share Your Playlist Story', payout: '₹800', status: 'Content Submitted', deadline: '2 days left', city: 'All Cities', description: 'Create an Instagram story sharing your most-played playlist.' },
  { brandEmoji: '🛵', brandName: 'Rapido', title: 'Campus Ambassador Program', payout: '₹2,400/week', status: 'In Progress', progress: 60, city: 'Mumbai', description: 'Weekly campus tasks and brand representation.' },
  { brandEmoji: '🎧', brandName: 'boAt', title: 'Rockerz Unbox & Review', payout: '₹1,200', status: 'Under Review', city: 'All Cities', description: 'Unbox and review the new Rockerz 255 Pro.' },
]

const discoverCampaigns = [
  { brandEmoji: '🍕', brandName: 'Zomato', title: 'Campus Canteen Review', description: 'Film a 30-second honest review of your campus canteen. Keep it real.', payout: '₹500', spotsLeft: 89, city: 'All Cities', tags: ['Content', 'Video'] },
  { brandEmoji: '👗', brandName: 'Myntra', title: 'College Fashion Hunt', description: 'Show off your unique college style. Best looks win vouchers + cash.', payout: '₹1,500 + vouchers', spotsLeft: 23, city: 'Mumbai/Pune', tags: ['Content', 'Fashion'], featured: true },
  { brandEmoji: '🛒', brandName: 'Swiggy Instamart', title: 'Campus Ambassador', description: 'Be the Swiggy Instamart voice on your campus. Monthly retainer + perks.', payout: '₹3,000/month', spotsLeft: 5, city: 'Bengaluru', tags: ['Campus', 'Monthly'] },
  { brandEmoji: '💳', brandName: 'CRED', title: 'Campus Challenge', description: 'Creative challenge — make CRED cool on campus. Prizes + swag.', payout: '₹2,000 + swag', spotsLeft: 45, city: 'All Cities', tags: ['Content', 'Challenge'] },
]

const leaderboard = [
  { rank: 1, emoji: '🥇', name: 'Rohan M.', earnings: '₹34,200', tier: 'Platinum', initials: 'RM', color: '#6C3AFF' },
  { rank: 2, emoji: '🥈', name: 'Ananya S.', earnings: '₹28,900', tier: 'Gold', initials: 'AS', color: '#F59E0B' },
  { rank: 3, emoji: '🥉', name: 'Vikram P.', earnings: '₹25,100', tier: 'Gold', initials: 'VP', color: '#F59E0B' },
  { rank: 4, emoji: '', name: 'Meera K.', earnings: '₹21,800', tier: 'Silver', initials: 'MK', color: '#94A3B8' },
  { rank: 5, emoji: '', name: 'You (Priya)', earnings: '₹12,400', tier: 'Silver', initials: 'PM', color: '#6C3AFF', isYou: true },
]

const earningsData = [
  { month: 'Dec', amount: 2000 },
  { month: 'Jan', amount: 4500 },
  { month: 'Feb', amount: 3800 },
  { month: 'Mar', amount: 7200 },
  { month: 'Apr', amount: 9100 },
  { month: 'May', amount: 12400 },
]

const filters = ['All', 'Content', 'Social', 'Campus', 'Research']

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [showPayout, setShowPayout] = useState(false)
  const [hoveredBar, setHoveredBar] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowPayout(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const maxEarning = Math.max(...earningsData.map(d => d.amount))

  return (
    <div className="dashboard">
      <div className="container">
        {/* Top Bar */}
        <div className="dash-topbar">
          <div className="dash-topbar__left">
            <h1 className="dash-topbar__greeting">Hey, Priya 👋</h1>
            <p className="dash-topbar__sub">Ready to earn today?</p>
          </div>
          <div className="dash-topbar__right">
            <TierBadge tier="Silver" size="md" />
            <div className="dash-topbar__notif">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="dash-topbar__notif-dot"></span>
            </div>
            <div className="dash-topbar__avatar">PM</div>
          </div>
        </div>

        {/* Wallet Widget */}
        <div className={`wallet-widget ${showPayout ? 'wallet-widget--active' : ''}`}>
          <div className="wallet-widget__bg">
            <div className="wallet-widget__glow"></div>
          </div>
          <div className="wallet-widget__content">
            <div className="wallet-widget__main">
              <span className="wallet-widget__label">Total Earned</span>
              <span className="wallet-widget__amount">₹12,400</span>
              <span className="wallet-widget__growth">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 4v12m0-12l-4 4m4-4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                +₹3,300 this month
              </span>
            </div>
            <div className="wallet-widget__actions">
              <button className="btn btn-teal">
                Withdraw ₹12,400
              </button>
            </div>
          </div>
          <div className={`wallet-widget__payout ${showPayout ? 'wallet-widget__payout--show' : ''}`}>
            <span className="wallet-widget__payout-icon">⚡</span>
            <span className="wallet-widget__payout-text">Ka-ching! ₹1,200 from Spotify campaign</span>
            <span className="wallet-widget__payout-time">2 min ago</span>
          </div>
          {showPayout && (
            <div className="wallet-widget__burst">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="wallet-widget__particle"
                  style={{
                    '--angle': `${i * 30}deg`,
                    '--delay': `${i * 0.05}s`,
                    '--color': i % 3 === 0 ? 'var(--electric-violet)' : i % 3 === 1 ? 'var(--pulse-teal)' : 'var(--golden-hour)',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Dashboard Grid */}
        <div className="dash-grid">
          {/* Active Campaigns */}
          <div className="dash-section dash-section--full">
            <h2 className="dash-section__title">Your Active Campaigns</h2>
            <div className="dash-active-campaigns">
              {activeCampaigns.map((c, i) => (
                <CampaignCard key={i} {...c} />
              ))}
            </div>
          </div>

          {/* Earnings Chart */}
          <div className="dash-section dash-chart-section">
            <div className="dash-section__header">
              <h2 className="dash-section__title">Your Earnings Journey</h2>
              <span className="dash-chart__growth badge badge-teal">+36% vs last month</span>
            </div>
            <div className="dash-chart">
              {earningsData.map((d, i) => (
                <div
                  key={d.month}
                  className="dash-chart__col"
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className="dash-chart__bar-wrapper">
                    {hoveredBar === i && (
                      <div className="dash-chart__tooltip">₹{d.amount.toLocaleString()}</div>
                    )}
                    <div
                      className="dash-chart__bar"
                      style={{
                        height: `${(d.amount / maxEarning) * 100}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  </div>
                  <span className="dash-chart__label">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="dash-section dash-leaderboard-section">
            <h2 className="dash-section__title">Top Earners This Month</h2>
            <div className="dash-leaderboard">
              {leaderboard.map((user) => (
                <div key={user.rank} className={`leaderboard-row ${user.isYou ? 'leaderboard-row--you' : ''}`}>
                  <span className="leaderboard-row__rank">
                    {user.emoji || `#${user.rank}`}
                  </span>
                  <div className="leaderboard-row__avatar" style={{ background: user.color }}>
                    {user.initials}
                  </div>
                  <span className="leaderboard-row__name">{user.name}</span>
                  <span className="leaderboard-row__earnings">{user.earnings}</span>
                  <TierBadge tier={user.tier} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Ambassador Tier */}
          <div className="dash-section dash-tier-section">
            <h2 className="dash-section__title">Your Ambassador Tier</h2>
            <div className="tier-card">
              <div className="tier-card__current">
                <TierBadge tier="Silver" size="lg" />
                <span className="tier-card__arrow">→</span>
                <TierBadge tier="Gold" size="lg" />
              </div>
              <div className="tier-card__progress">
                <div className="tier-card__progress-bar">
                  <div className="tier-card__progress-fill" style={{ width: '67%' }}></div>
                </div>
                <span className="tier-card__progress-text">67% to Gold</span>
              </div>
              <p className="tier-card__requirement">3 more campaigns to unlock Gold tier</p>
              <div className="tier-card__benefits">
                <span className="tier-card__benefit-title">Gold unlocks:</span>
                <div className="tier-card__benefit-list">
                  <span className="tier-card__benefit">⚡ Priority campaigns</span>
                  <span className="tier-card__benefit">👁️ 2x visibility</span>
                  <span className="tier-card__benefit">🏅 Gold badge</span>
                  <span className="tier-card__benefit">💰 Higher payouts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dash-section dash-section--full">
            <h2 className="dash-section__title">Quick Actions</h2>
            <div className="quick-actions">
              <button className="quick-action glass">
                <span className="quick-action__icon">📝</span>
                <span className="quick-action__label">Submit Content</span>
              </button>
              <button className="quick-action glass">
                <span className="quick-action__icon">📊</span>
                <span className="quick-action__label">View Analytics</span>
              </button>
              <button className="quick-action glass">
                <span className="quick-action__icon">🎓</span>
                <span className="quick-action__label">Pulse Pro</span>
                <span className="quick-action__new">NEW</span>
              </button>
              <button className="quick-action glass">
                <span className="quick-action__icon">👥</span>
                <span className="quick-action__label">Refer a Friend</span>
              </button>
            </div>
          </div>

          {/* Discover Campaigns */}
          <div className="dash-section dash-section--full">
            <div className="dash-section__header">
              <h2 className="dash-section__title">Discover Campaigns</h2>
              <div className="dash-filters">
                {filters.map(f => (
                  <button
                    key={f}
                    className={`dash-filter ${activeFilter === f ? 'dash-filter--active' : ''}`}
                    onClick={() => setActiveFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-2">
              {discoverCampaigns.map((c, i) => (
                <CampaignCard key={i} {...c} onApply={() => {}} />
              ))}
            </div>
          </div>

          {/* Pulse Pro Upsell */}
          <div className="dash-section dash-section--full">
            <div className="pro-banner">
              <div className="pro-banner__content">
                <h3 className="pro-banner__title">Go Pro. <span className="text-gradient-violet">Earn More.</span></h3>
                <p className="pro-banner__desc">₹299/month — Priority campaigns, Pro badge, 2x visibility in campaign matching.</p>
              </div>
              <button className="btn btn-primary btn-lg pro-banner__cta">
                Try Free for 7 Days
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
