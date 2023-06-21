const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/SignUp', authController.signup);
router.post('/Login', authController.login);

module.exports = router;
