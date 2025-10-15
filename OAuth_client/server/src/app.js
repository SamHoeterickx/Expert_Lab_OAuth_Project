require('dotenv').config();

const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const { MongoClient } = require('mongodb');
const session = require('express-session');

const app = express();
const port = 8080;

const uri = process.env.DB_URI;
const client = new MongoClient(uri);
const DB_NAME = "OAuth_client_expert_lab_2025";
const database = client.db(DB_NAME);

//Collections
const userCollection = database.collection('users');
const authStateCollection = database.collection('authState');

app.use(session({
    secret: "abc",
    resave: false,
    saveUninitialized: false,
    coookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use(cookieParser('abc'));
app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}));
app.use(express.json());


//Routes
const userRoutes = require('./users/route')(userCollection);
const authRoutes = require('./auth/route')(authStateCollection)

app.use('/api/users', userRoutes);
app.use('/api/oauth', authRoutes);

app.use('/', (req, res) => console.log("Hello world"));

const startServer = async () => {
    try{

        await client.connect();
        console.log('Connected succesfully to MongoDB server');

        try {
            const indexes = await authStateCollection.indexes();
            const existing = indexes.find(index => index.key.createdAt);

            if (existing && existing.name !== 'auth_state_ttl') {

                await authStateCollection.dropIndex(existing.name);
                console.log(`Dropped old index: ${existing.name}`);

            } else if (existing) {
                console.log('TTL index already exists, skipping recreation');
            }

            await authStateCollection.createIndex(
                { createdAt: 1 },
                {
                    expireAfterSeconds: 300, 
                    name: 'auth_state_ttl' 
                }
            );

            console.log('TTL index ensured successfully');
        } catch (error) {
            console.error('Error ensuring TTL index:', error);
            process.exit(2);
        }

        await authStateCollection.createIndex(
            {createdAt: 1},
            {
                expireAfterSeconds: 300,
                name: 'auth_state_ttl'
            }
        );

        console.log('State code TTL index created successfully');

        app.listen(port, () => {
            console.log(`Example of app is listening on port: ${port}`);
        })

    }catch(error){
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}

startServer();