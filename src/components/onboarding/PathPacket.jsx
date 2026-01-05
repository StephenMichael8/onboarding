import React, { useState, useEffect } from 'react'
import { routeToPath, getPathInfo, generateFirstPost } from '../../utils/pathRouter'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'
import './PathPacket.css'

const PathPacket = ({ data, onContinue, onBack, onNext, step }) => {
  const [pathId, setPathId] = useState(null)
  const [pathInfo, setPathInfo] = useState(null)
  const [firstPost, setFirstPost] = useState('')
  const [completedActions, setCompletedActions] = useState([])

  useEffect(() => {
    // Use suggested path if available, otherwise route
    const pathId = data.suggested_path_id || data.assigned_path_id || routeToPath(data)
    if (pathId) {
      const path = getPathInfo(pathId)
      setPathId(pathId)
      setPathInfo(path)
      const post = generateFirstPost(data)
      setFirstPost(post)
      updateData('assigned_path_id', pathId)
      updateData('first_post_draft', post)
    }
  }, [data.primary_role, data.role_data])

  const updateData = (key, value) => {
    // This would normally update the parent state
    // For now, we'll just store it locally
  }

  const handleActionToggle = (index) => {
    setCompletedActions(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const handlePostNow = () => {
    // This would post to the platform
    // Navigate to homepage - handled by parent
    if (onContinue) {
      onContinue()
    }
  }

  if (!pathInfo) {
    return (
      <div className="onboarding-screen-base">
        <div className="screen-content">
          <h1 className="screen-title">Loading your path...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} canGoNext={false} />
      <div className="screen-content path-packet-content">
        <div className="path-header">
          <div className="path-badge">Your Path</div>
          <h1 className="path-name">{pathInfo.name}</h1>
          <p className="path-description">{pathInfo.description}</p>
        </div>

        <div className="path-sections">
          <div className="path-section">
            <h2 className="section-title">Your Next 3 Actions</h2>
            <div className="actions-list">
              {pathInfo.actions.map((action, index) => (
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

        <div className="first-post-section">
          <h2 className="section-title">Your First Post</h2>
          <div className="post-preview">
            <textarea 
              className="post-textarea"
              value={firstPost}
              readOnly
            />
            <p className="post-note">You can edit this before posting</p>
          </div>
          <button className="post-now-btn" onClick={handlePostNow}>
            Post Now →
          </button>
        </div>

        <button className="continue-btn" onClick={onNext} style={{ marginTop: '32px' }}>
          Go to Homepage →
        </button>
      </div>
    </div>
  )
}

export default PathPacket

