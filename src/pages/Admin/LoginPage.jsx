import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { TEMPORARY_MOCK_ADMIN_CREDENTIALS } from '../../constants/auth'
import { useAuth } from '../../hooks/useAuth'
import { useSeo } from '../../hooks/useSeo'
import './LoginPage.css'

const initialCredentials = {
  email: '',
  password: '',
}

export function LoginPage() {
  const [credentials, setCredentials] = useState(initialCredentials)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { isAuthenticated, login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useSeo({
    title: 'Admin Login | OMProperties',
    description: 'Login to the OMProperties admin panel.',
  })

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const updateCredentials = (event) => {
    setCredentials((current) => ({ ...current, [event.target.name]: event.target.value }))
    setError('')
  }

  const submitLogin = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      await login(credentials)
      navigate(location.state?.from || '/admin', { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="admin-auth-page">
      <form className="admin-auth-card" onSubmit={submitLogin}>
        <p className="eyebrow">Secure Admin Access</p>
        <h1>OMProperties Login</h1>
        <label>
          Email
          <input
            name="email"
            value={credentials.email}
            onChange={updateCredentials}
            placeholder={TEMPORARY_MOCK_ADMIN_CREDENTIALS.email}
            type="email"
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            value={credentials.password}
            onChange={updateCredentials}
            placeholder="Temporary admin password"
            type="password"
            required
          />
        </label>
        {error && <p className="admin-auth-error">{error}</p>}
        <button className="button primary" type="submit" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </section>
  )
}
