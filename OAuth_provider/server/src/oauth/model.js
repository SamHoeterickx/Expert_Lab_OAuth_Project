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

const generateAuthCode = () => {
    return crypto.randomBytes(10).toString('hex');
}

const saveAuthCode = async (userId, client_id, tokenCollection) => {
    const authCode = generateAuthCode();

    //expires_at gaat door Date.now - expiresIn in het verleden liggen waardoor deze verwijderd wordt

    await tokenCollection.createIndex(
        {createdAt: 1},
        {expireAfterSeconds: 60 * 5}
    );

    const result = await tokenCollection.insertOne({
        userId: userId,
        client_id: client_id,
        createdAt: new Date()
    });

    console.log(result);

    return authCode
}

// const getAuthCode = (authCode) => {
//     const result = pendingAuthCodes[authCode];

//     if(!result) return null;

//     if(result.expires_at > Date.now()){
//         return result;
//     }else{
//         deleteAuthCode(authCode);
//         return null;
//     }
// }

// const deleteAuthCode = (authCode) => {
//     delete pendingAuthCodes[authCode];
// }

module.exports = {
    createCryptoString,
    createNewOAuthClient,
    findClientByClientid,
    saveAuthCode,
    // getAuthCode,
    // deleteAuthCode
}