const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Get the token from the header
    const token = req.header('Authorization');

    // Check if no token is present
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify the token
    try {
        // Decode the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Take the UserID from the token and attach it to the request object
        // This allows your Controllers to know WHICH user is logged in
        req.user = decoded;

        // Move to the next step (the Controller)
        next();

    } catch (err) {
        // If the token is fake or expired, this block runs
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;