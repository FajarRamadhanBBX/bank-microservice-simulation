const db = require("../config/db");

const initDb = async () => {
    try {
        await db.query(`
            CREATE TABLE accounts (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                auth_id UUID UNIQUE NOT NULL,
                account_number VARCHAR(16) UNIQUE NOT NULL,
                balance DECIMAL(18,2) NOT NULL DEFAULT 0.00,
                is_frozen BOOLEAN NOT NULL DEFAULT false,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log("Table 'accounts' created or already exists.");
    } catch (error) {
        console.error("Error creating table:", error.message);
    }
};

module.exports = initDb;