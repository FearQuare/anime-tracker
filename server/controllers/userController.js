const User = require('../models/User');

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

module.exports = { getUserProfile };