'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const errorParam = searchParams.get('error')
    if (errorParam === 'admin-required') {
      setError('Admin access required')
    } else if (errorParam === 'login-required') {
      setError('Please login')
    }

    const token = localStorage.getItem('auth-token')
    const savedRole = localStorage.getItem('user-role')
    if (token && savedRole) {
      const redirect = searchParams.get('redirect') || (savedRole === 'admin' ? '/admin' : '/user')
      router.push(redirect)
    }
  }, [searchParams, router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (username === 'user' && password === 'user') {
      const mockToken = `mock-token-${Date.now()}`
      localStorage.setItem('auth-token', mockToken)
      localStorage.setItem('user-role', 'user')
      document.cookie = `auth-token=${mockToken}; path=/; max-age=3600`
      document.cookie = `user-role=user; path=/; max-age=3600`
      router.push(searchParams.get('redirect') || '/user')
    } else if (username === 'admin' && password === 'admin') {
      const mockToken = `mock-token-${Date.now()}`
      localStorage.setItem('auth-token', mockToken)
      localStorage.setItem('user-role', 'admin')
      document.cookie = `auth-token=${mockToken}; path=/; max-age=3600`
      document.cookie = `user-role=admin; path=/; max-age=3600`
      router.push(searchParams.get('redirect') || '/admin')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Login</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleLogin} style={{ maxWidth: '300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username:</label><br/>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label><br/>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
            required
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>
          Login
        </button>
      </form>

      <p style={{ marginTop: '20px', fontSize: '12px' }}>
        Use: user/user or admin/admin
      </p>
    </div>
  )
}