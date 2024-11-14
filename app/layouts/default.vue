<script setup lang="ts">
const { locales, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const availableLocales = computed(() => locales.value.filter(i => i.code !== locale.value))

const localePath = useLocalePath()

const navOptions = [
  { label: 'nav.legend', to: '/legend' },
  { label: 'nav.daily-run', to: '/' },
]

const [DefineNav, Nav] = createReusableTemplate<{ className?: string }>()
</script>

<template>
  <div>
    <DefineNav v-slot="{ className }">
      <NuxtLink
        v-for="{ label, to } in navOptions" :key="to" :to="localePath(to)"
        h-full flex="~ items-center" transition :class="className"
      >
        {{ $t(label) }}
      </NuxtLink>
    </DefineNav>

    <header flex="~ justify-between items-center" lg:grid="~ cols-3" my-xl px-4 lg:px-32>
      <div flex="~ items-center" h-full>
        <div hidden lg:flex="~ items-center gap-x-6" h-full>
          <Nav class-name="c-gray hover:c-gray-6" />
        </div>

        <Dropdown>
          <template #trigger>
            <Button icon="i-mdi-dots-horizontal" variant="outline" round lg:hidden />
          </template>

          <div flex="~ col gap-y-2" mt-4 rounded-md bg-white p-4 text-nowrap shadow-md>
            <Nav class-name="px-4 py-2" />
          </div>
        </Dropdown>
      </div>

      <div flex="~ center gap-x-4">
        <h1 font-size-8>
          {{ $t('minesweeper') }}
        </h1>

        <Dropdown main-class="-left-32">
          <template #trigger>
            <Button icon="i-mdi-help" variant="outline" round />
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

            <div mt-4 flex>
              <div i-mdi-trophy bg-yellow text-lg />
            </div>
            <div>
              {{ $t('tip.success') }}
            </div>

            <div mt-4 flex>
              <div i-mdi-robot-dead text-lg c-red />
            </div>
            <div>
              {{ $t('tip.fail') }}
            </div>
          </section>
        </Dropdown>
      </div>

      <div flex="~ items-center justify-right gap-x-2">
        <Dropdown main-class="right-0">
          <template #trigger>
            <Button icon="i-mdi-google-translate" variant="outline" round lt-lg:hidden />
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

        <a href="https://github.com/s3xysteak/minesweeper" target="_blank">
          <Button round lt-lg:hidden variant="outline" icon="i-mdi-github" />
        </a>
      </div>
    </header>

    <div b-b="1 solid gray/20" mb-4xl />

    <main>
      <slot />
    </main>
  </div>
</template>
