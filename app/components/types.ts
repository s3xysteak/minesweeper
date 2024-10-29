export interface MineSweeperOptions {
  width: number
  height: number
  bombProb: number
}

export interface MineBlockType {
  faceup: boolean
  clickable: 'ok' | 'flag'
  type: 'normal' | 'bomb'
  bombsAround: number
}
