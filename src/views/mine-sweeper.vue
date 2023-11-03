<script setup>
import MineBlock from '@/components/MineBlock.vue'

const props = defineProps({
  options: {
    type: Object,
    required: true
  }
})

let bombCount = 0
const turnedSafeCardCount = ref(0)
const flagBombCardCount = ref(0)

const state = ref()

function init() {
  bombCount = 0
  turnedSafeCardCount.value = 0
  flagBombCardCount.value = 0
  state.value = Array.from({ length: props.options.HEIGHT }).map(
    (_, rowIndex) =>
      Array.from({ length: props.options.WIDTH }).map((_, colIndex) => ({
        index: rowIndex + ':' + colIndex,
        value: {
          index: rowIndex + ':' + colIndex,
          isTurned: false,
          isMine: Math.random() < props.options.BOMB_PROB && ++bombCount,
          isFlag: false,
          minesAround: undefined,
          isEnd: false
        }
      }))
  )
}

init()
defineExpose({ init })

function onEnd() {
  state.value.map(row => {
    row.map(col => {
      col.value.isEnd = true
    })
  })
}
function onStepOnBomb() {
  // alert('so sad :(. You stepped on a mine! ')
  onEnd()
}
watchEffect(() => {
  if (
    turnedSafeCardCount.value ===
      props.options.WIDTH * props.options.HEIGHT - bombCount &&
    flagBombCardCount.value === bombCount
  ) {
    setTimeout(() => {
      alert('you win! :)')
      onEnd()
    }, 500)
  }
})
</script>

<template>
  <div flex gap-1 v-for="(row, i) in state" :key="i">
    <div v-for="item in row" :key="item.index">
      <MineBlock
        :options="props.options"
        v-model:block="item.value"
        v-model:state="state"
        v-model:flagBombCardCount="flagBombCardCount"
        @turnSafeCard="turnedSafeCardCount++"
        @stepOnBomb="onStepOnBomb"
      ></MineBlock>
    </div>
  </div>
</template>
