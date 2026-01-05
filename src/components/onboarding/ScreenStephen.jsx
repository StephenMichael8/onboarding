import React from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const ScreenStephen = ({ onContinue, onBack, onNext, step }) => {
  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} />
      <div className="screen-content">
        <div className="stephen-section">
          <div className="stephen-avatar">👤</div>
          <h1 className="screen-title">Hi, I'm Stephen</h1>
          <p className="screen-text-large">
            I'm the son of 2 social workers who led me to believe that you can create the change you want to see.
          </p>
          <p className="screen-text">
            I started Propel to make the maximum impact on the most people—one human, one company, one earth at a time.
          </p>
        </div>
        <button className="continue-btn" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default ScreenStephen

