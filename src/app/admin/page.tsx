'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AuthCheck from '@/components/auth-check'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    const role = localStorage.getItem('user-role')
    if (!token || role !== 'admin') {
      router.push('/login?error=admin-required')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user-role')
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    document.cookie = 'user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
  }

  return (
    <AuthCheck requiredRole="admin">
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Admin Dashboard</h1>
        <p>This is a protected admin page.</p>
        <p>Only users with admin role can access this.</p>
        <br/>
        <button onClick={handleLogout} style={{ padding: '10px 20px' }}>
          Logout
        </button>
        <br/><br/>
        <a href="/user" style={{ color: 'blue' }}>Go to User Page</a>
      </div>
    </AuthCheck>
  )
}