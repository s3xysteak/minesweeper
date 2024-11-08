export default defineEventHandler(async () => {
  const db = hubDatabase()

  const data = await db.prepare(`
    SELECT seed FROM daily_run
    WHERE DATE(create_time) = DATE('now', '-1 day');
  `).all()

  return data.results?.[0]
})
