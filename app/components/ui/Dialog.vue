<script setup lang="ts">
const { disableOutsidePointerEvents = false } = defineProps<{
  disableOutsidePointerEvents?: boolean
}>()
const show = defineModel<boolean>({ default: false })

const dialog = useTemplateRef('dialog')

const effect = effectScope()
onMounted(() => {
  effect.run(() => {
    watchEffect(() => {
      show.value ? dialog.value?.showModal() : dialog.value?.close()
    })
  })
})
function onClickDialog(e: MouseEvent) {
  if (!dialog.value)
    return

  const onClickMask = () => {
    const rect = dialog.value!.getBoundingClientRect()
    if (
      e.clientX < rect.left
      || e.clientX > rect.right
      || e.clientY < rect.top
      || e.clientY > rect.bottom
    ) {
      show.value = false
    }
  }
  disableOutsidePointerEvents || onClickMask()
}

const slots = useSlots()
</script>

<template>
  <div>
    <div v-if="!!slots?.default" @click="show = true">
      <slot name="trigger" />
    </div>

    <dialog ref="dialog" rounded-md shadow focus-visible:outline-none @click="onClickDialog">
      <slot />
    </dialog>
  </div>
</template>
