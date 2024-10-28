<script setup lang="ts">
const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
})

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
  state.value = Array.from({ length: props.options.HEIGHT }).map(
    (_, rowIndex) =>
      Array.from({ length: props.options.WIDTH }).map((_, colIndex) => ({
        index: `${rowIndex}:${colIndex}`,
        value: {
          index: `${rowIndex}:${colIndex}`,
          isTurned: false,
          isMine: Math.random() < props.options.BOMB_PROB && ++bombCount,
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
    === props.options.WIDTH * props.options.HEIGHT - bombCount
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
        :options="props.options"
        @turn-safe-card="turnedSafeCardCount++"
        @step-on-bomb="onStepOnBomb"
      />
    </div>
  </div>
</template>
