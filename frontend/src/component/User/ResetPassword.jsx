import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { resetPasswordController } from '../../Redux/Slice/UserSlice';

function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.User);
    const [newPassShow, setNewPassShow] = useState(false);
    const [confirmPassShow, setConfirmPassShow] = useState(false);

    const { userId, token } = useParams();
    const [inputUser, setInputUser] = useState({ newPassword: "", confirmPassword: "" });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputUser({ ...inputUser, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            userId,
            token,
            newPassword: inputUser.newPassword,
            confirmPassword: inputUser.confirmPassword,
        }

        try {
            dispatch(resetPasswordController(data)).then((res) => {
                if (res?.payload) {
                    setInputUser({ ...inputUser, newPassword: "", confirmPassword: "" });
                    navigate('/')
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
                        <h4>Reset Password</h4>
                    </div>
                    <form>
                        <div className="form-input">
                            <label htmlFor="email" style={{ fontWeight: "bold" }}>New Password</label>
                            <div className="password-container">
                                <input className="form-control" type={!newPassShow ? 'password' : 'text'} onChange={handleChange} name="newPassword"
                                    placeholder="Enter New Password " />
                                <div className="showpass" onClick={() => setNewPassShow(!newPassShow)}>
                                    {!newPassShow ? 'Show' : 'Hide'}
                                </div>
                            </div>

                        </div>

                        <div className="form-input">
                            <label htmlFor="email" style={{ fontWeight: "bold" }}>Confirm Password</label>
                            <div className="password-container">
                                <input className="form-control" type={!confirmPassShow ? "password" : "text"} value={inputUser.confirmPassword} onChange={handleChange} name="confirmPassword"
                                    placeholder="Enter Confirm Password" />

                                <div className="showpass" onClick={() => setConfirmPassShow(!confirmPassShow)}>
                                    {!confirmPassShow ? 'Show' : 'Hide'}
                                </div>
                            </div>
                        </div>

                        {loading ? <>
                            <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </> :
                            <>
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

export default ResetPassword