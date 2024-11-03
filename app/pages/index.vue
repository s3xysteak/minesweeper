<script setup lang="ts">
import type { MineSweeperOptions } from '~/components/types'

const options = reactive<MineSweeperOptions>({
  bombProb: 0.14,
  height: 10,
  width: 15,
  seed: rollSeed(),
})

const mineSweeper = useTemplateRef('mineSweeper')

const { time, start, pause, reset: resetTimer } = useTimer()
const formatted = useTimeFormatter(time)

function reset() {
  mineSweeper.value?.init()
  resetTimer()
}

watch(() => options, reset, { deep: true })
</script>

<template>
  <div w-full flex="~ col items-center">
    <p text-lg>
      {{ formatted }}
    </p>

    <MineSweeper ref="mineSweeper" mt-8 :options @start="start" @end="pause" />
  </div>
</template>
