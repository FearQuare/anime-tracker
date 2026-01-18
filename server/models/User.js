const mongoose = require('mongoose');

// Define the structure of a User
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minglength: 6
    },
    profilePicture: {
        type: String,
        required: false
    }
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' times

module.exports = mongoose.model('User', UserSchema);