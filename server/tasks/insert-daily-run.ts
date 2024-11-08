export default defineTask({
  async run() {
    const db = hubDatabase()

    await db
      .prepare('INSERT INTO daily_run (seed) VALUES (?1)')
      .bind(rollSeed().toString())
      .run()

    return { result: 'ok' }
  },
})
