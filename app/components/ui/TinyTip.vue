<script setup lang="ts">
const { x, y } = useMouse()

const showing = ref(false)
const hide = useDebounceFn(() => showing.value = false, 150)

defineExpose({
  show: () => {
    showing.value = true
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
      v-show="showing" :style="`left:${x + 20}px;top:${y + 20}px`"
      fixed rounded-md bg-white p-2 shadow
    >
      <slot />
    </div>
  </Transition>
</template>
