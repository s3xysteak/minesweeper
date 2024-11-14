<script setup lang="ts">
import type { MineSweeperOptions } from '~/components/types'

const seed = useState(() => rollSeed())

const mineSweeper = useTemplateRef('mineSweeper')
const options = reactive<{ [K in keyof MineSweeperOptions]: MaybeRef<MineSweeperOptions[K]> }>({
  width: 10,
  height: 15,
  bombProb: 0.11,
  seed,
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

const { time, start, pause, reset: resetTimer } = useTimer()
const formatted = useTimeFormatter(time)

function reset() {
  mineSweeper.value?.init()
  resetTimer()
}

watch(() => options, reset, { deep: true })
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
          max="1" min="0" step="0.01" type="number"
          input
        >
      </label>
    </div>

    <div flex="~ gap-x-4 items-center">
      <div flex>
        <Button rounded-r-none @click="options.seed = rollSeed()">
          {{ $t('roll') }}
        </Button>

        <input v-model="options.seed" w-40 rounded-none b-x-none input type="number">

        <Button title="copy" variant="outline" rounded-l-none icon="i-mdi-content-copy" @click="copy?.(options.seed.toString())" />
      </div>

      <Button @click="reset">
        {{ $t('reset') }}
      </Button>
    </div>

    <p text-lg>
      {{ formatted }}
    </p>

    <MineSweeper ref="mineSweeper" :options @start="start" @end="pause" />
  </div>
</template>
