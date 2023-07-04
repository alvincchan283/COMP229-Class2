const mongoose = require('mongoose');

const BusinessContactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = {
    BusinessContact: mongoose.model('BusinessContact', BusinessContactSchema),
    BusinessContactSchema
}