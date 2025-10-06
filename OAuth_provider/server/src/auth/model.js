const crypto = require('crypto');

const createCryptoString = (length, type) => {
    return crypto.randomBytes(length).toString(type);
}

module.exports = {
    createCryptoString
}