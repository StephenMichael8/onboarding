import React from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen25PickRole = ({ onContinue, onBack, onNext, updateData, data, step }) => {
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

  // Show suggested role if available
  const suggestedRole = data.suggested_role

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation 
        onBack={onBack} 
        onNext={handleNext} 
        canGoBack={step > 2}
        canGoNext={!!data.primary_role}
      />
      <div className="screen-content">
        {suggestedRole && (
          <div className="suggestion-note">
            <p className="suggestion-text">
              💡 Based on your answers, we suggested <strong>{roles.find(r => r.id === suggestedRole)?.label}</strong>, 
              but you can choose any role that feels right.
            </p>
          </div>
        )}
        <h1 className="screen-title">Pick Your Role</h1>
        <p className="screen-text">You can change this later.</p>
        <div className="roles-grid">
          {roles.map(role => (
            <div
              key={role.id}
              className={`role-card ${data.primary_role === role.id ? 'selected' : ''} ${suggestedRole === role.id ? 'suggested' : ''}`}
              onClick={() => handleSelect(role.id)}
            >
              <div className="role-icon">{role.icon}</div>
              <h3 className="role-label">{role.label}</h3>
              <p className="role-desc">{role.desc}</p>
              {suggestedRole === role.id && (
                <div className="suggested-badge">Suggested</div>
              )}
            </div>
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

export default Screen25PickRole

