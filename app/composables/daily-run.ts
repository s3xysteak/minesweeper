interface DailyRunData {
  time?: number
  date: string
}

export function useDailyRunData() {
  const KEY = 'daily-run'

  const getter = () => JSON.parse(localStorage.getItem(KEY) ?? '[]') as DailyRunData[]
  const setter = (val: DailyRunData) => {
    const raw = getter()
    raw.push(val)
    localStorage.setItem(KEY, JSON.stringify(raw))
  }
  return [
    getter,
    setter,
  ] as const
}

export function useDailyRunToday(today: MaybeRefOrGetter<string | undefined>) {
  const isMounted = useMounted()
  const [data, addData] = useDailyRunData()

  return [
    () => isMounted.value ? data().find(({ date }) => date === toValue(today)) : undefined,
    (time?: number) => {
      const _today = toValue(today)
      if (!_today)
        return
      addData({ time, date: _today })
    },
  ] as const
}
