import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductController, deleteUserController, getUserListController } from '../../Redux/Slice/UserSlice';
import { Button, Modal } from 'react-bootstrap';

function UserList() {
    const dispatch = useDispatch();
    const { getUserListSlice, loading } = useSelector((state) => state.User);
    const [deleteUserID, setDeleteUserID] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false) };

    const userList = () => {
        dispatch(getUserListController());
    }

    console.log("getUserListSlice", getUserListSlice);

    useEffect(() => {
        userList();
    }, [])

    // handle Set user ID
    const handleDeleteModals = (id) => {
        console.log("################", id);

        setShow(true);
        setDeleteUserID(id);
    }

    // Handle Delete
    const handleDeleteUser = () => {
        const data = {
            id: deleteUserID
        }
        dispatch(deleteUserController(data)).then((result) => {
            if (result?.payload) {
                setShow(false);
                userList();
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <>
            <div className="container pt-3">
                <h5 className='text-center mb-2'>User List</h5>
                <table class="table text-center">
                    <thead>
                        <tr className='table-dark'>
                            <th scope="col">Sr No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Profile</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <>
                            <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </> : <>
                            {getUserListSlice?.users?.length > 0 ? <>
                                {getUserListSlice?.users?.map((user, index) => (
                                    <>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.userRole}</td>
                                            <td><img src={user.userProfile} style={{ width: "35px" }} /></td>
                                            <td>
                                                <button className='btn btn-danger' onClick={() => { handleDeleteModals(user._id) }}>Delete</button>
                                                <button className='btn btn-success mx-2'>Update</button>
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </> : <>
                                <div className="text-center">
                                    <p>No User available to display.</p>
                                </div>
                            </>}
                        </>}


                    </tbody>
                </table>
            </div>

            {/* Delete User Profile */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure, You want to delete the User?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteUser()}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserList