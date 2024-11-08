export default defineEventHandler(async (e) => {
  const { dailyRunId, name, time } = await readBody(e)

  const db = hubDatabase()
  await db
    .prepare('INSERT INTO daily_run_user (daily_run_id, username, time) VALUES (?1, ?2, ?3)')
    .bind(dailyRunId, name, time)
    .run()

  return 'ok'
})
