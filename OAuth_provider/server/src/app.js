require('dotenv').config();

const bcrypt = require('bcrypt');
const express = require('express');
const { MongoClient } = require('mongodb')
const session = require('express-session');

const app = express();
const port = 3000;

//DB Setup
const uri = process.env.DB_URI;
const client = new MongoClient(uri)
const DB_NAME = "OAuth_provider_expert_lab_2025";
const database = client.db(DB_NAME);

//Setup session
//Resave false --> doesn't resave when session isnt changed
//saveUninitialized --> save new input session
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}))

app.use(express.json());

const startServer = async () => {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB server');
        app.listen(port, () => {
            console.log(`Example of app is listening on port: ${port}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

startServer();

app.get('/', (req, res) => {
    console.log("test");
    res.send('Hello auth provider')
});

app.post('/api/register', async (req, res) => {

    const collection = database.collection('users');
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
       }


    } catch (error) {
        res.status(404).send({message: error});
    }
})