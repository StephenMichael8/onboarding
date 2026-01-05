import React, { useState } from 'react'
import OnboardingScreen from './OnboardingScreen'
import Screen3RealityBelief from './onboarding/Screen3RealityBelief'
import Screen5CoreLoop from './onboarding/Screen5CoreLoop'
import Screen6Values from './onboarding/Screen6Values'
import Screen6Stephen from './onboarding/Screen6Stephen'
import Screen7ScalingFragmentation from './onboarding/Screen7ScalingFragmentation'
import Screen9Stories from './onboarding/Screen9Stories'
import Screen10WhatYouCanDo from './onboarding/Screen10WhatYouCanDo'
import Screen11Proof from './onboarding/Screen11Proof'
import Screen12CommunityResources from './onboarding/Screen12CommunityResources'
import Screen14HomepageTutorial from './onboarding/Screen14HomepageTutorial'
import Screen15CodeOfConduct from './onboarding/Screen15CodeOfConduct'
import Screen16PickRole from './onboarding/Screen16PickRole'
import Screen17Dream from './onboarding/Screen17Dream'
import Screen17SuccessIntent from './onboarding/Screen17SuccessIntent'
import Screen18WorkingOn from './onboarding/Screen20WorkingOn'
import Screen19Themes from './onboarding/Screen21Themes'
import Screen20Constraints from './onboarding/Screen22Constraints'
import Screen21Superpower from './onboarding/Screen23Superpower'
import Screen23Collaboration from './onboarding/Screen24Collaboration'
import Screen24RoleModuleA from './onboarding/Screen24RoleModuleA'
import Screen25FinalPayoff from './onboarding/Screen25FinalPayoff'
import ScreenRecap from './onboarding/ScreenRecap'
import { routeToPath, getPathInfo, generateFirstPost } from '../utils/pathRouter'
import './OnboardingFlow.css'

const OnboardingFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(2) // Start at screen 2 (Do More Together)
  const [onboardingData, setOnboardingData] = useState({
    // Core fields
    primary_role: null,
    dream_text: '',
    primary_intent: '',
    stage_type: '',
    themes: [],
    constraints: [],
    superpowers: [],
    collab_prefs: {},
    visibility: '',
    timezone: '',
    success_outcomes: [],
    success_metric_text: '',
    
    // Early engagement data (collected during informational screens)
    initial_interests: [],
    aligned_values: [],
    primary_value: '',
    resonated_story: '',
    what_brought_you: '',
    community_interests: [],
    resource_interests: [],
    
    // Role-specific
    role_data: {},
    
    // Outputs
    assigned_path_id: null,
    first_post_draft: '',
    path_packet: null,
    
    // Consent
    code_of_conduct_accepted: false,
  })

  const totalSteps = 25 // Final optimized version

  const updateData = (key, value) => {
    setOnboardingData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const updateRoleData = (key, value) => {
    setOnboardingData(prev => ({
      ...prev,
      role_data: {
        ...prev.role_data,
        [key]: value
      }
    }))
  }

  const handleNext = () => {
    // After final payoff screen (step 25), complete onboarding
    if (currentStep === 25) {
      if (onComplete) {
        onComplete()
      }
      return
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 2) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleContinue = () => {
    handleNext()
  }

  const renderScreen = () => {
    const commonProps = {
      onNext: handleNext,
      onBack: handleBack,
      onContinue: handleContinue,
      updateData,
      updateRoleData,
      data: onboardingData,
      step: currentStep,
      totalSteps,
    }

    switch (currentStep) {
      case 2:
        return <OnboardingScreen {...commonProps} />
      case 3:
        return <Screen3RealityBelief {...commonProps} />
      case 4:
        return <Screen5CoreLoop {...commonProps} />
      case 5:
        return <Screen6Values {...commonProps} />
      case 6:
        return <Screen6Stephen {...commonProps} />
      case 7:
        return <Screen7ScalingFragmentation {...commonProps} />
      case 8:
        return <Screen9Stories {...commonProps} />
      case 9:
        return <Screen10WhatYouCanDo {...commonProps} />
      case 10:
        return <Screen11Proof {...commonProps} />
      case 11:
        return <Screen12CommunityResources {...commonProps} />
      case 12:
        return <Screen14HomepageTutorial {...commonProps} />
      case 13:
        return <Screen15CodeOfConduct {...commonProps} />
      case 14:
        return <ScreenRecap {...commonProps} /> // Recap after 13 screens
      case 15:
        return <Screen16PickRole {...commonProps} />
      case 16:
        return <Screen17Dream {...commonProps} />
      case 17:
        return <Screen17SuccessIntent {...commonProps} />
      case 18:
        return <Screen18WorkingOn {...commonProps} />
      case 19:
        return <Screen19Themes {...commonProps} />
      case 20:
        return <Screen20Constraints {...commonProps} />
      case 21:
        return <Screen21Superpower {...commonProps} />
      case 22:
        return <Screen23Collaboration {...commonProps} />
      case 23:
        return <Screen24RoleModuleA {...commonProps} />
      case 24:
        return <Screen25FinalPayoff {...commonProps} />
      case 25:
        // Final screen - handled by Screen25FinalPayoff
        return <Screen25FinalPayoff {...commonProps} />
      default:
        return <OnboardingScreen {...commonProps} />
    }
  }


  return (
    <div className="onboarding-flow">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      <div className="progress-text">
        Step {currentStep} of {totalSteps}
      </div>
      {renderScreen()}
    </div>
  )
}

export default OnboardingFlow

