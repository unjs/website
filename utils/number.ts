/**
 * Format number using k, m, M to have the shortest possible string.
 */
export function formatNumber(value: number): string {
  if (value < 1e3)
    return value.toString()

  if (value < 1e6)
    return `${(value / 1e3).toFixed(1)}k`

  if (value < 1e9)
    return `${(value / 1e6).toFixed(1)}m`

  if (value < 1e12)
    return `${(value / 1e9).toFixed(1)}M`

  return value.toString()
}
