<script setup lang="ts">
import type { MineSweeperOptions } from '~/components/types'

const fameHall = useTemplateRef('fame-hall')

const { data } = await useFetch<{ id: number, seed: string }>('/api/daily-run/today-seed')

const options = reactive<MineSweeperOptions>({
  bombProb: 0.11,
  height: 15,
  width: 10,
  seed: computed(() => data.value?.seed) as any as number,
})

const mineSweeper = useTemplateRef('mineSweeper')

const { data: now } = useFetch<number>('/api/now')
const nowFormatted = useDateFormat(now, 'YYYY-MM-DD')
const [dailyRunData, addDailyRunData] = useDailyRunToday(nowFormatted)
watchEffect(() => {
  if (dailyRunData())
    mineSweeper.value?.finish()
})

const { time, start, pause, reset: resetTimer } = useTimer()
const formatted = useTimeFormatter(
  computed(() => {
    const dailyRun = dailyRunData()
    return dailyRun
      ? dailyRun?.time === undefined ? '--' : dailyRun.time
      : time.value
  }),
)

function reset() {
  mineSweeper.value?.init()
  resetTimer()
}

watch(() => options, reset, { deep: true })

const showFormDialog = ref(false)

function onEnd(isWin?: boolean) {
  pause()
  isWin && setTimeout(() => {
    showFormDialog.value = true
  }, 1000)
  dailyRunData() || addDailyRunData(isWin ? time.value : undefined)
}

const name = ref('')
async function onSubmit() {
  await $fetch('/api/daily-run/add', {
    method: 'post',
    body: {
      dailyRunId: data.value?.id,
      name: name.value,
      time: time.value,
    },
  })
  showFormDialog.value = false
}

const showFameHall = ref(false)
watch(showFameHall, () => fameHall.value?.refresh())
</script>

<template>
  <div w-full flex="~ col items-center">
    <button btn-outline @click="showFameHall = true">
      {{ $t('daily-run.fame-hall') }}
    </button>

    <p my-8 text-lg>
      {{ formatted }}
    </p>

    <MineSweeper ref="mineSweeper" :options @start="start" @end="onEnd" />

    <Dialog v-model="showFormDialog" disable-outside-pointer-events>
      <div p-4>
        <header flex="~ justify-between items-center" mb-8>
          <p>
            {{ $t('daily-run.your-grades') }}: {{ formatted }}
          </p>

          <button rounded-full p-2 @click="showFormDialog = false">
            <div i-mdi-close />
          </button>
        </header>

        <form @submit.prevent="onSubmit">
          <label>
            {{ $t('daily-run.leave-your-name') }}:
            <input v-model="name" maxlength="32" autofocus input>
          </label>

          <footer flex="~ justify-right" mt-8>
            <button btn>
              {{ $t('submit') }}
            </button>
          </footer>
        </form>
      </div>
    </Dialog>

    <Dialog v-model="showFameHall">
      <FameHall ref="fame-hall" :daily-run-id="data?.id" p-4 />
    </Dialog>
  </div>
</template>
