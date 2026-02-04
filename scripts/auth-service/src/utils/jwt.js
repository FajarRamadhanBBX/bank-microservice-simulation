const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/jwt');

const generateToken = (user) => {
    const token = jwt.sign(
        {id: user.id, role: user.role},
        jwtSecret,
        { expiresIn: jwtExpiresIn }
    )
    return token;
}

module.exports = {
    generateToken
};