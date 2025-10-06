const { createUser, findByEmail} = require('./model.js');

const register = async(req, res, collection) => {

    try{
        const { name, email, password, repeatPassword } = req.body;
        const existingUser = await findByEmail(collection, req.body.email);

        if(!name, !email, !password, !repeatPassword){
            return res.status(422).send({
                status: 422,
                message: "Missing register info"
            });
        }

        if(password !== repeatPassword){
            return res.status(401).send({
                status: 401,
                message: "Passwords don't match"
            })
        }

        if(existingUser){
            return res.status(409).send({
                status: 409,
                message: "Email already in use"
            })            
        }

        const newUser = await createUser(collection, {name, email, password, repeatPassword});
        if(newUser) {
            return res.status(201).send({
                status: 201,
                message: "Account created succesfully"
            })
        }

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).send({message: error.message});
    }
}

const login = async(req, res, collection) => {
    try{

        

    } catch(error){
        console.error('Login error:', error);
        res.status(500).send({message: error.message})
    }
}

module.exports = {
    register,
    login
}