
const checkSession = (req, res) => {
    try{

        if(req.session && req.session.userId){
            return res.status(200).send({
                isLoggedIn: true,
                user: req.session.userId
            });
        }else{
            return res.status(401).send({
                isLoggedIn: false
            });
        }
        
    }catch(error) {
        console.error(error);
        return res.status(500).send({
            status: 500,
            message: "Something went wrong while checking for session, please try again"
        })
    }
}

module.exports = {
    checkSession
}