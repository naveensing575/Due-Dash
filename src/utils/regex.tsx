
export const execRegex = (regex: RegExp, text: string) => {
  const match = regex.exec(text)
  return match ? match[1] : null
}
