function toDate(date: string | Date | number) {
  return new Date(date)
}

export function toLocaleDateString(date: string | Date | number) {
  return toDate(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function toISODateString(date: string | Date | number) {
  return toDate(date).toISOString()
}
