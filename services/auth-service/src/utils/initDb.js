const db = require("../config/db");

const initDb = async () => {
    try {
        await db.query(`
            CREATE TYPE auth_role AS ENUM ('admin', 'user');
            CREATE TABLE users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email VARCHAR(255) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role auth_role NOT NULL DEFAULT 'user',
                is_active BOOLEAN NOT NULL DEFAULT true,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log("✅ Table 'auth' created or already exists.");
    } catch (error) {
        console.error("❌ Error creating table:", error.message);
    }
};

module.exports = initDb;