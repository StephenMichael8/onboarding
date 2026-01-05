import React from 'react'
import './LandingPage.css'

const LandingPage = ({ onStartOnboarding, onSignIn }) => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="logo">
          <div className="logo-icon">P</div>
          <span className="logo-text">Propel Earth</span>
        </div>
        <nav className="landing-nav">
          <a href="#why">Why Propel?</a>
          <a href="#resources">Resources</a>
          <button className="sign-in-btn" onClick={onSignIn}>Sign in</button>
        </nav>
      </header>

      {/* Main Content */}
      <div className="landing-content">
        <div className="landing-left">
          <div className="onboarding-badge">
            <span className="badge-dot"></span>
            IMPACT PLATFORM ONBOARDING
          </div>
          
          <h1 className="landing-headline">
            Ready to <span className="highlight">Propel</span> Your Impact?
          </h1>
          
          <p className="landing-description">
            We're building the infrastructure for impact-driven founders. Connect, access resources, 
            and scale solutions that matter in just a few steps.
          </p>

          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon rocket">🚀</div>
              <div className="feature-text">
                <h3>5-Minute Setup</h3>
                <p>Guided profile creation.</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon community">👥</div>
              <div className="feature-text">
                <h3>Join 300+ Builders</h3>
                <p>Access instant community.</p>
              </div>
            </div>
          </div>

          <button className="start-onboarding-btn" onClick={onStartOnboarding}>
            Start Onboarding
            <span className="arrow">→</span>
          </button>
        </div>

        <div className="landing-right">
          <div className="globe-container">
            <div className="globe-visual">
              <div className="globe-sphere"></div>
              <div className="globe-grid"></div>
            </div>
            <div className="overlay-tag tag-top-right">
              <span className="tag-dot"></span>
              30+ Service Providers online
            </div>
            <div className="founder-spotlight">
              <div className="founder-avatar">MA</div>
              <div className="founder-info">
                <div className="founder-label">FOUNDER SPOTLIGHT</div>
                <div className="founder-name">Marina Aslanidou</div>
                <div className="founder-tags">
                  <span className="tag">Mental Health</span>
                  <span className="tag">Impact-Driven</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage

