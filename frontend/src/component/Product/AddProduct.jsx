import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addProductController } from '../../Redux/Slice/UserSlice';

function AddProduct() {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState({ productName: "", productDescription: "", productPrice: "", productCategory: "" })
    const [productImg, setProductImg] = useState('');

    // handle Change 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    }

    // handle Product Image
    const handleProductImage = (e) => {
        setProductImg(e.target.files[0]);
    }

    // handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("productName", inputValue.productName);
            data.append("productCategory", inputValue.productCategory);
            data.append("productDescription", inputValue.productDescription);
            data.append("productPrice", inputValue.productPrice);
            data.append("productImg", productImg);

            const config = {
                "Content-Type": "multipart/form-data"
            }

            const sendData = {
                data, config
            }

            dispatch(addProductController(sendData)).then((res) => {
                if (res?.payload) {
                    setInputValue({ ...inputValue, productCategory: "", productName: "", productImg: "", productPrice: "", productDescription: "" });
                    setProductImg("");
                }
            });

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <section className="product-container">
                <div className="product-box">
                    <div className="form-heading">
                        <h4>Add Product</h4>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-md-6 col-12 col-lg-6 col-12 col-lg-6 form-input">
                                <label htmlFor="email" style={{ fontWeight: "bold" }}>Product Image</label>
                                <input className="form-control" type="file" onChange={handleProductImage} value={inputValue.productImg} name="productImg" placeholder="Enter Your Name" />
                            </div>

                            <div className="col-md-6 col-12 col-lg-6 form-input">
                                <label htmlFor="email" style={{ fontWeight: "bold" }}>Product Name</label>
                                <input className="form-control" type="text" onChange={handleChange} value={inputValue.productName} name="productName" placeholder="Enter Product Name" />
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-6 col-12 col-lg-6 form-input">
                                <label htmlFor="email" style={{ fontWeight: "bold" }}>Product Price</label>
                                <input className="form-control" type="number" onChange={handleChange} value={inputValue.productPrice} name="productPrice" placeholder="Enter Your Price" />
                            </div>

                            <div className="col-md-6 col-12 col-lg-6 form-input">
                                <label htmlFor="email" style={{ fontWeight: "bold" }}>Product Category</label>
                                <input className="form-control" type="text" onChange={handleChange} value={inputValue.productCategory} name="productCategory" placeholder="Enter Your Name" />
                            </div>
                        </div>

                        <div className="form-input">
                            <label htmlFor="email" style={{ fontWeight: "bold" }}>Product Description</label>
                            <textarea cols={1} className="form-control" onChange={handleChange} value={inputValue.productDescription} type="text" name="productDescription" placeholder="Enter Your Name" />
                        </div>

                        <button className="btn btn-primary" onClick={handleSubmit}>Add Product</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default AddProduct