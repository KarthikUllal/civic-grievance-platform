const crypto = require("crypto")

const generateOtp = () => {
    return crypto.randomInt(1000, 9999).toString()
}

module.exports = generateOtp
