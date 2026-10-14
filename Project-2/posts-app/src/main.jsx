import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { PostsProvider } from './context/PostsContext'
import './index.css'

// Yaha app ko render kiya ha root div ke andar
// Providers theme, login aur posts ka data poori app ko dete hain
// ErrorBoundary sab se bahar ha taake andar ka koi bhi error pakad sake
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <PostsProvider>
              <App />
            </PostsProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
