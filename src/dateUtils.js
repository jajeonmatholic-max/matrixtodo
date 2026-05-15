/**
 * Format date to compact M/D format
 * @param {string} dateStr - ISO date string (YYYY-MM-DD) or null
 * @returns {string} - Compact date (M/D) or empty string if invalid
 */
export function formatCompactDate(dateStr) {
  if (!dateStr) return ''

  try {
    const date = new Date(dateStr + 'T00:00:00')
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}/${day}`
  } catch {
    return ''
  }
}
