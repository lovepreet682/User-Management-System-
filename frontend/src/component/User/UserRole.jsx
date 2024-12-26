
function UserRole() {

    return (
        <>
            <div className="container pt-3">
                <h5 className='text-center mb-2'>User Role</h5>
                <div className="row " style={{ justifyContent: "center", alignItems: "center" }}>
                    <div className="col-md-8 ">
                        <table class="table text-center ">
                            <thead>
                                <tr className='table-dark'>
                                    <th scope="col">Sr No.</th>
                                    <th scope="col">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Supervisor</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Admin</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td> User</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    )
}

export default UserRole