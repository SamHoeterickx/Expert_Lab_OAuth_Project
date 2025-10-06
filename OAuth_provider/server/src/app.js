require('dotenv').config();

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

const userRoutes = require('./users/route')(database.collection('users'));

app.use('/api', userRoutes);

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