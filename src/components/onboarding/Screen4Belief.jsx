import React from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen4Belief = ({ onContinue, onBack, onNext, step }) => {
  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">The Belief</h1>
        <p className="screen-text-large">
          Anyone should be able to say: "This is the change I want to see" — and it should be possible.
        </p>
        <p className="screen-text">
          If you are able to convince others to partake in your vision, that shouldn't be the issue.
        </p>
        <p className="screen-text">
          There should be the means for people to start supporting you and taking action collectively with you 
          to solve challenges. And it shouldn't stop there—it should work in reverse.
        </p>
        <p className="screen-text highlight-text">
          Anyone who wants to help should be able to.
        </p>
        <p className="screen-text">
          This is the core of what we believe in and are building towards: 
          <strong> making impact radically accessible.</strong>
        </p>
        <button className="continue-btn" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen4Belief

