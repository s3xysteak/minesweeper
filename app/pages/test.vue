<script setup lang="ts">
const loading = ref(false)
function onClick() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1500)
}
</script>

<template>
  <Button :loading @click="onClick">
    hello
  </Button>
</template>
