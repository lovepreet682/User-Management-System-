import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getProductController } from '../../Redux/Slice/UserSlice';

function GetProductList() {
    // const dispatch = useDispatch()
    // const { getProductSlice } = useSelector((state) => state.User);
    // console.log("getProductSlice", getProductSlice);

    // const productList = () => {
    //     dispatch(getProductController());
    // }

    // useEffect(() => {
    //     productList();
    // }, [])
    return (
        <>
            <div id="productList" className='container'>
                <div className="productheading text-center my-3" style={{ fontSize: "22px", fontWeight: "500" }}>Products</div>
                <div className="row">
                    <div className="col-md-3">
                        <div class="card" style={{ "width": "15rem" }}>
                            <img src="../public/reactjs.png" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div class="card" style={{ "width": "15rem" }}>
                            <img src="../public/reactjs.png" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div class="card" style={{ "width": "15rem" }}>
                            <img src="../public/reactjs.png" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div class="card" style={{ "width": "15rem" }}>
                            <img src="../public/reactjs.png" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetProductList