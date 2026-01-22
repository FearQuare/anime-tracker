const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

// Config multer
const upload = multer({ storage: multer.memoryStorage() });

const { getUserProfile, setUserProfilePicture, changePassword, changeEmail } = require('../controllers/userController');

router.get('/currentUser', authMiddleware, getUserProfile);
router.post('/currentUser/uploadProfilePicture', authMiddleware, upload.single('profilePicture'), setUserProfilePicture);
router.post('/currentUser/changePassword', authMiddleware, changePassword);
router.post('/currentUser/changeEmail', authMiddleware, changeEmail);
module.exports = router;