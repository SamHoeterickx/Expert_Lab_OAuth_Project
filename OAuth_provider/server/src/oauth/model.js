const crypto = require('crypto');

const createCryptoString = (length, type) => {
    return crypto.randomBytes(length).toString(type);
}

const createNewOAuthClient = async (collection, { client_name, redirect_uri, scope, client_uri, owner_email, client_id, client_secret }) => {
    const result = await collection.insertOne({
        client_name: client_name,
        redirect_uri: redirect_uri,
        client_uri: client_uri,
        owner_email: owner_email,
        scope: scope,
        client_id: client_id,
        client_secret: client_secret
    });

    return result
}

const findClientByClientid = async (collection, client_id) => {
    const result = await collection.findOne({ client_id: client_id });

    return result;
}

const findClientByClientIdAndSecret = async (collection, client_id, client_secret) => {
    const result = await collection.findOne({
        client_id: client_id,
        client_secret: client_secret
    });

    return result;
}

const generateAuthCode = () => {
    return crypto.randomBytes(10).toString('hex');
}

const saveAuthCode = async (userId, client_id, tokenCollection) => {
    const authCode = generateAuthCode();

    const result = await tokenCollection.insertOne({
        token: authCode,
        userId: userId,
        client_id: client_id,
        createdAt: new Date()
    });

    return authCode
}

const checkTokenExists = async (token, collection) => {
    const result = await collection.findOne({ token: token});

    return result
}

const generateAccessToken = () => {
    return crypto.randomBytes(64).toString('hex');
}

const saveAccessToken  = async (accesTokenCollection, userId, accessToken, client_id) => {

    const result = await accesTokenCollection.insertOne({
        access_token: accessToken,
        client_id: client_id,
        userId: userId,
        token_type: "Bearer",
        expires_at: 60 * 60,
        createdAt: new Date()
    })

    return data = {
        accessToken,
        token_type: 'Bearer',
        expires_at:  60 * 60
    }
}


module.exports = {
    createCryptoString,
    createNewOAuthClient,
    findClientByClientid,
    findClientByClientIdAndSecret,
    saveAuthCode,
    checkTokenExists,
    generateAccessToken,
    saveAccessToken
}