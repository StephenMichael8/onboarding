import React from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen8Fragmentation = ({ onContinue, onBack, onNext, step }) => {
  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">We Estimate $2.5 Trillion Lost</h1>
        <div className="stat-large">
          <div className="stat-number">$2.5T</div>
          <div className="stat-label">in impact capital and innovation potential lost annually</div>
        </div>
        <p className="screen-text-large">
          Due to fragmentation.
        </p>
        <div className="fragmentation-points">
          <div className="frag-point">
            <div className="frag-icon">💡</div>
            <p>Brilliant founders, researchers, and investors remain disconnected</p>
          </div>
          <div className="frag-point">
            <div className="frag-icon">⏱️</div>
            <p>Every missed connection delays cures, drains motivation, and wastes capital</p>
          </div>
        </div>
        <button className="continue-btn" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen8Fragmentation

