const { createCryptoString } = require('./model');

const registerClient = async(req, res, collection) => {
    try{

        const { client_name, redirect_uri, scope, client_uri, owner_email } = req.body
        //Geen check voor user want wil dat deze route pas zichtbaar is als je ingelogd bent

        const client_id = createCryptoString(16, 'hex');
        const client_secret = createCryptoString(32, 'hex');

        console.log(client_id, client_secret);


        res.status(200).send({
            status: 200,
            message: "Client"
        });
    }catch (error){
        console.error('Register client error',error);
        res.status(500).send({
            status: 500,
            message: error.message
        })
    }
}

module.exports = {
    registerClient
}