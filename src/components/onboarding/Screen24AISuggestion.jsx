import React, { useState, useEffect } from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'
import './AISuggestion.css'

const Screen24AISuggestion = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const [suggestedRole, setSuggestedRole] = useState(null)
  const [reasoning, setReasoning] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(true)

  useEffect(() => {
    // Simulate AI analysis
    setTimeout(() => {
      const role = analyzeAndSuggestRole(data)
      setSuggestedRole(role)
      setReasoning(generateReasoning(role, data))
      setIsAnalyzing(false)
      updateData('suggested_role', role)
    }, 1500)
  }, [])

  const analyzeAndSuggestRole = (userData) => {
    const { primary_intent, stage_type, superpowers, constraints, dream_text } = userData

    // Simple logic to suggest role based on answers
    // In production, this would be a more sophisticated AI analysis
    
    if (primary_intent === 'money' && stage_type === 'idea') {
      return 'founder'
    }
    
    if (primary_intent === 'work' || primary_intent === 'support') {
      if (superpowers.includes('funder')) {
        return 'investor'
      }
      if (superpowers.some(sp => ['builder', 'operator', 'researcher'].includes(sp))) {
        return 'provider'
      }
      return 'changemaker'
    }
    
    if (primary_intent === 'people' && stage_type === 'project') {
      return 'founder'
    }
    
    if (primary_intent === 'progress' && stage_type === 'organization') {
      return 'founder'
    }
    
    // Default based on intent
    if (primary_intent === 'money') {
      return 'founder'
    }
    if (primary_intent === 'work') {
      return 'provider'
    }
    if (primary_intent === 'people' || primary_intent === 'support') {
      return 'changemaker'
    }
    
    // Default to changemaker if unclear
    return 'changemaker'
  }

  const generateReasoning = (role, userData) => {
    const { primary_intent, stage_type, superpowers, dream_text } = userData
    
    const reasons = []
    
    if (primary_intent === 'money' && stage_type) {
      reasons.push(`You're looking to ${primary_intent === 'money' ? 'raise funding' : 'make progress'} and you're at the ${stage_type} stage`)
    }
    
    if (superpowers && superpowers.length > 0) {
      reasons.push(`Your superpowers (${superpowers.join(', ')}) align well with this role`)
    }
    
    if (dream_text && dream_text.length > 20) {
      reasons.push(`Your vision suggests you're building something meaningful`)
    }
    
    if (role === 'founder') {
      return `Based on your answers, I think you're a ${role}. ${reasons.join('. ')}. You're ready to build and lead.`
    } else if (role === 'provider') {
      return `Based on your answers, I think you're a ${role}. ${reasons.join('. ')}. You have skills to offer and want to help others succeed.`
    } else if (role === 'investor') {
      return `Based on your answers, I think you're an ${role}. ${reasons.join('. ')}. You want to deploy capital strategically for impact.`
    } else {
      return `Based on your answers, I think you're a ${role}. ${reasons.join('. ')}. You want to contribute your time and skills to make a difference.`
    }
  }

  const handleAccept = () => {
    updateData('primary_role', suggestedRole)
    onContinue()
  }

  const handleNext = () => {
    if (suggestedRole) {
      updateData('primary_role', suggestedRole)
      onNext()
    }
  }

  const handleChangeRole = () => {
    // Allow user to manually select role
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

  const roleInfo = {
    founder: {
      label: 'Founder',
      icon: '🚀',
      description: 'Building a venture or project'
    },
    provider: {
      label: 'Provider',
      icon: '💼',
      description: 'Offering services or expertise'
    },
    investor: {
      label: 'Investor',
      icon: '💰',
      description: 'Deploying capital for impact'
    },
    changemaker: {
      label: 'Changemaker',
      icon: '🌟',
      description: 'Contributing skills, time, or support'
    }
  }

  const role = roleInfo[suggestedRole]

  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation 
        onBack={onBack} 
        onNext={handleNext} 
        canGoBack={step > 2}
        canGoNext={!!suggestedRole}
      />
      <div className="screen-content">
        <div className="ai-suggestion-container">
          <div className="ai-header">
            <div className="ai-icon">🤖</div>
            <h1 className="screen-title">I Think This Is Your Path</h1>
          </div>
          
          <div className="suggestion-card">
            <div className="suggested-role-icon">{role.icon}</div>
            <h2 className="suggested-role-name">{role.label}</h2>
            <p className="suggested-role-desc">{role.description}</p>
          </div>

          <div className="reasoning-box">
            <p className="reasoning-text">{reasoning}</p>
          </div>

          <div className="action-buttons">
            <button className="accept-role-btn" onClick={handleAccept}>
              Yes, this feels right →
            </button>
            <button className="change-role-btn" onClick={handleChangeRole}>
              I'd like to choose differently
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Screen24AISuggestion

