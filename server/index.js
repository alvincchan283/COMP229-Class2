const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authMiddleware = require('./middleware/auth.middleware');

// Starting the express server.
function startAppServer() {
    const app = express();
    app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    
    app.get('/', (req, res) => {
        res.json({ 'message': 'The server works.' });
    });
    
    // Defining routes for users and contacts.
    app.use('/users', require('./routes/user.routes'));
    app.use('/contacts', authMiddleware, require('./routes/business_contact.routes'));
    
    // Listening request at port 4000.
    app.listen(process.env.SERVER_PORT, () => {
        console.log('The backend system of portfolio site is now ready.');
    });
}

// Load sensitive credentials from dotenv package.
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Activate the connection.
mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true
}).then(() => {
    // Start the express server after connecting to the database.
    startAppServer();
}).catch(err => {
    console.log('An error occurred when connecting to the database');
    console.error(err);
});
