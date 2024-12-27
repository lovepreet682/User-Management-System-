import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductController, getProductController } from '../../Redux/Slice/UserSlice';
import UpdatProductModal from './UpdatProductModal';
import { Button, Modal } from 'react-bootstrap';
import PaginatedTable from '../Pagination/PaginatedTable';

function ProductList() {
    const dispatch = useDispatch();
    const { getProductSlice, loading } = useSelector((state) => state.User);
    const [show, setShow] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteProductID, setDeleteProductID] = useState('');
    const [inputValue, setInputValue] = useState({ productName: "", productDescription: "", productPrice: "", productCategory: "", productImg: "" })

    const getProductList = () => {
        dispatch(getProductController());
    }

    useEffect(() => {
        getProductList();
    }, [])

    // Handle Show Update Modals
    const handleUpdateShow = (id, productName, productCategory, productDescription, productImg, productPrice) => {
        setShow(true);
        setInputValue({ id, productName, productCategory, productDescription, productImg, productPrice })
    }

    // handle Close
    const handleClose = () => { setShow(false) }

    // Delete Product
    const handleDeleteModals = (id) => {
        setDeleteModalOpen(true);
        setDeleteProductID(id);
    }

    const handleDeletClose = () => { setDeleteModalOpen(false) }

    const handleDeleteProduct = () => {
        const data = {
            id: deleteProductID
        }
        dispatch(deleteProductController(data)).then((result) => {
            if (result?.payload) {
                setDeleteModalOpen(false);
                getProductList();
            }
        }).catch((err) => {
            console.log(err);

        });

    }

    return (
        <>
            <div className="container pt-3">
                <h5 className='text-center mb-2'>Product List</h5>
                <div className="table-responsive">
                    <table className="table text-center">
                        <thead>
                            <tr className='table-dark'>
                                <th scope="col">Product ID</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Description</th>
                                <th scope="col" style={{ textWrap: "nowrap" }}>Product Image</th>
                                <th scope="col" style={{ textWrap: "nowrap" }}>Product Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : <>
                                <PaginatedTable
                                    data={getProductSlice?.getAllProduct || []}
                                    itemsPerPage={5}
                                    renderRows={(currentData, currentPage, itemsPerPage) =>
                                        currentData?.length > 0 ? (
                                            currentData?.map((product, index) => (
                                                <tr key={product._id}>
                                                    <td>{product._id}</td>
                                                    <td className="truncate" style={{ maxWidth: "200px" }}>{product.productName}</td>
                                                    <td className="truncate" style={{ maxWidth: "180px" }}>{product.productDescription}</td>
                                                    <td><img src={product.productImg} style={{ width: "35px", height: "35px", objectFit: "cover" }} alt={product.productName} /></td>
                                                    <td>{product.productPrice}</td>
                                                    <td className='d-flex'>
                                                        <button className='btn btn-danger' onClick={() => handleDeleteModals(product._id)}>Delete</button>
                                                        <button className='btn btn-success mx-2' onClick={() => handleUpdateShow(product._id, product.productName, product.productCategory, product.productDescription, product.productImg, product.productPrice)}>Update</button>
                                                    </td>
                                                </tr>
                                            )))
                                            : (
                                                <tr>
                                                    <td colSpan="6" className="text-center">
                                                        No Product available to display.
                                                    </td>
                                                </tr>
                                            )
                                    }
                                />

                            </>}
                        </tbody>
                    </table>
                </div>
            </div>

            <UpdatProductModal show={show} handleClose={handleClose} inputValue={inputValue} setInputValue={setInputValue} />

            {/* Delete Product */}
            <Modal show={deleteModalOpen} onHide={handleDeletClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure, You want to delete the product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeletClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteProduct(deleteProductID)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default ProductList