const authService = require('../services/auth.service');

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

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.registerUser(email, password);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

const registerAdmin = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await authService.registerAdmin(email, password, role);
        res.status(201).json({ message: 'Admin registered successfully', user });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const login = await authService.loginUser(email, password);
        res.status(200).json({ message: 'Login successful', token: login.token });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await authService.fetchAllUsers();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getUser = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await authService.fetchUserByEmail(email);
        res.status(200).json({ user });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

const updatePassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const result = await authService.updateUserPassword(email, newPassword);
        res.status(200).json({ message: 'Password updated successfully', result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deactivateAuth = async (req, res) => {
    try {
        const { email, status } = req.body;
        const result = await authService.updateStatusByUser(email, status);
        res.status(200).json({ message: 'Change status successfully', result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const changeStatusByAdmin = async (req, res) => {
    try {
        const { email, status } = req.body;
        const result = await authService.updateStatusByAdmin(email, status);
        res.status(200).json({ message: 'Change status successfully', result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const unregisterUser = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await authService.unregisterUserByEmail(email);
        res.status(200).json({ message: 'User unregistered successfully', result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    testDb,
    register,
    registerAdmin,
    login,
    getAllUsers,
    getUser,
    updatePassword,
    unregisterUser,
    deactivateAuth,
    changeStatusByAdmin
}