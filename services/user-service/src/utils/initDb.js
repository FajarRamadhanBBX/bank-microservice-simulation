const db = require("../config/db");

const initDb = async () => {
    try {
        await db.query(`
            CREATE TABLE profiles (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                auth_id UUID UNIQUE NOT NULL, -- Harus tipe UUID juga
                fullname VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                address TEXT,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log("Table 'profiles' created or already exists.");
    } catch (error) {
        console.error("Error creating table:", error.message);
    }
};

module.exports = initDb;