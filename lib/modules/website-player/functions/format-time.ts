function formatTime(currentTimeInSeconds: number) {
  let seconds: string | number = Math.floor(currentTimeInSeconds)
  let minutes: string | number = Math.floor(seconds / 60)
  let hours: string | number = Math.floor(minutes / 60)

  if (seconds > 59) {
    seconds = seconds % 60
  }

  if (seconds < 10) {
    seconds = '0' + seconds
  }

  if (minutes > 59) {
    minutes = minutes % 60
  }

  if (minutes < 10) {
    minutes = '0' + minutes
  }

  let startTime = minutes.toString() + ':' + seconds.toString()

  if (hours > 0) {
    startTime = hours.toString() + ':' + startTime
  }

  return startTime
}

export default formatTime
