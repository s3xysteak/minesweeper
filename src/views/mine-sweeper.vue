<script setup>
import MineBlock from '@/components/MineBlock.vue'

const WIDTH = 10
const HEIGHT = 10
const BOMB_PROB = 0.1

let bombCount = 0
const turnedSafeCardCount = ref(0)
const flagBombCardCount = ref(0)

const state = reactive(
  Array.from({ length: HEIGHT }).map((_, rowIndex) =>
    Array.from({ length: WIDTH }).map((_, colIndex) => ({
      index: rowIndex + ':' + colIndex,
      value: {
        index: rowIndex + ':' + colIndex,
        isTurned: false,
        isMine: Math.random() < BOMB_PROB && ++bombCount,
        isFlag: false,
        minesAround: undefined,
        isEnd: false
      }
    }))
  )
)

function onEnd() {
  state.map(row => {
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
    turnedSafeCardCount.value === WIDTH * HEIGHT - bombCount &&
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
        :WIDTH="WIDTH"
        :HEIGHT="HEIGHT"
        v-model:block="item.value"
        v-model:state="state"
        v-model:flagBombCardCount="flagBombCardCount"
        @turnSafeCard="turnedSafeCardCount++"
        @stepOnBomb="onStepOnBomb"
      ></MineBlock>
    </div>
  </div>
</template>
