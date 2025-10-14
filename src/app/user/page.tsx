'use client'

import { useAuth } from '@/context/AuthContext'
import AuthCheck from '@/components/auth-check'

export default function UserPage() {
  const { user, userRole, logout } = useAuth()

  return (
    <AuthCheck requiredRole="user">
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>User Dashboard</h1>

        {user && (
          <div style={{
            backgroundColor: '#f0f9ff',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'left',
            maxWidth: '600px',
            margin: '0 auto 20px'
          }}>
            <h3>User Profile</h3>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Role:</strong> <span style={{
              color: userRole === 'admin' ? '#d97706' : '#059669',
              fontWeight: 'bold'
            }}>
              {userRole?.toUpperCase()}
            </span></p>

            {user.image && (
              <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <img
                  src={user.image}
                  alt="Profile"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: userRole === 'admin' ? '3px solid #d97706' : '3px solid #059669'
                  }}
                />
              </div>
            )}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <p>This is a protected user page.</p>
          <p>Any logged-in user can access this dashboard.</p>

          {userRole === 'admin' && (
            <div style={{
              backgroundColor: '#fef3c7',
              border: '1px solid #f59e0b',
              borderRadius: '4px',
              padding: '10px',
              margin: '15px 0'
            }}>
              <p>👑 <strong>Admin Access Detected:</strong> You have elevated privileges!</p>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={logout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>

          {userRole === 'admin' && (
            <a
              href="/admin"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#d97706',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px'
              }}
            >
              Go to Admin Page
            </a>
          )}

          <a
            href="/"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#6b7280',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            Go Home
          </a>
        </div>

        <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
          <p>🔒 Protected Route - User Authentication Required</p>
          <p>👤 Logged in as: {user?.username} ({userRole})</p>
        </div>
      </div>
    </AuthCheck>
  )
}