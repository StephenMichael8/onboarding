import React from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen13Resources = ({ onContinue, onBack, onNext, step }) => {
  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">Access Resources</h1>
        <div className="resources-triangles">
          <div className="resource-triangle">Grants</div>
          <div className="resource-triangle">Platform</div>
          <div className="resource-triangle">Accelerators</div>
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
        <button className="continue-btn" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen13Resources

