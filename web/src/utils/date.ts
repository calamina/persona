export const useDateFormat = (date: string) => {
  const dateObject = new Date(date)
  const secondsDiff = Math.round((dateObject.getTime() - Date.now()) / 1000)

  const unitsInSec = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity]
  const unitStrings: Intl.RelativeTimeFormatUnit[] = [
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year',
  ]

  const unitIndex = unitsInSec.findIndex((cutoff) => cutoff > Math.abs(secondsDiff))
  const divisor = unitIndex ? unitsInSec[unitIndex - 1] : 1

  const rtf = new Intl.RelativeTimeFormat('en', {
    localeMatcher: 'best fit',
    numeric: 'always',
    style: 'narrow',
  })

  const relativeTime = rtf
    .format(Math.floor(secondsDiff / (divisor ?? 1)), unitStrings[unitIndex] ?? 'day')
    .replace(' ago', '')

  return relativeTime
}
