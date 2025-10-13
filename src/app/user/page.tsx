'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AuthCheck from '@/components/auth-check'

export default function UserPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    const role = localStorage.getItem('user-role')
    if (!token || !role) {
      router.push('/login?error=login-required')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user-role')
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    document.cookie = 'user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
  }

  const role = localStorage.getItem('user-role')

  return (
    <AuthCheck requiredRole="user">
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>User Dashboard</h1>
        <p>This is a protected user page.</p>
        <p>Any logged-in user can access this.</p>
        <br/>
        <button onClick={handleLogout} style={{ padding: '10px 20px' }}>
          Logout
        </button>
        <br/><br/>
        {role === 'admin' && (
          <div>
            <p>You are an admin user!</p>
            <a href="/admin" style={{ color: 'blue', marginRight: '20px' }}>Go to Admin Page</a>
          </div>
        )}
        <a href="/" style={{ color: 'blue' }}>Go Home</a>
      </div>
    </AuthCheck>
  )
}