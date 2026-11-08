import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the landing page first', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /start onboarding/i })).toBeInTheDocument()
  })

  it('enters the onboarding flow when Start Onboarding is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /start onboarding/i }))
    // The onboarding flow is code-split, so wait for it to load. It shows a
    // progress indicator ("Step X of Y") and an accessible progressbar.
    expect(await screen.findByText(/step \d+ of \d+/i)).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
