const userService = require('../services/user.service');

const createProfile = async (req, res) => {
    try {
        const { auth_id, fullname, phone, address } = req.body;
        const profile = await userService.createUserProfile(auth_id, fullname, phone, address);
        res.status(201).json({ message: 'User profile created successfully', profile });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getProfile = async (req, res) => {
    try {
        const { auth_id } = req.params;
        const profile = await userService.fetchProfileByAuthId(auth_id);
        res.status(200).json({ profile });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

const getAllProfiles = async (req, res) => {
    try {
        const profiles = await userService.fetchAllProfiles();
        res.status(200).json({ profiles });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getMe = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const user = await userService.fetchProfileByAuthId(userId);
        res.status(200).json({ user });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }   
}

const updateMyProfile = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { fullname, phone, address } = req.body;
        const updatedProfile = await userService.updateUserProfile(userId, fullname, phone, address);
        res.status(200).json({ message: 'Profile updated successfully', updatedProfile });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteMyProfile = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const result = await userService.removeUserProfile(userId);
        res.status(200).json({ message: 'Profile deleted successfully', result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createProfile,
    getProfile,
    getAllProfiles,
    getMe,
    updateMyProfile,
    deleteMyProfile
}