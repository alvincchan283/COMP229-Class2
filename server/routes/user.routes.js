const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controller');

// POST /users
router.post('/', usersController.login);
router.delete('/', usersController.logout);

module.exports = router;