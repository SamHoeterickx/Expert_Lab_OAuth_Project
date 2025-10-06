const bcrypt = require('bcrypt');

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

const verifyPassword = async (password, hashedpassword) => {
    return await bcrypt.compare(password, hashedpassword);
}

module.exports = {
    createUser,
    findUserByEmail,
    verifyPassword
}