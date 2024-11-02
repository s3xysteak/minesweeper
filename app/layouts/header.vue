<script setup lang="ts">
const { locales, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const availableLocales = computed(() => locales.value.filter(i => i.code !== locale.value))
</script>

<template>
  <div>
    <header grid="~ cols-3" p="x-32 y-xl">
      <div />

      <div flex="~ center gap-x-4">
        <h1 font-size-8>
          {{ $t('minesweeper') }}
        </h1>

        <Dropdown>
          <template #trigger>
            <button aspect-ratio-square h-auto w-auto rounded-full p-2 btn-outline>
              <div i-mdi-help text-lg />
            </button>
          </template>

          <section w="[max-content]" mt-4 rounded-md bg-white p-4 shadow>
            <div flex>
              <div i-mdi-mouse-left-click-outline />
              /
              <div i-mdi-gesture-tap />
            </div>
            <div flex="~ items-center">
              {{ $t('tip.left-click') }}
              <div i-mdi-chess-pawn text-lg />
            </div>

            <div mt-4 flex>
              <div i-mdi-mouse-right-click-outline />
              /
              <div i-mdi-gesture-tap-hold />
            </div>
            <div flex="~ items-center">
              {{ $t('tip.right-click') }}
              <div i-mdi-flag text-lg />
            </div>
          </section>
        </Dropdown>
      </div>

      <div flex="~ items-center justify-right gap-x-2">
        <Dropdown main-class="right-0">
          <template #trigger>
            <button aspect-ratio-square rounded-full p-2 btn-outline>
              <div i-mdi-google-translate text-lg />
            </button>
          </template>

          <section mt-2 rounded-md bg-white p-2 shadow flex="~ col gap-y-2">
            <NuxtLink
              v-for="item in availableLocales" :key="item.code" :to="switchLocalePath(item.code)"
              rounded-md p-2 text-nowrap transition hover:bg-gray-2
            >
              {{ item.name }}
            </NuxtLink>
          </section>
        </Dropdown>

        <a
          href="https://github.com/s3xysteak/minesweeper" target="_blank"
          aspect-ratio-square rounded-full p-2 btn-outline
        >
          <div i-mdi-github text-lg />
        </a>
      </div>
    </header>

    <div b-b="1 solid gray/20" mb-4xl />

    <main>
      <slot />
    </main>
  </div>
</template>
