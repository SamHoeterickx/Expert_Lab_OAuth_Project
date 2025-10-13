require('dotenv').config();

const cors = require('cors');
const express = require('express');
const session = require('express-session');
const { MongoClient } = require('mongodb')

const app = express();
const port = 3000;

//DB Setup
const uri = process.env.DB_URI;
const client = new MongoClient(uri);
const DB_NAME = "OAuth_provider_expert_lab_2025";
const database = client.db(DB_NAME);

const userCollection = database.collection('users');
const OAuthClientCollection = database.collection('OAuth');
const authTokenCollection = database.collection('tokens');
const accessTokenCollection = database.collection('accessTokens');

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
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

const userRoutes = require('./users/route')(userCollection, accessTokenCollection, OAuthClientCollection);
const authRoutes = require('./oauth/route')(OAuthClientCollection, authTokenCollection, accessTokenCollection, OAuthClientCollection);
const sessionRoutes = require('./session/route');

app.use('/api/users', userRoutes);
app.use('/api/oauth', authRoutes);
app.use('/api', sessionRoutes);



const startServer = async () => {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB server');

        try {  
            await authTokenCollection.dropIndex('createdAt_1');
            console.log('Dropped old auth token index');
        } catch (error) {
            console.log('No old auth token index to drop');
        }

        try {
            await accessTokenCollection.dropIndex('createdAt_1');
            console.log('Dropped old access token index');
        } catch (error) {
            console.log('No old access token index to drop');
        }

        await authTokenCollection.createIndex(
            { createdAt: 1 },
            { 
                expireAfterSeconds: 300, 
                name: 'auth_code_ttl' 
            }
        );
        console.log('Auth code TTL index created');
        
        await accessTokenCollection.createIndex(
            { createdAt: 1 },  
            { 
                expireAfterSeconds: 3600,
                name: 'access_token_ttl' 
            }
        );
        console.log('Access token TTL index created');

        app.listen(port, () => {
            console.log(`Example of app is listening on port: ${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};

startServer();