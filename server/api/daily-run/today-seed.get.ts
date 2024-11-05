export default defineEventHandler(async () => {
  const db = useDatabase()

  const value = await db.sql`
  SELECT id, seed FROM daily_run
  WHERE DATE(create_time) = CURRENT_DATE;`

  return value.rows?.[0]
})
