<script setup>
import MineSweeper from '@/views/mine-sweeper.vue'

const mineSweeper = ref(null)
const options = reactive({
  WIDTH: 10,
  HEIGHT: 10,
  BOMB_PROB: 0.15
})
function onReset() {
  mineSweeper.value.init()
}
</script>

<template>
  <div pt-3xl flex flex-col items-center>
    <div>minesweeper</div>
    <div w-full flex items-center justify-center gap-x-4 h-16 mt-3xl>
      x length:
      <input
        v-model="options.WIDTH"
        placeholder="input x length..."
        h-6
        w-xm
        type="number"
      />
      y length:
      <input
        v-model="options.HEIGHT"
        placeholder="input y length..."
        h-6
        w-xm
        type="number"
      />
      bomb probability:
      <input
        v-model="options.BOMB_PROB"
        placeholder="input bomb probability..."
        max="1"
        min="0"
        step="0.05"
        type="number"
        h-6
        w-xm
      />
    </div>
    <button @click="onReset" btn h-8 w-16>reset</button>
    <div flex flex-col gap-y-1 mt-3xl mb-6xl>
      <mine-sweeper :options="options" ref="mineSweeper"></mine-sweeper>
    </div>
  </div>
</template>
