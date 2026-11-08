import React, { useState } from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen21Themes = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const [selectedThemes, setSelectedThemes] = useState(data.themes || [])

  const themes = [
    'Climate & Environment',
    'Healthcare & Wellness',
    'Education',
    'Economic Development',
    'Social Justice',
    'Technology for Good',
    'Food & Agriculture',
    'Housing & Urban Development',
    'Mental Health',
    'Gender Equality',
    'Accessibility',
    'Clean Energy',
  ]

  const handleToggle = (theme) => {
    setSelectedThemes(prev => {
      if (prev.includes(theme)) {
        return prev.filter(t => t !== theme)
      } else if (prev.length < 3) {
        return [...prev, theme]
      }
      return prev
    })
  }

  const handleContinue = () => {
    updateData('themes', selectedThemes)
    onContinue()
  }

  const handleNext = () => {
    updateData('themes', selectedThemes)
    onNext()
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={handleNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">Impact Themes</h1>
        <p className="screen-text">Pick up to 3 themes that align with your work.</p>
        <div className="themes-grid">
          {themes.map(theme => (
            <button
              type="button"
              key={theme}
              className={`theme-chip ${selectedThemes.includes(theme) ? 'selected' : ''}`}
              aria-pressed={selectedThemes.includes(theme)}
              onClick={() => handleToggle(theme)}
            >
              {theme}
            </button>
          ))}
        </div>
        <button className="continue-btn" onClick={handleContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen21Themes

