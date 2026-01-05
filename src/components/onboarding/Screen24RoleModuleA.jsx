import React, { useState } from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'
import './RoleModule.css'

const Screen24RoleModuleA = ({ onContinue, onBack, onNext, updateData, updateRoleData, data, step }) => {
  const role = data.primary_role

  // Founder Module A
  if (role === 'founder') {
    const [stage, setStage] = useState(data.role_data?.stage || '')
    const [bottleneck, setBottleneck] = useState(data.role_data?.bottleneck || '')

    const stages = ['Idea', 'MVP', 'Live', 'Scaling']
    const bottlenecks = ['focus', 'customers', 'team', 'funding', 'product', 'ops']

    const handleContinue = () => {
      if (stage && bottleneck) {
        updateRoleData('stage', stage)
        updateRoleData('bottleneck', bottleneck)
        onContinue()
      }
    }

    const handleNext = () => {
      if (stage && bottleneck) {
        updateRoleData('stage', stage)
        updateRoleData('bottleneck', bottleneck)
        onNext()
      }
    }

    return (
      <div className="onboarding-screen-base">
        <ScreenNavigation 
          onBack={onBack} 
          onNext={handleNext} 
          canGoBack={step > 2}
          canGoNext={stage && bottleneck}
        />
        <div className="screen-content">
          <h1 className="screen-title">Founder Details</h1>
          <p className="screen-text">What stage are you at?</p>
          <div className="stages-grid">
            {stages.map(s => (
              <div
                key={s}
                className={`stage-card ${stage === s.toLowerCase() ? 'selected' : ''}`}
                onClick={() => setStage(s.toLowerCase())}
              >
                <h3 className="stage-label">{s}</h3>
              </div>
            ))}
          </div>
          <p className="screen-text" style={{ marginTop: '32px' }}>What's your top blocker?</p>
          <div className="constraints-grid">
            {bottlenecks.map(b => (
              <div
                key={b}
                className={`constraint-card ${bottleneck === b ? 'selected' : ''}`}
                onClick={() => setBottleneck(b)}
              >
                <h3 className="constraint-label">{b.charAt(0).toUpperCase() + b.slice(1)}</h3>
              </div>
            ))}
          </div>
          <button 
            className={`continue-btn ${(!stage || !bottleneck) ? 'disabled' : ''}`}
            onClick={handleContinue}
            disabled={!stage || !bottleneck}
          >
            Continue →
          </button>
        </div>
      </div>
    )
  }

  // Provider Module A
  if (role === 'provider') {
    const [offerCategory, setOfferCategory] = useState(data.role_data?.offerCategory || '')
    const [whoYouServe, setWhoYouServe] = useState(data.role_data?.whoYouServe || '')

    const categories = ['Design', 'Development', 'Marketing', 'Strategy', 'Operations', 'Other']
    const serveOptions = ['founders', 'orgs', 'investors', 'anyone']

    const handleContinue = () => {
      if (offerCategory && whoYouServe) {
        updateRoleData('offerCategory', offerCategory)
        updateRoleData('whoYouServe', whoYouServe)
        onContinue()
      }
    }

    const handleNext = () => {
      if (offerCategory && whoYouServe) {
        updateRoleData('offerCategory', offerCategory)
        updateRoleData('whoYouServe', whoYouServe)
        onNext()
      }
    }

    return (
      <div className="onboarding-screen-base">
        <ScreenNavigation 
          onBack={onBack} 
          onNext={handleNext} 
          canGoBack={step > 2}
          canGoNext={offerCategory && whoYouServe}
        />
        <div className="screen-content">
          <h1 className="screen-title">What Do You Offer?</h1>
          <p className="screen-text">Select a category</p>
          <div className="themes-grid">
            {categories.map(c => (
              <div
                key={c}
                className={`theme-chip ${offerCategory === c ? 'selected' : ''}`}
                onClick={() => setOfferCategory(c)}
              >
                {c}
              </div>
            ))}
          </div>
          <p className="screen-text" style={{ marginTop: '32px' }}>Who do you serve?</p>
          <div className="themes-grid">
            {serveOptions.map(s => (
              <div
                key={s}
                className={`theme-chip ${whoYouServe === s ? 'selected' : ''}`}
                onClick={() => setWhoYouServe(s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </div>
            ))}
          </div>
          <button 
            className={`continue-btn ${(!offerCategory || !whoYouServe) ? 'disabled' : ''}`}
            onClick={handleContinue}
            disabled={!offerCategory || !whoYouServe}
          >
            Continue →
          </button>
        </div>
      </div>
    )
  }

  // Investor Module A
  if (role === 'investor') {
    const [thesisThemes, setThesisThemes] = useState(data.role_data?.thesisThemes || [])

    const themes = ['Climate', 'Healthcare', 'Education', 'Fintech', 'Social Impact', 'Other']

    const handleContinue = () => {
      if (thesisThemes.length > 0) {
        updateRoleData('thesisThemes', thesisThemes)
        updateRoleData('thesisDefined', true)
        onContinue()
      }
    }

    const handleNext = () => {
      if (thesisThemes.length > 0) {
        updateRoleData('thesisThemes', thesisThemes)
        updateRoleData('thesisDefined', true)
        onNext()
      }
    }

    return (
      <div className="onboarding-screen-base">
        <ScreenNavigation 
          onBack={onBack} 
          onNext={handleNext} 
          canGoBack={step > 2}
          canGoNext={thesisThemes.length > 0}
        />
        <div className="screen-content">
          <h1 className="screen-title">Thesis Themes</h1>
          <p className="screen-text">Select up to 5 themes</p>
          <div className="themes-grid">
            {themes.map(t => (
              <div
                key={t}
                className={`theme-chip ${thesisThemes.includes(t) ? 'selected' : ''}`}
                onClick={() => {
                  setThesisThemes(prev => 
                    prev.includes(t) 
                      ? prev.filter(x => x !== t)
                      : prev.length < 5 ? [...prev, t] : prev
                  )
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <button 
            className={`continue-btn ${thesisThemes.length === 0 ? 'disabled' : ''}`}
            onClick={handleContinue}
            disabled={thesisThemes.length === 0}
          >
            Continue →
          </button>
        </div>
      </div>
    )
  }

  // Changemaker Module A
  if (role === 'changemaker') {
    const [contributionMode, setContributionMode] = useState(data.role_data?.contributionMode || '')

    const contributionModes = ['skills', 'time', 'money', 'community']

    const handleContinue = () => {
      if (contributionMode) {
        updateRoleData('contributionMode', contributionMode)
        onContinue()
      }
    }

    const handleNext = () => {
      if (contributionMode) {
        updateRoleData('contributionMode', contributionMode)
        onNext()
      }
    }

    return (
      <div className="onboarding-screen-base">
        <ScreenNavigation 
          onBack={onBack} 
          onNext={handleNext} 
          canGoBack={step > 2}
          canGoNext={!!contributionMode}
        />
        <div className="screen-content">
          <h1 className="screen-title">How Do You Want to Contribute?</h1>
          <p className="screen-text">Select your primary contribution mode</p>
          <div className="themes-grid">
            {contributionModes.map(c => (
              <div
                key={c}
                className={`theme-chip ${contributionMode === c ? 'selected' : ''}`}
                onClick={() => setContributionMode(c)}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </div>
            ))}
          </div>
          <button 
            className={`continue-btn ${!contributionMode ? 'disabled' : ''}`}
            onClick={handleContinue}
            disabled={!contributionMode}
          >
            Continue →
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default Screen24RoleModuleA

