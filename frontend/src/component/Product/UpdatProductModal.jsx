import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { updateProductController } from '../../Redux/Slice/UserSlice';

function UpdatProductModal({ show, handleClose, inputValue, setInputValue }) {

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.User);
    const [productImg, setProductImg] = useState('');

    // Handle Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    }

    // handle Chnage Profile
    const handleChangeProfile = (e) => {
        setProductImg(e.target.files[0]);
    }

    // handle Update
    const handleUpdateProduct = (e) => {
        e.preventDefault();
        try {
            const data = new FormData();

            // Set updated values in FormData
            data.set("productName", inputValue.productName);
            data.set("productCategory", inputValue.productCategory);
            data.set("productDescription", inputValue.productDescription);
            data.set("productPrice", inputValue.productPrice);
            data.set("productImg", inputValue.productImg);

            // Log FormData content
            data.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const config = {
                "Content-Type": "multipart/form-data"
            }

            const productID = {
                id: inputValue.id
            }

            const sendData = {
                data, config, productID
            }

            console.log("sendData", sendData);


            // Send the request
            dispatch(updateProductController(sendData)).then((res) => {
                if (res?.payload) {
                    setInputValue({ ...inputValue, productCategory: "", productName: "", productImg: "", productPrice: "", productDescription: "" });
                    setProductImg(null); // Clear productImg after update
                }
            });

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className="">
                        <div className="">
                            <form>
                                <div className="row">
                                    <div className="col-md-6 col-12 col-lg-6 form-input">
                                        <label htmlFor="productImg" style={{ fontWeight: "bold" }}>Product Image</label>
                                        <input className="form-control" onChange={handleChangeProfile} type="file" name="productImg" id="productImg" />
                                        {inputValue.productImg && (
                                            <img
                                                src={typeof inputValue.productImg === "string" ? inputValue.productImg : URL.createObjectURL(inputValue.productImg)}
                                                alt="Preview"
                                                style={{ width: "150px", height: "150px", objectFit: "container", marginTop: "10px" }}
                                            />
                                        )}
                                    </div>

                                    <div className="col-md-6 col-12 col-lg-6 form-input">
                                        <label htmlFor="email" style={{ fontWeight: "bold" }}>Product Name</label>
                                        <input className="form-control" onChange={handleChange} value={inputValue.productName} type="text" name="productName" placeholder="Enter Product Name" />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-6 col-12 col-lg-6 form-input">
                                        <label htmlFor="email" style={{ fontWeight: "bold" }}>Product Price</label>
                                        <input className="form-control" onChange={handleChange} value={inputValue.productPrice} type="number" name="productPrice" placeholder="Enter Your Price" />
                                    </div>

                                    <div className="col-md-6 col-12 col-lg-6 form-input">
                                        <label htmlFor="email" style={{ fontWeight: "bold" }}>Product Category</label>
                                        <input className="form-control" onChange={handleChange} value={inputValue.productCategory} type="text" name="productCategory" placeholder="Enter Your Name" />
                                    </div>
                                </div>

                                <div className="form-input">
                                    <label htmlFor="email" style={{ fontWeight: "bold" }}>Product Description</label>
                                    <textarea cols={1} className="form-control" onChange={handleChange} value={inputValue.productDescription} type="text" name="productDescription" placeholder="Enter Your Name" />
                                </div>

                            </form>
                        </div>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {loading ? <>
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </> : <>
                        <Button variant="primary" onClick={handleUpdateProduct}>
                            Update
                        </Button>
                    </>}

                </Modal.Footer>
            </Modal>


        </>
    )
}

export default UpdatProductModal