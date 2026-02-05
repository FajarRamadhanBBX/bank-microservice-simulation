const db = require("../config/db");

const selectOne = async() => {
    const res = await db.query("SELECT 1");
    return res;
}

const createTransaction = async(auth_id, from_account_number, to_account_number, amount, type) => {
    const res = await db.query(
        "INSERT INTO transactions (auth_id, from_account_number, to_account_number, amount, type) VALUES ($1, $2, $3, $4, $5)",
        [auth_id, from_account_number, to_account_number, amount, type]
    )
    return res;
}

const getTransactionsByAccount = async (account_number) => {
    const res = await db.query(
        "SELECT * FROM transactions WHERE from_account_number = $1 OR to_account_number = $1",
        [account_number]
    )
    return res.rows[0];
}

const getAllTransactions = async () => {
    const res = await db.query(
        "SELECT * FROM transactions"
    )
    return res;
}

module.exports = {
    selectOne,
    createTransaction,
    getTransactionsByAccount,
    getAllTransactions
}