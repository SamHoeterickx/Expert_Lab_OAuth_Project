
const {
    createNewUser,
    findUserByEmail,
    verifyPassword
} = require('./model.js');

const register = async (req, res, userCollection) => {
    try{

        const { name, email, password, repeatPassword } = req.body;

        const userData = {
            name,
            email,
            password, 
            repeatPassword
        };

        const existingUser = await findUserByEmail(userCollection, email);

        if(!name || !email || !password || !repeatPassword){
            return res.status(422).send({
                status: 422,
                message: 'Missing register info'
            });
        }

        if(existingUser){
            return res.status(409).send({
                status: 409,
                message: 'Email already in use'
            });
        }

        if(password !== repeatPassword){
            return res.status(401).send({
                status: 401,
                message: 'Passwords dont match'
            });
        }

        const newUser = await createNewUser(userCollection, userData);
        const user = await findUserByEmail(userCollection, email);

        if(!user){
            return res.status(404).send({
                status: 404,
                message: 'User not found'
            })
        };

        const user_id = user._id;
        const sessionId = user_id.toHexString();
        req.session.userId = sessionId;

        if(newUser){
            return res.status(201).send({
                status: 201,
                message: 'Account created succesfully'
            })
        }

    }catch(error){
        console.error('Register error:', error);
        return res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}

const login = async (req, res, userCollection) => {
    
    try{

        const { email, password } = req.body;
        const user = await findUserByEmail(userCollection, email);

        if(!email || !password) {
            return res.status(422).send({
                status: 422,
                message: 'Missing login info'
            })
        }

        if(!user){
            return res.status(401).send({
                status: 401,
                message: 'Invalid credentials'
            })
        }

        const match = await verifyPassword(password, user.password);
        
        if(!match){
            return res.status(401).send({
                status: 401,
                message: 'Invalid credentials'
            })
        }

        const user_id = user._id;
        const sessioId = user_id.toHexString();
        req.session.userId = sessioId;

        return res.status(200).send({
            status: 200,
            message: 'Login succesfull',
            sessioId: req.session.userId
        })

    }catch(error){
        console.error('Login error:', error);
        return res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}

module.exports = {
    login,
    register
}