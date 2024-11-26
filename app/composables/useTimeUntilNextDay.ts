export function useTimeUntilNextDay() {
  const time = ref<number>()
  useRafFn(() => time.value = getMsUntilUTC0())

  const formatted = useTimeFormatter(time, { ms: false })

  return formatted
}

function getMsUntilUTC0() {
  const now = new Date()
  const utcMidnight = new Date(now)

  utcMidnight.setUTCHours(24, 0, 0, 0)

  return utcMidnight.getTime() - now.getTime()
}
