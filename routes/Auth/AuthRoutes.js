const express = require('express')
const router = express.Router();
const authController = require('../../controllers/Auth/AuthController');
const { loginRequest } = require('../../validations/LoginRequest');

router.post('/login', loginRequest, authController.login)
router.post('/register', authController.store)
router.post('/model', authController.updateModel)

module.exports = router