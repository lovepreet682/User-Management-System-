const express = require('express');
const { addUserController, updateUserController, deleteUserController, getUserController, loginController } = require('../controllers/userContoller');
const userUpload = require('../multerConfig/UserImgConfig');
const router = express.Router();

router.post("/user", userUpload.single('userprofile'), addUserController);
router.post("/login", loginController);
router.get("/user", getUserController);
router.delete("/user/:id", deleteUserController);
router.put("/user/:id", updateUserController);

module.exports = router;