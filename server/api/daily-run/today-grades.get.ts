export default defineEventHandler(async (e) => {
  const { dailyRunId } = getQuery<{ dailyRunId: string }>(e)

  const db = hubDatabase()
  const res = await db.prepare(`
    SELECT
      RANK() OVER (ORDER BY time) AS rank,
      id, 
      username, 
      time 
    FROM daily_run_user
    WHERE daily_run_id = ?1 ORDER BY time;
  `)
    .bind(dailyRunId)
    .all()

  return res.results
})
