import './EcosystemCard.css'

export default function EcosystemCard({ emoji, name, tagline, description, comingSoon = true }) {
  return (
    <div className="eco-card">
      <div className="eco-card__inner">
        <span className="eco-card__emoji">{emoji}</span>
        <h3 className="eco-card__name">{name}</h3>
        {tagline && <p className="eco-card__tagline">{tagline}</p>}
        <p className="eco-card__desc">{description}</p>
        {comingSoon && (
          <span className="badge badge-violet eco-card__badge">Coming Soon</span>
        )}
      </div>
    </div>
  )
}
