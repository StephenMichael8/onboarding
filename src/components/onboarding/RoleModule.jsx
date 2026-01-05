import React, { useState, useEffect } from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'
import './RoleModule.css'

const RoleModule = ({ onContinue, onBack, onNext, updateData, updateRoleData, data, step }) => {
  const [roleStep, setRoleStep] = useState(1)
  const role = data.primary_role

  // Founder module
  if (role === 'founder') {
    return <FounderModule 
      roleStep={roleStep}
      setRoleStep={setRoleStep}
      onContinue={onContinue}
      onBack={onBack}
      onNext={onNext}
      updateRoleData={updateRoleData}
      data={data}
      step={step}
    />
  }

  // Provider module
  if (role === 'provider') {
    return <ProviderModule 
      roleStep={roleStep}
      setRoleStep={setRoleStep}
      onContinue={onContinue}
      onBack={onBack}
      onNext={onNext}
      updateRoleData={updateRoleData}
      data={data}
      step={step}
    />
  }

  // Investor module
  if (role === 'investor') {
    return <InvestorModule 
      roleStep={roleStep}
      setRoleStep={setRoleStep}
      onContinue={onContinue}
      onBack={onBack}
      onNext={onNext}
      updateRoleData={updateRoleData}
      data={data}
      step={step}
    />
  }

  // Changemaker module
  if (role === 'changemaker') {
    return <ChangemakerModule 
      roleStep={roleStep}
      setRoleStep={setRoleStep}
      onContinue={onContinue}
      onBack={onBack}
      onNext={onNext}
      updateRoleData={updateRoleData}
      data={data}
      step={step}
    />
  }

  return null
}

