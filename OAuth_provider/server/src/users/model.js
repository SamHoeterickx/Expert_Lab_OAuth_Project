const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

const createUser = async (collection, { name, email, password}) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result =  await collection.insertOne({
        name: name,
        email: email,
        password: hashedPassword
    });

    return result;
}

const findUserByEmail = async (collection, email) => {
    return await collection.findOne({ email: email });
}

const findUserById = async (userId, collection) => {
    return await collection.findOne({_id: new ObjectId(userId)});
}

const verifyPassword = async (password, hashedpassword) => {
    return await bcrypt.compare(password, hashedpassword);
}

const getTokenInfo = async (accessToken, accessTokenCollection) => {
    const result = await accessTokenCollection.findOne({
        access_token: accessToken
    });

    console.log(result);
    return result
}

const findScopeWithClientId = async (client_id, OAuthClientCollection) => {
    const result = await OAuthClientCollection.findOne(
        {client_id: client_id},
        {projection: { scope: 1 , _id: 0} }
    );

    return result.scope
}

const filterUserInfoByScope = (user, clientScopes) => {
    const userInfo = {};

    if(clientScopes.includes('openid') || clientScopes.includes('profiel')){
        userInfo.sub = user._id;
    }

    if(clientScopes.includes('profile')){
        userInfo.name = user.name;
        userInfo.email = user.email;
    }

    if(clientScopes.includes('email')){
        userInfo.email = user.email;
    }

    return userInfo
}

module.exports = {
    createUser,
    findUserByEmail,
    verifyPassword,
    getTokenInfo,
    findScopeWithClientId,
    findUserById,
    filterUserInfoByScope
}