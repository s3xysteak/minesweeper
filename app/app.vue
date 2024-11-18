<script setup lang="ts">
useSeoMeta({
  title: 'Minesweeper',
  ogTitle: 'Minesweeper',
  description: 'Play minesweeper online!',
  ogDescription: 'Play minesweeper online!',
  keywords: 'minesweeper daily-run daily challenge daily-challenge game games mini-game online-game online',
})
</script>

<template>
  <NuxtLoadingIndicator />

  <div c-gray-7 font-mono>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
