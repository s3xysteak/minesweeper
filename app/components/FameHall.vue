<script setup lang="ts">
const { dailyRunId } = defineProps<{
  dailyRunId?: number
}>()

const { data: yesterdaySeed } = useFetch('/api/daily-run/yesterday-seed', {
  transform: (v: { seed: string }) => v?.seed,
})
const { data: now } = useFetch<number>('/api/now')
const nowFormatted = useDateFormat(now, 'YYYY-MM-DD')

const { data, refresh } = useFetch('/api/daily-run/today-grades', {
  query: {
    dailyRunId,
  },
  default: () => [],
  transform: (res: { id: number, username: string, time: number, rank: number }[]) => res.map(item => ({
    ...item,
    time: useTimeFormatter(item.time).value,
  })),
})
defineExpose({ refresh })

const rankClass: Record<number, string> = {
  1: 'c-#FFD700',
  2: 'c-#C0C0C0',
  3: 'c-#b87333',
}
</script>

<template>
  <div max-h-xl w-lg>
    <p>
      {{ $t('daily-run.yesterday-challenge') }}: {{ yesterdaySeed ?? '--' }}
    </p>

    <header my-4>
      {{ $t('date') }} {{ nowFormatted }}
    </header>

    <main>
      <div
        v-for="item in data" :key="item.id"
        p-4 transition hover:bg-gray-2 flex="~ justify-between"
      >
        <div flex="~ items-center gap-x-2">
          <div
            v-if="item.rank <= 3" i-mdi-medal-outline
            :class="rankClass[item.rank]" text-lg
          />
          <p v-else>
            {{ item.rank }}
          </p>

          <p>{{ item.username }}</p>
        </div>
        <p>{{ item.time }}</p>
      </div>
    </main>
  </div>
</template>
