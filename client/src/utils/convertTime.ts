import moment from 'moment'

export const formatTimeAgo = (timestamp: any) => {
  const now = moment()
  const commentTime = moment(timestamp)

  const diffMinutes = now.diff(commentTime, 'minutes')
  const diffHours = now.diff(commentTime, 'hours')
  const diffDays = now.diff(commentTime, 'days')
  const diffMonths = now.diff(commentTime, 'months')
  const diffYears = now.diff(commentTime, 'years')

  if (diffMinutes < 60) {
    return `${diffMinutes}m`
  } else if (diffHours < 24) {
    return `${diffHours}h`
  } else if (diffDays < 30) {
    return `${diffDays}d`
  } else if (diffMonths < 12) {
    return `${diffMonths}mo`
  } else {
    return `${diffYears}y`
  }
}

export const timestampMillis = (timestamp: any) => {
  if (timestamp != null) {
    return timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6
  } else return 0
}
