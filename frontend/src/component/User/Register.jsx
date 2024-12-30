import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { addUserController } from '../../Redux/Slice/UserSlice';
import toast from 'react-hot-toast';

function Register() {
    const { loading } = useSelector((state) => state.User);
    const navigate = useNavigate("");
    const dispatch = useDispatch();

    const [passShow, setPassShow] = useState(false);
    const [image, setImage] = useState("");
    const [inputValue, setInputValue] = useState({
        email: "", password: "", name: "", userProfile: ""
    })


    // handle Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value })
    }

    // handle Image
    const handleChangeProfile = (e) => {
        setImage(e.target.files[0]);
    }


    // handldeSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (!inputValue.name.trim() || !inputValue.email.trim() || !inputValue.password.trim) {
                toast.error("All fields are required.");
                return;
            }

            if (!image) {
                setError("Please upload a profile picture.");
                return;
            }

            try {
                const data = new FormData();
                data.append("name", inputValue.name);
                data.append("email", inputValue.email);
                data.append("password", inputValue.password);
                data.append("userProfile", image);

                const config = {
                    "Content-Type": "multipart/form-data"
                }

                const sendData = {
                    data, config
                }

                dispatch(addUserController(sendData)).then((res) => {
                    if (res?.payload) {
                        setInputValue({ ...inputValue, name: "", email: "", password: "", userRole: "" });
                        setImage("");
                        navigate("/")
                    }
                })

            } catch (error) {
                console.log(error);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <section className="login-container">
                <div className="form-box">
                    <div className="form-heading">
                        <h4>Sign In</h4>
                    </div>
                    <form>
                        <div className="form-input">
                            <label htmlFor="email" style={{ fontWeight: "bold" }}>Name</label>
                            <input className="form-control" type="text" value={inputValue.name} onChange={handleChange} name="name"
                                placeholder="Enter Your Name" />
                        </div>

                        <div className="form-input">
                            <label htmlFor="email" style={{ fontWeight: "bold" }}>Email</label>
                            <input className="form-control" type="email" value={inputValue.email} onChange={handleChange} name="email"
                                placeholder="Enter Your Email Address" />
                        </div>

                        <div className="form-input">
                            <label htmlFor="" style={{ fontWeight: "bold" }}>Profile</label>
                            <input className="form-control" type="file" value={inputValue.image} onChange={handleChangeProfile} name="userProfile"
                                placeholder="Add Your Profile" />
                        </div>

                        {/* <div className="form-input">
                            <label htmlFor="email" style={{ fontWeight: "bold" }}>Select Role</label>
                            <select name="userRole" id="" onChange={handleChange} className='form-select' value={inputValue.userRole}>
                                <option selected>Choose Category</option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
                        </div> */}

                        <div className="form-input">
                            <label htmlFor="password" style={{ fontWeight: "bold" }}>Password</label>
                            <div className="password-container">
                                <input className="form-control" type={!passShow ? 'password' : 'text'} value={inputValue.password} onChange={handleChange} name="password"
                                    placeholder="Enter Your Password" />

                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? 'Show' : 'Hide'}
                                </div>
                            </div>
                        </div>
                        {loading ? <>
                            <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </> : <>

                            <button className="btn btn-primary btn1" onClick={handleSubmit}>Register</button>
                        </>}

                        <p>
                            Don't have an Account? <NavLink to="/">Sign In</NavLink>
                        </p>

                        <p>
                            Forgot Password?{' '}
                            <NavLink to="/forgotpassword">Click Here</NavLink>
                        </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Register