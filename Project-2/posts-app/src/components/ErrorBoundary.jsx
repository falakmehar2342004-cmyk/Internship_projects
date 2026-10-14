import { Component } from 'react'

// Yaha class component ha kyun ke Error Boundary sirf class se banta ha
// Agar koi child crash ho to blank page ki jagah ye friendly screen dikhata ha
export default class ErrorBoundary extends Component {
  state = { hasError: false }

  // Yaha React ye function tab chalata ha jab koi child error throw kare
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    // Yaha error aaya to fallback UI dikhate hain
    if (this.state.hasError) {
      return (
        <div className="fallback">
          <h2>Something went wrong 😕</h2>
          <p>An unexpected error occurred.</p>
          <button className="btn" onClick={() => window.location.assign('/')}>Back to Home</button>
        </div>
      )
    }

    // Yaha error nahi aaya to app normal dikhti ha
    return this.props.children
  }
}
