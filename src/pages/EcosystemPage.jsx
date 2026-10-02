import React from 'react'
import EcosystemCard from '../components/EcosystemCard'
import './EcosystemPage.css'

const ecosystemItems = [
  { emoji: '🎓', name: 'PulseCampus', tagline: 'The student union, reimagined.', description: 'White-labelled hyperlocal campus app for every college. Notice boards, events, buy/sell, and seamless Pulse integration. Expected reach: 2,100+ colleges.', comingSoon: false },
  { emoji: '🎤', name: 'PulseStage', tagline: 'Where creators are born.', description: 'Content accelerator and talent agency for student creators. 12-week cohorts, brand deals, and original content series.', comingSoon: false },
  { emoji: '🏆', name: 'PulseLeague', tagline: 'The IPL of marketing.', description: 'National campus marketing championship. Real brands, real budgets, real campaigns. Compete. Win. Get hired.', comingSoon: true },
  { emoji: '💳', name: 'PulseCard', tagline: 'Earn first. Spend smart.', description: 'India\'s first credit card designed for students who earn. Borrow against your campaign earnings at 0% interest.', comingSoon: true },
  { emoji: '🏢', name: 'PulseSpaces', tagline: 'Your campus office.', description: 'Co-working and creator studios near major universities. Podcast rooms, photo studios, brand activation zones.', comingSoon: true },
  { emoji: '📊', name: 'PulseInsight', tagline: 'The Bloomberg of Gen Z.', description: 'B2B intelligence dashboard. Weekly youth sentiment, brand perception scores, and early trend signals.', comingSoon: true },
  { emoji: '🌏', name: 'PulseGlobal', tagline: 'India\'s playbook, Asia\'s stage.', description: 'Expanding to Indonesia, Philippines, and Vietnam. Same model, new markets, massive opportunity.', comingSoon: true },
  { emoji: '🎓', name: 'PulseU', tagline: 'The Anti-MBA.', description: '6-month career accelerator. 3 rotations inside real brands. More practical, more affordable, more connected.', comingSoon: true },
]

export default function EcosystemPage() {
  return (
    <div className="ecosystem-page">
      <div className="container">
        <div className="eco-header">
          <span className="section-label">Beyond Campaigns</span>
          <h1 className="eco-title">The <span className="text-gradient-violet">Ecosystem</span></h1>
          <p className="eco-subtitle">
            Every arm of the Pulse ecosystem makes the next one stronger. 
            From physical spaces to financial products, we are building the infrastructure for India's student economy.
          </p>
        </div>

        <div className="eco-diagram glass">
          <div className="eco-diagram__center">
            <div className="eco-diagram__core">
              <span className="eco-diagram__core-text">PULSE</span>
              <span className="eco-diagram__core-sub">Core Platform</span>
            </div>
          </div>
          {/* Decorative lines to represent connections */}
          <svg className="eco-diagram__lines" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="120" stroke="rgba(108, 58, 255, 0.3)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
            <circle cx="200" cy="200" r="160" stroke="rgba(0, 212, 170, 0.2)" strokeWidth="1" fill="none" />
            
            {/* Pulsing dots on the outer circle */}
            <circle cx="40" cy="200" r="4" fill="var(--electric-violet)">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="360" cy="200" r="4" fill="var(--pulse-teal)">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="40" r="4" fill="var(--golden-hour)">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="360" r="4" fill="var(--energy-coral)">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div className="eco-list grid grid-2">
          {ecosystemItems.map(item => (
            <EcosystemCard key={item.name} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}
