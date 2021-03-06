const express = require('express');
const router = express.Router();
const checkPassword = require("../middleware/check-password")
const userCtrl = require('../controllers/user');
const expressBouncer = require("express-bouncer")(5000, 600000, 3); // Contre les attaques de force Brute //
const checkMail = require('../middleware/check-mail');

router.post('/signup', checkPassword, checkMail, userCtrl.signup);
router.post('/login', expressBouncer.block, userCtrl.login);


module.exports = router;
