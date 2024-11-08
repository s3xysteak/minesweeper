import type rand from 'twistrand'
import type { MineBlockType } from '~/components/types'
import { shuffle2D } from './algorithm'

export interface MinesweeperOptions {
  height: number
  width: number
  mineCount: number
}

export function createMines(mt: ReturnType<typeof rand>, opts: MinesweeperOptions): (MineBlockType & { col: number, row: number })[][] {
  const {
    height,
    width,
    mineCount,
  } = opts

  let _mineSpawnCount = 0

  const mineTable = shuffle2D(
    Array.from({ length: height }, () => Array.from({ length: width }, () => mineCount > _mineSpawnCount++)),
    (min, max) => mt.randomInt(min, max),
  )

  const offset = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ]

  return mineTable.map((row, rowIndex) =>
    row.map((isMine, colIndex) => (<MineBlockType & { col: number, row: number }>{
      col: colIndex,
      row: rowIndex,
      type: isMine ? 'bomb' : 'normal',
      revealed: false,
      clickable: 'ok',
      bombsAround: offset.reduce((acc, val) => {
        const { x, y } = val
        return mineTable?.[rowIndex + x]?.[colIndex + y] ? acc + 1 : acc
      }, 0),
    })))
}
