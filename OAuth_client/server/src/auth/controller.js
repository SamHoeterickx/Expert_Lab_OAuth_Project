const { generateState, saveState } = require('./model');

const auth = async(req, res, authStateCollection) => {
    try{

        const { client_id, redirect_uri } = req.body;
        const state = generateState();
        const result = await saveState(authStateCollection);

        if(!client_id){
            return res.status(422).send({
                status: 422,
                message: 'Missing client_id'
            });
        }

        const redirectUrl = `http://localhost:5731/#/auth/login?response_type=code&client_id=${client_id}&state=${state}&redirect_uri=${redirect_uri} `

        return res.status(200).send({
            status: 200,
            message: 'Url created succesfully',
            redirectUrl: redirectUrl
        })

    }catch(error){
        console.error('Auth error:', error);
        return res.status(500).send({
            status: 500,
            message: error.message
        });
    }
}

module.exports = {
    auth
}