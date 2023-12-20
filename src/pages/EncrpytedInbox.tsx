import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'
import { get } from '../services/api'
import { Document, Page } from 'react-pdf'

interface Email {
  id: string
  subject: string
  body: string
  payload: {
    parts: Array<{ filename: string }>
  }
}

interface EncryptedPDF {
  id: string
  url: string
}

interface EncryptedInboxProps {
  user: { access_token: string } | null
}

const StyledContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`

const StyledPDFList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const StyledPDFItem = styled.li`
  margin-bottom: 16px;
  cursor: pointer;
`

const Loader = styled.div`
  text-align: center;
  margin-top: 20px;
`

const EncryptedInbox: React.FC<EncryptedInboxProps> = ({ user }) => {
  const [encryptedPDFs, setEncryptedPDFs] = useState<EncryptedPDF[]>([])
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [noEmailsFound, setNoEmailsFound] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)

  useEffect(() => {
    fetchEncryptedPDFs()
  }, [])

  const fetchEncryptedPDFs = async () => {
    try {
      const response: { messages: Email[] } = await get(
        `users/me/messages?labelIds=INBOX`,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            Accept: 'application/json',
          },
        },
      )

      const emailsWithPDFs: EncryptedPDF[] = response.messages
        .filter((message: Email) => {
          // Check if the email subject or body is defined
          const subject = message.subject?.toLowerCase() || ''
          const body = message.body?.toLowerCase() || ''

          // Check if the email subject or body contains 'credit card'
          const hasCreditCardKeyword =
            subject.includes('credit card') || body.includes('credit card')

          // Check if there are any attachments in the email
          const hasAttachments =
            message.payload &&
            message.payload.parts &&
            message.payload.parts.length > 0

          return hasCreditCardKeyword && hasAttachments
        })
        .map((message: Email) => {
          return {
            id: message.id,
            url: message.payload.parts[0]?.filename || '', // Replace with the actual URL of the PDF
          }
        })

      if (emailsWithPDFs.length === 0) {
        setNoEmailsFound(true)
      }

      setEncryptedPDFs(emailsWithPDFs)
      setLoading(false)
    } catch (err) {
      console.error(
        'Error fetching emails with PDFs and credit card keyword:',
        err,
      )
      setLoading(false)
    }
  }

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    // Handle successful loading of the PDF document
    console.log(`Document loaded with ${numPages} page(s).`)
  }

  const onSelectEmail = (email: Email) => {
    setSelectedEmail(email)
  }

  return (
    <StyledContainer>
      <h3>Encrypted PDFs</h3>
      {loading && <Loader>Loading...</Loader>}
      {!loading && noEmailsFound && <p>No encrypted PDFs found.</p>}
      {!loading && !noEmailsFound && (
        <div>
          <StyledPDFList>
            {encryptedPDFs.map((pdf) => (
              <StyledPDFItem
                key={pdf.id}
                onClick={() => {
                  setPageNumber(1)
                  setSelectedEmail(null)
                }}
              >
                <Document file={pdf.url} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} />
                </Document>
              </StyledPDFItem>
            ))}
          </StyledPDFList>
          {selectedEmail && (
            <div>
              <h4>Email Details</h4>
              <p>
                <strong>Subject:</strong> {selectedEmail.subject || 'N/A'}
              </p>
              <p>
                <strong>Body:</strong> {selectedEmail.body || 'N/A'}
              </p>
            </div>
          )}
        </div>
      )}
    </StyledContainer>
  )
}

export default EncryptedInbox
