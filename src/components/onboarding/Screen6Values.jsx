import React, { useState } from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen6Values = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const [selectedValue, setSelectedValue] = useState(data.primary_value || '')
  
  const values = [
    { id: 'accessibility', icon: '♿', title: 'Radical Accessibility', desc: 'Anyone can be a part. Once you come onto the world stage, you can start making a difference in all the small ways and large.' },
    { id: 'momentum', icon: '⚡', title: 'Momentum', desc: 'Once you start, keep going. We create systems that maintain forward progress and prevent stagnation.' },
    { id: 'autonomy', icon: '🎯', title: 'Autonomy', desc: 'You can make the change. You have the power to define your path and execute on your vision with the right support.' }
  ]

  const handleValueSelect = (valueId) => {
    setSelectedValue(valueId)
    updateData('primary_value', valueId)
  }
  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">Our Three Values</h1>
        <div className="values-container">
          {values.map(value => (
            <button
              type="button"
              key={value.id}
              className={`value-card ${selectedValue === value.id ? 'selected' : ''}`}
              aria-pressed={selectedValue === value.id}
              onClick={() => handleValueSelect(value.id)}
            >
              <div className="value-icon" aria-hidden="true">{value.icon}</div>
              <h2 className="value-title">{value.title}</h2>
              <p className="value-description">{value.desc}</p>
              {selectedValue === value.id && (
                <div className="value-selected-badge">✓ Most resonates with you</div>
              )}
            </button>
          ))}
        </div>
        <p className="screen-text" style={{ marginTop: '24px', fontSize: '16px', color: '#94a3b8' }}>
          Tap the value that resonates most with you. We'll personalize your experience based on this.
        </p>
        <p className="screen-text">
          Combined, these values mean: if you come onto the world stage, you can start and not stop 
          making a difference throughout your life.
        </p>
        
        {/* Journey Graph */}
        <div className="journey-graph-container">
          <h3 className="graph-title">Your Journey</h3>
          <div className="journey-graph">
            <div className="graph-axis">
              <div className="axis-label-y">North Star Metrics Achieved</div>
              <div className="axis-label-x">Time</div>
            </div>
            <div className="graph-lines">
              <div className="graph-line-without">
                <div className="line-label">Without Propel</div>
                <svg className="line-svg" viewBox="0 0 300 200">
                  <polyline
                    points="0,180 50,170 100,160 150,150 200,145 250,140 300,135"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="3"
                  />
                </svg>
              </div>
              <div className="graph-line-with">
                <div className="line-label">With Propel</div>
                <svg className="line-svg" viewBox="0 0 300 200">
                  <polyline
                    points="0,180 50,150 100,100 150,60 200,30 250,15 300,10"
                    fill="none"
                    stroke="#48bb78"
                    strokeWidth="4"
                  />
                </svg>
              </div>
            </div>
          </div>
          <p className="graph-description-text">
            We're helping you achieve your dream faster and more effectively.
          </p>
        </div>

        <button className="continue-btn" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen6Values
