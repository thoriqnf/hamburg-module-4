'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AuthCheckProps {
  children: React.ReactNode
  requiredRole?: 'user' | 'admin'
}

export default function AuthCheck({ children, requiredRole = 'user' }: AuthCheckProps) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    const role = localStorage.getItem('user-role')

    if (!token) {
      router.push('/login?error=login-required')
      return
    }

    if (requiredRole === 'admin' && role !== 'admin') {
      router.push('/login?error=admin-required')
      return
    }
  }, [router, requiredRole])

  return <>{children}</>
}