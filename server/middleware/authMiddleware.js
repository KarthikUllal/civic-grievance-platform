const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyToken = (req, res, next) => {

    try {
        let token

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
        }

        if (!token) {
            res.status(401).json({
                message: "Access denied. No token provided"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        next()
    }
    catch (err) {
        res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = verifyToken



