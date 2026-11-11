const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const schema = require('../db/schema');

let db;

function getDatabase() {
  if (!db) {
    const databaseUrl = process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }

    const client = postgres(databaseUrl, { max: 10 });
    db = drizzle(client, { schema });
  }
  
  return db;
}

module.exports = { getDatabase };
