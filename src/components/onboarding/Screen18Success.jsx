import React, { useState } from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen18Success = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const [selectedOutcomes, setSelectedOutcomes] = useState(data.success_outcomes || [])
  const [metricText, setMetricText] = useState(data.success_metric_text || '')

  const outcomes = [
    { id: 'money', label: 'Money', desc: 'Revenue or funding' },
    { id: 'people', label: 'People Reached', desc: 'Users, customers, or impact' },
    { id: 'customers', label: 'Customers/Users', desc: 'Acquisition and growth' },
    { id: 'partnerships', label: 'Partnerships', desc: 'Strategic collaborations' },
    { id: 'milestones', label: 'Milestones Shipped', desc: 'Product or project progress' },
    { id: 'wellbeing', label: 'Personal Wellbeing', desc: 'Balance and fulfillment' },
  ]

  const handleToggle = (outcomeId) => {
    setSelectedOutcomes(prev => 
      prev.includes(outcomeId) 
        ? prev.filter(id => id !== outcomeId)
        : [...prev, outcomeId].slice(0, 2) // Max 2
    )
  }

  const handleContinue = () => {
    if (selectedOutcomes.length > 0) {
      updateData('success_outcomes', selectedOutcomes)
      updateData('success_metric_text', metricText)
      onContinue()
    }
  }

  const handleNext = () => {
    if (selectedOutcomes.length > 0) {
      updateData('success_outcomes', selectedOutcomes)
      updateData('success_metric_text', metricText)
      onNext()
    }
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation 
        onBack={onBack} 
        onNext={handleNext} 
        canGoBack={step > 2}
        canGoNext={selectedOutcomes.length > 0}
      />
      <div className="screen-content">
        <h1 className="screen-title">What Does Success Look Like?</h1>
        <p className="screen-text">Pick 1-2 outcomes that matter most to you.</p>
        <div className="outcomes-grid">
          {outcomes.map(outcome => (
            <div
              key={outcome.id}
              className={`outcome-card ${selectedOutcomes.includes(outcome.id) ? 'selected' : ''}`}
              onClick={() => handleToggle(outcome.id)}
            >
              <h3 className="outcome-label">{outcome.label}</h3>
              <p className="outcome-desc">{outcome.desc}</p>
            </div>
          ))}
        </div>
        <div className="metric-input">
          <label className="metric-label">Optional: Specific metric or goal</label>
          <input
            type="text"
            className="metric-text"
            placeholder="e.g., $100k revenue, 10k users..."
            value={metricText}
            onChange={(e) => setMetricText(e.target.value)}
          />
        </div>
        <button 
          className={`continue-btn ${selectedOutcomes.length === 0 ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={selectedOutcomes.length === 0}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen18Success

