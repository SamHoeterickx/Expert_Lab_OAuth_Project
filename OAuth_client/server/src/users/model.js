const bcrypt = require('bcrypt');

const createNewUser = async (userCollection, userData) => {

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const result = await userCollection.insertOne({
        name: userData.name,
        email: userData.email,
        password: hashedPassword
    })

    return result
}

const findUserByEmail = async (userCollection, email) => {
    const result = await userCollection.findOne({email: email});
    return result
}

const verifyPassword = async (password, hashedpassword) => {
    return await bcrypt.compare(password, hashedpassword);
}

const addUserToDB = async (userCollection, data) => {
    const result = await userCollection.insertOne({
        ...data
    })
    return result
}

module.exports = {
    createNewUser,
    findUserByEmail,
    verifyPassword,
    addUserToDB
}