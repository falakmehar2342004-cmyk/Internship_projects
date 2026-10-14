import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Yaha login ke baad wohi page khulta ha jahan user jana chahta tha, warna /posts
  const redirectTo = location.state?.from || '/posts'

  function handleSubmit(e) {
    e.preventDefault()

    // Yaha username khali ho to error dikhate hain
    if (!username.trim()) {
      setError('Please enter a username.')
      return
    }

    // Yaha login karwa ke user ko aage bhej dete hain
    login(username.trim())
    navigate(redirectTo, { replace: true })
  }

  return (
    <section>
      <h2>Login</h2>
      <p>Demo login: any username works. Required to open "Add Post".</p>

      <form className="form" onSubmit={handleSubmit}>
        <label>Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. alice" />
          {error && <span className="error">{error}</span>}
        </label>
        <button className="btn">Login</button>
      </form>
    </section>
  )
}
