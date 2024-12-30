import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { forgetPasswordController } from '../../Redux/Slice/UserSlice';

function ForgetPassword() {
    const { loading } = useSelector((state) => state.User);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            dispatch(forgetPasswordController(email)).then((res) => {
                if (res?.payload) {
                    setEmail('');
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <section className="login-container">
                <div className="form-box">
                    <div className="form-heading">
                        <h4>Forget Password</h4>
                    </div>
                    <form>
                        <div className="form-input">
                            <label htmlFor="email" style={{ fontWeight: "bold" }}>Email</label>
                            <input className="form-control" type="email" value={email} onChange={handleChange} name="email"
                                placeholder="Enter Your Email Address" />
                        </div>
                        {loading ? <>
                            <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </> : <>
                            <button className="btn btn-primary btn1" onClick={handleSubmit}>Submit</button>
                        </>}
                        <p>
                            Go Back?{' '}
                            <NavLink to="/">Click Here</NavLink>
                        </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default ForgetPassword