const authService = require('../services/auth.service');

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.registerUser(email, password);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const login = await authService.loginUser(email, password);
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

