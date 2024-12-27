import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductController, deleteUserController, getUserListController } from '../../Redux/Slice/UserSlice';
import { Button, Modal } from 'react-bootstrap';
import UpdateUserData from './UpdateUserData';
import Pagination from 'react-bootstrap/Pagination';
import PaginatedTable from '../Pagination/PaginatedTable';

function UserList() {
    const dispatch = useDispatch();
    const { getUserListSlice, loading } = useSelector((state) => state.User);
    const [deleteUserID, setDeleteUserID] = useState('');
    const [show, setShow] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [inputValue, setInputValue] = useState({
        email: "", password: "", name: "", userRole: ""
    })
    const handleClose = () => { setShow(false) };
    const handleUpdateClose = () => { setShowUpdateModal(false), userList() };


    const userList = () => {
        dispatch(getUserListController());
    }

    useEffect(() => {
        userList();
    }, [])

    // handle Set user ID
    const handleDeleteModals = (id) => {
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

    const handleOpenModals = (id, name, email, userRole) => {
        setShowUpdateModal(true);
        setInputValue({ id, name, email, userRole })

    }

    return (
        <>
            <div className="container pt-3" >
                <h5 className='text-center'>User List</h5>
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
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <PaginatedTable
                                data={getUserListSlice?.users || []}
                                itemsPerPage={5}
                                renderRows={(users) =>
                                    users.length > 0 ? (
                                        users.map((user, index) => (
                                            <tr key={user._id}>
                                                <td>{index + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.userRole}</td>
                                                <td>
                                                    <img src={user.userProfile} style={{ width: "35px" }} alt="profile" />
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDeleteModals(user._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="btn btn-success mx-2"
                                                        onClick={() =>
                                                            handleOpenModals(user._id, user.name, user.email, user.userRole)
                                                        }
                                                    >
                                                        Update
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                No User available to display.
                                            </td>
                                        </tr>
                                    )
                                }
                            />
                        )}
                    </tbody>
                </table>
            </div >

            <UpdateUserData showUpdateModal={showUpdateModal} handleUpdateClose={handleUpdateClose} inputValue={inputValue} setInputValue={setInputValue} />

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