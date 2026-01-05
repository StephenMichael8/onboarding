import React from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen7Scaling = ({ onContinue, onBack, onNext, step }) => {
  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">Good Intentions Don't Scale</h1>
        <div className="scale-visual">
          <div className="scale-level scale-small">
            <div className="scale-label">Small</div>
            <div className="scale-bar" style={{ width: '20%' }}></div>
          </div>
          <div className="scale-level scale-medium">
            <div className="scale-label">Medium</div>
            <div className="scale-bar" style={{ width: '50%' }}></div>
          </div>
          <div className="scale-level scale-large">
            <div className="scale-label">Large</div>
            <div className="scale-bar" style={{ width: '80%' }}></div>
          </div>
          <div className="scale-level scale-global">
            <div className="scale-label">Global Impact</div>
            <div className="scale-bar" style={{ width: '100%' }}></div>
          </div>
        </div>
        <p className="screen-text">
          Individual effort alone isn't enough. To create real, lasting change, we need infrastructure 
          that connects, coordinates, and scales impact.
        </p>
        <button className="continue-btn" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen7Scaling

