const registerClient = async(req, res, collection) => {
    try{
        console.log('register new client for oauth service');
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