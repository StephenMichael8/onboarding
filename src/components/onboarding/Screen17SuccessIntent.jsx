import React, { useState } from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen17SuccessIntent = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const [selectedOutcomes, setSelectedOutcomes] = useState(data.success_outcomes || [])
  const [metricText, setMetricText] = useState(data.success_metric_text || '')
  const [primaryIntent, setPrimaryIntent] = useState(data.primary_intent || '')

  const outcomes = [
    { id: 'money', label: 'Money', desc: 'Revenue or funding' },
    { id: 'people', label: 'People Reached', desc: 'Users, customers, or impact' },
    { id: 'customers', label: 'Customers/Users', desc: 'Acquisition and growth' },
    { id: 'partnerships', label: 'Partnerships', desc: 'Strategic collaborations' },
    { id: 'milestones', label: 'Milestones Shipped', desc: 'Product or project progress' },
    { id: 'wellbeing', label: 'Personal Wellbeing', desc: 'Balance and fulfillment' },
  ]

  const intents = [
    { id: 'progress', label: 'Make Progress', desc: 'Move forward on my project' },
    { id: 'people', label: 'Find People', desc: 'Connect with co-founders, team, advisors' },
    { id: 'money', label: 'Find Money', desc: 'Raise funding or grants' },
    { id: 'work', label: 'Find Work', desc: 'Get clients or projects' },
    { id: 'support', label: 'Find Support', desc: 'Get help, mentorship, or resources' },
  ]

  const handleToggleOutcome = (outcomeId) => {
    setSelectedOutcomes(prev => 
      prev.includes(outcomeId) 
        ? prev.filter(id => id !== outcomeId)
        : [...prev, outcomeId].slice(0, 2) // Max 2
    )
  }

  const handleSelectIntent = (intentId) => {
    setPrimaryIntent(intentId)
    updateData('primary_intent', intentId)
  }

  const handleContinue = () => {
    if (selectedOutcomes.length > 0 && primaryIntent) {
      updateData('success_outcomes', selectedOutcomes)
      updateData('success_metric_text', metricText)
      updateData('primary_intent', primaryIntent)
      onContinue()
    }
  }

  const handleNext = () => {
    if (selectedOutcomes.length > 0 && primaryIntent) {
      updateData('success_outcomes', selectedOutcomes)
      updateData('success_metric_text', metricText)
      updateData('primary_intent', primaryIntent)
      onNext()
    }
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation 
        onBack={onBack} 
        onNext={handleNext} 
        canGoBack={step > 2}
        canGoNext={selectedOutcomes.length > 0 && !!primaryIntent}
      />
      <div className="screen-content">
        <h1 className="screen-title">What Does Success Look Like?</h1>
        <p className="screen-text">Pick 1-2 outcomes that matter most to you.</p>
        <div className="outcomes-grid">
          {outcomes.map(outcome => (
            <button
              type="button"
              key={outcome.id}
              className={`outcome-card ${selectedOutcomes.includes(outcome.id) ? 'selected' : ''}`}
              aria-pressed={selectedOutcomes.includes(outcome.id)}
              onClick={() => handleToggleOutcome(outcome.id)}
            >
              <h3 className="outcome-label">{outcome.label}</h3>
              <p className="outcome-desc">{outcome.desc}</p>
            </button>
          ))}
        </div>
        <div className="metric-input">
          <label className="metric-label" htmlFor="success-metric">Optional: Specific metric or goal</label>
          <input
            id="success-metric"
            type="text"
            className="metric-text"
            placeholder="e.g., $100k revenue, 10k users..."
            value={metricText}
            onChange={(e) => setMetricText(e.target.value)}
          />
        </div>

        <div style={{ marginTop: '48px' }}>
          <h1 className="screen-title">What Do You Want Right Now?</h1>
          <p className="screen-text">Choose the one thing that would help you most right now.</p>
          <div className="intents-grid">
            {intents.map(intent => (
              <button
                type="button"
                key={intent.id}
                className={`intent-card ${primaryIntent === intent.id ? 'selected' : ''}`}
                aria-pressed={primaryIntent === intent.id}
                onClick={() => handleSelectIntent(intent.id)}
              >
                <h3 className="intent-label">{intent.label}</h3>
                <p className="intent-desc">{intent.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <button 
          className={`continue-btn ${(selectedOutcomes.length === 0 || !primaryIntent) ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={selectedOutcomes.length === 0 || !primaryIntent}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen17SuccessIntent

