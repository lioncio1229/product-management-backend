const express = require('express');
const multer = require('multer');
const authController = require('../controllers/auth.controller');

const upload = multer();
const router = express.Router();

router.post('/', upload.array(), authController.auth);

module.exports = router;
