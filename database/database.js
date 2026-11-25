const Database = require('better-sqlite3');

// Skapar och/eller öppna databasen
const db = new Database('albums.db');

// Skapar tabellen albums om den inte redan finns
db.prepare(`
    CREATE TABLE IF NOT EXISTS albums (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        release_year INTEGER NOT NULL,
        owned BOOLEAN NOT NULL
    )
`).run();

console.log('Databasen är ansluten!');

module.exports = db;