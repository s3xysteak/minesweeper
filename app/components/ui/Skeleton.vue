<template>
  <div class="skeleton" />
</template>

<style scoped>
.skeleton {
  --uno: relative overflow-hidden rounded-xl bg-#e2e8f0;
}

.skeleton::after{
  content: "";
  --uno: absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-r from-#fff/0 via-#fff/40 to-#fff/0;
  animation: skeleton-animation 1.2s infinite;
}
@keyframes skeleton-animation {
  0% {
    transform: translateX(-100%);
  }
  100%{
    transform: translateX(100%);
  }
}
</style>
