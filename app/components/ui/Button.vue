<script setup lang="ts">
type Variant = 'outline'
defineProps<{
  variant?: Variant
  icon?: string
  round?: boolean
  loading?: boolean
}>()

const variantMap: Record<Variant, string> = {
  outline: 'btn-outline',
}
</script>

<template>
  <button
    class="btn"
    :class="[
      variant && variantMap[variant],
      icon && Object.keys($slots).length === 0 && 'aspect-ratio-square p-2 text-lg',
      round && 'rounded-full',
    ]"
    :disabled="loading"
  >
    <!-- loading -->
    <div v-if="loading !== undefined" v-show="loading" i-mdi-loading animate-spin />
    <div v-if="icon" v-show="!loading" :class="icon" />

    <slot />
  </button>
</template>
