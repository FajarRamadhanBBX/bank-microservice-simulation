const transactionService = require("../services/transaction.service")

const transaction = async (req, res) => {
    try {
        const { account_id, sender_num, receiver_num, amount, type } = req.body;
        switch (type) {
            case "transfer":
                const transfer = await transactionService.transfer(account_id, sender_num, receiver_num, amount, type);
                res.status(201).json({ message: 'transfer successfully', transfer });
                break;
            case "withdraw":
                const withdraw = await transactionService.withdraw(account_id, sender_num, amount, type);
                res.status(201).json({ message: 'withdraw successfully', withdraw });
                break;
            case "topup":
                const topup = await transactionService.topup(account_id, receiver_num, amount, type);
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
    transaction,
    myTransactionHistory,
    transactionsHistory
}