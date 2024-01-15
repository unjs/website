export function getCurrentMonth() {
  const now = new Date()

  return now.getMonth() + 1
}

export function getCurrentYear() {
  const now = new Date()

  return now.getFullYear()
}
