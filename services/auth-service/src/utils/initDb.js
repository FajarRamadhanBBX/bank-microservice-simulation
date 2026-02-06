const db = require("../config/db");

const initDb = async () => {
    try {
        await db.query(`
            -- 1. Cek dulu apakah Type sudah ada, jika belum baru buat (Pakai blok DO)
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'auth_role') THEN
                    CREATE TYPE auth_role AS ENUM ('admin', 'user');
                END IF;
            END$$;

            -- 2. Buat tabel HANYA jika belum ada (IF NOT EXISTS)
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
        console.log("Database initialized (Type & Table checked).");
    } catch (error) {
        // Log error tetap penting, tapi sekarang error "already exists" tidak akan muncul lagi
        console.error("Error creating table:", error.message);
    }
};

module.exports = initDb;