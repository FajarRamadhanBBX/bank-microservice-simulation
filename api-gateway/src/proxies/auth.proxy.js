const axios = require("axios");
const { AUTH_SERVICE } = require("../config/services")

const register = async (req, res) => {
    try {
        const response = await axios.post(
            `${AUTH_SERVICE}/auth/register`,
            req.body
        )
        return res.status(201).json({ message: "Register successfully", data: response.data });
    } catch(err) {
        return res.status(500).json({message: "Register account failed"});
    }
}

const login = async (req, res) => {
    try {
        const response = await axios.post(
            `${AUTH_SERVICE}/auth/login`,
            req.body
        )
        return res.status(201).json({ message: "login successfully", data: response.data });
    } catch(err) {
        return res.status(500).json({message: "login account failed"});
    }
}

const updateUserPassword = async (req, res) => {
    try {
        const response = await axios.put(
            `${AUTH_SERVICE}/auth/update-password`,
            req.body,
            {
                headers: {
                    "x-user-id": req.user.id,
                }
            }
        )
        return res.status(201).json({ message: "update successfully", data: response.data });
    } catch(err) {
        return res.status(500).json({message: "update password failed"});
    }
}

const deactivateMyAuth = async (req, res) => {
    try {
        const response = await axios.put(
            `${AUTH_SERVICE}/auth/me/deactivate`,
            data.body,
            {
                headers: {
                    "x-user-id": req.user.id,
                }
            }
        )
        return res.status(201).json({ message: "update successfully", data: response.data });
    } catch(err) {
        return res.status(500).json({message: "update failed"});
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const response = await axios.get(
            `${AUTH_SERVICE}/auth/admin/email/${email}`,
            {
                headers: {
                    "x-user-id": req.user.id,
                    "x-user-role": req.user.role
                },
            }
        )
        return res.status(201).json({ message: "process successfully", data: response.data });
    } catch(err) {
        return res.status(500).json({message: "process failed"});
    }
}

const getUsersAuth = async (req, res) => {
    try {
        const response = await axios.get(
            `${AUTH_SERVICE}/auth/admin/users`,
            {
                headers: {
                    "x-user-id": req.user.id,
                    "x-user-role": req.user.role
                }
            }
        )
        return res.status(201).json({ message: "process successfully", data: response.data });
    } catch(err) {
        return res.status(500).json({message: "process failed"});
    }
}

const changeUserStatus = async (req, res) => {
    const id = req.params.id;

    try {
        const response = await axios.put(
            `${AUTH_SERVICE}/auth/admin/${id}/status`,
            {
                headers: {
                    "x-user-id": req.user.id,
                    "x-user-role": req.user.role
                },
                data: req.body
            }
        )
        return res.status(201).json({ message: "update successfully", data: response.data });
    } catch(err) {
        return res.status(500).json({message: "update failed"});
    }
}

module.exports = {
    register,
    login,
    updateUserPassword,
    deactivateMyAuth,
    getUserByEmail,
    getUsersAuth,
    changeUserStatus
}