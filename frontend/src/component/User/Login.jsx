import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUserController } from '../../Redux/Slice/UserSlice';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [passShow, setPassShow] = useState(false);
    const [inputValue, setInputValue] = useState({
        email: "", password: ""
    })

    // Handle Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    }

    // handldeSubmit
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = inputValue
        try {
            if (!email.includes("@")) {
                toast.error("Email is Required!")
            } else if (password === "") {
                toast.error("password is Required!")
            } else {
                dispatch(loginUserController(inputValue)).then((res) => {
                    if (res?.payload) {
                        navigate("/home")
                        setInputValue({ ...inputValue, email: "", password: "" })
                    }
                })
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
                            <label htmlFor="email" style={{ fontWeight: "bold" }}>Email</label>
                            <input className="form-control" type="email" value={inputValue.email} onChange={handleChange} name="email"
                                placeholder="Enter Your Email Address" />
                        </div>

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

                        <button className="btn btn-primary btn1" onClick={handleSubmit}>Login</button>

                        <p>
                            Don't have an Account? <NavLink to="/register">Sign Up</NavLink>
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

export default Login