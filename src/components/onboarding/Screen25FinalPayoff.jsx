import React, { useState, useEffect } from 'react'
import ScreenNavigation from './ScreenNavigation'
import { routeToPath, getPathInfo, generateFirstPost } from '../../utils/pathRouter'
import './Screen.css'
import './AISuggestion.css'
import './PathPacket.css'

const Screen25FinalPayoff = ({ onContinue, onBack, onNext, updateData, updateRoleData, data, step }) => {
  const [roleStep, setRoleStep] = useState(2) // Start at step 2 (Role Module B)
  const [suggestedPathId, setSuggestedPathId] = useState(null)
  const [pathInfo, setPathInfo] = useState(null)
  const [reasoning, setReasoning] = useState('')
  const [firstPost, setFirstPost] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [completedActions, setCompletedActions] = useState([])
  const [showOtherPaths, setShowOtherPaths] = useState(false)

  const role = data.primary_role

  // Role Module B state
  const [needs, setNeeds] = useState(data.role_data?.needs || [])
  const [wantToMeet, setWantToMeet] = useState(data.role_data?.wantToMeet || [])
  const [timeline, setTimeline] = useState(data.role_data?.timeline || '')

  // Provider B state
  const [deliveryStyle, setDeliveryStyle] = useState(data.role_data?.deliveryStyle || '')
  const [availability, setAvailability] = useState(data.role_data?.availability || '')

  // Investor B state
  const [stagePreference, setStagePreference] = useState(data.role_data?.stagePreference || '')
  const [checkSize, setCheckSize] = useState(data.role_data?.checkSize || '')
  const [acceptIntros, setAcceptIntros] = useState(data.role_data?.acceptIntros !== false)

  // Changemaker B state
  const [skills, setSkills] = useState(data.role_data?.skills || [])
  const [availabilityHours, setAvailabilityHours] = useState(data.role_data?.availability || '')
  const [outcome, setOutcome] = useState(data.role_data?.outcome || '')

  useEffect(() => {
    // After Role Module B is complete, analyze and suggest path
    if (roleStep === 3) {
      setIsAnalyzing(true)
      setTimeout(() => {
        const pathId = routeToPath(data)
        if (pathId) {
          const path = getPathInfo(pathId)
          setSuggestedPathId(pathId)
          setPathInfo(path)
          setReasoning(generateReasoning(pathId, path, data))
          const post = generateFirstPost(data)
          setFirstPost(post)
          setIsAnalyzing(false)
          updateData('suggested_path_id', pathId)
          updateData('assigned_path_id', pathId)
          updateData('first_post_draft', post)
        } else {
          setIsAnalyzing(false)
        }
      }, 1500)
    }
  }, [roleStep, data.role_data])

  const generateReasoning = (pathId, pathInfo, userData) => {
    const { primary_intent, role_data } = userData
    const reasons = []
    
    if (primary_intent) {
      const intentMap = {
        'money': 'you want to raise funding',
        'people': 'you want to find people',
        'work': 'you want to find work',
        'progress': 'you want to make progress',
        'support': 'you want to find support'
      }
      reasons.push(intentMap[primary_intent] || 'your goals')
    }
    
    if (role_data?.bottleneck) {
      reasons.push(`your bottleneck is ${role_data.bottleneck}`)
    }
    
    if (role_data?.stage) {
      reasons.push(`you're at the ${role_data.stage} stage`)
    }
    
    if (reasons.length === 0) {
      return `Based on your profile, we think "${pathInfo.name}" is your best starting path.`
    }
    
    return `Because ${reasons.join(' + ')}, we think "${pathInfo.name}" is your best starting path.`
  }

  const handleRoleModuleBContinue = () => {
    if (role === 'founder') {
      if (needs.length > 0) {
        updateRoleData('needs', needs)
        updateRoleData('wantToMeet', wantToMeet)
        updateRoleData('timeline', timeline)
        setRoleStep(3)
      }
    } else if (role === 'provider') {
      if (deliveryStyle && availability) {
        updateRoleData('deliveryStyle', deliveryStyle)
        updateRoleData('availability', availability)
        setRoleStep(3)
      }
    } else if (role === 'investor') {
      if (stagePreference) {
        updateRoleData('stagePreference', stagePreference)
        updateRoleData('checkSize', checkSize)
        updateRoleData('acceptIntros', acceptIntros)
        setRoleStep(3)
      }
    } else if (role === 'changemaker') {
      if (skills.length > 0 && availabilityHours && outcome) {
        updateRoleData('skills', skills)
        updateRoleData('availability', availabilityHours)
        updateRoleData('outcome', outcome)
        setRoleStep(3)
      }
    }
  }

  const handleAcceptPath = () => {
    if (onContinue) {
      onContinue()
    }
  }

  const handlePostNow = () => {
    if (onContinue) {
      onContinue()
    }
  }

  const handleActionToggle = (index) => {
    setCompletedActions(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  // Role Module B - Founder
  if (roleStep === 2 && role === 'founder') {
    const needOptions = ['intros', 'feedback', 'provider', 'capital', 'cofounder', 'accountability']
    const meetOptions = ['cofounder', 'investor', 'customer', 'advisor', 'provider']
    const timelines = ['this week', 'this month', 'this quarter']

    return (
      <div className="onboarding-screen-base">
        <ScreenNavigation 
          onBack={() => setRoleStep(1)} 
          onNext={handleRoleModuleBContinue} 
          canGoBack={step > 2}
          canGoNext={needs.length > 0}
        />
        <div className="screen-content">
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
          <button 
            className={`continue-btn ${needs.length === 0 ? 'disabled' : ''}`}
            onClick={handleRoleModuleBContinue}
            disabled={needs.length === 0}
          >
            Continue →
          </button>
        </div>
      </div>
    )
  }

  // Role Module B - Provider
  if (roleStep === 2 && role === 'provider') {
    const deliveryOptions = ['project', 'retainer', 'async', 'product']
    const availabilityOptions = ['now', 'soon', 'browsing']

    return (
      <div className="onboarding-screen-base">
        <ScreenNavigation 
          onBack={() => setRoleStep(1)} 
          onNext={handleRoleModuleBContinue} 
          canGoBack={step > 2}
          canGoNext={deliveryStyle && availability}
        />
        <div className="screen-content">
          <h1 className="screen-title">Delivery Style & Availability</h1>
          <p className="screen-text">How do you deliver?</p>
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
          <button 
            className={`continue-btn ${(!deliveryStyle || !availability) ? 'disabled' : ''}`}
            onClick={handleRoleModuleBContinue}
            disabled={!deliveryStyle || !availability}
          >
            Continue →
          </button>
        </div>
      </div>
    )
  }

  // Role Module B - Investor
  if (roleStep === 2 && role === 'investor') {
    const stages = ['idea', 'mvp', 'seed', 'series-a']
    const checkSizes = ['$10k-50k', '$50k-250k', '$250k-1M', '$1M+']

    return (
      <div className="onboarding-screen-base">
        <ScreenNavigation 
          onBack={() => setRoleStep(1)} 
          onNext={handleRoleModuleBContinue} 
          canGoBack={step > 2}
          canGoNext={!!stagePreference}
        />
        <div className="screen-content">
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
          <p className="screen-text" style={{ marginTop: '32px' }}>Check size (optional)</p>
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
          <div style={{ marginTop: '24px', textAlign: 'left' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={acceptIntros}
                onChange={(e) => setAcceptIntros(e.target.checked)}
              />
              <span>Accept introduction requests</span>
            </label>
          </div>
          <button 
            className={`continue-btn ${!stagePreference ? 'disabled' : ''}`}
            onClick={handleRoleModuleBContinue}
            disabled={!stagePreference}
          >
            Continue →
          </button>
        </div>
      </div>
    )
  }

  // Role Module B - Changemaker
  if (roleStep === 2 && role === 'changemaker') {
    const skillOptions = ['Design', 'Development', 'Marketing', 'Writing', 'Research', 'Operations', 'Other']
    const availabilityOptions = ['<5 hrs/week', '5-10 hrs/week', '10-20 hrs/week', '20+ hrs/week']
    const outcomes = ['job/internship', 'mentor', 'volunteer', 'build']

    return (
      <div className="onboarding-screen-base">
        <ScreenNavigation 
          onBack={() => setRoleStep(1)} 
          onNext={handleRoleModuleBContinue} 
          canGoBack={step > 2}
          canGoNext={skills.length > 0 && availabilityHours && outcome}
        />
        <div className="screen-content">
          <h1 className="screen-title">Skills & Availability</h1>
          <p className="screen-text">Select up to 5 skills</p>
          <div className="themes-grid">
            {skillOptions.map(s => (
              <div
                key={s}
                className={`theme-chip ${skills.includes(s) ? 'selected' : ''}`}
                onClick={() => {
                  setSkills(prev => 
                    prev.includes(s) 
                      ? prev.filter(x => x !== s)
                      : prev.length < 5 ? [...prev, s] : prev
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
                className={`theme-chip ${availabilityHours === a ? 'selected' : ''}`}
                onClick={() => setAvailabilityHours(a)}
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
                {o.charAt(0).toUpperCase() + o.slice(1)}
              </div>
            ))}
          </div>
          <button 
            className={`continue-btn ${(skills.length === 0 || !availabilityHours || !outcome) ? 'disabled' : ''}`}
            onClick={handleRoleModuleBContinue}
            disabled={skills.length === 0 || !availabilityHours || !outcome}
          >
            Continue →
          </button>
        </div>
      </div>
    )
  }

  // Analyzing state
  if (isAnalyzing) {
    return (
      <div className="onboarding-screen-base">
        <ScreenNavigation onBack={onBack} onNext={null} canGoBack={step > 2} canGoNext={false} />
        <div className="screen-content">
          <div className="analyzing-container">
            <div className="analyzing-spinner"></div>
            <h1 className="screen-title">Analyzing Your Answers...</h1>
            <p className="screen-text">
              We're reviewing your dream, goals, and preferences to find the best path for you.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Final payoff screen - Path Suggestion + Packet + Post
  if (roleStep === 3 && pathInfo) {
    return (
      <div className="onboarding-screen-base">
        <ScreenNavigation 
          onBack={() => setRoleStep(2)} 
          onNext={handleAcceptPath} 
          canGoBack={step > 2}
          canGoNext={true}
        />
        <div className="screen-content path-packet-content">
          {/* Path Suggestion */}
          <div className="ai-suggestion-container" style={{ marginBottom: '48px' }}>
            <div className="ai-header">
              <div className="ai-icon">🤖</div>
              <h1 className="screen-title">I Think This Is Your Starting Path</h1>
            </div>
            
            <div className="suggestion-card">
              <div className="path-badge" style={{ marginBottom: '16px' }}>Starting Path</div>
              <h2 className="suggested-role-name">{pathInfo.name}</h2>
              <p className="suggested-role-desc">{pathInfo.description}</p>
            </div>

            <div className="reasoning-box">
              <p className="reasoning-text">{reasoning}</p>
            </div>

            <div className="action-buttons">
              <button className="accept-role-btn" onClick={handleAcceptPath}>
                Yes, start here →
              </button>
              <button className="change-role-btn" onClick={() => setShowOtherPaths(!showOtherPaths)}>
                {showOtherPaths ? 'Hide' : 'Show'} other paths
              </button>
            </div>
          </div>

          {/* Path Packet */}
          <div className="path-sections">
            <div className="path-section">
              <h2 className="section-title">Your Next 3 Actions</h2>
              <div className="actions-list">
                {pathInfo.actions?.slice(0, 3).map((action, index) => (
                  <div 
                    key={index}
                    className={`action-item ${completedActions.includes(index) ? 'completed' : ''}`}
                    onClick={() => handleActionToggle(index)}
                  >
                    <input 
                      type="checkbox" 
                      checked={completedActions.includes(index)}
                      onChange={() => handleActionToggle(index)}
                    />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="path-section">
              <h2 className="section-title">3 People to Meet</h2>
              <div className="people-cards">
                {[1, 2, 3].map(i => (
                  <div key={i} className="person-card">
                    <div className="person-avatar">👤</div>
                    <div className="person-info">
                      <div className="person-name">Recommended Match {i}</div>
                      <div className="person-role">Based on your profile</div>
                    </div>
                    <button className="connect-btn">Connect</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="path-section">
              <h2 className="section-title">3 Opportunities</h2>
              <div className="opportunities-list">
                {[1, 2, 3].map(i => (
                  <div key={i} className="opportunity-card">
                    <div className="opportunity-icon">💡</div>
                    <div className="opportunity-content">
                      <div className="opportunity-title">Relevant Opportunity {i}</div>
                      <div className="opportunity-desc">Matched to your interests</div>
                    </div>
                    <button className="view-btn">View</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* First Post */}
          <div className="first-post-section">
            <h2 className="section-title">Your First Post</h2>
            <div className="post-preview">
              <textarea 
                className="post-textarea"
                value={firstPost}
                onChange={(e) => {
                  setFirstPost(e.target.value)
                  updateData('first_post_draft', e.target.value)
                }}
                placeholder="Edit your first post..."
              />
              <p className="post-note">You can edit this before posting</p>
            </div>
            <button className="post-now-btn" onClick={handlePostNow}>
              Post Now →
            </button>
          </div>

          <button className="continue-btn" onClick={handleAcceptPath} style={{ marginTop: '32px' }}>
            Go to Homepage →
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default Screen25FinalPayoff

