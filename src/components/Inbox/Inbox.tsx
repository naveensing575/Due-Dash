import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useAuth } from '../../context/AuthContext'
import { decodeBase64 } from '../../utils/decode'
import Card from '../CreditCard/Card'

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

interface CardInfo {
  cardName: string
  cardNumber: string
  bankName: string
  amountDue: number
  dueDate: string
  billingCycle: string
  billingDate: string
  totalAmountDue: string
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
  const { user: userProfile } = useAuth()

  useEffect(() => {
    if (userProfile) {
      fetchInboxEmails()
    }
  }, [userProfile])

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
          body: '',
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

          // Decoding the base64 encoded body
          const body = decodeBase64(
            messageDetails.data.payload.parts[0]?.body.data || '',
          )

          email.subject = subjectHeader ? subjectHeader.value : 'N/A'
          email.body = body

          return email
        }),
      )

      // Filter emails with "Credit Card" in the subject
      const filteredEmails = emailsWithDetails.filter((email) =>
        email.subject.toLowerCase().includes('credit card'),
      )

      setInboxEmails(filteredEmails)
    } catch (err) {
      console.error('Error fetching inbox emails:', err)
    }
  }

  const extractCardInfo = (body: string): CardInfo | null => {
    // Regular expressions for card details
    const cardNameRegex = /Card\s*Name:\s*([\s\S]+?)(?=Card\s*Number:)/i
    const cardNumberRegex = /Card\s*Number:\s*(\*{4} \*{4} \*{4} \d{4})/i
    const billingCycleRegex =
      /Billing\s*Cycle:\s*([\s\S]+?)(?=Billing\s*Date:)/i
    const billingDateRegex =
      /Billing\s*Date:\s*([\s\S]+?)(?=Minimum\s*Payment\s*Due:)/i
    const totalAmountDueRegex = /Total\s*Amount\s*Due:\s*\$([\d.]+)/i
    const bankNameRegex = /\b([A-Z]{3,})\s*Bank\b/

    // Helper function to perform regex matching with exec
    const execRegex = (regex: RegExp, text: string) => {
      const match = regex.exec(text)
      return match ? match[1] : null
    }

    // Match card details using exec
    const cardName = execRegex(cardNameRegex, body)
    const cardNumber = execRegex(cardNumberRegex, body)
    const billingCycle = execRegex(billingCycleRegex, body)
    const billingDate = execRegex(billingDateRegex, body)
    const totalAmountDue = execRegex(totalAmountDueRegex, body)
    const bankNameMatch = execRegex(bankNameRegex, body)

    if (
      cardName &&
      cardNumber &&
      billingCycle &&
      billingDate &&
      totalAmountDue &&
      bankNameMatch
    ) {
      const [billingCycleStart, billingCycleEnd] = billingCycle.split('-')
      const billingDateParts = billingDate.split(' ')
      const billingDay = parseInt(billingDateParts[1], 10)

      // Assuming billingCycleStart and billingCycleEnd are day numbers (e.g., 1-15)
      const dueDay =
        billingDay <= parseInt(billingCycleStart, 10)
          ? parseInt(billingCycleStart, 10)
          : parseInt(billingCycleEnd, 10)

      // Assuming the billing month is the current month
      const dueDate = new Date()
      dueDate.setDate(dueDay)

      return {
        cardName: cardName.trim(),
        cardNumber: cardNumber.trim(),
        bankName: bankNameMatch.trim(),
        amountDue: parseFloat(totalAmountDue),
        dueDate: dueDate.toDateString(), // Update with the actual due date
        billingCycle: billingCycle.trim(),
        billingDate: billingDate.trim(),
        totalAmountDue: totalAmountDue.trim(),
      }
    }

    return null
  }

  return (
    <StyledContainer>
      {inboxEmails.length > 0 ? (
        <div>
          <h3>Credit Cards</h3>
          <StyledEmailList>
            {inboxEmails.map((email) => {
              const cardInfo = extractCardInfo(email.body)
              if (cardInfo) {
                return (
                  <StyledEmailItem key={email.id}>
                    <StyledSubject>{cardInfo.cardName}</StyledSubject>
                    {/* Display the Card component with cardInfo */}
                    <Card {...cardInfo} />
                  </StyledEmailItem>
                )
              }

              return null
            })}
          </StyledEmailList>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </StyledContainer>
  )
}

export default Inbox
