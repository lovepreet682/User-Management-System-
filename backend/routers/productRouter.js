const express = require('express');
const userUpload = require('../multerConfig/UserImgConfig');
const { addProductController, getAllProductController, deleteProductController, updateProductController } = require('../controllers/productController');
const userVerifyMiddleware = require('../middleware/userMiddleware');
const router = express.Router();

router.post("/product", userVerifyMiddleware, userUpload.single('productImg'), addProductController);
router.get("/product", userVerifyMiddleware, getAllProductController);
router.delete("/product/:id", userVerifyMiddleware, deleteProductController);
router.put("/product/:id", userVerifyMiddleware, updateProductController);

module.exports = router;