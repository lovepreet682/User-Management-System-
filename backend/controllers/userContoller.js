const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const cloudinary = require("../cloudinary/cloudinarConfig")

// Add User
exports.addUserController = async (req, res) => {
    const { name, email, userRole, password } = req.body;

    // Validate required fields
    if (!name || !email || !password || !userRole) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // File upload path
    const file = req.file?.path;
    const upload = await cloudinary.uploader.upload(file);


    try {
        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User with this email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new userModel({
            name, email, userProfile: upload.secure_url,
            userRole, password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Error creating user", error: error.message });
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

// User Verify
exports.verifyUser = async (req, res) => {
    try {
        const verifyUser = await userModel.findOne({ _id: req.userId });
        return res.json(verifyUser);
    } catch (error) { res.status(500).json(error); }
}


// Logout 
exports.logoutController = async (req, res) => {
    try {
        req.userRoot.tokens = req.userRoot.tokens.filter((curElement) => {
            return curElement.token !== req.token;
        })
        req.userRoot.save();
        return res.status(200).json({ message: "user Logout Successfully" })
    } catch (error) {
        res.status(500).json(error);
    }
}



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

    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const updatedFields = { name, email };

        const updatedUser = await userModel.findByIdAndUpdate(id, updatedFields, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user', error });
    }
};

