import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import ErrorBoundary from './ErrorBoundary'

function Boom() {
  throw new Error('kaboom')
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Suppress the expected React error logging for the thrown error.
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <p>All good</p>
      </ErrorBoundary>
    )
    expect(screen.getByText('All good')).toBeInTheDocument()
  })

  it('renders a recoverable fallback when a child throws', () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    )
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
  })
})
