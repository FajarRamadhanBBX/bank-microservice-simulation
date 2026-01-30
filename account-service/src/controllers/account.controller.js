const accountService = require("../services/account.service");

const createAccount = async (req, res) => {
    try {
        const authId = req.headers['x-user-id'];

        if (!authId) {
            return res.status(401).json({ message: "Unauthorized: User ID missing" });
        }

        const newAccount = await accountService.createAccount(authId);

        return res.status(201).json({
            message: "Account created successfully",
            data: newAccount
        });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const getMyAccount = async (req, res) => {
    try {
        const authId = req.headers['x-user-id'];
        
        if (!authId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const account = await accountService.getMyAccount(authId);

        return res.status(200).json({
            message: "Success",
            data: account
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getAccountInternal = async (req, res) => {
    try {
        const { auth_id } = req.query;
        console.log("account controller, authId:", auth_id);
        const account = await accountService.getAccountByAuthId(auth_id);

        return res.status(200).json({
            message: "Success",
            data: account
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const freezeAccount = async (req, res) => {
    try {
        const { id, is_frozen } = req.body;

        if (is_frozen === undefined) {
            return res.status(400).json({ message: "Field 'is_frozen' is required" });
        }

        const result = await accountService.freezeAccount(id, is_frozen);

        return res.status(200).json({
            message: "Account status updated",
            data: result
        });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};

const lookupAccount = async (req, res) => {
    try {
        const { account_number } = req.query;

        if (!account_number) {
            return res.status(400).json({ message: "body 'account_number' is required" });
        }

        const result = await accountService.lookupAccount(account_number);

        return res.status(200).json({
            message: "Account found",
            data: result
        });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};

const updateBalanceInternal = async (req, res) => {
    try {
        const { account_number, amount } = req.body;

        if (!account_number || amount === undefined) {
            return res.status(400).json({ message: "Invalid payload" });
        }

        const updatedAccount = await accountService.updateBalance(account_number, amount);

        return res.status(200).json({
            message: "Balance updated",
            data: updatedAccount
        });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createAccount,
    getMyAccount,
    freezeAccount,
    lookupAccount,
    getAccountInternal,
    updateBalanceInternal
};