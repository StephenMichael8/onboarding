import React from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen11Proof = ({ onContinue, onBack, onNext, step }) => {
  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">Real Results</h1>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="testimonial-avatar">👤</div>
            <div className="testimonial-content">
              <div className="testimonial-result">Raised Funds</div>
              <div className="testimonial-name">Member Name</div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-avatar">👤</div>
            <div className="testimonial-content">
              <div className="testimonial-result">First Customer</div>
              <div className="testimonial-name">Member Name</div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-avatar">👤</div>
            <div className="testimonial-content">
              <div className="testimonial-result">Found Co-founder</div>
              <div className="testimonial-name">Member Name</div>
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

export default Screen11Proof

