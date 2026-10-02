import './TierBadge.css'

const tierConfig = {
  Bronze: { icon: '🥉', className: 'tier-badge--bronze' },
  Silver: { icon: '🥈', className: 'tier-badge--silver' },
  Gold: { icon: '🥇', className: 'tier-badge--gold' },
  Platinum: { icon: '💎', className: 'tier-badge--platinum' },
}

export default function TierBadge({ tier = 'Bronze', size = 'md' }) {
  const config = tierConfig[tier] || tierConfig.Bronze

  return (
    <span className={`tier-badge tier-badge--${size} ${config.className}`}>
      <span className="tier-badge__icon">{config.icon}</span>
      <span className="tier-badge__label">{tier}</span>
    </span>
  )
}
