const {
    createUser,
    createAdmin,
    getUserByEmail,
    getAllUsers,
    changeUserPassword,
    removeUserByEmail
} = require("../repositories/user.repo");

const registerUser = async (email, password) => {
    const user = await createUser(email, password);
    return user;
}

const registerAdmin = async (email, password, role) => {
    const admin = await createAdmin(email, password, role);
    return admin;
}

const fetchUserByEmail = async (email) => {
    const user = await getUserByEmail(email);
    return user;
}

const fetchAllUsers = async () => {
    const users = await getAllUsers();
    return users;
}

const updateUserPassword = async (email, newPassword) => {
    const result = await changeUserPassword(email, password)
    return result;
}

const unregisterUserByEmail = async (email) => {
    const result = await removeUserByEmail(email);
    return result;
}

module.exports = {
    registerUser,
    registerAdmin,
    fetchUserByEmail,
    fetchAllUsers,
    updateUserPassword,
    unregisterUserByEmail
}