import { useState } from 'react'
import CampaignCard from '../components/CampaignCard'
import './CampaignsPage.css'

const allCampaigns = [
  { id: 1, brandEmoji: '🎵', brandName: 'Spotify', title: 'Share Your Playlist Story', description: 'Create an Instagram story sharing your most-played playlist and tag @SpotifyIndia. Authentic vibes only.', payout: '₹800', spotsLeft: 47, city: 'All Cities', tags: ['Content', 'Instagram'], featured: true },
  { id: 2, brandEmoji: '🍕', brandName: 'Zomato', title: 'Campus Canteen Review', description: 'Film a 30-second honest review of your campus canteen. Keep it real, keep it funny.', payout: '₹500', spotsLeft: 89, city: 'All Cities', tags: ['Content', 'Video'] },
  { id: 3, brandEmoji: '👗', brandName: 'Myntra', title: 'College Fashion Hunt', description: 'Show off your unique college style. Best looks win vouchers + cash.', payout: '₹1,500 + vouchers', spotsLeft: 23, city: 'Mumbai/Pune', tags: ['Content', 'Fashion'] },
  { id: 4, brandEmoji: '🛵', brandName: 'Rapido', title: 'Campus Ambassador Program', description: 'Be the face of Rapido on your campus. Weekly tasks, weekly pay. Real marketing experience.', payout: '₹2,400/week', spotsLeft: 15, city: 'Mumbai', tags: ['Campus', 'Weekly'] },
  { id: 5, brandEmoji: '🛒', brandName: 'Swiggy Instamart', title: 'Campus Ambassador', description: 'Be the Swiggy Instamart voice on your campus. Monthly retainer + perks.', payout: '₹3,000/month', spotsLeft: 5, city: 'Bengaluru', tags: ['Campus', 'Monthly'] },
  { id: 6, brandEmoji: '💳', brandName: 'CRED', title: 'Campus Challenge', description: 'Creative challenge — make CRED cool on campus. Prizes + swag.', payout: '₹2,000 + swag', spotsLeft: 45, city: 'All Cities', tags: ['Content', 'Challenge'] },
  { id: 7, brandEmoji: '🎧', brandName: 'boAt', title: 'Rockerz Unbox & Review', description: 'Unbox and review the new Rockerz 255 Pro. You keep the product. Real reactions only.', payout: '₹1,200', spotsLeft: 12, city: 'All Cities', tags: ['Content', 'Product'], featured: true },
  { id: 8, brandEmoji: '☕', brandName: 'Starbucks', title: 'Finals Week Fuel', description: 'Show us how Starbucks gets you through finals week. Best reels featured on main page.', payout: '₹1,000 + drinks', spotsLeft: 30, city: 'Delhi/NCR', tags: ['Content', 'Instagram'] },
]

const filters = ['All', 'Content', 'Campus', 'Instagram', 'Video', 'Fashion']

export default function CampaignsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  const filteredCampaigns = allCampaigns.filter(c => {
    const matchesFilter = activeFilter === 'All' || c.tags.includes(activeFilter)
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.brandName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="campaigns-page">
      <div className="container">
        <div className="campaigns-header">
          <h1 className="campaigns-title">Explore <span className="text-gradient-violet">Campaigns</span></h1>
          <p className="campaigns-subtitle">Find your next brand partnership. Real money, real experience.</p>
          
          <div className="campaigns-controls">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search brands or campaigns..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-pills">
              {filters.map(f => (
                <button
                  key={f}
                  className={`filter-pill ${activeFilter === f ? 'filter-pill--active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="campaigns-grid grid grid-3">
          {filteredCampaigns.map(c => (
            <CampaignCard 
              key={c.id} 
              {...c} 
              onApply={() => setSelectedCampaign(c)} 
            />
          ))}
          {filteredCampaigns.length === 0 && (
            <div className="no-results">
              <span className="no-results__emoji">🕵️‍♂️</span>
              <h3>No campaigns found</h3>
              <p>Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="modal-overlay" onClick={() => setSelectedCampaign(null)}>
          <div className="modal-content glass" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCampaign(null)}>✕</button>
            <div className="modal-header">
              <div className="modal-brand">
                <span className="modal-emoji">{selectedCampaign.brandEmoji}</span>
                <h2>{selectedCampaign.brandName}</h2>
              </div>
              <span className="modal-payout text-gradient-violet">{selectedCampaign.payout}</span>
            </div>
            <h3 className="modal-title">{selectedCampaign.title}</h3>
            
            <div className="modal-tags">
              {selectedCampaign.tags.map(tag => (
                <span key={tag} className="badge badge-teal">{tag}</span>
              ))}
              <span className="badge badge-coral">{selectedCampaign.spotsLeft} spots left</span>
              <span className="badge badge-violet">{selectedCampaign.city}</span>
            </div>

            <div className="modal-body">
              <h4>The Brief</h4>
              <p>{selectedCampaign.description}</p>
              
              <h4>Deliverables</h4>
              <ul>
                <li>1x Instagram Story/Reel</li>
                <li>Tag {selectedCampaign.brandName} official handle</li>
                <li>Keep it authentic to your personal brand</li>
              </ul>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-primary btn-lg full-width" onClick={() => setSelectedCampaign(null)}>
                Apply for Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
