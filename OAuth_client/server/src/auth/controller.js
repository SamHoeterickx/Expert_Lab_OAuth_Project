const auth = async(req, res, authStateCollection) => {
    try{



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