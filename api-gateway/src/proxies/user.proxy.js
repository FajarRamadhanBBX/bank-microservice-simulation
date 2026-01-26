const axios = require("axios");
const {
    USER_SERVICE
} = require("../config/services");

const getMe = async(req, res) => {
    try {
        console.log("req.user", req.user);
        const response = await axios.get(
            `${USER_SERVICE}/users/me`,
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

module.exports = {
    getMe
};