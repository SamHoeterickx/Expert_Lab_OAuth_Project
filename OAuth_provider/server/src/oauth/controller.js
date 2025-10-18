const { 
    createCryptoString,
    createNewOAuthClient,
    findClientByClientid,
    findClientByClientIdAndSecret,
    saveAuthCode,
    checkTokenExists,
    generateAccessToken,
    saveAccessToken,
    getClientInfoFromClientId
    // getAuthCode,
    // deleteAuthCode,
} = require('./model');

const authorize = async(req, res, collection, tokenCollection) => {
    try{
        const { response_type, client_id, redirect_uri, scope, state } = req.query;

        if(!req.session.userId){
            return res.redirect('https://skyblue-hyena-257309.hostingersite.com/#/auth/login');
        }
        const userId = req.session.userId;

        const client = await findClientByClientid(collection, client_id);
        
        if(response_type !== 'code'){
            return res.status(400).send({
                status: 400,
                message: 'Response type dont match'
            })
        }

        if(!client){
            return res.status(404).send({
                status: 404,
                message: 'OAuth client not found'
            })
        }

        if(redirect_uri !== client.redirect_uri){
            return res.status(400).send({
                status: 400,
                message: "Redirect uri doesn't match"
            })
        }

        return res.status(200).send({
            status: 200,
            message: "Authorization succesfull"
        })

    }catch (error){
        console.error('Authorization client error:', error);
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}

const authConsent = async (req, res, collection, tokenCollection) => {
    try{

        const {client_id, redirect_uri, state, approved } = req.body;
        const userId = req.session.userId;

        const client = await findClientByClientid(collection, client_id);
        if(!client){
            return res.status(404).send({
                status: 404,
                message: 'OAuth client not found'
            })
        }

        if(decodeURIComponent(redirect_uri) !== client.redirect_uri){
            return res.status(400).send({
                status: 400,
                message: "Redirect uri doesn't match"
            })
        }

        if(!approved){
            const redirectURL = `${encodeURIComponent(redirect_uri)}?error=access_denied&state=${state}`;
            return res.json({ redirectUrl: redirectURL }); 
        }

        const authCode = await saveAuthCode(userId, client_id, tokenCollection);

        const redirectURL = `${redirect_uri}?code=${authCode}&state=${state}`;
        return res.json({ redirectUrl: redirectURL });

    }catch(error){
        console.error('Error while giving consest', error);
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}

const registerClient = async(req, res, collection) => {
    try{

        const { client_name, redirect_uri, scope, client_uri, owner_email } = req.body
        //Geen check voor user want wil dat deze route pas zichtbaar is als je ingelogd bent

        const result = await collection.findOne({owner_email: owner_email});

        if(result){
            return res.status(409).send({
                status: 409,
                message: 'This service is already registered to your account'
            })
        }

        const client_id = createCryptoString(16, 'hex');
        const client_secret = createCryptoString(32, 'hex');

        const newClient = await createNewOAuthClient(collection, {client_name, redirect_uri, scope, client_uri, owner_email, client_id, client_secret})
        if(newClient){
            return res.status(201).send({
                status: 201,
                message: "OAuth client registered succesfully",
                client_id: client_id,
                client_secret: client_secret
            });
        }

    }catch (error){
        console.error('Register client error',error);
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}

const token = async (req, res, collection, authTokenCollection, accessTokenColletion) => {
    try{

        const {grant_type, code, client_id, client_secret, redirect_uri} = req.body;

        if (grant_type !== 'authorization_code') {
            return res.status(401).send({
                status: 401,
                message: 'Invalid grant type'
            })
        }

        const client = await findClientByClientIdAndSecret(collection, client_id, client_secret);

        if(!client){
            return res.status(401).send({
                status: 401,
                message: 'Invalid client credentials'
            });
        }

        const tokenExist = await checkTokenExists(code, authTokenCollection);

        if(!tokenExist){
            return res.status(498).send({
                status: 498,
                message: 'Invalid token'
            })
        }

        if(decodeURIComponent(redirect_uri) !== client.redirect_uri){
            return res.status(400).send({
                status: 400,
                message: "Redirect uri doesn't match"
            })
        }

        const accessToken = generateAccessToken();

        const result = await saveAccessToken(accessTokenColletion, tokenExist.userId, accessToken, client_id);
    
        if(!result){
            return res.status(500).send({
                status: 500,
                message: 'Something went wrong, please try again'
            })
        }

        return res.status(200).send({
            status: 200,
            message: 'Token generated succesfully',
            data: {
                access_token: data.accessToken,
                token_type: data.token_type,
                expires_in: data.expires_at
            }
        })

    }catch(error){
        console.error('Token error:', error);
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}

const getClientInfo = async (req, res, OAuthClientCollection) => {
    try{

        const { client_id } = req.query;

        if(!client_id){
            return res.status(401).send({
                status: 401,
                message: "Invalid client id"
            })
        }

        const client = await getClientInfoFromClientId(OAuthClientCollection, client_id);

        if(!client){
            return res.status(404).send({
                status: 404,
                message: 'Client not found'
            })
        }

        return res.status(200).send({
            status: 200,
            message: 'Client found',
            data: {
                client
            }
        })

    }catch(error){
        console.error('Client info error:', error)
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}

module.exports = {
    registerClient,
    getClientInfo,
    authorize,
    authConsent,
    token
}