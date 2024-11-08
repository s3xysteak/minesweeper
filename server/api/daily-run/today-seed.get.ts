export default defineEventHandler(async () => {
  const db = hubDatabase()

  const value = await db
    .prepare(`
      SELECT id, seed FROM daily_run
      WHERE DATE(create_time) = CURRENT_DATE;`)
    .all()

  return value.results?.[0]
})
