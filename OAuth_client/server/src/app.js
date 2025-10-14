require('dotenv').config();

const cors = require('cors');
const express = require('express');
const session = require('express-session');
const { MongoClient } = require('mongodb');

const app = express();
const port = 8080;

const uri = process.env.DB_URI;
const client = new MongoClient(uri);
const DB_NAME = "OAuth_client_expert_lab_2025";
const database = client.db(DB_NAME);

const userCollection = database.collection('users');

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    coookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}));
app.use(express.json());


//Routes
const userRoutes = require('./users/route')(userCollection);

app.use('/api/users', userRoutes);

app.use('/', (req, res) => console.log("Hello world"));

const startServer = async () => {
    try{

        await client.connect();
        console.log('Connected succesfully to MongoDB server');

        app.listen(port, () => {
            console.log(`Example of app is listening on port: ${port}`);
        })

    }catch(error){
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}

startServer();