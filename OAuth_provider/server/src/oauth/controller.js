const { 
    createCryptoString, 
    createNewOAuthClient, 
    findClientByClientid, 
    generateAuthCode,
    saveAuthCode
} = require('./model');

const authorize = async(req, res, collection) => {
    try{

        const { response_type, client_id, redirect_uri, scope, state } = req.query;

        if(!req.session.userId){
            return res.redirect('http://localhost:5173/api/login');
        }
        const userId = req.session.userId;

        const client = await findClientByClientid(collection, client_id);
        

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

    }catch (error){
        console.error('Authorization client error:', error);
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}

const authConsest = async (req, res, collection) => {
    try{

        const {client_id, userId, redirect_uri, state, approved } = req.body

        const client = await findClientByClientid(collection, client_id);
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

        if(!approved){
            const redirectURL = `${redirect_uri}?error=access_denied&state=${state}`;
            res.redirect(redirectURL);
        }

        const authCode = generateAuthCode()

        if(authCode){
            saveAuthCode(userId, client_id, authCode);
        }


        console.log( {client_id, userId, redirect_uri, state, approved })

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

module.exports = {
    registerClient,
    authorize,
    authConsest
}