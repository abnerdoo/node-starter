const consts = require('../constants/Consts')
const jwt = require('jsonwebtoken')
const { messages } = require('../constants/Consts')

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ message: consts.messages.access_denied })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded

        next()
    } catch (error) {
        return res.status(400).json({ message: consts.messages.invalid_token })
    }
}

module.exports = authenticateJWT;