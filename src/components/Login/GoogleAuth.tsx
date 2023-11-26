import React, { useState } from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import axios from 'axios'

const EmailInbox: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  const [emails, setEmails] = useState<any[]>([])

  const getEmailsFromGmail = async () => {
    try {
      // Make a request to the Gmail API
      const response = await axios.get(
        'https://www.googleapis.com/gmail/v1/users/me/messages',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      // Handle the Gmail data response
      setEmails(response.data.messages || [])

      console.log('Gmail data:', response.data)
    } catch (error) {
      console.error('Error fetching Gmail data:', error)
    }
  }

  return (
    <div>
      <button onClick={getEmailsFromGmail}>Get Emails</button>
      <ul>
        {emails.map((email) => (
          <li key={email.id}>{email.subject}</li>
        ))}
      </ul>
    </div>
  )
}

const GoogleAuth: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const clientID = process.env.REACT_APP_CLIENT_ID

  const handleLoginSuccess = (response: any) => {
    setAccessToken(response.accessToken)
    console.log('Login successful', response)
  }

  const handleLoginError = () => {
    console.log('Login failed')
  }

  const handleLogoutSuccess = () => {
    googleLogout() // Perform the logout logic
    setAccessToken(null) // Reset the access token
  }

  return (
    <div>
      {accessToken ? (
        <div>
          <p>Welcome! You are logged in.</p>
          <button onClick={handleLogoutSuccess}>Logout</button>
          <EmailInbox accessToken={accessToken} />
        </div>
      ) : (
        <GoogleLogin
          // clientId={clientID || ''}
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          // isSignedIn
          // scope="https://www.googleapis.com/auth/gmail.readonly"
        />
      )}
    </div>
  )
}

export default GoogleAuth
