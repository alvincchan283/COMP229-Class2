const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authMiddleware = require('./middleware/auth.middleware');

// Starting the express server.
function startAppServer() {
    const app = express();
    app.use(cors({ origin: 'http://localhost:4200' }));
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
    app.listen(4000, () => {
        console.log('The backend system of portfolio site is now ready.');
    });
}

// The config file for MongoDB connection is not present in git repo to avoid API key leakage.
const dbConfig = require('./config/database.config'); 
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Activate the connection.
mongoose.connect(dbConfig.url, { 
    useNewUrlParser: true
}).then(() => {
    // Start the express server after connecting to the database.
    startAppServer();
}).catch(err => {
    console.log('An error occurred when connecting to the database');
    console.error(err);
});
