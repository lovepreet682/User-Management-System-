import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserListController } from '../../Redux/Slice/UserSlice';

function UserList() {
    const dispatch = useDispatch();
    const { getUserListSlice, loading } = useSelector((state) => state.User);

    console.log("getUserListSlice", getUserListSlice);

    const userList = () => {
        dispatch(getUserListController());
    }

    useEffect(() => {
        userList();
    }, [])
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
                                                <button className='btn btn-danger'>Delete</button>
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
        </>
    )
}

export default UserList