// Founder Module - Compressed to 2 screens
const FounderModule = ({ roleStep, setRoleStep, onContinue, onBack, onNext, updateRoleData, data, step }) => {
  const [stage, setStage] = useState(data.role_data?.stage || '')
  const [bottleneck, setBottleneck] = useState(data.role_data?.bottleneck || '')
  const [needs, setNeeds] = useState(data.role_data?.needs || [])
  const [wantToMeet, setWantToMeet] = useState(data.role_data?.wantToMeet || [])
  const [timeline, setTimeline] = useState(data.role_data?.timeline || '')

  const stages = ['Idea', 'MVP', 'Live', 'Scaling']
  const bottlenecks = ['focus', 'customers', 'team', 'funding', 'product', 'ops']
  const needOptions = ['intros', 'feedback', 'provider', 'capital', 'cofounder', 'accountability']
  const meetOptions = ['cofounder', 'investor', 'customer', 'advisor', 'provider']
  const timelines = ['this week', 'this month', 'this quarter']

  const handleContinue = () => {
    if (roleStep === 1 && stage && bottleneck) {
      updateRoleData('stage', stage)
      updateRoleData('bottleneck', bottleneck)
      setRoleStep(2)
    } else if (roleStep === 2) {
      updateRoleData('needs', needs)
      updateRoleData('wantToMeet', wantToMeet)
      updateRoleData('timeline', timeline)
      onContinue()
    }
  }

  const handleNext = () => {
    if (roleStep === 1 && stage && bottleneck) {
      updateRoleData('stage', stage)
      updateRoleData('bottleneck', bottleneck)
      setRoleStep(2)
    } else if (roleStep === 2) {
      updateRoleData('needs', needs)
      updateRoleData('wantToMeet', wantToMeet)
      updateRoleData('timeline', timeline)
      onNext()
    }
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation 
        onBack={roleStep > 1 ? () => setRoleStep(roleStep - 1) : onBack} 
        onNext={handleNext} 
        canGoBack={step > 2}
        canGoNext={(roleStep === 1 && stage && bottleneck) || roleStep === 2}
      />
      <div className="screen-content">
        {roleStep === 1 && (
          <>
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
          </>
        )}

        {roleStep === 2 && (
          <>
            <h1 className="screen-title">What You Need Next</h1>
            <p className="screen-text">Select up to 3 needs</p>
            <div className="themes-grid">
              {needOptions.map(n => (
                <div
                  key={n}
                  className={`theme-chip ${needs.includes(n) ? 'selected' : ''}`}
                  onClick={() => {
                    setNeeds(prev => 
                      prev.includes(n) 
                        ? prev.filter(x => x !== n)
                        : prev.length < 3 ? [...prev, n] : prev
                    )
                  }}
                >
                  {n.charAt(0).toUpperCase() + n.slice(1)}
                </div>
              ))}
            </div>
            <p className="screen-text" style={{ marginTop: '32px' }}>Who do you want to meet? (up to 2)</p>
            <div className="themes-grid">
              {meetOptions.map(m => (
                <div
                  key={m}
                  className={`theme-chip ${wantToMeet.includes(m) ? 'selected' : ''}`}
                  onClick={() => {
                    setWantToMeet(prev => 
                      prev.includes(m) 
                        ? prev.filter(x => x !== m)
                        : prev.length < 2 ? [...prev, m] : prev
                    )
                  }}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </div>
              ))}
            </div>
            <p className="screen-text" style={{ marginTop: '32px' }}>Timeline</p>
            <div className="themes-grid">
              {timelines.map(t => (
                <div
                  key={t}
                  className={`theme-chip ${timeline === t ? 'selected' : ''}`}
                  onClick={() => setTimeline(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </div>
              ))}
            </div>
          </>
        )}

        <button 
          className={`continue-btn ${(roleStep === 1 && (!stage || !bottleneck)) ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={roleStep === 1 && (!stage || !bottleneck)}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

// Provider Module
const ProviderModule = ({ roleStep, setRoleStep, onContinue, onBack, onNext, updateRoleData, data, step }) => {
  const [offerCategory, setOfferCategory] = useState(data.role_data?.offerCategory || '')
  const [whoYouServe, setWhoYouServe] = useState(data.role_data?.whoYouServe || '')
  const [deliveryStyle, setDeliveryStyle] = useState(data.role_data?.deliveryStyle || '')
  const [availability, setAvailability] = useState(data.role_data?.availability || '')

  const categories = ['Design', 'Development', 'Marketing', 'Strategy', 'Operations', 'Other']
  const serveOptions = ['founders', 'orgs', 'investors', 'anyone']
  const deliveryOptions = ['project', 'retainer', 'async', 'product']
  const availabilityOptions = ['now', 'soon', 'browsing']

  const handleContinue = () => {
    if (roleStep === 1 && offerCategory && whoYouServe) {
      updateRoleData('offerCategory', offerCategory)
      updateRoleData('whoYouServe', whoYouServe)
      setRoleStep(2)
    } else if (roleStep === 2 && deliveryStyle && availability) {
      updateRoleData('deliveryStyle', deliveryStyle)
      updateRoleData('availability', availability)
      onContinue()
    }
  }

  const handleNext = () => {
    if (roleStep === 1 && offerCategory && whoYouServe) {
      updateRoleData('offerCategory', offerCategory)
      updateRoleData('whoYouServe', whoYouServe)
      setRoleStep(2)
    } else if (roleStep === 2 && deliveryStyle && availability) {
      updateRoleData('deliveryStyle', deliveryStyle)
      updateRoleData('availability', availability)
      onNext()
    }
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation 
        onBack={roleStep > 1 ? () => setRoleStep(roleStep - 1) : onBack} 
        onNext={handleNext} 
        canGoBack={step > 2}
        canGoNext={(roleStep === 1 && offerCategory && whoYouServe) || (roleStep === 2 && deliveryStyle && availability)}
      />
      <div className="screen-content">
        {roleStep === 1 && (
          <>
            <h1 className="screen-title">What Do You Offer?</h1>
            <p className="screen-text">Select category</p>
            <div className="themes-grid">
              {categories.map(c => (
                <div
                  key={c}
                  className={`theme-chip ${offerCategory === c.toLowerCase() ? 'selected' : ''}`}
                  onClick={() => setOfferCategory(c.toLowerCase())}
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
          </>
        )}

        {roleStep === 2 && (
          <>
            <h1 className="screen-title">Delivery & Availability</h1>
            <p className="screen-text">Delivery style</p>
            <div className="themes-grid">
              {deliveryOptions.map(d => (
                <div
                  key={d}
                  className={`theme-chip ${deliveryStyle === d ? 'selected' : ''}`}
                  onClick={() => setDeliveryStyle(d)}
                >
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </div>
              ))}
            </div>
            <p className="screen-text" style={{ marginTop: '32px' }}>Availability</p>
            <div className="themes-grid">
              {availabilityOptions.map(a => (
                <div
                  key={a}
                  className={`theme-chip ${availability === a ? 'selected' : ''}`}
                  onClick={() => setAvailability(a)}
                >
                  {a.charAt(0).toUpperCase() + a.slice(1)}
                </div>
              ))}
            </div>
          </>
        )}

        <button 
          className={`continue-btn ${(roleStep === 1 && (!offerCategory || !whoYouServe)) || (roleStep === 2 && (!deliveryStyle || !availability)) ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={(roleStep === 1 && (!offerCategory || !whoYouServe)) || (roleStep === 2 && (!deliveryStyle || !availability))}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

// Investor Module
const InvestorModule = ({ roleStep, setRoleStep, onContinue, onBack, onNext, updateRoleData, data, step }) => {
  const [thesisThemes, setThesisThemes] = useState(data.role_data?.thesisThemes || [])
  const [stagePreference, setStagePreference] = useState(data.role_data?.stagePreference || '')
  const [checkSize, setCheckSize] = useState(data.role_data?.checkSize || '')
  const [acceptIntros, setAcceptIntros] = useState(data.role_data?.acceptIntros !== false)

  const themes = ['Climate', 'Healthcare', 'Education', 'Fintech', 'Social Impact', 'Other']
  const stages = ['idea', 'mvp', 'seed', 'series-a']
  const checkSizes = ['$10k-50k', '$50k-250k', '$250k-1M', '$1M+']

  const handleContinue = () => {
    if (roleStep === 1 && thesisThemes.length > 0) {
      updateRoleData('thesisThemes', thesisThemes)
      updateRoleData('thesisDefined', true)
      setRoleStep(2)
    } else if (roleStep === 2 && stagePreference) {
      updateRoleData('stagePreference', stagePreference)
      updateRoleData('checkSize', checkSize)
      updateRoleData('acceptIntros', acceptIntros)
      onContinue()
    }
  }

  const handleNext = () => {
    if (roleStep === 1 && thesisThemes.length > 0) {
      updateRoleData('thesisThemes', thesisThemes)
      updateRoleData('thesisDefined', true)
      setRoleStep(2)
    } else if (roleStep === 2 && stagePreference) {
      updateRoleData('stagePreference', stagePreference)
      updateRoleData('checkSize', checkSize)
      updateRoleData('acceptIntros', acceptIntros)
      onNext()
    }
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation 
        onBack={roleStep > 1 ? () => setRoleStep(roleStep - 1) : onBack} 
        onNext={handleNext} 
        canGoBack={step > 2}
        canGoNext={(roleStep === 1 && thesisThemes.length > 0) || (roleStep === 2 && stagePreference)}
      />
      <div className="screen-content">
        {roleStep === 1 && (
          <>
            <h1 className="screen-title">Investment Thesis</h1>
            <p className="screen-text">Pick up to 5 themes</p>
            <div className="themes-grid">
              {themes.map(t => (
                <div
                  key={t}
                  className={`theme-chip ${thesisThemes.includes(t.toLowerCase()) ? 'selected' : ''}`}
                  onClick={() => {
                    setThesisThemes(prev => 
                      prev.includes(t.toLowerCase())
                        ? prev.filter(x => x !== t.toLowerCase())
                        : prev.length < 5 ? [...prev, t.toLowerCase()] : prev
                    )
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          </>
        )}

        {roleStep === 2 && (
          <>
            <h1 className="screen-title">Investment Preferences</h1>
            <p className="screen-text">Stage preference</p>
            <div className="themes-grid">
              {stages.map(s => (
                <div
                  key={s}
                  className={`theme-chip ${stagePreference === s ? 'selected' : ''}`}
                  onClick={() => setStagePreference(s)}
                >
                  {s.charAt(0).toUpperCase() + s.replace('-', ' ')}
                </div>
              ))}
            </div>
            <p className="screen-text" style={{ marginTop: '32px' }}>Check size</p>
            <div className="themes-grid">
              {checkSizes.map(c => (
                <div
                  key={c}
                  className={`theme-chip ${checkSize === c ? 'selected' : ''}`}
                  onClick={() => setCheckSize(c)}
                >
                  {c}
                </div>
              ))}
            </div>
            <div className="accept-checkbox" style={{ marginTop: '32px', justifyContent: 'center' }}>
              <input 
                type="checkbox" 
                id="accept-intros" 
                checked={acceptIntros}
                onChange={(e) => setAcceptIntros(e.target.checked)}
              />
              <label htmlFor="accept-intros">Accept introductions</label>
            </div>
          </>
        )}

        <button 
          className={`continue-btn ${(roleStep === 1 && thesisThemes.length === 0) || (roleStep === 2 && !stagePreference) ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={(roleStep === 1 && thesisThemes.length === 0) || (roleStep === 2 && !stagePreference)}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

// Changemaker Module
const ChangemakerModule = ({ roleStep, setRoleStep, onContinue, onBack, onNext, updateRoleData, data, step }) => {
  const [contributionMode, setContributionMode] = useState(data.role_data?.contributionMode || '')
  const [skills, setSkills] = useState(data.role_data?.skills || [])
  const [availability, setAvailability] = useState(data.role_data?.availability || '')
  const [outcome, setOutcome] = useState(data.role_data?.outcome || '')

  const contributionModes = ['skills', 'time', 'money', 'community']
  const skillOptions = ['Design', 'Development', 'Marketing', 'Writing', 'Research', 'Operations', 'Other']
  const availabilityOptions = ['<5 hrs/week', '5-10 hrs/week', '10-20 hrs/week', '20+ hrs/week']
  const outcomes = ['job/internship', 'mentor', 'volunteer', 'build']

  const handleContinue = () => {
    if (roleStep === 1 && contributionMode) {
      updateRoleData('contributionMode', contributionMode)
      setRoleStep(2)
    } else if (roleStep === 2 && skills.length > 0 && availability && outcome) {
      updateRoleData('skills', skills)
      updateRoleData('availability', availability)
      updateRoleData('outcome', outcome)
      onContinue()
    }
  }

  const handleNext = () => {
    if (roleStep === 1 && contributionMode) {
      updateRoleData('contributionMode', contributionMode)
      setRoleStep(2)
    } else if (roleStep === 2 && skills.length > 0 && availability && outcome) {
      updateRoleData('skills', skills)
      updateRoleData('availability', availability)
      updateRoleData('outcome', outcome)
      onNext()
    }
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation 
        onBack={roleStep > 1 ? () => setRoleStep(roleStep - 1) : onBack} 
        onNext={handleNext} 
        canGoBack={step > 2}
        canGoNext={(roleStep === 1 && contributionMode) || (roleStep === 2 && skills.length > 0 && availability && outcome)}
      />
      <div className="screen-content">
        {roleStep === 1 && (
          <>
            <h1 className="screen-title">How Do You Want to Contribute?</h1>
            <div className="roles-grid">
              {contributionModes.map(m => (
                <div
                  key={m}
                  className={`role-card ${contributionMode === m ? 'selected' : ''}`}
                  onClick={() => setContributionMode(m)}
                >
                  <h3 className="role-label">{m.charAt(0).toUpperCase() + m.slice(1)}</h3>
                </div>
              ))}
            </div>
          </>
        )}

        {roleStep === 2 && (
          <>
            <h1 className="screen-title">Skills & Goals</h1>
            <p className="screen-text">Pick up to 5 skills</p>
            <div className="themes-grid">
              {skillOptions.map(s => (
                <div
                  key={s}
                  className={`theme-chip ${skills.includes(s.toLowerCase()) ? 'selected' : ''}`}
                  onClick={() => {
                    setSkills(prev => 
                      prev.includes(s.toLowerCase())
                        ? prev.filter(x => x !== s.toLowerCase())
                        : prev.length < 5 ? [...prev, s.toLowerCase()] : prev
                    )
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
            <p className="screen-text" style={{ marginTop: '32px' }}>Availability</p>
            <div className="themes-grid">
              {availabilityOptions.map(a => (
                <div
                  key={a}
                  className={`theme-chip ${availability === a ? 'selected' : ''}`}
                  onClick={() => setAvailability(a)}
                >
                  {a}
                </div>
              ))}
            </div>
            <p className="screen-text" style={{ marginTop: '32px' }}>What outcome do you want?</p>
            <div className="themes-grid">
              {outcomes.map(o => (
                <div
                  key={o}
                  className={`theme-chip ${outcome === o ? 'selected' : ''}`}
                  onClick={() => setOutcome(o)}
                >
                  {o.charAt(0).toUpperCase() + o.replace('/', ' / ')}
                </div>
              ))}
            </div>
          </>
        )}

        <button 
          className={`continue-btn ${(roleStep === 1 && !contributionMode) || (roleStep === 2 && (skills.length === 0 || !availability || !outcome)) ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={(roleStep === 1 && !contributionMode) || (roleStep === 2 && (skills.length === 0 || !availability || !outcome))}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

export default RoleModule

