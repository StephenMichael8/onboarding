import React, { useState, useEffect, useRef } from 'react'
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
import './OnboardingFlow.css'

// The flow runs from step 2 (first informational screen) through step 24
// (the final payoff). Step 1 is the separate landing page handled by App.
const FIRST_STEP = 2
const LAST_STEP = 24
const STORAGE_KEY = 'propel_onboarding_v1'

const DEFAULT_DATA = {
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

  // Consent
  code_of_conduct_accepted: false,
}

// Best-effort read of previously saved progress. Never throws (private mode,
// disabled storage, or corrupt JSON all fall back to a fresh start).
const loadPersisted = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const OnboardingFlow = ({ onComplete }) => {
  const persisted = loadPersisted()

  const [currentStep, setCurrentStep] = useState(() => {
    const step = persisted?.currentStep
    return typeof step === 'number' && step >= FIRST_STEP && step <= LAST_STEP ? step : FIRST_STEP
  })
  const [onboardingData, setOnboardingData] = useState(() => ({
    ...DEFAULT_DATA,
    ...(persisted?.data || {}),
  }))

  const totalSteps = LAST_STEP
  const screenRegionRef = useRef(null)

  // Persist progress so a refresh 20 screens deep does not dump the user back
  // to the start. Best-effort — storage failures are ignored.
  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ currentStep, data: onboardingData })
      )
    } catch {
      /* storage unavailable — continue without persistence */
    }
  }, [currentStep, onboardingData])

  // Move keyboard focus to the top of each new screen so screen-reader and
  // keyboard users are oriented after navigating.
  useEffect(() => {
    screenRegionRef.current?.focus()
  }, [currentStep])

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

  const finish = () => {
    // Clear saved progress once the flow is complete so a returning user
    // starts fresh rather than resuming a finished session.
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    if (onComplete) {
      onComplete()
    }
  }

  const handleNext = () => {
    // The final payoff screen (LAST_STEP) completes onboarding.
    if (currentStep === LAST_STEP) {
      finish()
      return
    }

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > FIRST_STEP) {
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
        // Final screen — Role Module B + path suggestion + payoff, then completes.
        return <Screen25FinalPayoff {...commonProps} />
      default:
        return <OnboardingScreen {...commonProps} />
    }
  }

  // Normalize display so the first screen reads as step 1 and the last as the
  // total, even though the internal index starts at FIRST_STEP.
  const displayStep = currentStep - FIRST_STEP + 1
  const displayTotal = LAST_STEP - FIRST_STEP + 1
  const progressPercent = (displayStep / displayTotal) * 100

  return (
    <div className="onboarding-flow">
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={displayStep}
        aria-valuemin={1}
        aria-valuemax={displayTotal}
        aria-label={`Onboarding progress: step ${displayStep} of ${displayTotal}`}
      >
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="progress-text">
        Step {displayStep} of {displayTotal}
      </div>
      <div
        ref={screenRegionRef}
        tabIndex={-1}
        className="onboarding-screen-region"
        style={{ outline: 'none' }}
      >
        {renderScreen()}
      </div>
    </div>
  )
}

export default OnboardingFlow
