const { createCryptoString, createNewOAuthClient } = require('./model');

const authorize = async(req, res, collection) => {
    try{

        res.status(200).send({
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

const registerClient = async(req, res, collection) => {
    try{

        const { client_name, redirect_uri, scope, client_uri, owner_email } = req.body
        //Geen check voor user want wil dat deze route pas zichtbaar is als je ingelogd bent

        const client_id = createCryptoString(16, 'hex');
        const client_secret = createCryptoString(32, 'hex');

        const newClient = await createNewOAuthClient(collection, {client_name, redirect_uri, scope, client_uri, owner_email, client_id, client_secret})
        if(newClient){
            res.status(201).send({
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
    authorize
}