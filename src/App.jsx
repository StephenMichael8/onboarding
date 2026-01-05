import React, { useState } from 'react'
import LandingPage from './components/LandingPage'
import OnboardingFlow from './components/OnboardingFlow'
import HomePage from './components/HomePage'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing') // 'landing', 'onboarding', or 'homepage'

  const handleStartOnboarding = () => {
    setCurrentScreen('onboarding')
  }

  const handleSignIn = () => {
    // Handle sign in logic here
    console.log('Sign in clicked')
  }

  const handleOnboardingComplete = () => {
    setCurrentScreen('homepage')
  }

  return (
    <div className="app">
      {currentScreen === 'landing' ? (
        <LandingPage 
          onStartOnboarding={handleStartOnboarding}
          onSignIn={handleSignIn}
        />
      ) : currentScreen === 'onboarding' ? (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      ) : (
        <HomePage />
      )}
    </div>
  )
}

export default App

