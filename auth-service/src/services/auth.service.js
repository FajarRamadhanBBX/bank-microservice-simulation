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

const loginUser = async (email, password, role) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    if (user.password !== password) {
        throw new Error('Invalid password');
    }
}

const fetchUserByEmail = async (email) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

const fetchAllUsers = async () => {
    const users = await getAllUsers();
    return users;
}

const updateUserPassword = async (email, newPassword) => {
    const result = await changeUserPassword(email, newPassword)
    return result;
}

const unregisterUserByEmail = async (email) => {
    const result = await removeUserByEmail(email);
    return result;
}

module.exports = {
    registerUser,
    registerAdmin,
    loginUser,
    fetchUserByEmail,
    fetchAllUsers,
    updateUserPassword,
    unregisterUserByEmail
}