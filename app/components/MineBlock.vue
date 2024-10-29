<script setup lang="ts">
import type { MineSweeperOptions } from './types'
import { watch } from 'vue'

const { options } = defineProps<{
  options: MineSweeperOptions
}>()
const emit = defineEmits([
  'stepOnBomb',
  'turnSafeCard',
  'onEnd',
])
const block = defineModel<{
  index: string
  isTurned: boolean
  isMine: number | false
  isFlag: boolean
  minesAround: undefined | number
  isEnd: boolean
}>('block', { required: true })
const state = defineModel<{
  index: string
  value: {
    index: string
    isTurned: boolean
    isMine: number | false
    isFlag: boolean
    minesAround: undefined
    isEnd: boolean
  }
}[][] | undefined>('state', { required: true })
const flagBombCardCount = defineModel<number>('flagBombCardCount', { required: true })

const isTouchstart = ref(false)
function onTouchstart() {
  isTouchstart.value = true
  setTimeout(() => {
    isTouchstart.value = false
  }, 300)
}
function onTouchend() {
  isTouchstart.value ? onClick() : onRightClick()
}
function onPcClick() {
  if (/Mobile/i.test(navigator.userAgent))
    return
  onClick()
}

const bombImg = useTemplateRef('bombImg')

const label = computed(() => {
  if (!block.value.isTurned)
    return ''
  if (block.value.isMine)
    return ''
  return block.value.minesAround || ''
})

function onRightClick() {
  if (block.value.isTurned)
    return
  block.value.isFlag = !block.value.isFlag
  if (block.value.isMine) {
    block.value.isFlag ? flagBombCardCount.value++ : flagBombCardCount.value--
  }
}

async function onClick(isEnd = false) {
  if (block.value.isTurned)
    return
  if (block.value.isFlag && !isEnd)
    return
  block.value.isTurned = true
}

/** @returns 周围8格的炸弹数量 */
function generateMinesAround(row: string | number, col: string | number): number {
  const x = Number(row)
  const y = Number(col)

  const offset = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ]

  let count = 0
  const shouldTurn: { x: number, y: number }[] = []

  const { height, width } = options

  offset.forEach((i) => {
    const neighborX = x + i.x
    const neighborY = y + i.y

    if (
      (neighborX >= 0)
      && (neighborX < height)
      && (neighborY >= 0)
      && (neighborY < width)
    ) {
      state.value?.[neighborX]?.[neighborY]?.value?.isMine
        ? count++
        : shouldTurn.push({ x: neighborX, y: neighborY })
    }
  })

  if (count !== 0)
    return count
  shouldTurn.forEach((pos) => {
    if (!state.value?.[pos.x]?.[pos.y]?.value)
      return
    state.value[pos.x]![pos.y]!.value.isTurned = true
  })

  return count
}

watchEffect(() => {
  block.value.isEnd && onClick(true)
})
watch(
  () => block.value.isTurned,
  (val) => {
    if (!val)
      return

    if (block.value.isMine) {
      if (block.value.isEnd || !bombImg.value)
        return

      bombImg.value.animate(
        [
          { opacity: 1, transform: 'scale(1, 1)' },
          { opacity: 0, transform: 'scale(50, 50)' },
        ],
        {
          duration: 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
      )
      emit('stepOnBomb')
      return
    }

    const [row, col] = block.value.index.split(':')
    if (!row || !col)
      return
    block.value.minesAround = generateMinesAround(row, col)
    emit('turnSafeCard')
  },
)
</script>

<template>
  <div
    :class="block.isTurned ? 'bg-gray-1' : 'bg-gray-3 hover:bg-gray-2 cursor-pointer active:bg-gray-4'"
    b="1 solid gray" flex="~ justify-center items-center"
    h-8 w-8 rounded font-size-5 transition-100
    @touchstart="onTouchstart"
    @touchend="onTouchend"
    @click="onPcClick"
    @contextmenu.prevent="onRightClick"
  >
    {{ label }}
    <div
      v-show="block.isTurned && block.isMine"
      ref="bombImg"
      class="i-mdi-bomb"
    />
    <div
      v-show="block.isFlag && !block.isTurned"
      class="i-mdi-flag-outline"
    />
  </div>
</template>
