// AuthContext.tsx

import React, { createContext, useContext, useState } from 'react'

export interface User {
  id: string
  email: string
  fullName?: string
  pictureUrl?: string
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
    pictureUrl?: string
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
    pictureUrl?: string // Include the pictureUrl property in the signIn method
  }) => {
    setUser({
      id: userData.uid,
      email: userData.email,
      fullName: userData.fullName,
      pictureUrl: userData.pictureUrl, // Assign the pictureUrl if provided
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

  console.log(user, ' user ')
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
