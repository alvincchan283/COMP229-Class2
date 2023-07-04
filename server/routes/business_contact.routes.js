const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/business_contact.controller');

// GET /contacts
router.get('/', contactsController.getAllContacts);
// GET /contacts/:id
router.get('/:id', contactsController.getContactById);
// POST /contacts
router.post('/', contactsController.createContact);
// PUT /contacts/:id
router.put('/:id', contactsController.updateContact);
// DELETE /contacts/:id
router.delete('/:id', contactsController.deleteContact);

module.exports = router;