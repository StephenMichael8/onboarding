import React, { useState, useEffect } from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen10WhatYouCanDo = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const [rotatingText, setRotatingText] = useState(0)
  const [whatBroughtYou, setWhatBroughtYou] = useState(data.what_brought_you || '')
  const rotatingOptions = ['co-founder', 'investor', 'partner', 'community', '1st customer', 'lead', 'story', 'voice', 'purpose']
  
  const broughtYouOptions = [
    'Looking for funding',
    'Need a co-founder',
    'Want to help others',
    'Seeking customers',
    'Building something',
    'Exploring opportunities'
  ]

  const handleBroughtYouClick = (option) => {
    setWhatBroughtYou(option)
    updateData('what_brought_you', option)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingText((prev) => (prev + 1) % rotatingOptions.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">What You Can Do</h1>
        <div className="find-your-section">
          <h2 className="find-your-title">
            Find your <span className="rotating-text-highlight">{rotatingOptions[rotatingText]}</span>
          </h2>
        </div>
        <div className="stat-card">
          <div className="stat-number">75%</div>
          <div className="stat-text">of entrepreneurs report loneliness*</div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px', fontStyle: 'italic' }}>
            *Based on community surveys
          </div>
        </div>
        <p className="screen-text">
          Propel exists to connect you with the people, resources, and opportunities you need to 
          create the change you want to see.
        </p>
        
        <div style={{ marginTop: '40px' }}>
          <p className="screen-text" style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
            What brought you here today?
          </p>
          <div className="brought-you-chips">
            {broughtYouOptions.map(option => (
              <div
                key={option}
                className={`brought-you-chip ${whatBroughtYou === option ? 'selected' : ''}`}
                onClick={() => handleBroughtYouClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        <button className="continue-btn" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen10WhatYouCanDo

