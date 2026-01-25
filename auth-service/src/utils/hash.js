const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    return bcrypt.hash(password, 10) // return a promise containing the hashed password
}

const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash) // return a promise containing a boolean(true/false)
}

module.exports = {
    hashPassword,
    comparePassword
}