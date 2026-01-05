import React, { useState } from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen15CodeOfConduct = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const [accepted, setAccepted] = useState(data.code_of_conduct_accepted || false)

  const handleAccept = () => {
    setAccepted(true)
    updateData('code_of_conduct_accepted', true)
  }

  const handleContinue = () => {
    if (accepted) {
      onContinue()
    }
  }

  const handleNext = () => {
    if (accepted) {
      updateData('code_of_conduct_accepted', true)
      onNext()
    }
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation 
        onBack={onBack} 
        onNext={handleNext} 
        canGoBack={step > 2}
        canGoNext={accepted}
      />
      <div className="screen-content">
        <h1 className="screen-title">One Last Thing</h1>
        <div className="code-of-conduct">
          <h2 className="code-title">Code of Conduct</h2>
          <div className="code-points">
            <div className="code-point">✓ Respect all members and their perspectives</div>
            <div className="code-point">✓ Act with integrity and transparency</div>
            <div className="code-point">✓ Support others in their journey</div>
            <div className="code-point">✓ Maintain confidentiality when requested</div>
            <div className="code-point">✓ Contribute positively to the community</div>
          </div>
          <p className="code-disclaimer">
            You can find the full code of conduct in the Community tab and can share anything anonymously.
          </p>
          <div className="accept-checkbox">
            <input 
              type="checkbox" 
              id="code-accept" 
              checked={accepted}
              onChange={handleAccept}
            />
            <label htmlFor="code-accept">I agree to the Code of Conduct</label>
          </div>
        </div>
        <button 
          className={`continue-btn ${!accepted ? 'disabled' : ''}`} 
          onClick={handleContinue}
          disabled={!accepted}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen15CodeOfConduct

