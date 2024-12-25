import React from 'react'

function UserList() {
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
                        <tr>
                            <th>1</th>
                            <td>Lovepreet</td>
                            <td>lovepreet@gmail.com</td>
                            <td>Admin</td>
                            <td><img src='/reactjs.png' style={{ width: "35px" }} /></td>
                            <td>
                                <button className='btn btn-danger'>Delete</button>
                                <button className='btn btn-success mx-2'>Update</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UserList