<script setup lang="ts">
const val = useClipboard({
  legacy: true,
})
</script>

<template>
  <slot v-bind="val" />
</template>
