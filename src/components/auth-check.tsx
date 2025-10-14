'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

interface AuthCheckProps {
  children: React.ReactNode
  requiredRole?: 'user' | 'admin'
}

export default function AuthCheck({
  children,
  requiredRole = 'user'
}: AuthCheckProps) {
  const router = useRouter()
  const { isAuthenticated, userRole, isLoading } = useAuth()

  // Show loading state
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px'
      }}>
        Loading...
      </div>
    )
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  // Wrong role - redirect to login
  if (requiredRole === 'admin' && userRole !== 'admin') {
    router.push('/login')
    return null
  }

  // Authenticated with correct role - render children
  return <>{children}</>
}