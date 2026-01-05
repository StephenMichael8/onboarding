import React, { useState } from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen24Collaboration = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const [collabPrefs, setCollabPrefs] = useState(data.collab_prefs || {})
  const [visibility, setVisibility] = useState(data.visibility || '')
  const [timezone, setTimezone] = useState(data.timezone || '')

  const timeCommitments = [
    { id: 'minimal', label: 'Minimal', desc: 'Few hours per week' },
    { id: 'part-time', label: 'Part-time', desc: '10-20 hours per week' },
    { id: 'full-time', label: 'Full-time', desc: '40+ hours per week' },
  ]

  const workStyles = [
    { id: 'remote', label: 'Remote', desc: 'Work from anywhere' },
    { id: 'hybrid', label: 'Hybrid', desc: 'Mix of remote and in-person' },
    { id: 'in-person', label: 'In-person', desc: 'Prefer face-to-face' },
  ]

  const commStyles = [
    { id: 'async', label: 'Async', desc: 'Email, messages, async updates' },
    { id: 'meetings', label: 'Meetings', desc: 'Regular calls and check-ins' },
    { id: 'hybrid-comm', label: 'Hybrid', desc: 'Mix of async and meetings' },
  ]

  const visibilityOptions = [
    { id: 'public', label: 'Public', desc: 'Visible to everyone' },
    { id: 'semi-private', label: 'Semi-private', desc: 'Visible to community members' },
    { id: 'private', label: 'Private', desc: 'Only visible to matches' },
  ]

  const handleUpdate = (key, value) => {
    setCollabPrefs(prev => ({ ...prev, [key]: value }))
  }

  const handleContinue = () => {
    updateData('collab_prefs', collabPrefs)
    updateData('visibility', visibility)
    updateData('timezone', timezone)
    onContinue()
  }

  const handleNext = () => {
    updateData('collab_prefs', collabPrefs)
    updateData('visibility', visibility)
    updateData('timezone', timezone)
    onNext()
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={handleNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">Collaboration Preferences</h1>
        
        <div className="pref-section">
          <h3 className="pref-label">Time Commitment</h3>
          <div className="pref-options">
            {timeCommitments.map(option => (
              <div
                key={option.id}
                className={`pref-option ${collabPrefs.timeCommitment === option.id ? 'selected' : ''}`}
                onClick={() => handleUpdate('timeCommitment', option.id)}
              >
                <div className="pref-option-label">{option.label}</div>
                <div className="pref-option-desc">{option.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pref-section">
          <h3 className="pref-label">Work Style</h3>
          <div className="pref-options">
            {workStyles.map(option => (
              <div
                key={option.id}
                className={`pref-option ${collabPrefs.workStyle === option.id ? 'selected' : ''}`}
                onClick={() => handleUpdate('workStyle', option.id)}
              >
                <div className="pref-option-label">{option.label}</div>
                <div className="pref-option-desc">{option.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pref-section">
          <h3 className="pref-label">Communication Style</h3>
          <div className="pref-options">
            {commStyles.map(option => (
              <div
                key={option.id}
                className={`pref-option ${collabPrefs.commStyle === option.id ? 'selected' : ''}`}
                onClick={() => handleUpdate('commStyle', option.id)}
              >
                <div className="pref-option-label">{option.label}</div>
                <div className="pref-option-desc">{option.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pref-section">
          <h3 className="pref-label">Visibility Preference</h3>
          <div className="pref-options">
            {visibilityOptions.map(option => (
              <div
                key={option.id}
                className={`pref-option ${visibility === option.id ? 'selected' : ''}`}
                onClick={() => setVisibility(option.id)}
              >
                <div className="pref-option-label">{option.label}</div>
                <div className="pref-option-desc">{option.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pref-section">
          <label className="pref-label">Location / Timezone (Optional)</label>
          <input
            type="text"
            className="timezone-input"
            placeholder="e.g., New York, EST"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          />
        </div>

        <button className="continue-btn" onClick={handleContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen24Collaboration

