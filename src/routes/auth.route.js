const express = require('express');
const multer = require('multer');
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/jwtValidation');

const upload = multer();
const router = express.Router();

router.get('/', validate(), authController.authenticated);
router.post('/', upload.array(), authController.auth);

module.exports = router;
