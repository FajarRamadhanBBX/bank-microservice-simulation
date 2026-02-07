const axios = require("axios");
const { ACCOUNT_SERVICE } = require("../config/services");

const createAccount = async (req, res) => {
    try {
        const response = await axios.post(
            `${ACCOUNT_SERVICE}/accounts`,
            {},
            {
                headers: {
                    "x-user-id": req.user.id,
                    "x-user-role": req.user.role
                }
            }
        )
        return res.status(201).json({ message: "Profile created successfully.", data: response.data });
    } catch(err) {
        return res.status(500).json({message: "Create profile failed"});
    }
}

const myAccount = async (req, res) => {
    try {
        const response = await axios.get(
            `${ACCOUNT_SERVICE}/accounts/me`,
            {
                headers: {
                    "x-user-id": req.user.id,
                    "x-user-role": req.user.role
                }
            }
        )
        return res.status(201).json({ message: "get profile successfully", data: response.data });
    } catch(err) {
        return res.status(500).json({message: "profile not find"});
    }
}

const freezeAccount = async (req, res) => {
    try {
        const response = await axios.put(
            `${ACCOUNT_SERVICE}/accounts/admin/freeze`,
            req.body,
            {
                headers: {
                    "x-user-id": req.user.id,
                    "x-user-role": req.user.role
                }
            }
        )
        return res.status(201).json({ message: "freeze account successfully", data: response.data });
    } catch(err) {
        return res.status(500).json({message: "freeze account failed"});
    }
}

const lookupAccount = async (req, res) => {
    try {
        const response = await axios.get(
            `${ACCOUNT_SERVICE}/accounts/lookup`,
            {
                params: req.query,
                headers: {
                    "x-user-id": req.user.id,
                    "x-user-role": req.user.role
                }
            }
        )
        return res.status(201).json({ message: "lookup successfully", data: response.data });
    } catch(err) {
        return res.status(500).json({message: "lookup failed"});
    }
}

const updateBalance = async (req, res) => {
    try {
        const response = await axios.post(
            `${ACCOUNT_SERVICE}/accounts/internal/balance`,
            req.body,
            {
                headers: {
                    "x-internal-secret": process.env.INTERNAL_SERVICE_SECRET
                }
            }
        )
        return res.status(201).json({ message: "balance updated successfully", data: response.data });
    } catch(err) {
        return res.status(500).json({message: "failed update balance"});
    }
}

module.exports = {
    createAccount,
    myAccount,
    freezeAccount,
    lookupAccount,
    updateBalance
}