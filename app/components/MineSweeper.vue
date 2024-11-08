<script setup lang="ts">
import type { MineBlockType, MineSweeperOptions } from './types'
import rand from 'twistrand'

const { options } = defineProps<{
  options: MineSweeperOptions
}>()
const emit = defineEmits<{
  start: []
  end: [isWin?: boolean]
}>()
const bombCount = computed(() => Math.floor(options.height * options.width * options.bombProb))

const safeCardCount = computed(() => options.width * options.height - bombCount.value)
const revealedSafeCardCount = ref(0)

const flagBombCardCount = ref(0)

const isEnd = ref(false)
const isWin = computed(() =>
  revealedSafeCardCount.value === safeCardCount.value
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
  revealedSafeCardCount.value = 0
  flagBombCardCount.value = 0
  isEnd.value = false

  const mt = rand(options.seed)

  state.value = createMines(mt, {
    height: options.height,
    width: options.width,
    mineCount: bombCount.value,
  })
}

const manuallyEnd = ref(false)
watch(isEnd, (end) => {
  if (end) {
    state.value?.forEach((rows) => {
      rows.forEach((block) => {
        block.revealed = true
      })
    })

    emit('end', isWin.value)
    if (manuallyEnd.value)
      return
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

function tryReveal(item: MineBlockType & { row: number, col: number }) {
  if (item.revealed)
    return
  item.revealed = true
  emit('start')

  if (item.type === 'normal')
    revealedSafeCardCount.value++

  if (item.bombsAround)
    return

  offset.forEach(({ x, y }) => {
    const neighborX = item.row + x
    const neighborY = item.col + y

    const block = state.value?.[neighborX]?.[neighborY]
    if (block)
      tryReveal(block)
  })
}

init()
defineExpose({
  init,
  finish: () => {
    manuallyEnd.value = true
    isEnd.value = true
  },
})
</script>

<template>
  <div flex="~ col gap-y-1" mb-6xl select-none @contextmenu.prevent>
    <div v-for="(row, i) in state" :key="i" :style="isEnd && 'pointer-events: none;'" flex="~ gap-1">
      <div v-for="item in row" :key="`${item.col}:${item.row}`">
        <MineBlock
          v-model:clickable="item.clickable"
          v-model:revealed="item.revealed"
          :bombs-around="item.bombsAround"
          :type="item.type"
          :bomb-animation="!isEnd"
          @flag-bombs="(num) => flagBombCardCount += num"
          @reveal="tryReveal(item)"
          @end="isEnd = true"
        />
      </div>
    </div>
  </div>
</template>
