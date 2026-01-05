import React, { useState } from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen12CommunityResources = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const [communityInterests, setCommunityInterests] = useState(data.community_interests || [])
  const [resourceInterests, setResourceInterests] = useState(data.resource_interests || [])
  
  const communityOptions = ['Weekly Events', 'Monthly Pitches', 'Daily Coworking', 'Founders', 'Providers', 'Investors', 'Changemakers']
  const resourceOptions = ['Grants', 'Platform', 'Accelerators', 'Impact Wikipedia', 'Intelligence Graph']

  const handleCommunityInterest = (interest) => {
    const newInterests = communityInterests.includes(interest)
      ? communityInterests.filter(i => i !== interest)
      : [...communityInterests, interest]
    setCommunityInterests(newInterests)
    updateData('community_interests', newInterests)
  }

  const handleResourceInterest = (resource) => {
    const newInterests = resourceInterests.includes(resource)
      ? resourceInterests.filter(i => i !== resource)
      : [...resourceInterests, resource]
    setResourceInterests(newInterests)
    updateData('resource_interests', newInterests)
  }
  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">Explore the Community</h1>
        <p className="screen-text" style={{ marginBottom: '24px', fontSize: '18px' }}>
          What interests you? We'll personalize your feed based on this.
        </p>
        <div className="community-interests-chips">
          {communityOptions.map(option => (
            <div
              key={option}
              className={`community-interest-chip ${communityInterests.includes(option) ? 'selected' : ''}`}
              onClick={() => handleCommunityInterest(option)}
            >
              {option}
            </div>
          ))}
        </div>
        <div className="members-grid">
          <div className="member-section">
            <h3 className="member-section-title">3 Founders</h3>
            <div className="member-cards">
              {[1, 2, 3].map(i => (
                <div key={i} className="member-card">
                  <div className="member-logo">🏢</div>
                  <div className="member-info">
                    <div className="member-name">Founder Name</div>
                    <div className="member-company">Company Name</div>
                    <div className="member-desc">3 word description</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="member-section">
            <h3 className="member-section-title">3 Providers</h3>
            <div className="member-cards">
              {[1, 2, 3].map(i => (
                <div key={i} className="member-card">
                  <div className="member-logo">💼</div>
                  <div className="member-info">
                    <div className="member-name">Provider Name</div>
                    <div className="member-company">Service Type</div>
                    <div className="member-desc">3 word description</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="member-section">
            <h3 className="member-section-title">3 Investors</h3>
            <div className="member-cards">
              {[1, 2, 3].map(i => (
                <div key={i} className="member-card">
                  <div className="member-logo">💰</div>
                  <div className="member-info">
                    <div className="member-name">Investor Name</div>
                    <div className="member-company">Fund Name</div>
                    <div className="member-desc">3 word description</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="member-section">
            <h3 className="member-section-title">3 Featured Changemakers</h3>
            <div className="member-cards">
              {[1, 2, 3].map(i => (
                <div key={i} className="member-card">
                  <div className="member-logo">🌟</div>
                  <div className="member-info">
                    <div className="member-name">Changemaker Name</div>
                    <div className="member-company">Role/Title</div>
                    <div className="member-desc">3 word description</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '48px' }}>
          <h1 className="screen-title">Access Resources</h1>
          <p className="screen-text" style={{ marginBottom: '24px', fontSize: '18px' }}>
            Which resources are you most interested in?
          </p>
          <div className="resource-interests-chips">
            {resourceOptions.map(resource => (
              <div
                key={resource}
                className={`resource-interest-chip ${resourceInterests.includes(resource) ? 'selected' : ''}`}
                onClick={() => handleResourceInterest(resource)}
              >
                {resource}
              </div>
            ))}
          </div>
          <button className="resource-submit-btn">
            Submit your perspective to our Impact Wikipedia
          </button>
          <div className="intelligence-graph">
            <div className="graph-nodes">
              <div className="graph-node node-founder">Founder</div>
              <div className="graph-line"></div>
              <div className="graph-node node-official">Government Official</div>
              <div className="graph-line"></div>
              <div className="graph-node node-investor">Investor</div>
            </div>
            <p className="graph-description">
              A map of dots showing different nodes of perspectives from people, organizations, and entities 
              being collectively aggregated into the predictive intelligence graph.
            </p>
          </div>
        </div>

        <button className="continue-btn" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen12CommunityResources

