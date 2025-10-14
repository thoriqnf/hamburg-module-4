'use client'

import { useAuth } from '@/context/AuthContext'
import AuthCheck from '@/components/auth-check'

export default function AdminPage() {
  const { user, logout, isLoading } = useAuth()

  return (
    <AuthCheck requiredRole="admin">
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Admin Dashboard</h1>

        {user && (
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'left',
            maxWidth: '600px',
            margin: '0 auto 20px'
          }}>
            <h3>Admin Profile</h3>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Role:</strong> <span style={{ color: '#d97706', fontWeight: 'bold' }}>ADMIN</span></p>

            {user.image && (
              <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <img
                  src={user.image}
                  alt="Profile"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            )}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <p>This is a protected admin page.</p>
          <p>Only users with admin privileges can access this dashboard.</p>
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

          <a
            href="/user"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#059669',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            Go to User Page
          </a>
        </div>

        <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
          <p>🔒 Protected Route - Admin Access Required</p>
          <p>👤 Logged in as: {user?.username}</p>
        </div>
      </div>
    </AuthCheck>
  )
}