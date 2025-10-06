const bcrypt = require('bcrypt');

const createUser = async (collection, { name, email, password}) => {
    const hashedPassword = bcrypt.hash(password, 10);

    const result =  await collection.insertOne({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    return result;
}

const findByEmail = async (collection, email) => {
    return await collection.findOne({ email: email });
}

module.exports = {
    createUser,
    findByEmail
}