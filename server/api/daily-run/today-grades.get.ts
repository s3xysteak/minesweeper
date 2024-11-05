export default defineEventHandler(async (e) => {
  const { dailyRunId } = getQuery<{ dailyRunId: string }>(e)

  const db = useDatabase()
  const res = await db.prepare(`
    SELECT 
      RANK() OVER (ORDER BY time) AS rank,
      id, 
      username, 
      time 
    FROM daily_run_user
    WHERE daily_run_id = ? ORDER BY time;
  `).all(dailyRunId)

  return res
})
