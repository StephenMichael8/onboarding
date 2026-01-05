import React, { useState, useEffect } from 'react'
import ScreenNavigation from './ScreenNavigation'
import { routeToPath, getPathInfo } from '../../utils/pathRouter'
import './Screen.css'
import './AISuggestion.css'

const Screen22PathSuggestion = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const [suggestedPathId, setSuggestedPathId] = useState(null)
  const [pathInfo, setPathInfo] = useState(null)
  const [reasoning, setReasoning] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(true)

  useEffect(() => {
    // Simulate AI analysis
    setTimeout(() => {
      const pathId = routeToPath(data)
      if (pathId) {
        const path = getPathInfo(pathId)
        setSuggestedPathId(pathId)
        setPathInfo(path)
        setReasoning(generateReasoning(pathId, path, data))
        setIsAnalyzing(false)
        updateData('suggested_path_id', pathId)
      } else {
        setIsAnalyzing(false)
      }
    }, 1500)
  }, [data.primary_role, data.primary_intent, data.role_data])

  const generateReasoning = (pathId, pathInfo, userData) => {
    const { primary_intent, stage_type, role_data } = userData
    
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
    } else if (stage_type) {
      reasons.push(`you're at the ${stage_type} stage`)
    }
    
    if (reasons.length === 0) {
      return `Based on your profile, we think "${pathInfo.name}" is your best starting path.`
    }
    
    return `Because ${reasons.join(' + ')}, we think "${pathInfo.name}" is your best starting path.`
  }

  const handleAccept = () => {
    updateData('assigned_path_id', suggestedPathId)
    onContinue()
  }

  const handleNext = () => {
    if (suggestedPathId) {
      updateData('assigned_path_id', suggestedPathId)
      onNext()
    }
  }

  const handleShowOtherPaths = () => {
    // Allow user to see other paths - for now just continue
    onNext()
  }

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

  if (!pathInfo) {
    return null
  }

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation 
        onBack={onBack} 
        onNext={handleNext} 
        canGoBack={step > 2}
        canGoNext={!!suggestedPathId}
      />
      <div className="screen-content">
        <div className="ai-suggestion-container">
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
            <button className="accept-role-btn" onClick={handleAccept}>
              Yes, start here →
            </button>
            <button className="change-role-btn" onClick={handleShowOtherPaths}>
              Show other paths
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Screen22PathSuggestion

