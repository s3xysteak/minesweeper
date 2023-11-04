<script setup>
import { useVModels } from '@vueuse/core'
import { watch } from 'vue'

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
  if (/Mobile/i.test(navigator.userAgent)) return
  onClick()
}

const bombImg = ref(null)
const blockStyle = [
  'b-1',
  'b-solid',
  'b-gray',
  'w-8',
  'h-8',
  'rounded',
  'flex',
  'justify-center',
  'items-center',
  'font-size-5'
]

const props = defineProps({
  block: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    required: true
  },
  state: {
    type: Object,
    required: true
  },
  flagBombCardCount: {
    type: Number,
    required: true
  }
})
const emit = defineEmits([
  'update:block',
  'update:state',
  'update:flagBombCardCount',
  'stepOnBomb',
  'turnSafeCard',
  'onEnd'
])
const { block, state, flagBombCardCount } = useVModels(props, emit)

const label = computed(() => {
  if (!block.value.isTurned) return ''
  if (block.value.isMine) return ''
  return block.value.minesAround || ''
})

function onRightClick() {
  if (block.value.isTurned) return
  block.value.isFlag = !block.value.isFlag
  if (block.value.isMine) {
    block.value.isFlag ? flagBombCardCount.value++ : flagBombCardCount.value--
  }
}

async function onClick(isEnd = false) {
  if (block.value.isTurned) return
  if (block.value.isFlag && !isEnd) return
  block.value.isTurned = true
}

/**
 * @param {string || number} row - 行数
 * @param {string || number} col - 列数
 * @returns {number} - 周围8格的炸弹数量
 */
function generateMinesAround(row, col) {
  const x = parseInt(row)
  const y = parseInt(col)

  const offset = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 }
  ]

  let count = 0
  let shouldTurn = []

  const height = props.options.HEIGHT
  const width = props.options.WIDTH

  offset.forEach(i => {
    const neighborX = x + i.x
    const neighborY = y + i.y

    if (
      (neighborX >= 0) &
      (neighborX < height) &
      (neighborY >= 0) &
      (neighborY < width)
    ) {
      state.value[neighborX][neighborY].value.isMine
        ? count++
        : shouldTurn.push({ x: neighborX, y: neighborY })
    }
  })

  if (count !== 0) return count
  shouldTurn.forEach(pos => {
    state.value[pos.x][pos.y].value.isTurned = true
  })

  return count
}

watchEffect(() => {
  block.value.isEnd && onClick(true)
})
watch(
  () => block.value.isTurned,
  val => {
    if (!val) return

    if (block.value.isMine) {
      if (block.value.isEnd) return

      bombImg.value.animate(
        [
          { opacity: 1, transform: 'scale(1, 1)' },
          { opacity: 0, transform: 'scale(50, 50)' }
        ],
        {
          duration: 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }
      )
      emit('stepOnBomb')
      return
    }

    block.value.minesAround = generateMinesAround(
      ...block.value.index.split(':')
    )
    emit('turnSafeCard')
  }
)
</script>

<template>
  <div
    :class="[
      blockStyle,
      block.isTurned
        ? 'bg-gray-1'
        : 'bg-gray-3 hover:bg-gray-2 cursor-pointer active:bg-gray-4'
    ]"
    transition-100
    @touchstart="onTouchstart"
    @touchend="onTouchend"
    @click="onPcClick"
    @contextmenu.prevent="onRightClick"
  >
    {{ label }}
    <div
      v-show="block.isTurned && block.isMine"
      class="i-material-symbols-bomb"
      ref="bombImg"
    ></div>
    <div
      v-show="block.isFlag && !block.isTurned"
      class="i-material-symbols-flag-outline"
    ></div>
  </div>
</template>
