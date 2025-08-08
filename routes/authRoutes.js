// routes/authRoutes.js
const express = require('express');

const { register, login } = require('../controllers/authController');
const validates = require("../middlewares/controledata");
const router = express.Router();

router.post('/register', validates, register);
router.post('/login', login);

module.exports = router;