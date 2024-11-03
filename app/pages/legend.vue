<script setup lang="ts">
import type { MineSweeperOptions } from '~/components/types'

const mineSweeper = useTemplateRef('mineSweeper')
const options = reactive<MineSweeperOptions>({
  width: 10,
  height: 10,
  bombProb: 0.15,
  seed: rollSeed(),
})

const scope = effectScope()
let copy: (text: string) => void
onMounted(() => {
  scope.run(() => {
    const { copy: _ } = useClipboard({
      legacy: true,
    })
    copy = _
  })
})

const { time, start, pause, reset } = useTimer()
const formatted = useTimeFormatter(time)

function onReset() {
  mineSweeper.value?.init()
}
</script>

<template>
  <div flex="~ col items-center gap-y-2xl">
    <div w-full flex flex-wrap items-center justify-center gap-x-4 gap-y-4>
      <label>
        {{ $t('x-length') }}:
        <input
          v-model="options.width"
          placeholder="input x length..."
          input
          type="number"
        >
      </label>

      <label>
        {{ $t('y-length') }}:
        <input
          v-model="options.height"
          placeholder="input y length..."
          input
          type="number"
        >
      </label>

      <label>
        {{ $t('bomb probability') }}:
        <input
          v-model="options.bombProb"
          placeholder="input bomb probability..."
          max="1" min="0" step="0.05" type="number"
          input
        >
      </label>
    </div>

    <div flex="~ gap-x-4 items-center">
      <div flex>
        <button rounded-r-none btn @click="options.seed = rollSeed()">
          {{ $t('roll') }}
        </button>

        <input v-model="options.seed" w-40 rounded-none b-x-none input type="number">

        <button title="copy" aspect-ratio-square rounded-l-none btn-outline @click="copy?.(options.seed.toString())">
          <div i-mdi-content-copy />
        </button>
      </div>

      <button btn @click="onReset">
        {{ $t('reset') }}
      </button>
    </div>

    <p text-lg>
      {{ formatted }}
    </p>

    <div flex="~ col gap-y-1" mb-6xl select-none @contextmenu.prevent>
      <MineSweeper ref="mineSweeper" :options @reset="reset" @start="start" @end="pause" />
    </div>
  </div>
</template>
