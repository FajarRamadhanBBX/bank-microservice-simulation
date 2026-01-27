const db = require("../config/db");

const createUser = async (email, password) => {
    const res = await db.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, password]
    )
    return res;
}

const createAdmin = async (email, password, role) => {
    const res = await db.query(
        "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)",
        [email, password, role]
    )
    return res;
}

const readUserByEmail = async (email) => {
    const res = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    )
    return res.rows[0];
}

const readAllUsers = async () => {
    const res = await db.query(
        "SELECT * FROM users"
    )
    return res.rows;
}

const updateUserStatus = async (email, status) => {
    const res = await db.query(
        "UPDATE users SET is_active = $1 WHERE email = $2",
    [status, email]
    )
}

const updateUserPassword = async (email, newPassword) => {
    const res = await db.query(
        "UPDATE users SET password = $1 WHERE email = $2",
        [newPassword, email]
    )
    return res;
}

module.exports = {
    createUser,
    createAdmin,
    readUserByEmail,
    readAllUsers,
    updateUserPassword,
    deleteUserByEmail
}