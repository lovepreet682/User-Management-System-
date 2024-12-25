const productModel = require("../models/productsModel");
const cloudinary = require("../cloudinary/cloudinarConfig")


// Add Product
exports.addProductController = async (req, res) => {
    const { productName, productDescription, productPrice, productCategory } = req.body;

    if (!productName || !productDescription || !productPrice || !productCategory) {
        res.status(400).json({ error: "all fileds are required" })
    }

    // File upload path
    const file = req.file?.path;
    const upload = await cloudinary.uploader.upload(file);
    try {
        const newproduct = new productModel({
            productName, productCategory, productDescription, productPrice, productImg: upload.secure_url
        })

        await newproduct.save();
        return res.status(201).json({ message: "Product save successfully", product: newproduct })
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Error adding product', error });
    }
}

// get All Product
exports.getAllProductController = async (req, res) => {
    try {
        const getAllProduct = await productModel.find();
        return res.status(201).json({ getAllProduct });
    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).json({ message: 'Error getting product', error });
    }
}

// Delete Product
exports.deleteProductController = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting  product', error });
    }
}

// update Product
exports.updateProductController = async (req, res) => {
    const { id } = req.params;
    const { productDescription, productName, productPrice, productImg } = req.body;
    try {
        const updatedProducts = {
            productDescription, productName, productPrice, productImg
        };

        const updateProducts = await userModel.findByIdAndUpdate(id, updatedProducts, { new: true });
        if (!updateProducts) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', user: updateProducts });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product', error });
    }
}