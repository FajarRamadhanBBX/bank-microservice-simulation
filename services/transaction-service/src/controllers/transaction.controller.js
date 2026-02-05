const transactionService = require("../services/transaction.service")

const testDb = async (req, res) => {
    try {
        const result = await accountService.testDb();
        return res.status(200).json({
            message: "auth service available",
            status: "success",
            data: result
        });
    } catch (err) {
        return res.status(503).json({
            message: "auth service not available",
            status: "failed",
        });
    }
}

const transaction = async (req, res) => {
    try {
        const auth_id = req.headers["x-user-id"];
        const { sender_num, receiver_num, amount, type } = req.body;
        console.log('controller auth:', auth_id);
        console.log('controller body:', req.body);
        const account_id = await transactionService.getAccountId(auth_id);
        switch (type) {
            case "transfer":
                const transfer = await transactionService.transfer(account_id, sender_num, receiver_num, amount);
                res.status(201).json({ message: 'transfer successfully', transfer });
                break;
            case "withdraw":
                const withdraw = await transactionService.withdraw(account_id, sender_num, amount);
                res.status(201).json({ message: 'withdraw successfully', withdraw });
                break;
            case "topup":
                const topup = await transactionService.topup(account_id, receiver_num, amount);
                res.status(201).json({ message: 'top up successfully', topup });
                break;
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const myTransactionHistory = async (req, res) => {
    try {
        const auth_id = req.headers["x-user-id"];
        const myHistory = await transactionService.myTransactions(auth_id);
        res.status(201).json({ message: 'get history successfully', myHistory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const transactionsHistory = async (req, res) => {
    try {
        const myHistory = await transactionService.allTransactions();
        res.status(201).json({ message: 'get all history successfully', myHistory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    testDb,
    transaction,
    myTransactionHistory,
    transactionsHistory
}