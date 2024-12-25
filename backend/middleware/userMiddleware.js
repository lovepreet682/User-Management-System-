const userModel = require('../models/userModel');
const JWT = require('jsonwebtoken');

const userVerifyMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        // Vertify the token
        const tokenVerify = JWT.verify(token, process.env.USER_SECRET_KEY);

        const userRoot = await userModel.findOne({ _id: tokenVerify._id });
        if (!userRoot) { throw new Error('User not found'); }
        req.token = token;
        req.userRoot = userRoot;
        req.userId = userRoot._id;
        req.userMainId = userRoot.id;

        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Unauthoirzed No token provide" });
    }
}

module.exports = userVerifyMiddleware