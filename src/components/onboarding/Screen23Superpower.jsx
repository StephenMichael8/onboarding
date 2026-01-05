import React, { useState } from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen23Superpower = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const [selectedSuperpowers, setSelectedSuperpowers] = useState(data.superpowers || [])

  const superpowers = [
    { id: 'builder', label: 'Builder', desc: 'Create and execute' },
    { id: 'storyteller', label: 'Storyteller', desc: 'Communicate and inspire' },
    { id: 'organizer', label: 'Organizer', desc: 'Coordinate and structure' },
    { id: 'researcher', label: 'Researcher', desc: 'Analyze and discover' },
    { id: 'connector', label: 'Connector', desc: 'Bring people together' },
    { id: 'operator', label: 'Operator', desc: 'Run and optimize systems' },
    { id: 'funder', label: 'Funder', desc: 'Deploy capital strategically' },
  ]

  const handleToggle = (superpowerId) => {
    setSelectedSuperpowers(prev => {
      if (prev.includes(superpowerId)) {
        return prev.filter(id => id !== superpowerId)
      } else if (prev.length < 2) {
        return [...prev, superpowerId]
      }
      return prev
    })
  }

  const handleContinue = () => {
    updateData('superpowers', selectedSuperpowers)
    onContinue()
  }

  const handleNext = () => {
    updateData('superpowers', selectedSuperpowers)
    onNext()
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={handleNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">What's Your Superpower?</h1>
        <p className="screen-text">Pick up to 2 that best describe you.</p>
        <div className="superpowers-grid">
          {superpowers.map(superpower => (
            <div
              key={superpower.id}
              className={`superpower-card ${selectedSuperpowers.includes(superpower.id) ? 'selected' : ''}`}
              onClick={() => handleToggle(superpower.id)}
            >
              <h3 className="superpower-label">{superpower.label}</h3>
              <p className="superpower-desc">{superpower.desc}</p>
            </div>
          ))}
        </div>
        <button className="continue-btn" onClick={handleContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen23Superpower

