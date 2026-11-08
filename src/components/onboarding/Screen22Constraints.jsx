import React, { useState } from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen22Constraints = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const [selectedConstraints, setSelectedConstraints] = useState(data.constraints || [])

  const constraints = [
    { id: 'time', label: 'Time', desc: 'Limited availability' },
    { id: 'money', label: 'Money', desc: 'Budget constraints' },
    { id: 'focus', label: 'Focus', desc: 'Need clarity or direction' },
    { id: 'network', label: 'Network', desc: 'Limited connections' },
    { id: 'skills', label: 'Skills', desc: 'Missing expertise' },
    { id: 'location', label: 'Location', desc: 'Geographic limitations' },
    { id: 'confidence', label: 'Confidence', desc: 'Need support or validation' },
  ]

  const handleToggle = (constraintId) => {
    setSelectedConstraints(prev => 
      prev.includes(constraintId)
        ? prev.filter(id => id !== constraintId)
        : [...prev, constraintId]
    )
  }

  const handleContinue = () => {
    updateData('constraints', selectedConstraints)
    onContinue()
  }

  const handleNext = () => {
    updateData('constraints', selectedConstraints)
    onNext()
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={handleNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">What Are Your Constraints?</h1>
        <p className="screen-text">Select any that apply. This helps us match you with the right support.</p>
        <div className="constraints-grid">
          {constraints.map(constraint => (
            <button
              type="button"
              key={constraint.id}
              className={`constraint-card ${selectedConstraints.includes(constraint.id) ? 'selected' : ''}`}
              aria-pressed={selectedConstraints.includes(constraint.id)}
              onClick={() => handleToggle(constraint.id)}
            >
              <h3 className="constraint-label">{constraint.label}</h3>
              <p className="constraint-desc">{constraint.desc}</p>
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

export default Screen22Constraints

