const express = require('express');
const router = express.Router();
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route POST /api/auth/register
// @desc Register a new user
// @access Public
router.post('/register', async (req, res) => {
    try {
        // 1. Destructure data from the request body (what the user sent)
        const { username, email, password } = req.body;

        // 2. Validation: Check if all fields are present
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        // 3. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // 4. Hash the password (Security)
        const salt = await bcyrpt.genSalt(10);
        const hashedPassword = await bcyrpt.hash(password, salt);

        // 5. Create the new User
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // 6. Save to Database
        await newUser.save();

        // 7. Send success message
        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation: Check if fields are empty
        if (!email || !password ) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exists' });
        }

        // Validate Password: We compare the plain text password user sent vs. the hashed one in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create the JWT Token (The "VIP Pass")
        // THis token contains the user's ID inside it
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send the token and user info back to frontend
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;