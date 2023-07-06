const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    let token = req.cookies?.token ?? req.headers['authorization'];
    if (!token) return res.status(401).send({ message: 'You are not logged in.' });

    // Extract bearer token in authorization header.
    if (token.indexOf('Bearer ') !== -1) token = token.split(' ')[1];

    let userId = jwt.verify(token, 'jwtsecret')?.user;
    if (!userId) return res.status(401).send({ message: 'Token expired or invalid.' });

    User.findById(userId)
    .then(user => {
        if (!user) return res.status(401).send({ message: 'Token expired or invalid.' });
        next();
    })
    .catch(err => res.status(500).send({ message: 'Error occurred when handling tokens. '}));
}