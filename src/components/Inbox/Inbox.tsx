import React, { useState, useEffect } from 'react'
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
  body: string
}

interface InboxProps {
  user: { access_token: string } | null
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

const StyledBody = styled.p`
  color: #444;
`

const Inbox: React.FC<InboxProps> = ({ user }) => {
  const [inboxEmails, setInboxEmails] = useState<Email[]>([])

  useEffect(() => {
    fetchInboxEmails()
  }, [user])

  const fetchInboxEmails = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/gmail/v1/users/me/messages?labelIds=INBOX`,
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

      // Filter emails containing the keyword "credit"
      const creditEmails = emailsWithDetails.filter((email) =>
        email.body.toLowerCase().includes('credit'),
      )

      setInboxEmails(creditEmails)
    } catch (err) {
      console.error('Error fetching inbox emails:', err)
    }
  }

  console.log(inboxEmails)

  return (
    <StyledContainer>
      {inboxEmails.length > 0 && (
        <div>
          <h3>Inbox Emails</h3>
          <StyledEmailList>
            {inboxEmails.map((email) => (
              <StyledEmailItem key={email.id}>
                <StyledSubject>{email.subject}</StyledSubject>
                <StyledBody>{email.body}</StyledBody>
              </StyledEmailItem>
            ))}
          </StyledEmailList>
        </div>
      )}
    </StyledContainer>
  )
}

export default Inbox
