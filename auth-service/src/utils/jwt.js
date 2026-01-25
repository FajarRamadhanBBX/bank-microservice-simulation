const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/jwt');

const generateToken = (user) => {
    const token = jwt.sign(
        {id: user.id},
        jwtSecret,
        { expiresIn: jwtExpiresIn }
    )
    return token;
}

module.exports = {
    generateToken
};