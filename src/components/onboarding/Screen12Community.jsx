import React from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen12Community = ({ onContinue, onBack, onNext, step }) => {
  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">Explore the Community</h1>
        <div className="events-row">
          <div className="event-item">Weekly Events</div>
          <div className="event-item">Monthly Pitches</div>
          <div className="event-item">Daily Coworking</div>
        </div>
        <div className="members-grid">
          <div className="member-section">
            <h3 className="member-section-title">3 Founders</h3>
            <div className="member-cards">
              {[1, 2, 3].map(i => (
                <div key={i} className="member-card">
                  <div className="member-logo">🏢</div>
                  <div className="member-info">
                    <div className="member-name">Founder Name</div>
                    <div className="member-company">Company Name</div>
                    <div className="member-desc">3 word description</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="member-section">
            <h3 className="member-section-title">3 Providers</h3>
            <div className="member-cards">
              {[1, 2, 3].map(i => (
                <div key={i} className="member-card">
                  <div className="member-logo">💼</div>
                  <div className="member-info">
                    <div className="member-name">Provider Name</div>
                    <div className="member-company">Service Type</div>
                    <div className="member-desc">3 word description</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="member-section">
            <h3 className="member-section-title">3 Investors</h3>
            <div className="member-cards">
              {[1, 2, 3].map(i => (
                <div key={i} className="member-card">
                  <div className="member-logo">💰</div>
                  <div className="member-info">
                    <div className="member-name">Investor Name</div>
                    <div className="member-company">Fund Name</div>
                    <div className="member-desc">3 word description</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="member-section">
            <h3 className="member-section-title">3 Featured Changemakers</h3>
            <div className="member-cards">
              {[1, 2, 3].map(i => (
                <div key={i} className="member-card">
                  <div className="member-logo">🌟</div>
                  <div className="member-info">
                    <div className="member-name">Changemaker Name</div>
                    <div className="member-company">Role/Title</div>
                    <div className="member-desc">3 word description</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className="continue-btn" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen12Community

