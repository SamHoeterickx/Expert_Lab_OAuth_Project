const {
    createNewUser,
    findUserByEmail,
    verifyPassword,
    addUserToDB,
    findUserById
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

        if(!newUser){
            return res.status(409).send({
                status: 409,
                message: 'Failed to create account'
            }) 
        }

        res.cookie('userId', sessionId, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,    
            signed: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).send({
            status: 201,
            message: 'Account created succesfully'
        }) 

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
        const sessionId = user_id.toHexString();
        req.session.userId = sessionId;

        res.cookie('userId', sessionId, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,    
            signed: true,
            maxAge: 24 * 60 * 60 * 1000
        });

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

const saveUser = async (req, res, userCollection) => {
    try{

        const { data } = req.body;

        const existingUser = await findUserByEmail(userCollection, data.email);
        
        if(existingUser){
            const user_id = existingUser._id;
            const sessionId = user_id.toHexString();
            req.session.userId = sessionId;

            res.cookie('userId', sessionId, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,    
                signed: true,
                maxAge: 24 * 60 * 60 * 1000
            });

            return res.status(201).send({
                status: 201, 
                message: 'User login Successfully',
                data: {
                    existingUser
                }
            });
        }


        const user = await addUserToDB(userCollection, data);

        if(!user || !user.acknowledged){
            return res.status(400).send({
                status: 400,
                message: "Error while creating user",
            });
        }
        
        const newUser = await findUserByEmail(userCollection, data.email);
        
        if(!newUser){
            return res.status(404).send({
                status: 404,
                message: 'User not found after creation'
            });
        }

        const user_id = newUser._id;
        const sessionId = user_id.toHexString();
        req.session.userId = sessionId;

        res.cookie('userId', sessionId, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,    
            signed: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(201).send({
            status: 201,
            message: "User created successfully",
            insertedId: user.insertedId
        });

    }catch(error){
        console.error('Create user from OAuth error:', error);
        return res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}

const getMyUserData = async(req, res, userCollection) => {
    try {        
        const userId = req.signedCookies.userId;
        
        if(!userId){
            return res.status(401).send({
                status: 401,
                message: 'Not authenticated'
            });
        }

        const user = await findUserById(userCollection, userId);

        if(!user){
            return res.status(404).send({
                status: 404,
                message: 'User not found'
            });
        }

        return res.status(200).send({
            status: 200,
            message: 'User found successfully',
            data: user
        });

    } catch(error) {
        console.error('Get user data error:', error);
        return res.status(500).send({
            status: 500,
            message: error.message
        });
    }
}

const logout = (req, res) => {
    try {
        const sessionId = req.signedCookies.userId;
        
        res.clearCookie('userId', {
            httpOnly: true, 
            signed: true,  
            path: '/',     
        });

        return res.status(200).send({
            status: 200,
            message: 'Logout successful'
        });

    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).send({
            status: 500,
            message: 'An unexpected error occurred during logout.'
        });
    }
}

module.exports = {
    login,
    register,
    saveUser,
    getMyUserData,
    logout
}