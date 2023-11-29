import React, { useState, useEffect } from 'react'
import {
  googleLogout,
  useGoogleLogin,
  TokenResponse,
} from '@react-oauth/google'
import axios from 'axios'
import styled from 'styled-components'

interface UserProfile {
  picture: string
  name: string
  email: string
}

interface Email {
  id: string
  subject: string
  description: string
  body: string
}

const StyledContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`

const StyledEmailList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const StyledEmailItem = styled.li`
  margin-bottom: 16px;
`

const StyledSubject = styled.h4`
  margin-bottom: 8px;
  color: #333;
`

const StyledDescription = styled.p`
  color: #666;
`

const StyledBody = styled.p`
  color: #444;
`

function App() {
  const [user, setUser] = useState<TokenResponse | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [inboxEmails, setInboxEmails] = useState<Email[]>([])

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => setUser(tokenResponse),
    onError: (error) => console.log('Login Failed:', error),
  })

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
          fetchInboxEmails()
        })
        .catch((err) => console.log(err))
    }
  }, [user])

  const fetchInboxEmails = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/gmail/v1/users/me/messages?labelIds=INBOX&maxResults=10`,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            Accept: 'application/json',
          },
        },
      )

      const emails: Email[] = response.data.messages.map((message: any) => {
        return {
          id: message.id,
          subject: '',
          body: '', // Add body property
        }
      })

      const emailsWithDetails = await Promise.all(
        emails.map(async (email) => {
          const messageDetails = await axios.get(
            `https://www.googleapis.com/gmail/v1/users/me/messages/${email.id}`,
            {
              headers: {
                Authorization: `Bearer ${user?.access_token}`,
                Accept: 'application/json',
              },
            },
          )

          const subjectHeader = messageDetails.data.payload.headers.find(
            (header: any) => header.name === 'Subject',
          )

          const body = messageDetails.data.snippet || ''

          email.subject = subjectHeader ? subjectHeader.value : 'N/A'
          email.body = body

          return email
        }),
      )

      setInboxEmails(emailsWithDetails)
    } catch (err) {
      console.error('Error fetching inbox emails:', err)
    }
  }

  const logOut = () => {
    googleLogout()
    setProfile(null)
    setInboxEmails([])
  }

  console.log(inboxEmails)
  return (
    <StyledContainer>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
          {inboxEmails.length > 0 && (
            <div>
              <h3>Inbox Emails</h3>
              <StyledEmailList>
                {inboxEmails.map((email) => (
                  <StyledEmailItem key={email.id}>
                    <li>
                      <StyledSubject>{email.subject}</StyledSubject>
                      <StyledBody>{email.body}</StyledBody>
                    </li>
                  </StyledEmailItem>
                ))}
              </StyledEmailList>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )}
    </StyledContainer>
  )
}

export default App
