export function shuffle<T>(arr: readonly T[], rand: (start: number, end: number) => number): T[] {
  const val = [...arr]
  const len = val.length
  for (let i = len - 1; i >= 0; i--) {
    const j = rand(0, i)
    ;[val[j], val[i]] = [val[i]!, val[j]!]
  }
  return val
}

export function shuffle2D<T>(arr: readonly T[][], rand: (start: number, end: number) => number): T[][] {
  let cursor = 0
  const newArr = shuffle(arr.flat(), rand)

  return arr.map(list => newArr.slice(cursor, cursor += list.length))
}
