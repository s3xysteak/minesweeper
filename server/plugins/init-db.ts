export default defineNitroPlugin(async () => {
  const db = hubDatabase()

  await Promise.all([
    db.exec(`CREATE TABLE IF NOT EXIST "daily_run" (
      "id" INTEGER NOT NULL ON CONFLICT ABORT PRIMARY KEY AUTOINCREMENT,
      "seed" text NOT NULL ON CONFLICT ABORT,
      "create_time" TIMESTAMP NOT NULL ON CONFLICT ABORT DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime'))
    );`),
    db.exec(`CREATE TABLE IF NOT EXIST "daily_run_user" (
      "id" INTEGER NOT NULL ON CONFLICT ABORT PRIMARY KEY AUTOINCREMENT,
      "daily_run_id" INTEGER,
      "create_time" TIMESTAMP NOT NULL ON CONFLICT ABORT DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
      "username" TEXT,
      "time" integer,
      CONSTRAINT "daily_run_id" FOREIGN KEY ("daily_run_id") REFERENCES "daily_run" ("id") ON DELETE SET NULL ON UPDATE CASCADE
    );`),
  ])
})
