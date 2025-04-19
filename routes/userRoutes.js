const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

// Configure multer to rename the uploaded file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/signup', UserController.signup.bind(UserController));
router.post('/login', UserController.login.bind(UserController));
router.get('/profile', authMiddleware, UserController.getProfile.bind(UserController));
router.put('/profile', authMiddleware, upload.single('profilePicture'), UserController.updateProfile.bind(UserController));
router.get('/verify/:token', UserController.verifyProfile.bind(UserController));

module.exports = router;
