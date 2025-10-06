const bcrypt = require('bcrypt');

const register = async(req, res, collection) => {

    const existingUser = await collection.findOne({ email: req.body.email });

    const hashedPassword = (userPassword) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(userPassword, 10, function (error, hash) {
                if(error) return reject(error);
                resolve(hash);
            })
        })
    }

    try{
        if(!existingUser){
            if(!req.body.password || !req.body.name || !req.body.email || !req.body.repeatPassword){
                res.status(422).send({
                    status: 422,
                    message: "Missing register info"
                });
            }else if(req.body.password === req.body.repeatPassword){

                hashedPassword(req.body.password)
                    .then((hashedPassword) => {
                        collection.insertOne({
                            name: req.body.name,
                            email: req.body.email,
                            password: hashedPassword
                        })
                        return res.status(201).send({
                            status: 201,
                            message: "Account created succesfully"
                        })
                    })
                
            }else{
                res.status(401).send({
                    status: 401,
                    message: "Passwords don't match"
                })
            }
        }else{
            res.status(409).send({
                status: 409,
                message: "Email already in use"
            })
        }

    } catch (error) {
        res.status(404).send({message: error});
    }
}

const login = async(req, res, collection) => {

}

module.exports = {
    register,
    login
}