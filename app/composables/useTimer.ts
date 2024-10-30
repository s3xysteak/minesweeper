export function useTimer() {
  const time = ref(0)
  const isRunning = ref(false)
  let startTime = 0
  let lastTime = 0
  let animationFrameId: number | null = null

  const updateTimer = () => {
    if (!isRunning.value)
      return

    const currentTime = performance.now()
    const deltaTime = currentTime - startTime
    time.value = lastTime + deltaTime

    animationFrameId = requestAnimationFrame(updateTimer)
  }

  const start = () => {
    if (!isRunning.value) {
      isRunning.value = true
      startTime = performance.now()
      animationFrameId = requestAnimationFrame(updateTimer)
    }
  }

  const pause = () => {
    if (isRunning.value) {
      isRunning.value = false
      lastTime = time.value
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }

  const reset = () => {
    pause()
    time.value = 0
    lastTime = 0
  }

  tryOnScopeDispose(() => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }
  })

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
  }
}
