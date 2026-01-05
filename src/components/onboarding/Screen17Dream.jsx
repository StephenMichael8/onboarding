import React, { useState } from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen17Dream = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const [dream, setDream] = useState(data.dream_text || '')

  const handleContinue = () => {
    if (dream.trim()) {
      updateData('dream_text', dream)
      onContinue()
    }
  }

  const handleNext = () => {
    if (dream.trim()) {
      updateData('dream_text', dream)
      onNext()
    }
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation 
        onBack={onBack} 
        onNext={handleNext} 
        canGoBack={step > 2}
        canGoNext={dream.trim().length > 0}
      />
      <div className="screen-content">
        <h1 className="screen-title">What Is Your Dream?</h1>
        <p className="screen-text-large">No, really—what is it?</p>
        <p className="screen-text">
          Whether it's personal, professional, or a mix of both, Propel exists to support you 
          to create the change you want to see in the world.
        </p>
        <textarea
          className="dream-textarea"
          placeholder="Tell us about your dream..."
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          rows={6}
        />
        <button 
          className={`continue-btn ${!dream.trim() ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={!dream.trim()}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen17Dream

