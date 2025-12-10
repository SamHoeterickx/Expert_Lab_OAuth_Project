const { generateState, saveState } = require('./model');

const auth = async(req, res, authStateCollection) => {
    try{

        const { client_id, redirect_uri } = req.query;
        const state = generateState();

        console.log(redirect_uri)

        if(!client_id){
            return res.status(422).send({
                status: 422,
                message: 'Missing client_id'
            });
        }

        if(!state){
            return res.status(400).send({
                status: 400,
                message: 'Failed to generate state'
            })
        }

        const savedStateResult = await saveState(authStateCollection, state);

        if(!savedStateResult){
            return res.status(400).send({
                status: 400,
                message: 'Failed to save state'
            })
        }
        console.log(redirect_uri)
        const redirectUrl = `https://lightpink-gorilla-173264.hostingersite.com/#/auth/login?response_type=code&client_id=${client_id}&state=${state}&redirect_uri=${redirect_uri} `

        return res.status(200).send({
            status: 200,
            message: 'Url created succesfully',
            redirectUrl: redirectUrl,
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