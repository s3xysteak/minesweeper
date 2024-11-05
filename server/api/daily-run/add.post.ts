export default defineEventHandler(async (e) => {
  const { dailyRunId, name, time } = await readBody(e)

  const db = useDatabase()
  await db
    .prepare('INSERT INTO daily_run_user (daily_run_id, username, time) VALUES (?, ?, ?)')
    .run(dailyRunId, name, time)

  return 'ok'
})
