import { remedies } from '../constants/data'

export const getCurrentDateInFormat = () => {
  const currentDate = new Date()

  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}

export const isPreviousDate = (dateToCheck: string) => {
  const currentDate = new Date()
  const providedDate = new Date(dateToCheck)

  const isPrevious =
    providedDate.getDate() === currentDate.getDate() - 1 &&
    providedDate.getMonth() === currentDate.getMonth() &&
    providedDate.getFullYear() === currentDate.getFullYear()

  return isPrevious
}

export const pushUniqueValue = (array: string[], valueToPush: string) => {
  if (!array.includes(valueToPush)) {
    array.push(valueToPush)
  }
}

export const getRemedyList = (symptom: any) => {
  if (symptom != '') {
    return remedies.filter(
      (feedback: { symptom: string }) => feedback.symptom == symptom
    )
  } else return remedies
}

export const pushValue = (array: string[], value: string) => {
  array.push(value)
}
