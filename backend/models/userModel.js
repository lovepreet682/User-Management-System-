const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userProfile: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],


}, { timestamps: true });

userSchema.methods.generateToken = async function (userId) {

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const newToken = JWT.sign({ _id: user._id }, process.env.USER_SECRET_KEY, { expiresIn: "1d" });

        // Add the new token to the user's tokens array
        user.tokens = user.tokens.concat({ token: newToken });
        await user.save();
        return newToken;
    } catch (error) {
        throw new Error(error);
    }
}

const userModel = new mongoose.model('user', userSchema);
module.exports = userModel;