import React, { useState, Suspense, lazy } from 'react'
import LandingPage from './components/LandingPage'
import './App.css'

// Landing is the first paint, so it stays eager. The heavier onboarding flow
// and the post-onboarding homepage are code-split so they don't bloat the
// initial bundle a first-time visitor downloads.
const OnboardingFlow = lazy(() => import('./components/OnboardingFlow'))
const HomePage = lazy(() => import('./components/HomePage'))

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
      ) : (
        <Suspense fallback={<div className="app-loading" role="status" aria-live="polite">Loading…</div>}>
          {currentScreen === 'onboarding' ? (
            <OnboardingFlow onComplete={handleOnboardingComplete} />
          ) : (
            <HomePage />
          )}
        </Suspense>
      )}
    </div>
  )
}

export default App
