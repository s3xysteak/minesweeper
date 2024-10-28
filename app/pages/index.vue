<script setup lang="ts">
const mineSweeper = useTemplateRef('mineSweeper')
const options = reactive({
  WIDTH: 10,
  HEIGHT: 10,
  BOMB_PROB: 0.15,
})
function onReset() {
  mineSweeper.value?.init()
}
</script>

<template>
  <div all="c-gray-7 font-mono" flex flex-col items-center gap-y-2xl pt-3xl>
    <div font-size-8>
      minesweeper
    </div>
    <div w-full flex flex-wrap items-center justify-center gap-x-4 gap-y-4>
      <div>
        x length:
        <input
          v-model="options.WIDTH"
          placeholder="input x length..."
          w-xm h-6
          type="number"
        >
      </div>
      <div>
        y length:
        <input
          v-model="options.HEIGHT"
          placeholder="input y length..."
          w-xm h-6
          type="number"
        >
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
          w-xm h-6
        >
      </div>
    </div>
    <button h-8 w-20 font-size-4 transition-100 btn @click="onReset">
      reset
    </button>
    <div flex="~ col gap-y-1" mb-6xl select-none @contextmenu.prevent>
      <MineSweeper ref="mineSweeper" :options="options" />
    </div>
  </div>
</template>
