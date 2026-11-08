import React from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen16PickRole = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const roles = [
    { id: 'founder', label: 'Founder', desc: 'Building a venture or project', icon: '🚀' },
    { id: 'provider', label: 'Provider', desc: 'Offering services or expertise', icon: '💼' },
    { id: 'investor', label: 'Investor', desc: 'Deploying capital for impact', icon: '💰' },
    { id: 'changemaker', label: 'Changemaker', desc: 'Contributing skills, time, or support', icon: '🌟' },
  ]

  const handleSelect = (roleId) => {
    updateData('primary_role', roleId)
  }

  const handleContinue = () => {
    if (data.primary_role) {
      onContinue()
    }
  }

  const handleNext = () => {
    if (data.primary_role) {
      onNext()
    }
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation 
        onBack={onBack} 
        onNext={handleNext} 
        canGoBack={step > 2}
        canGoNext={!!data.primary_role}
      />
      <div className="screen-content">
        <h1 className="screen-title">Pick Your Starting Role</h1>
        <p className="screen-text">You can switch later. We just need a default.</p>
        <div className="roles-grid">
          {roles.map(role => (
            <button
              type="button"
              key={role.id}
              className={`role-card ${data.primary_role === role.id ? 'selected' : ''}`}
              aria-pressed={data.primary_role === role.id}
              onClick={() => handleSelect(role.id)}
            >
              <div className="role-icon" aria-hidden="true">{role.icon}</div>
              <h3 className="role-label">{role.label}</h3>
              <p className="role-desc">{role.desc}</p>
            </button>
          ))}
        </div>
        <button 
          className={`continue-btn ${!data.primary_role ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={!data.primary_role}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen16PickRole
