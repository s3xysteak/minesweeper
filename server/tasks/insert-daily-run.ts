export default defineTask({
  async run() {
    const db = useDatabase()

    await db
      .prepare('INSERT INTO daily_run (seed) VALUES (?)')
      .run(rollSeed().toString())

    return { result: 'ok' }
  },
})
