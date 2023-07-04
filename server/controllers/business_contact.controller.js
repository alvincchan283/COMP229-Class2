const { BusinessContact, BusinessContactSchema } = require('../models/business_contact.model');
const requiredAttributes = Object.keys(BusinessContactSchema.paths).filter(key => BusinessContactSchema.paths[key].isRequired);

exports.createContact = async (req, res) => {
    // Check whether all the required attributes are included in the request.
    for (let requiredAttr of requiredAttributes) {
        if (!req.body[requiredAttr]) {
            return res.status(400).send({
                message: `BusinessContact\'s ${requiredAttr} cannot be empty.`
            });
        }
    }
    
    const contact = new BusinessContact({
        name: req.body.name,
        age: req.body.age,
        major: req.body.major
    });

    try {
        await contact.save();  
        res.status(200).send(contact);
    } catch (err) {
        return res.status(500).send(err);
    }
}

exports.getAllContacts = (req, res) => {
    BusinessContact.find({})
    .then(contacts => res.status(200).send(contacts))
    .catch(err => {
        console.error(err);
        res.status(500).send({ message: 'Error occurred when getting contacts from database.' })
    });
}

exports.getContactById = (req, res) => {
    // Check whether a BusinessContact ID is provided for the request.
    const contactId = req.params.id;
    if (!contactId) res.status(400).send({ message: 'No ID is supplied.'});

    BusinessContact.findById(contactId)
    .then(contact => {
        if (!contact) return res.status(404).send({ message: 'The requested ontact was not found.'});
        res.status(200).send(contact);
    })
    .catch(err => {
        console.error(err);
        res.status(500).send({ message: 'Error occurred when getting contacts from database.' })
    });
}

exports.updateContact = async (req, res) => {
    // Check whether a BusinessContact ID is provided for the request.
    const BusinessContactId = req.params.id;
    if (!BusinessContactId) return res.status(400).send({ message: 'No BusinessContact ID supplied.'});

    // Check whether all the required attributes are included in the request.
    for (let requiredAttr of requiredAttributes) {
        if (!req.body[requiredAttr]) {
            return res.status(400).send({
                message: `BusinessContact\'s ${requiredAttr} cannot be empty.`
            });
        }
    }

    let contact;
    try {
        contact = await BusinessContact.findByIdAndUpdate(BusinessContactId, {
            $set: {
                name: req.body.name,
                number: req.body.number,
                email: req.body.email
            }
        }, { new: true });
    } catch (err) {
        return res.status(500).send({ message: 'Error occurred when updating contact from database.' })
    }

    if (!contact) return res.status(404).send({ message: 'The specified contact was not found.'});
    res.status(200).send(contact);
}

exports.deleteContact = (req, res) => {
    // Check whether a BusinessContact ID is provided for the request.
    const contactId = req.params.id;
    if (!contactId) return res.status(400).send({ message: 'No contact ID supplied.'});

    BusinessContact.findByIdAndDelete(contactId)
    .then(contact => {
        if (!contact) return res.status(404).send({ message: 'BusinessContact not found.'});
        res.status(200).send({ message: 'The BusinessContact has been deleted.' });
    })
    .catch(err => {
        console.error(err);
        res.status(500).send({ message: 'Error occurred when deleting BusinessContact from database.' });
    });
}
