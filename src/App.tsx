import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { googleLogout, TokenResponse } from '@react-oauth/google'
import Inbox from './pages/Inbox'
import GoogleLoginButton from './components/Login/GoogleLoginButton'
import ProfileDropdown from './components/ProfileDropdown/ProfileDropdown'
import EncryptedInbox from './pages/EncrpytedInbox'

interface UserProfile {
  picture: string
  name: string
  email: string
}

const Container = styled.div`
  position: relative;
  text-align: center;
  margin: 20px;
`

const App: React.FC = () => {
  const [user, setUser] = useState<TokenResponse | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          },
        )
        .then((res) => {
          setProfile(res.data)
        })
        .catch((err) => console.log(err))
    }
  }, [user])

  const logOut = () => {
    googleLogout()
    setProfile(null)
  }

  return (
    <Container>
      <h2>Due-Dash</h2>
      {profile ? (
        <div>
          <br />
          <ProfileDropdown profile={profile} onLogout={logOut} />
          {/* <Inbox user={user} /> */}
          <EncryptedInbox user={user} />
        </div>
      ) : (
        <GoogleLoginButton
          onSuccess={(tokenResponse) => setUser(tokenResponse)}
          onError={(error) => console.log('Login Failed:', error)}
        />
      )}
    </Container>
  )
}

export default App
