import React from 'react'
import './ScreenNavigation.css'

const ScreenNavigation = ({ onBack, onNext, canGoBack = true, canGoNext = true, step, totalSteps }) => {
  return (
    <div className="screen-navigation">
      {canGoBack && (
        <button className="nav-button nav-back" onClick={onBack}>
          ← Back
        </button>
      )}
      {canGoNext && (
        <button className="nav-button nav-next" onClick={onNext}>
          Next →
        </button>
      )}
    </div>
  )
}

export default ScreenNavigation

