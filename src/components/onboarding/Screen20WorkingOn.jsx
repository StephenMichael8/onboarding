import React from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen20WorkingOn = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const stages = [
    { id: 'idea', label: 'Idea', desc: 'Early concept or vision' },
    { id: 'project', label: 'Active Project', desc: 'Currently building or executing' },
    { id: 'organization', label: 'Organization', desc: 'Established entity or company' },
    { id: 'help', label: 'I Want to Help Others', desc: 'Looking to contribute' },
  ]

  const handleSelect = (stageId) => {
    updateData('stage_type', stageId)
  }

  const handleContinue = () => {
    if (data.stage_type) {
      onContinue()
    }
  }

  const handleNext = () => {
    if (data.stage_type) {
      onNext()
    }
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation 
        onBack={onBack} 
        onNext={handleNext} 
        canGoBack={step > 2}
        canGoNext={!!data.stage_type}
      />
      <div className="screen-content">
        <h1 className="screen-title">What Are You Working On?</h1>
        <div className="stages-grid">
          {stages.map(stage => (
            <div
              key={stage.id}
              className={`stage-card ${data.stage_type === stage.id ? 'selected' : ''}`}
              onClick={() => handleSelect(stage.id)}
            >
              <h3 className="stage-label">{stage.label}</h3>
              <p className="stage-desc">{stage.desc}</p>
            </div>
          ))}
        </div>
        <button 
          className={`continue-btn ${!data.stage_type ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={!data.stage_type}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen20WorkingOn

