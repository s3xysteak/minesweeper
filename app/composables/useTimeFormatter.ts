interface TimeUnits {
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

export function useTimeFormatter(
  time: MaybeRefOrGetter<number | string | null | undefined>,
  opts: {
    ms?: boolean
  } = {},
) {
  const { ms = true } = opts

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
    const _t = toValue(time)
    if (typeof _t !== 'number' || _t < 0)
      return _t
    const { hours, minutes, seconds, milliseconds } = parseTime(_t)
    return `${formatNumber(hours, 2)}:${formatNumber(minutes, 2)}:${formatNumber(seconds, 2)}${ms ? `.${formatNumber(milliseconds, 3)}` : ''}`
  })

  return formatted
}
