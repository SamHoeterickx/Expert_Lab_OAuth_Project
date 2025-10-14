const createNewUser = (userCollection, email, password) => {
    const result = userCollection
}

const findUserByEmail = (userCollection, email, password) => {
    const result = userCollection.findOne({email: email});

    return result
}

module.exports = {
    createNewUser,
    findUserByEmail
}