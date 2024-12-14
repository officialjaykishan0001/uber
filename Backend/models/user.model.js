const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Corrected to use bcryptjs
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minLength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false, // Password won't be returned in queries unless explicitly selected
    },
    socketId: {
        type: String,
    },
});

// Generate JWT Token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
};

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password); // Uses bcryptjs
};

// Hash password
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10); // Uses bcryptjs
};

const userModel = mongoose.model('user', userSchema);

// Exporting the model (Fixed typo in module.exports)
module.exports = userModel;
