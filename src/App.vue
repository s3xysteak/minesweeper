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
  <div all="c-gray-7 font-mono" pt-3xl flex flex-col items-center gap-y-2xl>
    <div font-size-8>minesweeper</div>
    <div
      w-full
      flex-wrap
      flex
      items-center
      justify-center
      gap-x-4
      gap-y-4
    >
      <div>
        x length:
        <input
          v-model="options.WIDTH"
          placeholder="input x length..."
          h-6
          w-xm
          type="number"
        />
      </div>
      <div>
        y length:
        <input
          v-model="options.HEIGHT"
          placeholder="input y length..."
          h-6
          w-xm
          type="number"
        />
      </div>
      <div>
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
    </div>
    <button @click="onReset" btn font-size-4 h-8 w-20 transition-100>
      reset
    </button>
    <div @contextmenu.prevent select-none flex flex-col gap-y-1 mb-6xl>
      <mine-sweeper :options="options" ref="mineSweeper"></mine-sweeper>
    </div>
  </div>
</template>
