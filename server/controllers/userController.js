const bcrypt = require('bcryptjs');
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');

const getUserProfile = async (req, res) => {
    try {
        console.log("Controller: Fetching user profile...");

        // 1. Get the user ID from the request (attached by middleware)
        const userId = req.user.id;

        // 2. Find the user in DB, but EXCLUDE the password
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Helper Function
// This converts the buffer upload into a Promise so we can await it
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "profile_pictures" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        uploadStream.end(buffer);
    });
};

const setUserProfilePicture = async (req, res) => {
    try {
        console.log("Controller: Uploading to Cloudinary...");

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // 1. Upload Buffer to Cloudinary
        const result = await uploadToCloudinary(req.file.buffer);

        console.log("Cloudinary Upload Success!", result.secure_url);

        // 2. Save URL to Database
        const userId = req.user.id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: result.secure_url },
            { new: true }
        ).select('-password');

        // 3. Respond with the new data
        res.json({
            message: "Profile picture updated!",
            user: updatedUser
        });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Server Error during upload" });
    }
}

const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;

        console.log("Controller: Password Change started for", userId);

        // Validate if both fields exist
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                message: "Both old and new passwords are required."
            });
        }

        // Validate if new password has at least 8 characters lenght
        if (newPassword.length < 8) {
            return res.status(400).json({
                message: "New password must be at least 8 characters."
            });
        }

        // Get User (and explicitly ask for password, as it's usually excluded)
        const user = await User.findById(userId).select('+password');

        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        // Verify if old password match with current password
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid old password." });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update Database
        await User.findByIdAndUpdate(userId, { password: hashedPassword });

        console.log("Success: Password updated.");
        res.json({ message: "Password successfully changed!" });
    } catch (error) {
        console.error("Update Password Error:", error);
        res.status(500).json({ message: "Server Error during password change" });
    }
}

const changeEmail = async (req, res) => {
    try {
        const userId = req.user.id;
        const { email } = req.body;

        console.log("changeEmail endpoint started for", userId, " request to change email to", email, "received.");

        const user = await User.findById(userId).select('+email');

        await User.findByIdAndUpdate(userId, { email: email });

        res.json({ message: "Email successfully changed!" });
    } catch (error) {
        console.error("Update Email Error:", error);
        res.status(500).json({ message: "Server Error during email change" });
    }
}

module.exports = { getUserProfile, setUserProfilePicture, changePassword, changeEmail };