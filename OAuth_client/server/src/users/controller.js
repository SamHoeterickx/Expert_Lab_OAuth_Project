
const {
    createNewUser,
    findUserByEmail
} = require('./model.js');

const register = (req, res, userCollection) => {
    try{

    }catch(error){
        
    }
}

const login = (req, res, userCollection) => {
    
    try{

        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(422).send({
                status: 422,
                message: 'Missing login info'
            })
        }

        const user = findUserByEmail(userCollection, email, password);

        if(!user){
            return res.status(401).send({
                status: 401,
                message: 'Invalid credentials'
            })
        }

        return res.status(200).send({
            status: 200,
            message: 'Login succesfull'
        })

    }catch(error){
        console.error('Login error:', error);
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}

module.exports = {
    login
}