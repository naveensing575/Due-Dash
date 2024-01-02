// AuthContext.tsx

import React, { createContext, useContext, useState } from 'react'

export interface User {
  uid: string
  email: string
  fullName?: string
  profilePictureUrl?: string
}

interface AuthContextType {
  user: User | null
  uid: string | null
  signIn: (userData: {
    id: string
    uid: string
    email: string
    fullName: string
    phoneNumber: string
    dob: string
    profilePictureUrl?: string
  }) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [uid, setUid] = useState<string | null>(null)

  const signIn = (userData: {
    id: string
    uid: string
    email: string
    fullName: string
    phoneNumber: string
    dob: string
    profilePictureUrl?: string
  }) => {
    setUser({
      uid: userData.uid,
      email: userData.email,
      fullName: userData.fullName,
      profilePictureUrl: userData.profilePictureUrl,
    })
    setUid(userData.uid)

    if ('displayName' in userData) {
      console.log('Display Name:', userData.displayName)
    }
  }

  const signOut = () => {
    setUser(null)
    setUid(null)
  }

  const contextValue: AuthContextType = {
    user,
    uid,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
