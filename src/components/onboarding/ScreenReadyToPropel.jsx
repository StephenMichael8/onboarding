import React from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const ScreenReadyToPropel = ({ onContinue, onBack, onNext, step }) => {
  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} />
      <div className="screen-content">
        <div className="stephen-section">
          <div className="stephen-avatar">😊</div>
          <h1 className="screen-title">Ready to Propel for Yourself?</h1>
          <p className="screen-text-large highlight-text">
            Remember to advocate for yourself.
          </p>
          <p className="screen-text">
            You have the power to create change. Propel is here to support you every step of the way.
          </p>
        </div>
        <button className="continue-btn" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default ScreenReadyToPropel

