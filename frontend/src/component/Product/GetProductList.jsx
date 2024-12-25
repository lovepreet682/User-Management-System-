import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getProductController } from '../../Redux/Slice/UserSlice';


function GetProductList() {
    const dispatch = useDispatch()
    const { getProductSlice, loading } = useSelector((state) => state.User);

    const productList = () => {
        dispatch(getProductController());
    }

    useEffect(() => {
        productList();
    }, [])
    return (
        <>
            <div id="productList" className="container mb-5">
                <div className="productheading text-center my-3" style={{ fontSize: "22px", fontWeight: "500" }}>
                    Products
                </div>

                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : getProductSlice?.getAllProduct?.length > 0 ? (
                    <div className="row">
                        {getProductSlice?.getAllProduct?.map((product) => (
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
        </>
    )
}

export default GetProductList