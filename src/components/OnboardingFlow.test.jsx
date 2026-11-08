import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import OnboardingFlow from './OnboardingFlow'

describe('OnboardingFlow', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('starts at the first step with an accessible progressbar', () => {
    render(<OnboardingFlow onComplete={() => {}} />)
    expect(screen.getByText(/step 1 of 23/i)).toBeInTheDocument()
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '1')
    expect(bar).toHaveAttribute('aria-valuemax', '23')
  })

  it('resumes from persisted progress instead of restarting', () => {
    window.localStorage.setItem(
      'propel_onboarding_v1',
      JSON.stringify({ currentStep: 10, data: {} })
    )
    render(<OnboardingFlow onComplete={() => {}} />)
    // internal step 10 -> displayed step 9 of 23
    expect(screen.getByText(/step 9 of 23/i)).toBeInTheDocument()
  })

  it('ignores corrupt persisted state and starts fresh', () => {
    window.localStorage.setItem('propel_onboarding_v1', '{not valid json')
    render(<OnboardingFlow onComplete={() => {}} />)
    expect(screen.getByText(/step 1 of 23/i)).toBeInTheDocument()
  })
})
