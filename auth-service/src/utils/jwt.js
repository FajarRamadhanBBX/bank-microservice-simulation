const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/jwtConfig');

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