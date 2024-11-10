export default defineEventHandler(async () => {
  const db = hubDatabase()

  const getResult = async () => {
    const value = await db
      .prepare(`
    SELECT id, seed FROM daily_run
    WHERE DATE(create_time) = CURRENT_DATE;`)
      .all()

    return value.results?.[0]
  }

  const value = await getResult()

  if (!value) {
    await runTask('insert-daily-run')
    return await getResult()
  }

  return value
})
