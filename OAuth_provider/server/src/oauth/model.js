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

module.exports = {
    createCryptoString,
    createNewOAuthClient
}