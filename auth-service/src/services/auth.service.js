const {
    createUser,
    createAdmin,
    getUserByEmail,
    getAllUsers,
    changeUserPassword,
    removeUserByEmail
} = require("../repositories/user.repo");

const {
    hashPassword,
    comparePassword
} = require("../utils/hash");

const registerUser = async (email, password) => {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await hashPassword(password);
    return await createUser(email, hashedPassword);
}

const registerAdmin = async (email, password, role) => {
    const admin = await createAdmin(email, password, role);
    return admin;
}

const loginUser = async (email, password) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error("User not found");
    }
    
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid){
        throw new Error("Invalid password");
    }

    return {
        id: user.id,
        email: user.email,
        role: user.role
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
    const hashedPassword = await hashPassword(newPassword);
    const result = await changeUserPassword(email, hashedPassword)
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