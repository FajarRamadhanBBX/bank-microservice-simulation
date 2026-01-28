const axios = require("axios");
const { USER_SERVICE } = require("../config/services");

const createProfile = async(req, res) => {
    try {
        const response = await axios.post(
            `${USER_SERVICE}/users/profiles`,
            req.body,
            {
                headers: {
                    "x-user-id": req.user.id,
                    "x-user-role": req.user.role
                }
            }
        )
        return res.status(201).json({ message: "Profile created successfully", data: response.data });
    } catch(err) {
        return res.status(500).json({message: "Create profile failed"});
    }
}

const getMyProfile = async(req, res) => {
    try {
        const response = await axios.get(
            `${USER_SERVICE}/users/profiles/me`,
            {
                headers: {
                    "x-user-id": req.user.id,
                    "x-user-role": req.user.role
                }
            }
        )
        console.log("response", response);
        return res.status(200).json({ message: "User retrieved successfully", data: response.data });
    } catch (err) {
        return res.status(500).json({message: "User service error"});
    }
}

const updateMyProfile = async(req, res) => {
    try {
        const response = await axios.put(
            `${USER_SERVICE}/users/profiles/me`,
            req.body,
            {
                headers: {
                    "x-user-id": req.user.id,
                    "x-user-role": req.user.role
                },
            }
        )
        return res.status(200).json({ message: "User retrieved successfully", data: response.data });
    } catch(err) {
        return res.status(500).json({message: "Update profile failed"});
    }
}

const getAllProfiles = async(req, res) => {
    try {
        const response = await axios.get(
            `${USER_SERVICE}/users/profiles`,
            {
                headers: {
                    "x-user-id": req.user.id,
                    "x-user-role": req.user.role
                }
            }
        )
    } catch(err) {
        return res.status(500).json({message: "Get all profiles failed"});
    }
}

module.exports = {
    createProfile,
    getMyProfile,
    getAllProfiles,
    getMyProfile,
    updateMyProfile,
};