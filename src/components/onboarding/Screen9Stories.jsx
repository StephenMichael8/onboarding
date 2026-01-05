import React, { useState } from 'react'
import ScreenNavigation from './ScreenNavigation'
import './Screen.css'

const Screen9Stories = ({ onContinue, onBack, onNext, updateData, data, step }) => {
  const [resonatedStory, setResonatedStory] = useState(data.resonated_story || '')
  
  const stories = [
    { id: 'missed-cure', icon: '🧬', title: 'The Missed Cure', text: 'The biochemist in Seoul and the data scientist in São Paulo have the two halves of a cure for a disease. They will never meet.' },
    { id: 'burnout', icon: '🔥', title: 'The Burnout', text: 'A founder with a world-changing idea gives up not from the work, but from the crushing loneliness of the search for one trusted partner.' },
    { id: 'idle-capital', icon: '💰', title: 'The Idle Capital', text: 'Billions in funding sit searching for the very solutions that are dying from a lack of it, often just one degree of separation away.' }
  ]

  const handleStoryClick = (storyId) => {
    setResonatedStory(storyId)
    updateData('resonated_story', storyId)
  }
  return (
    <div className="onboarding-screen-base">
      <ScreenNavigation onBack={onBack} onNext={onNext} canGoBack={step > 2} />
      <div className="screen-content">
        <h1 className="screen-title">The Faces of a Multi-Trillion Dollar Failure</h1>
        <p className="screen-text" style={{ marginBottom: '24px', fontSize: '18px' }}>
          Which story resonates most with you? This helps us understand what you're facing.
        </p>
        <div className="stories-container">
          {stories.map(story => (
            <div
              key={story.id}
              className={`story-card ${resonatedStory === story.id ? 'selected' : ''}`}
              onClick={() => handleStoryClick(story.id)}
            >
              <div className="story-icon">{story.icon}</div>
              <h2 className="story-title">{story.title}</h2>
              <p className="story-text">{story.text}</p>
              {resonatedStory === story.id && (
                <div className="story-selected-badge">✓ This resonates</div>
              )}
            </div>
          ))}
        </div>
        <button className="continue-btn" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}

export default Screen9Stories

