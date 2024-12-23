const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const path = require('path');


// Add User
exports.addUserController = async (req, res) => {
    const { name, email, userRole, password } = req.body;

    if (!name || !email || !password || !userRole) {
        res.status(400).json({ error: "all fileds are required" })
    }

    const upload = req.file ? `/images/userImage/${req.file.filename}` : '';

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            userprofile: upload,
            userRole,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Get All User
exports.getUserController = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

// Delete User
exports.deleteUserController = async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedUser = await userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

// Update User
exports.updateUserController = async (req, res) => {
    const { userId } = req.params;
    const { name, email, userprofile, password } = req.body;

    try {
        const updatedFields = {
            name,
            email,
            userprofile,
        };

        if (password) {
            updatedFields.password = await bcrypt.hash(password, 10);  // Hash new password if provided
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, updatedFields, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user', error });
    }
};


// Login controller
exports.loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(401).json({ error: "All fields must be required" });
        }

        // Check if User exists
        const userExist = await userModel.findOne({ email: email });
        console.log("userExist", userExist);

        if (!userExist) {
            return res.status(401).json({ error: "This user does not exist" });
        }

        // Match password
        const passwordMatch = await bcrypt.compare(password, userExist.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Generate Token
        const token = await userExist.generateToken(userExist._id);

        const result = {
            user: userExist,
            token: token
        }
        return res.json(result);

    } catch (error) {
        console.error('Error login user:', error);
        res.status(500).json({ message: 'Error login user', error });
    }
}