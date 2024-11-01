<script setup lang="ts">
const help = useTemplateRef('help')
const show = ref(false)
onClickOutside(help, () => show.value = false)
</script>

<template>
  <div>
    <header flex="~ justify-center" py-xl>
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
              <div flex="~ items-center">
                Left click/Tap to check
                <div i-mdi-chess-pawn text-lg />
              </div>

              <div mt-4 flex>
                <div i-mdi-mouse-right-click-outline />
                /
                <div i-mdi-gesture-tap-hold />
              </div>
              <div flex="~ items-center">
                Right click/Hold to flag
                <div i-mdi-flag text-lg />
              </div>
            </section>
          </Transition>
        </div>
      </h2>
    </header>

    <div b-b="1 solid gray/20" mb-4xl />

    <main>
      <slot />
    </main>
  </div>
</template>
