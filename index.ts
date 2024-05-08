import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // Import Mongoose
import routes from './src/routes'; // Import routes

import passport from 'passport';
import path from 'path'; 
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import { Profile } from 'passport-google-oauth20';
import { Server } from 'socket.io';
import http from 'http';
import { engine } from 'express-handlebars'


interface CustomRequest extends Request {
    user: Profile;
}

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname,'src', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

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


//Sockets 
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Se conecto el cliente');

    socket.on('message', (data) => {
        console.log('Received message', data);

        io.emit('clickedSend', data);
    });
})

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
