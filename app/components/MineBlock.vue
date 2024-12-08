<script setup lang="ts">
import type { MineBlockType } from './types'

const { revealed, bombsAround, type, bombAnimation } = defineProps<Pick<MineBlockType, 'type' | 'bombsAround' | 'revealed'> & {
  bombAnimation: boolean
}>()
const emit = defineEmits<{
  flagBombs: [number]
  reveal: []
  end: []
}>()
const clickable = defineModel<MineBlockType['clickable']>('clickable')

const label = computed(() => !revealed || type === 'bomb' ? '' : (bombsAround || ''))

const bombAnimateClass = ref(false)
watch([() => revealed, () => type], ([revealed, type]) => {
  if (revealed && type === 'bomb' && bombAnimation) {
    bombAnimateClass.value = true
    emit('end')

    setTimeout(() => {
      bombAnimateClass.value = false
    }, 1000)
  }
})

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

function onRightClick() {
  if (revealed)
    return

  const val = clickable.value === 'flag' ? 'ok' : 'flag'
  clickable.value = val

  if (type === 'bomb') {
    val === 'flag' ? emit('flagBombs', 1) : emit('flagBombs', -1)
  }
}
async function onClick() {
  if (revealed || clickable.value === 'flag')
    return

  emit('reveal')
}
</script>

<template>
  <div
    :class="revealed ? 'bg-gray-1' : 'bg-gray-3 hover:bg-gray-2 cursor-pointer active:bg-gray-4'"
    b="1 solid gray" flex="~ justify-center items-center"
    h-8 w-8 rounded font-size-5 transition-100
    @touchstart="onTouchstart"
    @touchend="onTouchend"
    @click="onPcClick"
    @contextmenu.prevent="onRightClick"
  >
    {{ label }}
    <div
      v-show="revealed && type === 'bomb'"
      :class="{ animate: bombAnimateClass }"
    >
      <div i-mdi-bomb />
    </div>
    <div
      v-show="clickable === 'flag' && !revealed"
      i-mdi-flag-outline
    />
  </div>
</template>

<style scoped>
.animate {
  --uno: relative;
}
.animate::after {
  content: '';
  --uno: absolute top-0 left-0 i-mdi-bomb;
  animation: fadeInOut 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes fadeInOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(25);
  }
}
</style>
