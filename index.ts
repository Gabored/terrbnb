import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // Import Mongoose
import routes from './src/routes'; // Import routes

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import { Profile } from 'passport-google-oauth20';

interface CustomRequest extends Request {
    user: Profile;
}

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up a basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Server is running!');
});

// Use routes
app.use(routes);

const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => {
        console.log('Connected to MongoDB');
        mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.CALLBACK_URI
}, (accessToken, refreshToken, profile, cb) => {
    // Validate if user exists
    return cb(null, profile);
}));

app.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/logout', (req, res) => {
    // req.logout(); // Passport.js method to clear login session
    res.redirect('/'); // Redirect to home page after logout
});

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req: CustomRequest, res: Response) => {
    // Redirect to appropriate route or send response after successful login
    console.log('User Data:', req.user);

    res.redirect('/');
});

app.listen(port, () => {
    console.log("Server Running!");
});
