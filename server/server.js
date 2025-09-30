require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const googleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const port = 3000;

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


passport.use( new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
}, (accesToken, refreshToken, profile, done) => {
    return done(null, profile)
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
            res.send(`<h1>Welcome ${req.user.displayName}</h1><a href="/logout">logout</a>`)
        }else {
            res.status(404).redirect('/');
        }
    }catch(error){
        console.error(error);
        res.status(404).redirect('/');
    }
})



app.listen( port, () => {
    console.log(`Example of app is listening on port: ${port}`);
})