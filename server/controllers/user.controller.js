const { User, UserSchema } = require('../models/user.model');
const crypto = require('crypto');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send({ message: 'No user ID is supplied.'});

    const user = await User.findOne({ username }).exec();
    if (!user) return res.status(401).send({ message: 'Username or password is invalid.'});

    if (user.password !== password) {
        return res.status(401).send({ message: 'Username or password is invalid.'});
    }

    user.token = crypto.randomBytes(48).toString('hex');
    await user.save();

    // Cookie is valid for an hour.
    res.cookie('token', user.token, { httpOnly: true, expires: new Date(Date.now() + hour) });

    return res.status(200).send({ ok: true });
}

exports.logout = async (req, res) => {
    if (!req.cookies?.token) return res.status(401).send();

    const user = await User.findOne({ token: req.cookies.token }).exec();
    if (!user) return res.status(401).send({ message: 'You are already logged out.'});

    user.token = null;
    await user.save();
    res.clearCookie('token');
    return res.status(200).send({ ok: true });
}