const repo = require("../repositories/transaction.repo");
const axios = require("axios");
const { ACCOUNT_SERVICE } = require("../config/services");

const getAccountId = async (auth_id) => {
    try {
        console.log("service get accoutId, id:",auth_id)
        const response = await axios.get(`${ACCOUNT_SERVICE}/accounts/internal/account`,
            {
                params:{
                    auth_id: auth_id
                }
            }
        );
        console.log("response:", response.data)
        return response.data.data.auth_id;
    } catch (error) {
        throw new Error("Failed to contact Account Service");
    }
};

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

const transfer = async (account_id, senderNum, receiverNum, amount) => {
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
        account_id,
        senderNum,
        receiverNum,
        amount,
        'transfer',
        'success'
    );

    return log;
};

const withdraw = async (account_id, senderNum, amount) => {
    if (amount <= 0) throw new Error("Amount must be positive");

    await callAccountService(senderNum, -amount);

    const log = await repo.createTransaction(
        account_id,
        senderNum,
        null,
        amount,
        'withdraw',
        'success'
    );

    return log;
};

const topup = async (account_id, receiverNum, amount) => {
    if (amount <= 0) throw new Error("Amount must be positive");

    await callAccountService(receiverNum, amount);

    const log = await repo.createTransaction(
        account_id,
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
    allTransactions,
    getAccountId
};