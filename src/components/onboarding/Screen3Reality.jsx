import React from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen3Reality = ({ onContinue, onBack, onNext, step }) => {
  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">The Reality</h1>
        <p className="screen-text-large">
          People everywhere are trying to create change.
        </p>
        <p className="screen-text">
          Millions of individuals around the world are coming together and choosing now to be difference makers. 
          They're putting in effort, building solutions, and working towards the change they want to see.
        </p>
        <p className="screen-text">
          The problem isn't the desire or the effort—it's coordination.
        </p>
        <button className="continue-btn" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen3Reality

