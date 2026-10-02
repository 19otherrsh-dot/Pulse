import './CampaignCard.css'

export default function CampaignCard({
  brandName,
  brandEmoji = '🏢',
  title,
  description,
  payout,
  spotsLeft,
  city = 'All Cities',
  tags = [],
  featured = false,
  status,
  progress,
  deadline,
  onApply,
}) {
  const statusColors = {
    'Content Submitted': 'teal',
    'In Progress': 'violet',
    'Under Review': 'golden',
    'Completed': 'teal',
    'Pending': 'coral',
  }

  return (
    <div className={`campaign-card ${featured ? 'campaign-card--featured' : ''}`}>
      <div className="campaign-card__accent"></div>

      <div className="campaign-card__body">
        <div className="campaign-card__header">
          <div className="campaign-card__brand">
            <span className="campaign-card__emoji">{brandEmoji}</span>
            <span className="campaign-card__brand-name">{brandName}</span>
          </div>
          {featured && <span className="badge badge-violet">Featured ⭐</span>}
          {status && (
            <span className={`badge badge-${statusColors[status] || 'violet'}`}>
              {status}
            </span>
          )}
        </div>

        <h3 className="campaign-card__title">{title}</h3>
        <p className="campaign-card__desc">{description}</p>

        {progress !== undefined && (
          <div className="campaign-card__progress">
            <div className="campaign-card__progress-bar">
              <div
                className="campaign-card__progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="campaign-card__progress-text">{progress}%</span>
          </div>
        )}

        {tags.length > 0 && (
          <div className="campaign-card__tags">
            {tags.map(tag => (
              <span key={tag} className="campaign-card__tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="campaign-card__footer">
          <div className="campaign-card__meta">
            <span className="campaign-card__payout">{payout}</span>
            {spotsLeft !== undefined && (
              <span className={`campaign-card__spots ${spotsLeft < 20 ? 'campaign-card__spots--urgent' : ''}`}>
                {spotsLeft} spots left
              </span>
            )}
            {deadline && (
              <span className="campaign-card__deadline">⏰ {deadline}</span>
            )}
          </div>
          <div className="campaign-card__footer-right">
            <span className="campaign-card__city">{city}</span>
            {onApply && (
              <button className="btn btn-primary btn-sm" onClick={onApply}>
                Apply Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
