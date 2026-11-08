import { useState } from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'
import './RoleModule.css'

// Each role's module is its own component so React Hooks are always called
// unconditionally and in the same order (Rules of Hooks). The parent picks
// which module to render based on the user's primary role.

const FounderModuleA = ({ onBack, onNext, onContinue, updateRoleData, data, step }) => {
  const [stage, setStage] = useState(data.role_data?.stage || '')
  const [bottleneck, setBottleneck] = useState(data.role_data?.bottleneck || '')

  const stages = ['Idea', 'MVP', 'Live', 'Scaling']
  const bottlenecks = ['focus', 'customers', 'team', 'funding', 'product', 'ops']

  const commit = (advance) => {
    if (stage && bottleneck) {
      updateRoleData('stage', stage)
      updateRoleData('bottleneck', bottleneck)
      advance()
    }
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation
        onBack={onBack}
        onNext={() => commit(onNext)}
        canGoBack={step > 2}
        canGoNext={stage && bottleneck}
      />
      <div className="screen-content">
        <h1 className="screen-title">Founder Details</h1>
        <p className="screen-text">What stage are you at?</p>
        <div className="stages-grid">
          {stages.map((s) => (
            <button
              key={s}
              type="button"
              className={`stage-card ${stage === s.toLowerCase() ? 'selected' : ''}`}
              aria-pressed={stage === s.toLowerCase()}
              onClick={() => setStage(s.toLowerCase())}
            >
              <h3 className="stage-label">{s}</h3>
            </button>
          ))}
        </div>
        <p className="screen-text" style={{ marginTop: '32px' }}>What&apos;s your top blocker?</p>
        <div className="constraints-grid">
          {bottlenecks.map((b) => (
            <button
              key={b}
              type="button"
              className={`constraint-card ${bottleneck === b ? 'selected' : ''}`}
              aria-pressed={bottleneck === b}
              onClick={() => setBottleneck(b)}
            >
              <h3 className="constraint-label">{b.charAt(0).toUpperCase() + b.slice(1)}</h3>
            </button>
          ))}
        </div>
        <button
          className={`continue-btn ${(!stage || !bottleneck) ? 'disabled' : ''}`}
          onClick={() => commit(onContinue)}
          disabled={!stage || !bottleneck}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

const ProviderModuleA = ({ onBack, onNext, onContinue, updateRoleData, data, step }) => {
  const [offerCategory, setOfferCategory] = useState(data.role_data?.offerCategory || '')
  const [whoYouServe, setWhoYouServe] = useState(data.role_data?.whoYouServe || '')

  const categories = ['Design', 'Development', 'Marketing', 'Strategy', 'Operations', 'Other']
  const serveOptions = ['founders', 'orgs', 'investors', 'anyone']

  const commit = (advance) => {
    if (offerCategory && whoYouServe) {
      updateRoleData('offerCategory', offerCategory)
      updateRoleData('whoYouServe', whoYouServe)
      advance()
    }
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation
        onBack={onBack}
        onNext={() => commit(onNext)}
        canGoBack={step > 2}
        canGoNext={offerCategory && whoYouServe}
      />
      <div className="screen-content">
        <h1 className="screen-title">What Do You Offer?</h1>
        <p className="screen-text">Select a category</p>
        <div className="themes-grid">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`theme-chip ${offerCategory === c ? 'selected' : ''}`}
              aria-pressed={offerCategory === c}
              onClick={() => setOfferCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="screen-text" style={{ marginTop: '32px' }}>Who do you serve?</p>
        <div className="themes-grid">
          {serveOptions.map((s) => (
            <button
              key={s}
              type="button"
              className={`theme-chip ${whoYouServe === s ? 'selected' : ''}`}
              aria-pressed={whoYouServe === s}
              onClick={() => setWhoYouServe(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <button
          className={`continue-btn ${(!offerCategory || !whoYouServe) ? 'disabled' : ''}`}
          onClick={() => commit(onContinue)}
          disabled={!offerCategory || !whoYouServe}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

const InvestorModuleA = ({ onBack, onNext, onContinue, updateRoleData, data, step }) => {
  const [thesisThemes, setThesisThemes] = useState(data.role_data?.thesisThemes || [])

  const themes = ['Climate', 'Healthcare', 'Education', 'Fintech', 'Social Impact', 'Other']

  const commit = (advance) => {
    if (thesisThemes.length > 0) {
      updateRoleData('thesisThemes', thesisThemes)
      updateRoleData('thesisDefined', true)
      advance()
    }
  }

  const toggleTheme = (t) => {
    setThesisThemes((prev) =>
      prev.includes(t)
        ? prev.filter((x) => x !== t)
        : prev.length < 5 ? [...prev, t] : prev
    )
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation
        onBack={onBack}
        onNext={() => commit(onNext)}
        canGoBack={step > 2}
        canGoNext={thesisThemes.length > 0}
      />
      <div className="screen-content">
        <h1 className="screen-title">Thesis Themes</h1>
        <p className="screen-text">Select up to 5 themes</p>
        <div className="themes-grid">
          {themes.map((t) => (
            <button
              key={t}
              type="button"
              className={`theme-chip ${thesisThemes.includes(t) ? 'selected' : ''}`}
              aria-pressed={thesisThemes.includes(t)}
              onClick={() => toggleTheme(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          className={`continue-btn ${thesisThemes.length === 0 ? 'disabled' : ''}`}
          onClick={() => commit(onContinue)}
          disabled={thesisThemes.length === 0}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

const ChangemakerModuleA = ({ onBack, onNext, onContinue, updateRoleData, data, step }) => {
  const [contributionMode, setContributionMode] = useState(data.role_data?.contributionMode || '')

  const contributionModes = ['skills', 'time', 'money', 'community']

  const commit = (advance) => {
    if (contributionMode) {
      updateRoleData('contributionMode', contributionMode)
      advance()
    }
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation
        onBack={onBack}
        onNext={() => commit(onNext)}
        canGoBack={step > 2}
        canGoNext={!!contributionMode}
      />
      <div className="screen-content">
        <h1 className="screen-title">How Do You Want to Contribute?</h1>
        <p className="screen-text">Select your primary contribution mode</p>
        <div className="themes-grid">
          {contributionModes.map((c) => (
            <button
              key={c}
              type="button"
              className={`theme-chip ${contributionMode === c ? 'selected' : ''}`}
              aria-pressed={contributionMode === c}
              onClick={() => setContributionMode(c)}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
        <button
          className={`continue-btn ${!contributionMode ? 'disabled' : ''}`}
          onClick={() => commit(onContinue)}
          disabled={!contributionMode}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

const MODULES = {
  founder: FounderModuleA,
  provider: ProviderModuleA,
  investor: InvestorModuleA,
  changemaker: ChangemakerModuleA,
}

const Screen24RoleModuleA = (props) => {
  const Module = MODULES[props.data.primary_role]
  return Module ? <Module {...props} /> : null
}

export default Screen24RoleModuleA
