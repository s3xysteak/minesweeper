export interface MineSweeperOptions {
  width: number
  height: number
  bombProb: number
  seed: number
}

export interface MineBlockType {
  revealed: boolean
  clickable: 'ok' | 'flag'
  type: 'normal' | 'bomb'
  bombsAround: number
}
