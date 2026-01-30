const db = require("../config/db");

const createAccount = async(auth_id, account_number) => {
    const res = await db.query(
        "INSERT INTO accounts (auth_id, account_number) VALUES ($1, $2) RETURNING *",
        [auth_id, account_number]
    )
    return res.rows[0];
}

const getAccountById = async(id) => {
    const res = await db.query(
        "SELECT * FROM accounts WHERE id = $1",
        [id]
    )
    return res.rows[0];
}

const getAccountByAuthId = async(auth_id) => {
    const res = await db.query(
        "SELECT * FROM accounts WHERE auth_id = $1",
        [auth_id]
    )
    return res.rows[0];
}

const getAccountByNumber = async(account_number) => {
    const res = await db.query(
        "SELECT * FROM accounts WHERE account_number = $1",
        [account_number]
    )
    return res.rows[0];
}

const updateAccountStatus = async(id, status) => {
    const res = await db.query(
        "UPDATE accounts SET is_frozen = $1 WHERE id = $2 RETURNING *",
        [status, id]
    )
    return res.rows[0];
} 

const updateBalance = async (number_account, amount) => {
    const res = await db.query(
        "UPDATE accounts SET balance = balance + $1 WHERE account_number = $2",
        [amount, number_account]
    )
    return res;
}

module.exports = {
    createAccount,
    getAccountById,
    getAccountByAuthId,
    getAccountByNumber,
    updateAccountStatus,
    updateBalance
}