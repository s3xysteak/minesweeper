<script setup lang="ts">
const { x, y } = useMouse()

const pos = reactive({ x: 0, y: 0 })

const showing = ref(false)
const hide = useDebounceFn(() => showing.value = false, 150)

defineExpose({
  show: () => {
    showing.value = true
    pos.x = x.value
    pos.y = y.value

    hide()
  },
})
</script>

<template>
  <Transition
    leave-active-class="transition transition-500"
    leave-to-class="op-0 -translate-y-full"
  >
    <div
      v-show="showing" :style="`left:${pos.x + 20}px;top:${pos.y + 20}px`"
      fixed rounded-md bg-white p-2 shadow
    >
      <slot />
    </div>
  </Transition>
</template>
