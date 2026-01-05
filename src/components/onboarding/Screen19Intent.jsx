import React from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen19Intent = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const intents = [
    { id: 'progress', label: 'Make Progress', desc: 'Move forward on my project' },
    { id: 'people', label: 'Find People', desc: 'Connect with co-founders, team, advisors' },
    { id: 'money', label: 'Find Money', desc: 'Raise funding or grants' },
    { id: 'work', label: 'Find Work', desc: 'Get clients or projects' },
    { id: 'support', label: 'Find Support', desc: 'Get help, mentorship, or resources' },
  ]

  const handleSelect = (intentId) => {
    updateData('primary_intent', intentId)
  }

  const handleContinue = () => {
    if (data.primary_intent) {
      onContinue()
    }
  }

  const handleNext = () => {
    if (data.primary_intent) {
      onNext()
    }
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation 
        onBack={onBack} 
        onNext={handleNext} 
        canGoBack={step > 2}
        canGoNext={!!data.primary_intent}
      />
      <div className="screen-content">
        <h1 className="screen-title">What Do You Want Right Now?</h1>
        <p className="screen-text">Choose the one thing that would help you most right now.</p>
        <div className="intents-grid">
          {intents.map(intent => (
            <div
              key={intent.id}
              className={`intent-card ${data.primary_intent === intent.id ? 'selected' : ''}`}
              onClick={() => handleSelect(intent.id)}
            >
              <h3 className="intent-label">{intent.label}</h3>
              <p className="intent-desc">{intent.desc}</p>
            </div>
          ))}
        </div>
        <button 
          className={`continue-btn ${!data.primary_intent ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={!data.primary_intent}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen19Intent

