
const generateState = () => {
    return crypto.randomBytes(64).toHexString();
}

const safeState = (authStateCollection) => {

}

module.exports = {
    generateState,
    safeState
}