export const calculateDaysLeft = (dueDate: string): number => {
  const currentDate = new Date()
  const dueDateTime = new Date(dueDate)
  const timeDifference = dueDateTime.getTime() - currentDate.getTime()
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
  return daysLeft > 0 ? daysLeft : 0
}
