const axios = require("axios");
const { TRANSACTIONS_SERVICE } = require("../config/services");

const transaction = async(req, res) => {
    try {
        console.log("proxy, req:", req.body);
        const response = await axios.post(
            `${TRANSACTIONS_SERVICE}/transactions`,
            req.body,
            {
                headers: {
                    "x-user-id": req.user.id,
                    "x-user-role": req.user.role
                }
            }
        )
        return res.status(201).json({ message: "Transaction successfully", data: response.data });
    } catch(err) {
        return res.status(500).json({message: "Transaction failed"});
    }
}

const myTransactionHistory = async(req, res) => {
    try {
        const response = await axios.get(
            `${TRANSACTIONS_SERVICE}/transactions/me`,
            {
                headers: {
                    "x-user-id": req.user.id,
                    "x-user-role": req.user.role
                }
            }
        )
        return res.status(201).json({ message: "get history successfully", data: response.data });
    } catch(err) {
        return res.status(500).json({message: "get history failed"});
    }
}

const allTransactionsHistory = async(req, res) => {
    try {
        const response = await axios.get(
            `${TRANSACTIONS_SERVICE}/transactions/admin/history`,
            {
                headers: {
                    "x-user-id": req.user.id,
                    "x-user-role": req.user.role
                }
            }
        )
        return res.status(201).json({ message: "get history successfully", data: response.data });
    } catch(err) {
        return res.status(500).json({message: "get history failed"});
    }
}

module.exports = {
    transaction,
    myTransactionHistory,
    allTransactionsHistory
}