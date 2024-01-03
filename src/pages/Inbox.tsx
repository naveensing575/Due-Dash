import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth, User } from '../context/AuthContext'
import { decodeBase64 } from '../utils/decode'
import Card from '../components/CreditCard/Card'
import { get } from '../services/api'

interface Email {
  id: string
  subject: string
  body: string
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

const Inbox: React.FC = () => {
  const [inboxEmails, setInboxEmails] = useState<any[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchInboxEmails()
    }
  }, [user])

  const fetchInboxEmails = async () => {
    try {
      const response: { messages: any[] } = await get(
        `users/me/messages?labelIds=INBOX`,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            Accept: 'application/json',
          },
        },
      )

      const emails: any[] = response.messages.map((message: any) => ({
        id: message.id,
        subject: '',
        body: '',
      }))

      const emailsWithDetails = await Promise.all(
        emails.map(async (email) => {
          const messageDetails: {
            payload: { headers: any[]; parts: { body: { data: string } }[] }
          } = await get(`users/me/messages/${email.id}`, {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
              Accept: 'application/json',
            },
          })

          const subjectHeader = messageDetails.payload.headers.find(
            (header: any) => header.name === 'Subject',
          )

          const body = decodeBase64(
            messageDetails.payload.parts[0]?.body.data || '',
          )

          email.subject = subjectHeader ? subjectHeader.value : 'N/A'
          email.body = body

          return email
        }),
      )

      const filteredEmails = emailsWithDetails.filter((email) =>
        email.subject.toLowerCase().includes('credit card'),
      )

      setInboxEmails(filteredEmails)
    } catch (err) {
      console.error('Error fetching inbox emails:', err)
    }
  }

  const extractCardInfo = (body: string): CardInfo | null => {
    const cardNameRegex = /Card\s*Name:\s*([\s\S]+?)(?=Card\s*Number:)/i
    const cardNumberRegex = /Card\s*Number:\s*(\*{4} \*{4} \*{4} \d{4})/i
    const billingCycleRegex =
      /Billing\s*Cycle:\s*([\s\S]+?)(?=Billing\s*Date:)/i
    const billingDateRegex =
      /Billing\s*Date:\s*([\s\S]+?)(?=Minimum\s*Payment\s*Due:)/i
    const totalAmountDueRegex = /Total\s*Amount\s*Due:\s*\$([\d.]+)/i
    const bankNameRegex = /\b([A-Z]{3,})\s*Bank\b/

    const execRegex = (regex: RegExp, text: string) => {
      const match = regex.exec(text)
      return match ? match[1] : null
    }

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

      const dueDay =
        billingDay <= parseInt(billingCycleStart, 10)
          ? parseInt(billingCycleStart, 10)
          : parseInt(billingCycleEnd, 10)

      const dueDate = new Date()
      dueDate.setDate(dueDay)

      return {
        cardName: cardName.trim(),
        cardNumber: cardNumber.trim(),
        bankName: bankNameMatch.trim(),
        amountDue: parseFloat(totalAmountDue),
        dueDate: dueDate.toDateString(),
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
              return (
                cardInfo && (
                  <StyledEmailItem key={email.id}>
                    <StyledSubject>{cardInfo.cardName}</StyledSubject>
                    <Card {...cardInfo} />
                  </StyledEmailItem>
                )
              )
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
