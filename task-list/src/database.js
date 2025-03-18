import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

/**
 * Gets a connection to the SQLite database.
 * If the database does not exist, it will be created.
 * If the database does not have the required table, it will be created.
 * @returns {Promise<sqlite3.Database>} A promise that resolves to the database connection.
 */
export async function getDatabase() {
  const database = await open({
    filename: ':memory:',
    driver: sqlite3.Database,
  });

  await database.exec(`CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      completed BOOLEAN DEFAULT 0
    )
  `);

  return database;
}
