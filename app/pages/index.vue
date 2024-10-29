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

const help = useTemplateRef('help')
const show = ref(false)
onClickOutside(help, () => show.value = false)
</script>

<template>
  <div flex="~ col items-center gap-y-2xl" pt-3xl c-gray-7 font-mono>
    <h2 flex="~ items-center gap-x-4">
      <p font-size-8>
        minesweeper
      </p>

      <div ref="help" relative>
        <button aspect-ratio-square h-auto w-auto rounded-full p-2 btn-outline @click="show = !show">
          <div i-mdi-help text-lg />
        </button>

        <Transition
          enter-active-class="transition"
          leave-active-class="transition"
          enter-from-class="op-0 translate-y-lg"
          leave-to-class="op-0 translate-y-lg"
        >
          <section v-show="show" w="[max-content]" absolute mt-4 rounded-md bg-white p-4 shadow>
            <div flex>
              <div i-mdi-mouse-left-click-outline />
              /
              <div i-mdi-gesture-tap />
            </div>
            Left click/Tap to check

            <div mt-4 flex>
              <div i-mdi-mouse-right-click-outline />
              /
              <div i-mdi-gesture-tap-hold />
            </div>
            Right click/Hold to flag
          </section>
        </Transition>
      </div>
    </h2>

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
