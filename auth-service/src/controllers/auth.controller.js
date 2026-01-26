const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.registerUser(email, password);
        res.status(201).json({ message: 'User registered successfully', user });
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
        const { email } = req.params;
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
    register,
    login,
    getAllUsers,
    getUser,
    updatePassword,
    unregisterUser
}