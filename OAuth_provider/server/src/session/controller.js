
const checkSession = (req, res) => {
    try{
        if (req.session && req.session.userId) {
            return res.status(200).json({ loggedIn: true });
        }else{
            return res.status(401).json({ loggedIn: false });
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