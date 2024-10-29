<script setup lang="ts">
import type { MineSweeperOptions } from '~/components/mine'

const mineSweeper = useTemplateRef('mineSweeper')
const options = reactive<MineSweeperOptions>({
  width: 10,
  height: 10,
  bombProb: 0.15,
})
function onReset() {
  mineSweeper.value?.init()
}
</script>

<template>
  <div flex="~ col items-center gap-y-2xl" pt-3xl c-gray-7 font-mono>
    <div font-size-8>
      minesweeper
    </div>
    <div w-full flex flex-wrap items-center justify-center gap-x-4 gap-y-4>
      <div>
        x length:
        <input
          v-model="options.width"
          placeholder="input x length..."
          input
          type="number"
        >
      </div>
      <div>
        y length:
        <input
          v-model="options.height"
          placeholder="input y length..."
          input
          type="number"
        >
      </div>
      <div>
        bomb probability:
        <input
          v-model="options.bombProb"
          placeholder="input bomb probability..."
          max="1" min="0" step="0.05" type="number"
          input
        >
      </div>
    </div>
    <button btn @click="onReset">
      reset
    </button>
    <div flex="~ col gap-y-1" mb-6xl select-none @contextmenu.prevent>
      <MineSweeper ref="mineSweeper" :options />
    </div>
  </div>
</template>
