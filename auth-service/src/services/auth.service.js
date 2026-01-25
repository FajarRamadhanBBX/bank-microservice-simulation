const repo = require("../repositories/user.repo");

const {
    hashPassword,
    comparePassword
} = require("../utils/hash");

const { generateToken } = require("../utils/jwt");

const registerUser = async (email, password) => {
    const existingUser = await repo.readUserByEmail(email);
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await hashPassword(password);
    return await repo.createUser(email, hashedPassword);
}

const registerAdmin = async (email, password, role) => {
    const admin = await repo.createAdmin(email, password, role);
    return admin;
}

const loginUser = async (email, password) => {
    const user = await repo.readUserByEmail(email);
    if (!user) {
        throw new Error("User not found");
    }
    
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid){
        throw new Error("Invalid password");
    }

    const token = generateToken(user);
    return { token };
}

const fetchUserByEmail = async (email) => {
    const user = await repo.readUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

const fetchAllUsers = async () => {
    const users = await repo.readAllUsers();
    return users;
}

const updateUserPassword = async (email, newPassword) => {
    const hashedPassword = await hashPassword(newPassword);
    const result = await repo.updateUserPassword(email, hashedPassword);
    return result;
}

const unregisterUserByEmail = async (email) => {
    const result = await repo.deleteUserByEmail(email);
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