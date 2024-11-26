<script setup lang="ts">
const emit = defineEmits(['restart'])
const formatted = useTimeUntilNextDay()

watchEffect(() => {
  if (formatted.value && formatted.value === '23:59:58')
    emit('restart')
})
</script>

<template>
  <p>
    {{ formatted }}
  </p>
</template>
