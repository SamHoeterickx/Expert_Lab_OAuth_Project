require('dotenv').config();

const express = require('express');
const { MongoClient } = require('mongodb')
const session = require('express-session');

const app = express();
const port = 3000;

//DB Setup
const uri = process.env.DB_URI;
const client = new MongoClient(uri);
const cors = require('cors');
const DB_NAME = "OAuth_provider_expert_lab_2025";
const database = client.db(DB_NAME);

const userCollection = database.collection('users');
const OAuthClientCollection = database.collection('OAuth');
const tokenCollection = database.collection('tokens');

//Setup session
//Resave false --> doesn't resave when session isnt changed
//saveUninitialized --> save new input session
//cookie
//  httpOnly voorkomt dat Javascript de cookie kan lezen
//  secure: alleen https in production
//  Max age =  1000 * 60 * 60 = 1 uur
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(cors());
app.use(express.json());

const userRoutes = require('./users/route')(userCollection);
const authRoutes = require('./oauth/route')(OAuthClientCollection, tokenCollection);

app.use('/api', userRoutes);
app.use('/api/oauth', authRoutes);

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