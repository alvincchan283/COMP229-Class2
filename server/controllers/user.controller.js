const { User, UserSchema } = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send({ message: 'No user ID is supplied.'});

    const user = await User.findOne({ username }).exec();
    if (!user) return res.status(401).send({ message: 'Username or password is invalid.'});

    if (user.password !== password) {
        return res.status(401).send({ message: 'Username or password is invalid.'});
    }

    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);

    // Cookie is valid for an hour.
    res.cookie('token', token, { 
        httpOnly: true, 
        expires: new Date(Date.now() + 3600 * 1000),
        sameSite: 'none'
    });

    return res.status(200).send({ ok: true, token });
}