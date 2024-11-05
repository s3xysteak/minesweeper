export default defineEventHandler(async () => {
  const db = useDatabase()

  const data = await db.sql`
    SELECT seed FROM daily_run
    WHERE DATE(create_time) = DATE('now', '-1 day');
  `

  return data.rows?.[0]
})
