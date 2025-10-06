const { createUser, findUserByEmail, verifyPassword} = require('./model.js');

const register = async(req, res, collection) => {

    try{
        const { name, email, password, repeatPassword } = req.body;
        const existingUser = await findUserByEmail(collection, req.body.email);

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
        res.status(500).send({
            status: 500,
            message: error.message
        });
    }
}

const login = async(req, res, collection) => {
    try{

        const {email, password} = req.body;
        const user = await findUserByEmail(collection, email);

        if(!email, !password){
            res.status(422).send({
                status: 422,
                message: "Missing login info"
            });
        }

        if(!user){
            res.status(401).send({
                status: 401,
                message: "Invalid Credentials"
            })
        }

        console.log(user)

        const match = await verifyPassword(password, user.password);

        if(!match){
            res.status(401).send({
                status: 401,
                message: "Invalid Credentials"
            })
        }

        req.session.userid = user._id;

        console.log(req.session);

        res.status(200).send({
            status: 200,
            message: "Login succesfull"
        })

    } catch(error){
        console.error('Login error:', error);
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}

module.exports = {
    register,
    login
}