<script setup lang="ts">
defineProps<{
  triggerClass?: string
  mainClass?: string
}>()

const dropdown = useTemplateRef('dropdown')
const show = defineModel<boolean>({ default: false })
onClickOutside(dropdown, () => show.value = false)
</script>

<template>
  <div ref="dropdown" relative>
    <div :class="triggerClass" @click="show = !show">
      <slot name="trigger" />
    </div>

    <Transition
      enter-active-class="transition"
      leave-active-class="transition"
      enter-from-class="op-0 scale-90"
      leave-to-class="op-0 scale-90"
    >
      <div v-show="show" absolute :class="mainClass" z-99>
        <slot />
      </div>
    </Transition>
  </div>
</template>
