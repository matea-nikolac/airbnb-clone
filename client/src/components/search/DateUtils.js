import { parseISO } from 'date-fns'

// handle the start date search
export const handleStartDateInputChange = (
  date,
  setSelectedStartDate,
  setSelectedDatesArray
) => {
  if (date !== null) {
    // Parse the selected date to ensure it is represented as a JavaScript Date object
    // `date.toISOString()` converts the selected date to an ISO 8601 string
    // `parseISO` then parses this string into a JavaScript Date object for consistent handling
    const startDate = parseISO(date.toISOString())
    setSelectedStartDate(startDate)
  } else {
    setSelectedStartDate('')
    setSelectedDatesArray('')
  }
}
// handle the end date search
export const handleEndDateInputChange = (
  date,
  setSelectedEndDate,
  setSelectedDatesArray
) => {
  if (date !== null) {
    const endDate = parseISO(date.toISOString())
    setSelectedEndDate(endDate)
  } else {
    setSelectedEndDate('')
    setSelectedDatesArray([])
  }
}
