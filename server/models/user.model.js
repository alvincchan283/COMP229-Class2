const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = {
    User: mongoose.model('User', UserSchema),
    UserSchema
}