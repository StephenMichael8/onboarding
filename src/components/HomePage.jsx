import React, { useState } from 'react'
import './HomePage.css'

const HomePage = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  const filters = ['All', 'Founders', 'Investors', 'Providers', 'Changemakers']

  return (
    <div className="homepage">
      {/* Top Navigation */}
      <header className="homepage-header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon" aria-hidden="true">🌍</div>
            <span className="logo-text">Propel Earth</span>
          </div>
          <nav className="main-nav">
            <button type="button" className="nav-link active">Explore</button>
            <button type="button" className="nav-link">My Network</button>
            <button type="button" className="nav-link">Resources</button>
            <button type="button" className="nav-link">Messages</button>
            <button type="button" className="nav-link">Notifications</button>
          </nav>
        </div>
        <div className="header-right">
          <div className="user-profile">
            <div className="profile-avatar">👤</div>
            <span className="profile-arrow">▼</span>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn">Create a Need</button>
        <button className="action-btn">Create an Offer</button>
        <button className="action-btn">Make a Post</button>
        <button className="action-btn">Chat with AI</button>
      </div>

      {/* Content Filters */}
      <div className="content-filters">
        {filters.map(filter => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Left Column */}
        <div className="content-column left-column">
          {/* Spotlight */}
          <div className="spotlight-card">
            <div className="card-image">
              <div className="image-placeholder">📦</div>
            </div>
            <div className="card-content">
              <h3 className="card-title">Spotlight: Eco-friendly Packaging Solutions by GreenTech</h3>
              <button className="read-more-btn">Read More</button>
            </div>
          </div>

          {/* Opportunities */}
          <div className="section-title">Opportunities</div>
          <div className="opportunities-grid">
            <div className="opportunity-card">
              <div className="card-image small">
                <div className="image-placeholder">🌍</div>
              </div>
              <div className="card-content">
                <h4 className="card-title-small">Impact Grant by Global Green Fund</h4>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
            <div className="opportunity-card">
              <div className="card-image small">
                <div className="image-placeholder">⚡</div>
              </div>
              <div className="card-content">
                <h4 className="card-title-small">Tech for Good Accelerator</h4>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="content-column middle-column">
          <div className="section-title">Trending Needs</div>
          <div className="needs-list">
            <div className="need-card">
              <div className="need-image">
                <div className="image-placeholder">☀️</div>
              </div>
              <div className="need-content">
                <h4 className="need-title">Clean Energy Solutions for Rural India</h4>
                <p className="need-desc">Seeking solar panel providers and installation experts</p>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
            <div className="need-card">
              <div className="need-image">
                <div className="image-placeholder">♻️</div>
              </div>
              <div className="need-content">
                <h4 className="need-title">Plastic Waste Recycling Plant</h4>
                <p className="need-desc">Seed funding needed for sustainable waste management</p>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
            <div className="need-card">
              <div className="need-image">
                <div className="image-placeholder">💻</div>
              </div>
              <div className="need-content">
                <h4 className="need-title">Digital Literacy Program</h4>
                <p className="need-desc">Training resources for refugee communities</p>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
            <div className="need-card">
              <div className="need-image">
                <div className="image-placeholder">🌬️</div>
              </div>
              <div className="need-content">
                <h4 className="need-title">Eon Energy Solutions for Rural...</h4>
                <p className="need-desc">Wind energy infrastructure development</p>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="content-column right-column">
          {/* Events */}
          <div className="section-title">Events</div>
          <div className="events-grid">
            <div className="event-card">
              <div className="card-image small">
                <div className="image-placeholder">🌍</div>
              </div>
              <div className="card-content">
                <h4 className="card-title-small">Climate Action Webinar</h4>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
            <div className="event-card">
              <div className="card-image small">
                <div className="image-placeholder">👥</div>
              </div>
              <div className="card-content">
                <h4 className="card-title-small">Global Founder Meetup</h4>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
          </div>

          {/* People */}
          <div className="section-title">People</div>
          <div className="people-list">
            <div className="person-card">
              <div className="person-avatar">👩</div>
              <div className="person-info">
                <div className="person-name">Sarah Chen</div>
                <div className="person-role">Climate Tech Founder</div>
              </div>
            </div>
            <div className="person-card">
              <div className="person-avatar">👨</div>
              <div className="person-info">
                <div className="person-name">David O.</div>
                <div className="person-role">Renewable Energy Expert</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="bottom-nav-item">
          <div className="nav-icon">🛒</div>
          <span className="nav-label">Marketplace</span>
        </div>
        <div className="bottom-nav-item">
          <div className="nav-icon">👥</div>
          <span className="nav-label">Community</span>
        </div>
        <div className="bottom-nav-item active">
          <div className="nav-icon">🧭</div>
          <span className="nav-label">Explore</span>
        </div>
        <div className="bottom-nav-item">
          <div className="nav-icon">🤖</div>
          <span className="nav-label">AI Chat</span>
        </div>
        <div className="bottom-nav-item">
          <div className="nav-icon">👤</div>
          <span className="nav-label">Profile</span>
        </div>
      </nav>
    </div>
  )
}

export default HomePage

