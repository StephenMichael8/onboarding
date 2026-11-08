import React, { useState, useEffect } from 'react'
import ScreenNavigation from './onboarding/ScreenNavigation'
import './OnboardingScreen.css'

const OnboardingScreen = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const [rotatingText, setRotatingText] = useState(0)
  const [selectedInterests, setSelectedInterests] = useState(data.initial_interests || [])
  
  const rotatingOptions = ['co-founder', 'investor', 'partner', 'lead', 'story', 'voice', 'purpose']
  const interestOptions = ['Funding', 'Team', 'Customers', 'Offer help', 'Explore']

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingText((prev) => (prev + 1) % rotatingOptions.length)
    }, 2000) // Change every 2 seconds

    return () => clearInterval(interval)
  }, [])

  const handleInterestClick = (interest) => {
    const newInterests = selectedInterests.includes(interest)
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest]
    setSelectedInterests(newInterests)
    if (updateData) {
      updateData('initial_interests', newInterests)
    }
  }

  const handleClick = () => {
    if (onContinue) {
      onContinue()
    }
  }

  return (
    <div className="onboarding-screen">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={false} />
      {/* Header */}
      <header className="onboarding-header">
        <div className="logo">
          <div className="logo-icon-globe" aria-hidden="true">🌍</div>
          <span className="logo-text">Propel Earth</span>
        </div>
      </header>

      {/* Globe Section */}
      <div className="globe-section">
        <div className="globe-with-popups">
          {/* Globe */}
          <div className="static-globe">
            <div className="globe-image"></div>
            
            {/* Pop-up Cards */}
            <div className="popup-card popup-south-america">
              <div className="popup-header">OPPORTUNITY</div>
              <div className="popup-content">
                Impact Investing Summit - Rio. Early bird tickets closing soon.
              </div>
              <div className="popup-arrow">→</div>
            </div>

            <div className="popup-card popup-africa">
              <div className="popup-header">NEW PROJECT</div>
              <div className="popup-content">
                Solar Water Access in Kenya. Dr. Amina K. needs 50k funding & solar tech partners.
              </div>
              <div className="popup-arrow">→</div>
            </div>

            <div className="popup-card popup-asia">
              <div className="popup-header">TRENDING NEED</div>
              <div className="popup-content">
                Sustainable Farming Mentorship. 20 founders seeking expertise.
              </div>
              <div className="popup-arrow">→</div>
            </div>
          </div>
        </div>
      </div>

      {/* Speech Bubbles in Corners */}
      <div className="speech-bubble speech-bubble-top-left">
        <div className="bubble-content">
          making impact radically accessible
        </div>
        <div className="bubble-arrow arrow-to-center"></div>
      </div>

      <div className="speech-bubble speech-bubble-top-right">
        <div className="bubble-content">
          be the change you want to see in the world
        </div>
        <div className="bubble-arrow arrow-to-center"></div>
      </div>

      <div className="speech-bubble speech-bubble-bottom-left">
        <div className="bubble-content">
          find your <span className="rotating-text">{rotatingOptions[rotatingText]}</span>
        </div>
        <div className="bubble-arrow arrow-to-center"></div>
      </div>

      <div className="speech-bubble speech-bubble-bottom-right">
        <div className="bubble-content">
          solving global challenges, together
        </div>
        <div className="bubble-arrow arrow-to-center"></div>
      </div>

      {/* Center Text */}
      <button type="button" className="center-section" onClick={handleClick}>
        <div className="click-hint">click here</div>
        <h1 className="do-more-together">Do More Together</h1>
        <div className="arrows-container">
          <div className="arrow-line arrow-from-top-left"></div>
          <div className="arrow-line arrow-from-top-right"></div>
          <div className="arrow-line arrow-from-bottom-left"></div>
          <div className="arrow-line arrow-from-bottom-right"></div>
        </div>
      </button>

      {/* Interest Chips */}
      <div className="interest-chips-container">
        <p className="interest-prompt">What brought you here? (tap any that apply)</p>
        <div className="interest-chips">
          {interestOptions.map(interest => (
            <button
              type="button"
              key={interest}
              className={`interest-chip ${selectedInterests.includes(interest) ? 'selected' : ''}`}
              aria-pressed={selectedInterests.includes(interest)}
              onClick={(e) => {
                e.stopPropagation()
                handleInterestClick(interest)
              }}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
      
      {/* Continue Button */}
      <div className="continue-button-container">
        <button className="continue-button" onClick={handleClick}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default OnboardingScreen

