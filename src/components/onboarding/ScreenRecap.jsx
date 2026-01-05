import React from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const ScreenRecap = ({ onContinue, onBack, onNext, data, step }) => {
  const getRecapContent = () => {
    const items = []
    
    if (data.dream_text) {
      const dreamWords = data.dream_text.split(' ').slice(0, 5).join(' ')
      items.push({ label: 'Your Dream', value: `"${dreamWords}..."` })
    }
    
    if (data.themes && data.themes.length > 0) {
      items.push({ label: 'Themes', value: data.themes.slice(0, 3).join(', ') })
    }
    
    if (data.primary_intent) {
      const intentMap = {
        'money': 'Find Money',
        'people': 'Find People',
        'work': 'Find Work',
        'progress': 'Make Progress',
        'support': 'Find Support'
      }
      items.push({ label: 'Primary Intent', value: intentMap[data.primary_intent] || data.primary_intent })
    }
    
    if (data.primary_role) {
      const roleMap = {
        'founder': 'Founder',
        'provider': 'Provider',
        'investor': 'Investor',
        'changemaker': 'Changemaker'
      }
      items.push({ label: 'Role', value: roleMap[data.primary_role] || data.primary_role })
    }
    
    return items
  }

  const recapItems = getRecapContent()

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">Here's What We've Learned</h1>
        <p className="screen-text">A quick recap of your journey so far:</p>
        <div className="recap-container">
          {recapItems.map((item, index) => (
            <div key={index} className="recap-item">
              <div className="recap-label">{item.label}</div>
              <div className="recap-value">{item.value}</div>
            </div>
          ))}
        </div>
        <p className="screen-text" style={{ marginTop: '24px', fontStyle: 'italic' }}>
          We're using this to personalize your experience and find the best matches for you.
        </p>
        <button className="continue-btn" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default ScreenRecap

