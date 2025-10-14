const { 
    createUser, 
    findUserByEmail, 
    verifyPassword,
    getTokenInfo,
    findScopeWithClientId,
    findUserById,
    filterUserInfoByScope
} = require('./model.js');

const {
    checkTokenExists
} = require('../oauth/model.js')

const register = async(req, res, userCollection) => {

    try{
        const { name, email, password, repeatPassword } = req.body;
        const existingUser = await findUserByEmail(userCollection, req.body.email);

        if(!name || !email || !password || !repeatPassword){
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

        const newUser = await createUser(userCollection, {name, email, password, repeatPassword});
        const user = await findUserByEmail(userCollection, email);

        if(!user){
            return res.status(404).send({
                status: 404,
                message: "User not found"
            })
        }

        const user_id = user._id;
        const sessionId = user_id.toHexString();
        req.session.userId = sessionId;

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

const login = async(req, res, userCollection) => {
    try{

        const {email, password} = req.body;
        const user = await findUserByEmail(userCollection, email);

        if(!email || !password){
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

        const match = await verifyPassword(password, user.password);

        if(!match){
            res.status(401).send({
                status: 401,
                message: "Invalid Credentials"
            })
        }

        const user_id = user._id;
        const sessionId = user_id.toHexString();
        req.session.userId = sessionId;

        res.status(200).send({
            status: 200,
            message: "Login succesfull",
            sessionId: req.session.userId
        })

    } catch(error){
        console.error('Login error:', error);
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}

const getUserInfo = async(req, res, userCollection, accessTokenCollection, OAuthClientCollection) => {
    const accessToken = req.headers.authorization?.replace('Bearer ', '');

    console.log(accessToken, "accesstoken");
    console.log(req.headers)

    const validToken = checkTokenExists(accessToken, accessTokenCollection);
    if(!validToken || validToken === undefined){
        return res.status(401).send({
            status: 401,
            message: 'Access token is expired or invalid'
        });
    }

    const tokenInfo = await getTokenInfo(accessToken, accessTokenCollection);
    const client_id = tokenInfo.client_id;
    const userId = tokenInfo.userId;

    const clientScopes  = await findScopeWithClientId(client_id, OAuthClientCollection);
    const user = await findUserById(userId, userCollection);
    console.log('user', user)

    if(!user){
        return res.status(404).send({
            status: 404,
            message: 'User not found'
        });
    }

    const userInfo = filterUserInfoByScope(user, clientScopes);
    
    return res.status(200).send({
        status: 200,
        message: 'Succes',
        data: userInfo
    })
}

module.exports = {
    register,
    login,
    getUserInfo
}