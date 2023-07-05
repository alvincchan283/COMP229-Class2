const { User } = require('../models/user.model');

module.exports = function(req, res, next) {
    if (!req.cookies?.token) return res.status(401).send({ message: 'You are not logged in.' });
    User.find({ token: req.cookies.token })
    .then(user => {
        if (!user) return res.status(401).send({ message: 'Session cookie expired or invalid.' });
        next();
    })
    .catch(err => res.status(500).send({ message: 'Error occurred when handling session cookies. '}));
}