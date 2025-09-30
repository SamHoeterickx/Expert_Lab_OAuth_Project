require('dotenv').config();

const express = require('express');
const googleStrategy = require('passport-google-oauth20').Strategy;
const { MongoClient } = require('mongodb')
const passport = require('passport');
const session = require('express-session');

const app = express();
const port = 3000;

//DB Setup
const uri = process.env.DB_URI;
const client = new MongoClient(uri)
const DB_NAME = "Google_OAuth_Test";
const database = client.db(DB_NAME);

//Setup session
//Resave false --> doesn't resave when session isnt changed
//saveUninitialized --> save new input session
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

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

passport.use( new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
}, async (accesToken, refreshToken, profile, done) => {

    try{
        const collection = database.collection('users');

        let user = await collection.findOne({googleId: profile.id});

        if(!user){
            const newUser = {
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                photo: profile.photos[0].value
            }

            const result = await collection.insertOne(newUser);

            user = { _id: result.insertedId, ...newUser };

            return done(null, user);

        } else return done(null, user);

    }
    catch(error){
        console.error(error);
    }
}))

passport.serializeUser(( user, done) => {
    return done(null, user);
})

passport.deserializeUser((user, done) => {
    return done(null, user);
})

app.get('/', (req, res) => {
    res.send("<a href='/auth/google'>Login with Google</a>");
})


app.get('/auth/google', passport.authenticate('google', {
    scope: ["profile", "email", "openid"]
}))

app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: "/"
    }), (req, res) => {
        res.status(200).redirect("/profile");
    }
);

app.get('/profile', (req, res) => {
    console.log(req.user);
    try{
        if(req.user){
            res.send(`<h1>Welcome ${req.user.name}</h1><a href="/logout">logout</a>`)
        }else {
            res.status(404).redirect('/');
        }
    }catch(error){
        console.error(error);
        res.status(404).redirect('/');
    }
})

app.get("/logout", (req, res, next) => {
    req.logOut(function(err) {
        if (err) { return next(err); }
        res.redirect("/");
    });
})