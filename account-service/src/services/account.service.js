const repo = require("../repositories/account.repo");
const { generateRandomNumber } = require("../utils/accountNumber")

const createAccount = async (auth_id) => {
    const existingAccount = await repo.getAccountByAuthId(auth_id);
    if (existingAccount) {
        throw new Error("This person have an account!");
    }
    
    let accountNumber;
    let isAccountExists = true;

    while (isAccountExists) {
        accountNumber = await generateRandomNumber(16);
        const check = await repo.getAccountByNumber(accountNumber);
        
        if (!check) {
            isAccountExists = false;
        }
    }
    
    const account = await repo.createAccount(auth_id, accountNumber);
    return account;
}

const getMyAccount = async (auth_id) => {
    const myAccount = await repo.getAccountByAuthId(auth_id);
    if (!myAccount) {
        throw new Error("Account not found");
    }
    return myAccount;
}

const freezeAccount = async (id, is_active) => {
    const profileExist = await repo.getAccountById(id);
    if (!profileExist) {
        throw new Error("Not find account");
    }
    const changeStatus = await repo.updateAccountStatus(id, is_active);
    return changeStatus;
}

const lookupAccount = async (account_number) => {
    const account = await repo.getAccountByNumber(account_number);
    if (!account) {
        throw new Error("Account doesn't exist");
    }

    return {
        account_number: account.account_number
    }
}

const updateBalance = async (account_number, amount) => {
    const account = await repo.getAccountByNumber(account_number);
    if (!account) {
        throw new Error("Account doesn't exist");
    }

    const currentBalance = parseFloat(account.balance);
    const diff = currentBalance + amount 
    if (diff < 0) {
        throw new Error("Not enough money")
    }

    const updateBalance = await repo.updateBalance(account_number, amount);
    return updateBalance;
}

module.exports = {
    createAccount,
    getMyAccount,
    freezeAccount,
    lookupAccount,
    updateBalance
}