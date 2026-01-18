const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

// Config multer
const upload = multer({ storage: multer.memoryStorage() });

const { getUserProfile, setUserProfilePicture } = require('../controllers/userController');

router.get('/currentUser', authMiddleware, getUserProfile);
router.post('/uploadProfilePicture', authMiddleware, upload.single('profilePicture'), setUserProfilePicture);
module.exports = router;