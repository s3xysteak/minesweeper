<script setup lang="ts">
import type { MineSweeperOptions } from './mine'

const { options } = defineProps<{
  options: MineSweeperOptions
}>()

let bombCount = 0
const turnedSafeCardCount = ref(0)
const flagBombCardCount = ref(0)

const state = ref<{
  index: string
  value: {
    index: string
    isTurned: boolean
    isMine: number | false
    isFlag: boolean
    minesAround: undefined
    isEnd: boolean
  }
}[][]>()

function init() {
  bombCount = 0
  turnedSafeCardCount.value = 0
  flagBombCardCount.value = 0
  state.value = Array.from({ length: options.height }).map(
    (_, rowIndex) =>
      Array.from({ length: options.width }).map((_, colIndex) => ({
        index: `${rowIndex}:${colIndex}`,
        value: {
          index: `${rowIndex}:${colIndex}`,
          isTurned: false,
          isMine: Math.random() < options.bombProb && ++bombCount,
          isFlag: false,
          minesAround: undefined,
          isEnd: false,
        },
      })),
  )
}

init()
defineExpose({ init })

function onEnd() {
  state.value?.forEach?.((row) => {
    row.forEach((col) => {
      col.value.isEnd = true
    })
  })
}
function onStepOnBomb() {
  onEnd()
}
watchEffect(() => {
  if (
    turnedSafeCardCount.value
    === options.width * options.height - bombCount
    && flagBombCardCount.value === bombCount
  ) {
    setTimeout(() => {
      /* eslint-disable no-alert */
      alert('you win! 🎉')
      onEnd()
    }, 500)
  }
})
</script>

<template>
  <div v-for="(row, i) in state" :key="i" flex="~ gap-1">
    <div v-for="item in row" :key="item.index">
      <MineBlock
        v-model:block="item.value"
        v-model:state="state"
        v-model:flag-bomb-card-count="flagBombCardCount"
        :options="options"
        @turn-safe-card="turnedSafeCardCount++"
        @step-on-bomb="onStepOnBomb"
      />
    </div>
  </div>
</template>
