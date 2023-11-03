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
  <div all="c-gray-7 font-sans" pt-3xl flex flex-col items-center>
    <div font-size-8>minesweeper</div>
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
    <button @click="onReset" btn font-size-4 h-8 w-20 transition-100>
      reset
    </button>
    <div @contextmenu.prevent select-none flex flex-col gap-y-1 mt-3xl mb-6xl>
      <mine-sweeper :options="options" ref="mineSweeper"></mine-sweeper>
    </div>
  </div>
</template>
