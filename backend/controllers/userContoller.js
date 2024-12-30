const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const cloudinary = require("../cloudinary/cloudinarConfig");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");


// Add User
exports.addUserController = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
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
            password: hashedPassword,
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
    const id = req.params.id;

    try {
        const deletedUser = await userModel.findByIdAndDelete(id);
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



// Update User Admin Side
exports.updateUserAdminSideController = async (req, res) => {
    const { id } = req.params;
    const { name, email, userRole } = req.body;

    try {
        const updatedFields = { name, email, userRole };

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

// Change Password -> When User Know
exports.ChangeUserPasswordController = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    try {
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New password and confirm password do not match." });
        }

        const userId = req.userId;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully." });
    } catch (error) {
        console.error('Error changing user password:', error);
        res.status(500).json({ message: 'Error changing user password', error });
    }
}


// Forget password
exports.forgetPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate Token 
        const token = JWT.sign({ _id: user._id }, process.env.USER_SECRET_KEY, { expiresIn: '15m' });

        user.verifyToken = token;
        await user.save();

        // Create a reset password link
        const resetLink = `${process.env.FRONT_URL}/resetpassword/${user._id}/${token}`;

        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            html: `<p>Click the link below to reset your password:</p>
                   <a href="${resetLink}">${resetLink}</a>
                <p>This link is valid for 15 Min only.</p>`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset email sent successfully' });

    } catch (error) {
        console.error('Error changing forget password:', error);
        res.status(500).json({ message: 'Error changing forget password', error });
    }
}

// Reset the Password
exports.resetPasswordController = async (req, res) => {
    const { token } = req.params;

    const { newPassword, confirmPassword } = req.body;

    try {
        // Check if the new password and confirm password match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Verify token
        const decoded = JWT.verify(token, process.env.USER_SECRET_KEY);

        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Error resetting password', error });
    }
}
