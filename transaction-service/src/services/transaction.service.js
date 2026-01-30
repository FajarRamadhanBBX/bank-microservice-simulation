const repo = require("../repositories/transaction.repo");
const axios = require("axios");
const { ACCOUNT_SERVICE } = require("../config/services"); // http://localhost:4002

const callAccountService = async (accountNumber, amount) => {
    try {
        const response = await axios.post(`${ACCOUNT_SERVICE}/accounts/internal/balance`, {
            account_number: accountNumber,
            amount: amount
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to contact Account Service");
    }
};

const transfer = async (senderNum, receiverNum, amount) => {
    const auth_id = req.headers["x-user-id"];
    if (amount <= 0) throw new Error("Amount must be positive");
    if (senderNum === receiverNum) throw new Error("Cannot transfer to self");

    await callAccountService(senderNum, -amount);

    try {
        await callAccountService(receiverNum, amount);
    } catch (error) {
        console.error("Transfer failed, refunding sender...");
        await callAccountService(senderNum, amount);
        throw new Error(`Transfer failed: ${error.message}`);
    }

    const log = await repo.createTransaction(
        auth_id,
        senderNum,
        receiverNum,
        amount,
        'transfer',
        'success'
    );

    return log;
};

const withdraw = async (senderNum, amount) => {
    const auth_id = req.headers["x-user-id"];
    if (amount <= 0) throw new Error("Amount must be positive");

    await callAccountService(senderNum, -amount);

    const log = await repo.createTransaction(
        auth_id,
        senderNum,
        null,
        amount,
        'withdraw',
        'success'
    );

    return log;
};

const topup = async (receiverNum, amount) => {
    const auth_id = req.headers["x-user-id"];
    if (amount <= 0) throw new Error("Amount must be positive");

    await callAccountService(receiverNum, amount);

    const log = await repo.createTransaction(
        auth_id,
        null,
        receiverNum,
        amount,
        'topup',
        'success'
    );

    return log;
};

const myTransactions = async (authId) => {
    let myAccountNumber;
    try {
        const res = await axios.get(`${ACCOUNT_SERVICE}/accounts/me`, {
            headers: { "x-user-id": authId }
        });
        myAccountNumber = res.data.data.account_number;
    } catch (err) {
        throw new Error("Gagal mengambil data akun user");
    }

    return await repo.getTransactionsByAccount(myAccountNumber);
};

const allTransactions = async () => {
    return await repo.getAllTransactions();
};

module.exports = {
    transfer,
    withdraw,
    topup,
    myTransactions,
    allTransactions
};