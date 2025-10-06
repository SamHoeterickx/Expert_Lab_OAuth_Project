const { createUser, findByEmail} = require('./model.js');

const register = async(req, res, collection) => {

    try{
        const { name, email, password, repeatPassword } = req.body;
        const existingUser = findByEmail(collection, req.body.email);

        if(!name, !email, !password, !repeatPassword){
            res.status(422).send({
                status: 422,
                message: "Missing register info"
            });
        }

        if(password !== repeatPassword){
            res.status(401).send({
                status: 401,
                message: "Passwords don't match"
            })
        }

        if(existingUser){
            res.status(409).send({
                status: 409,
                message: "Email already in use"
            })            
        }

        await createUser(collection, {name, email, password, repeatPassword});
        res.status(201).send({
            status: 201,
            message: "Account created succesfully"
        })

    } catch (error) {
        res.status(500).send({message: error});
    }
}

const login = async(req, res, collection) => {

}

module.exports = {
    register,
    login
}