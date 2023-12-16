import { Buffer } from 'buffer'

export const decodeBase64 = (base64String: string): string => {
  // Convert base64 to a Buffer
  const buffer = Buffer.from(base64String, 'base64')

  // Convert Buffer to a string
  return buffer.toString('utf-8')
}
