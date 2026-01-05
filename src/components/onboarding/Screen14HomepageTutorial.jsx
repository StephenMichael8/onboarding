import React from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen14HomepageTutorial = ({ onContinue, onBack, onNext, step }) => {
  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">How to Use Propel</h1>
        <div className="tutorial-content">
          <div className="tutorial-section">
            <h3 className="tutorial-subtitle">Explore Different Groups</h3>
            <p className="tutorial-text">
              Click on different tabs to explore: <strong>Founders</strong>, <strong>Investors</strong>, 
              <strong> Providers</strong>, <strong>Employers</strong>
            </p>
          </div>
          <div className="tutorial-section">
            <h3 className="tutorial-subtitle">Key Features</h3>
            <ul className="tutorial-list">
              <li><strong>News:</strong> Stay updated with community news</li>
              <li><strong>Spotlight:</strong> See featured members and projects</li>
              <li><strong>Make a Post:</strong> Share needs, offers, or opportunities</li>
              <li><strong>Buy Something:</strong> Access marketplace</li>
              <li><strong>Chat with AI:</strong> Get instant help and guidance</li>
              <li><strong>Take Action:</strong> View tasks from different projects</li>
            </ul>
          </div>
          <div className="tutorial-section">
            <h3 className="tutorial-subtitle">Bottom Navigation</h3>
            <div className="nav-preview">
              <div className="nav-item">Marketplace</div>
              <div className="nav-item nav-active">Explore</div>
              <div className="nav-item">Community</div>
              <div className="nav-item">AI Chat</div>
              <div className="nav-item">Profile</div>
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

export default Screen14HomepageTutorial

