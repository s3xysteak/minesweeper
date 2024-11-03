<script setup lang="ts">
import type { MineBlockType, MineSweeperOptions } from './types'
import rand from 'twistrand'

const { options } = defineProps<{
  options: MineSweeperOptions
}>()
const emit = defineEmits<{
  start: []
  end: []
}>()
const bombCount = ref(0)

const safeCardCount = computed(() => options.width * options.height - bombCount.value)
const faceupSafeCardCount = ref(0)

const flagBombCardCount = ref(0)

const isEnd = ref(false)
const isWin = computed(() =>
  faceupSafeCardCount.value === safeCardCount.value
  && flagBombCardCount.value === bombCount.value)
watchEffect(() => {
  if (isWin.value) {
    isEnd.value = true
  }
})

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

const state = ref<Array<MineBlockType & { row: number, col: number }>[]>()

function init() {
  bombCount.value = 0
  faceupSafeCardCount.value = 0
  flagBombCardCount.value = 0
  isEnd.value = false

  const mt = rand(options.seed)

  state.value = Array.from({ length: options.height }).map(
    (_, rowIndex) =>
      Array.from({ length: options.width }).map<MineBlockType & { row: number, col: number }>((_, colIndex) => {
        const type = mt.random() > options.bombProb ? 'normal' : 'bomb'
        type === 'bomb' && bombCount.value++
        return {
          col: colIndex,
          row: rowIndex,
          faceup: false,
          type,
          clickable: 'ok',
          bombsAround: 0,
        }
      }),
  )

  state.value.forEach((rows) => {
    rows.forEach((block) => {
      const x = Number(block.row)
      const y = Number(block.col)

      let count = 0

      const { height, width } = options

      offset.forEach((i) => {
        const neighborX = x + i.x
        const neighborY = y + i.y

        if (
          (neighborX >= 0)
          && (neighborX < height)
          && (neighborY >= 0)
          && (neighborY < width)
          && state.value?.[neighborX]?.[neighborY]?.type === 'bomb'
        ) {
          count++
        }
      })

      block.bombsAround = count
    })
  })
}

init()
defineExpose({ init })

watch(isEnd, (end) => {
  if (end) {
    state.value?.forEach((rows) => {
      rows.forEach((block) => {
        block.faceup = true
      })
    })

    emit('end')
    if (isWin.value) {
      congrats()
    }
    else {
      setTimeout(() => {
        /* eslint-disable-next-line no-alert */
        alert('You lose! 😭')
      }, 500)
    }
  }
})

function tryFaceup(item: MineBlockType & { row: number, col: number }) {
  if (item.faceup)
    return
  item.faceup = true
  emit('start')

  if (item.type === 'normal')
    faceupSafeCardCount.value++

  if (item.bombsAround)
    return

  offset.forEach(({ x, y }) => {
    const neighborX = item.row + x
    const neighborY = item.col + y

    const block = state.value?.[neighborX]?.[neighborY]
    if (block)
      tryFaceup(block)
  })
}
</script>

<template>
  <div flex="~ col gap-y-1" mb-6xl select-none @contextmenu.prevent>
    <div v-for="(row, i) in state" :key="i" :style="isEnd && 'pointer-events: none;'" flex="~ gap-1">
      <div v-for="item in row" :key="`${item.col}:${item.row}`">
        <MineBlock
          v-model:clickable="item.clickable"
          v-model:faceup="item.faceup"
          :bombs-around="item.bombsAround"
          :type="item.type"
          :bomb-animation="!isEnd"
          @flag-bombs="(num) => flagBombCardCount += num"
          @faceup="tryFaceup(item)"
          @end="isEnd = true"
        />
      </div>
    </div>
  </div>
</template>
