import getUserLanguage from '@/app/lib/i18n/utils/getUserLanguage'

function formatRelativeDate(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()

  const diffInSeconds = Math.round((now.getTime() - date.getTime()) / 1000)
  const diffInMinutes = Math.round(diffInSeconds / 60)
  const diffInHours = Math.round(diffInMinutes / 60)
  const diffInDays = Math.round(diffInHours / 24)
  const diffInWeeks = Math.round(diffInDays / 7)
  const diffInMonths = Math.round(diffInDays / 30)

  const lang = getUserLanguage()

  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' })

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second')
  }
  else if (diffInMinutes < 60) {
    return rtf.format(-diffInMinutes, 'minute')
  }
  else if (diffInHours < 24) {
    return rtf.format(-diffInHours, 'hour')
  }
  else if (diffInDays < 7) {
    return rtf.format(-diffInDays, 'day')
  }
  else if (diffInWeeks < 4) {
    return rtf.format(-diffInWeeks, 'week')
  }
  else if (diffInMonths < 12) {
    return rtf.format(-diffInMonths, 'month')
  }
  else {
    return date.getFullYear() !== now.getFullYear()
      ? date.toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' })
      : date.toLocaleDateString(lang, { day: 'numeric', month: 'long' })
  }
}

export default formatRelativeDate
