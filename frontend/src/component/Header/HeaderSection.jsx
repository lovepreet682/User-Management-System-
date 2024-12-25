import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logutController, userVerifyController } from '../../Redux/Slice/UserSlice';

function HeaderSection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userVerifySlice, loginUserSlice } = useSelector((state) => state.User);
    console.log("userVerifySlice", userVerifySlice);


    // User Logged in
    const userLoggedIn = () => {
        dispatch(userVerifyController());
    }


    // Get the user details
    useEffect(() => {
        userLoggedIn();
    }, [loginUserSlice])

    // handle Logout
    const handleLogout = () => {
        try {
            dispatch(logutController()).then((result) => {
                if (result?.payload) {
                    navigate('/');
                }
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    return (
        <>
            <header>
                <div className="container-fluid">
                    <nav class="navbar navbar-expand-lg ">
                        <div class="container-fluid">
                            <Link class="navbar-brand" to="/home">User Management System</Link>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <Link class="nav-link active" aria-current="page" to="/home">Home</Link>
                                    </li>

                                    <li class="nav-item">
                                        <Link class="nav-link" to="/addproduct">Add Product</Link>
                                    </li>

                                    <li class="nav-item">
                                        <Link class="nav-link" to="/users">Users</Link>
                                    </li>

                                    <li class="nav-item">
                                        <Link class="nav-link" to="/product">Roles</Link>
                                    </li>

                                    <li class="nav-item">
                                        <Link class="nav-link" to="/product">Change Profile</Link>
                                    </li>

                                    <li class="nav-item">
                                        <Link class="nav-link" onClick={handleLogout}>Logout</Link>
                                    </li>
                                </ul>
                                <div className='right'>
                                    <img src={userVerifySlice?.length > 0 ? userVerifySlice[0]?.userProfile : "/reactjs.png"} style={{ width: "50px" }} alt="" />
                                </div>
                            </div>
                        </div>
                    </nav>
                </div >


                {/* sidebar */}
                {/* < Offcanvas >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            <img src="./logo192.png" className='profile_img' style={{ width: "50px" }} alt="" />
                        </Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body style={{ background: "black" }}>
                        <Link to="/products" className='text-light text-decoration-none mb-2'>
                            <i class="fa-solid fa-shop"></i>&nbsp;&nbsp;
                            Products</Link> <br />

                        <>
                            <Link to="/userprofile" className='text-light text-decoration-none mb-2'>
                                <i class="fa-solid fa-user"></i>&nbsp;&nbsp;&nbsp;
                                Profile
                            </Link>
                            <div className='text-light' style={{ cursor: "pointer" }} >
                                <i class="fa-solid fa-right-to-bracket"></i>&nbsp;&nbsp;
                                Logout
                            </div>
                        </>


                    </Offcanvas.Body>
                </Offcanvas > */}
            </header >

        </>
    )
}

export default HeaderSection