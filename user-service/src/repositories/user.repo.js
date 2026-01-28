const db = require('../config/db');

const createUserProfile = async(auth_id, fullname, phone, address) => {
    const res = await db.query(
        "INSERT INTO profiles (auth_id, fullname, phone, address) VALUES ($1, $2, $3, $4)",
        [auth_id, fullname, phone, address]
    )
    return res;
}

const readUserProfileByAuthId = async(auth_id) => {
    const res = await db.query(
        "SELECT * FROM profiles WHERE auth_id = $1",
        [auth_id]
    )
    return res.rows[0];
}

const readAllProfiles = async() => {
    const res = await db.query(
        "SELECT * FROM profiles"
    )
    return res.rows;
}

const updateUserProfile = async(auth_id, fullname, phone, address) => {
    const res = await db.query(
        "UPDATE profiles SET fullname = $1, phone = $2, address = $3 WHERE auth_id = $4",
        [fullname, phone, address, auth_id]
    )
    return res;
}

const deleteUserProfileByAuthId = async(auth_id) => {
    const res = await db.query(
        "DELETE FROM profiles WHERE auth_id = $1",
        [auth_id]
    )
    return res;
}

module.exports = {
    createUserProfile,
    readUserProfileByAuthId,
    readAllProfiles,
    updateUserProfile,
    deleteUserProfileByAuthId
}