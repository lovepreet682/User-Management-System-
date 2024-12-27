import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getProductController } from '../../Redux/Slice/UserSlice';


function GetProductList() {
    const dispatch = useDispatch()
    const { getProductSlice, loading } = useSelector((state) => state.User);
    const [selectCategory, setSelectCategory] = useState("");

    // Handle Change
    const handleCategoryChange = (e) => {
        setSelectCategory(e.target.value)
    }

    // Filter products based on the selected category
    const filteredProducts = selectCategory ?
        getProductSlice?.getAllProduct?.filter((product => product.productCategory === selectCategory)) : getProductSlice?.getAllProduct

    const productList = () => {
        dispatch(getProductController());
    }

    useEffect(() => {
        productList();
    }, [])
    return (
        <>
            <div id="productList" className="container-fluid mb-5">
                <div className="productheading text-center my-3" style={{ fontSize: "22px", fontWeight: "500" }}>
                    Products
                </div>
                <div className="row">
                    <div className="col-md-2 col-lg-2 col-sm-12">
                        <label htmlFor="" style={{ fontWeight: "500" }}>Filter</label>
                        <select value={selectCategory} onChange={handleCategoryChange} className='form-select' name="" id="">
                            <option value="">Select Category</option>
                            <option value="Electronics">Electronic Device</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Tshirt">T-Shirt</option>
                            <option value="Jacket">Men Jacket</option>
                            <option value="Hoodie">Men Hoodie</option>


                        </select>
                    </div>
                    <div className="col-10 col-md-10 col-lg-10 col-sm-12">
                        {loading ? (
                            <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : filteredProducts?.length > 0 ? (
                            <div className="row">
                                {filteredProducts?.map((product) => (
                                    <div className="col-md-3 my-3" key={product._id}>
                                        <div className="card" style={{ width: "15rem" }}>
                                            <img
                                                src={`${product.productImg}`}
                                                className="card-img-top"
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{product.productName}</h5>
                                                <p className="card-text">{product.productDescription}</p>
                                                <p className="card-text">
                                                    <strong>Price:</strong> ₹{product.productPrice}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center">
                                <p>No products available to display.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetProductList