import { Component } from 'react'

/**
 * Top-level error boundary. Catches render/lifecycle errors anywhere in the
 * onboarding tree so a single broken screen shows a recoverable fallback
 * instead of a blank white page.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // In production this is where you'd forward to an error-reporting service.
    // Keep it to console for now so nothing is silently swallowed.
    console.error('Onboarding crashed:', error, info?.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="error-boundary">
          <h1>Something went wrong.</h1>
          <p>We hit an unexpected error. Your progress in this session may be lost.</p>
          <button type="button" onClick={this.handleReset}>
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
