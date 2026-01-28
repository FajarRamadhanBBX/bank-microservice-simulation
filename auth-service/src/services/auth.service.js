const repo = require("../repositories/auth.repo");

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
    const existingUser = await repo.readUserByEmail(email);
    if (existingUser) {
        throw new Error("Admin already exists");
    }
    const hashedPassword = await hashPassword(password);
    return await repo.createAdmin(email, hashedPassword, role);
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

    if (!user.is_active){
        throw new Error("User is not active");
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

const updateStatusByUser = async (email, newStatus) => {
    const user = await repo.readUserByEmail(email);
    if (!user.is_active) {
        throw new Error("Disabled to change");
    }
    const result = await repo.updateUserStatus(email, newStatus);
    return result
}

const updateStatusByAdmin = async (email, newStatus) => {
    const user = await repo.readUserByEmail(email);
    const result = await repo.updateUserStatus(user.email, newStatus);
    return result
}

module.exports = {
    registerUser,
    registerAdmin,
    loginUser,
    fetchUserByEmail,
    fetchAllUsers,
    updateUserPassword,
    updateStatusByUser,
    updateStatusByAdmin
}