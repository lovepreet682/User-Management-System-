import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { changeUserPasswordController } from '../../Redux/Slice/UserSlice';
import toast from 'react-hot-toast';

function ChangePassword() {
    const dispatch = useDispatch();
    const [inputUser, setInputUser] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

    // Handle change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputUser({ ...inputUser, [name]: value });
    }

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputUser.currentPassword.trim() === "") {
            toast.error("Current password fields is empty");
        } else if (inputUser.newPassword.trim() === "") {
            toast.error("New password fields is empty");
        } else if (inputUser.confirmPassword.trim() === "") {
            toast.error("Confirm password fields is empty");
        }
        try {
            dispatch(changeUserPasswordController(inputUser)).then((result) => {
                if (result?.payload) {
                    setInputUser({ ...inputUser, currentPassword: "", newPassword: "", confirmPassword: "" })
                }
            }).catch((err) => {

            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <section className="" style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                <div className="form-box mt-5">
                    <div className="form-heading">
                        <h4>Change Password</h4>
                    </div>
                    <form>
                        <div className="form-input">
                            <label htmlFor="email" style={{ fontWeight: "bold" }}>Current Password</label>
                            <input className="form-control" type="text" onChange={handleChange} name="currentPassword" value={inputUser.currentPassword}
                                placeholder="Enter Current Password" />
                        </div>

                        <div className="form-input">
                            <label htmlFor="email" style={{ fontWeight: "bold" }}>New Password</label>
                            <input className="form-control" type="text" onChange={handleChange} name="newPassword" value={inputUser.newPassword}
                                placeholder="Enter New Password" />
                        </div>

                        <div className="form-input">
                            <label htmlFor="email" style={{ fontWeight: "bold" }}>Confirm Password</label>
                            <input className="form-control" type="text" onChange={handleChange} name="confirmPassword" value={inputUser.confirmPassword}
                                placeholder="Enter Confirm Password" />
                        </div>

                        <button className="btn btn-primary btn1" onClick={handleSubmit}>Change Password</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default ChangePassword