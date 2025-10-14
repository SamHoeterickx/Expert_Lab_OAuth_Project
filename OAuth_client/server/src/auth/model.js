const crypto = require('crypto');

const generateState = () => {
    return crypto.randomBytes(64).toString('hex');
}

const saveState = async (authStateCollection, state) => {
    const result = await authStateCollection.insertOne({
        state: state,
        expires_at: 60 * 5,
        createdAt: new Date()
    });

    return result
}

module.exports = {
    generateState,
    saveState
}