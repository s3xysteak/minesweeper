interface TimeUnits {
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

export function useTimeFormatter(time: Ref<number>) {
  const parseTime = (ms: number): TimeUnits => {
    const milliseconds = Math.floor(ms % 1000)
    const totalSeconds = Math.floor(ms / 1000)
    const seconds = totalSeconds % 60
    const totalMinutes = Math.floor(totalSeconds / 60)
    const minutes = totalMinutes % 60
    const hours = Math.floor(totalMinutes / 60)

    return { hours, minutes, seconds, milliseconds }
  }

  const formatNumber = (num: number, digits: number): string => {
    return num.toString().padStart(digits, '0')
  }

  const formatted = computed(() => {
    const { hours, minutes, seconds, milliseconds } = parseTime(time.value)
    return `${formatNumber(hours, 2)}:${formatNumber(minutes, 2)}:${formatNumber(seconds, 2)}.${formatNumber(milliseconds, 3)}`
  })

  return formatted
}
