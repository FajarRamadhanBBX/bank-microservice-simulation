const db = require('../../config/db');

const createUserProfile = async(id, auth_id, fullname, phone, address) => {
    const res = await db.query(
        "INSERT INTO users_profile (id, auth_id, fullname, phone, address) VALUES ($1, $2, $3, $4, $5)",
        [id, auth_id, fullname, phone, address]
    )
    return res;
}

const readUserProfileByAuthId = async(auth_id) => {
    const res = await db.query(
        "SELECT * FROM users_profile WHERE auth_id = $1",
        [auth_id]
    )
    return res.rows[0];
}

const readAllUsers = async() => {
    const res = await db.query(
        "SELECT * FROM users_profile"
    )
    return res.rows;
}

const updateUserProfile = async(auth_id, fullname, phone, address) => {
    const res = await db.query(
        "UPDATE users_profile SET fullname = $1, phone = $2, address = $3 WHERE auth_id = $4",
        [fullname, phone, address, auth_id]
    )
    return res;
}

const deleteUserProfileByAuthId = async(auth_id) => {
    const res = await db.query(
        "DELETE FROM users_profile WHERE auth_id = $1",
        [auth_id]
    )
    return res;
}

module.exports = {
    createUserProfile,
    readUserProfileByAuthId,
    readAllUsers,
    updateUserProfile,
    deleteUserProfileByAuthId
}