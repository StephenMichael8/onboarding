import React, { useState } from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen3RealityBelief = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const [selectedValues, setSelectedValues] = useState(data.aligned_values || [])
  
  const valueStatements = [
    "Anyone should be able to create change",
    "Coordination is the key to impact",
    "Support should work both ways",
    "Impact should be radically accessible"
  ]

  const handleValueClick = (value) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value]
    setSelectedValues(newValues)
    updateData('aligned_values', newValues)
  }
  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">The Reality</h1>
        <p className="screen-text-large">
          People everywhere are trying to create change.
        </p>
        <p className="screen-text">
          Millions of individuals around the world are coming together and choosing now to be difference makers. 
          They're putting in effort, building solutions, and working towards the change they want to see.
        </p>
        <p className="screen-text">
          The problem isn't the desire or the effort—it's coordination.
        </p>

        <div style={{ marginTop: '48px' }}>
          <h1 className="screen-title">The Belief</h1>
          <p className="screen-text-large">
            Anyone should be able to say: "This is the change I want to see" — and it should be possible.
          </p>
          <p className="screen-text">
            If you are able to convince others to partake in your vision, that shouldn't be the issue.
          </p>
          <p className="screen-text">
            There should be the means for people to start supporting you and taking action collectively with you 
            to solve challenges. And it shouldn't stop there—it should work in reverse.
          </p>
          <p className="screen-text highlight-text">
            Anyone who wants to help should be able to.
          </p>
          <p className="screen-text">
            This is the core of what we believe in and are building towards: 
            <strong> making impact radically accessible.</strong>
          </p>
        </div>

        <div style={{ marginTop: '48px' }}>
          <p className="screen-text" style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
            Which of these resonate with you?
          </p>
          <div className="values-alignment-chips">
            {valueStatements.map(value => (
              <div
                key={value}
                className={`value-alignment-chip ${selectedValues.includes(value) ? 'selected' : ''}`}
                onClick={() => handleValueClick(value)}
              >
                {value}
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

export default Screen3RealityBelief

