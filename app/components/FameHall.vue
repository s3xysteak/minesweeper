<script setup lang="ts">
const { dailyRunId } = defineProps<{
  dailyRunId?: number
}>()

const { data: yesterdaySeed } = useFetch('/api/daily-run/yesterday-seed', {
  transform: (v: { seed: string }) => v?.seed,
})
const { data: now } = useFetch<number>('/api/now')
const nowFormatted = useDateFormat(now, 'YYYY-MM-DD')

const { data, refresh, status } = useFetch('/api/daily-run/today-grades', {
  query: {
    dailyRunId,
  },
  default: () => [],
  transform: (res: { id: number, username: string, time: number, rank: number }[]) => res.map(item => ({
    ...item,
    time: useTimeFormatter(item.time).value,
  })),
})
const pending = computed(() => status.value === 'pending')
defineExpose({ refresh })

const rankClass: Record<number, string> = {
  1: 'c-#FFD700',
  2: 'c-#C0C0C0',
  3: 'c-#b87333',
}
</script>

<template>
  <div relative max-h-xl max-w-90vw lg:w-lg>
    <section v-show="pending" flex="~ col gap-y-4">
      <Skeleton h-4 w-64 />
      <Skeleton h-4 w-48 />
      <Skeleton h-8 />
      <Skeleton h-8 />
      <Skeleton h-8 />
    </section>

    <div v-show="!pending">
      <p>
        {{ $t('daily-run.yesterday-challenge') }}: {{ yesterdaySeed ?? '--' }}
      </p>

      <header my-4>
        {{ $t('date') }} {{ nowFormatted }}
      </header>

      <main>
        <div
          v-for="item in data" :key="item.id"
          flex="~ justify-between" rounded-md p-4 transition hover:bg-gray-2
        >
          <div flex="~ items-center gap-x-2">
            <div
              v-if="item.rank <= 3" i-mdi-medal-outline
              :class="rankClass[item.rank]" text-lg
            />
            <p v-else>
              {{ item.rank }}
            </p>

            <p max-w-36vw break-words md:max-w-64>
              {{ item.username }}
            </p>
          </div>

          <p>{{ item.time }}</p>
        </div>
      </main>
    </div>
  </div>
</template>
