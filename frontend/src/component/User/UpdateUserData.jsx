import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAdminSideController } from '../../Redux/Slice/UserSlice';

function UpdateUserData({ handleUpdateClose, showUpdateModal, inputValue, setInputValue }) {
    const { loading } = useSelector((state) => state.User);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value })
    }

    // Handle Submit
    const handleUpdateUser = (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserAdminSideController(inputValue)).then((result) => {
                if (result?.payload) {
                    handleUpdateClose(false);
                }
            }).catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log(error);

        }

    }
    return (
        <>
            <Modal show={showUpdateModal} onHide={handleUpdateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className="">
                        <div className="">
                            <form>
                                <div className="row">
                                    {/* <div className="col-md-6 col-12 col-lg-6 form-input">
                                        <label htmlFor="productImg" style={{ fontWeight: "bold" }}>Product Image</label>
                                        <input className="form-control" onChange={handleChangeProfile} type="file" name="productImg" id="productImg" />
                                        {inputValue.productImg && (
                                            <img
                                                src={typeof inputValue.productImg === "string" ? inputValue.productImg : URL.createObjectURL(inputValue.productImg)}
                                                alt="Preview"
                                                style={{ width: "150px", height: "150px", objectFit: "container", marginTop: "10px" }}
                                            />
                                        )}
                                    </div> */}

                                    <div className="col-md-12 col-12 col-lg-12 form-input">
                                        <label htmlFor="email" style={{ fontWeight: "bold" }}>Name</label>
                                        <input className="form-control" onChange={handleChange} value={inputValue.name} type="text" name="name" placeholder="Enter Product Name" />
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-12 col-12 col-lg-12 form-input">
                                        <label htmlFor="email" style={{ fontWeight: "bold" }}>Email</label>
                                        <input className="form-control" onChange={handleChange} value={inputValue.email} type="text" name="email" placeholder="Enter Your Price" />
                                    </div>
                                </div>

                                <div className="form-input">
                                    <label htmlFor="email" style={{ fontWeight: "bold" }}>Select Role</label>
                                    <select name="userRole" id="" onChange={handleChange} className='form-select' value={inputValue.userRole}>
                                        <option selected>Choose Category</option>
                                        <option value="Supervisor">Supervisor</option>
                                        <option value="Admin">Admin</option>
                                        <option value="User">User</option>
                                    </select>
                                </div>

                            </form>
                        </div>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleUpdateClose}>
                        Close
                    </Button>
                    {loading ? <>
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </> : <>
                        <Button variant="primary" onClick={handleUpdateUser}>
                            Update
                        </Button>
                    </>}

                </Modal.Footer>
            </Modal>


        </>
    )
}

export default UpdateUserData