import React from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen5CoreLoop = ({ onContinue, onBack, onNext, step }) => {
  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">How Propel Works</h1>
        <div className="loop-diagram">
          <div className="loop-step">
            <div className="loop-number">1</div>
            <div className="loop-text">Need Stated</div>
          </div>
          <div className="loop-arrow">→</div>
          <div className="loop-step">
            <div className="loop-number">2</div>
            <div className="loop-text">Match Made</div>
          </div>
          <div className="loop-arrow">→</div>
          <div className="loop-step">
            <div className="loop-number">3</div>
            <div className="loop-text">Work Organized</div>
          </div>
          <div className="loop-arrow">→</div>
          <div className="loop-step">
            <div className="loop-number">4</div>
            <div className="loop-text">Transaction</div>
          </div>
          <div className="loop-arrow">→</div>
          <div className="loop-step">
            <div className="loop-number">5</div>
            <div className="loop-text">Progress Shared</div>
          </div>
          <div className="loop-arrow">→</div>
          <div className="loop-step">
            <div className="loop-number">6</div>
            <div className="loop-text">Reputation Grows</div>
          </div>
          <div className="loop-arrow">→</div>
          <div className="loop-step">
            <div className="loop-number">7</div>
            <div className="loop-text">Better Matches</div>
          </div>
        </div>
        <p className="screen-text">
          This is how the platform coordinates action. Every screen either captures signal for matching, 
          creates momentum through tasks and actions, or executes the loop.
        </p>
        <button className="continue-btn" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen5CoreLoop

