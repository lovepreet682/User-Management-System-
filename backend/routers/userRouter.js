const express = require('express');
const { addUserController, updateUserController, deleteUserController, getUserController, loginController, verifyUser, logoutController } = require('../controllers/userContoller');
const userUpload = require('../multerConfig/UserImgConfig');
const userVerifyMiddleware = require('../middleware/userMiddleware');
const router = express.Router();

router.post("/user", userUpload.single('userProfile'), addUserController);
router.post("/login", loginController);
router.get('/userVerify', userVerifyMiddleware, verifyUser);
router.get('/logout', userVerifyMiddleware, logoutController);
router.get("/user", userVerifyMiddleware, getUserController);
router.delete("/user/:id", userVerifyMiddleware, deleteUserController);
router.put("/user/:id", userVerifyMiddleware, updateUserController);

module.exports = router;