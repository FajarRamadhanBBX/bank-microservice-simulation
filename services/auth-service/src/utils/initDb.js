const db = require("../config/db");

const initDb = async () => {
  try {
    await db.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'auth_role') THEN
          CREATE TYPE auth_role AS ENUM ('admin', 'user');
        END IF;
      END$$;

      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role auth_role NOT NULL DEFAULT 'user',
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Table 'users' created or already exists.");
  } catch (err) {
    console.error("DB init failed:", err);
    process.exit(1); 
  }
};


module.exports = initDb;