import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserController, userVerifyController } from '../../Redux/Slice/UserSlice';

function ChangeProfile() {
    const dispatch = useDispatch();
    const { loginUserSlice } = useSelector((state) => state.User);
    const [inputUser, setInputUser] = useState({ name: '', email: '', id: "" });

    useEffect(() => {
        const localStorageValue = localStorage.getItem("userdetails");
        if (localStorageValue) {
            const parsedUser = JSON.parse(localStorageValue);
            setInputUser({
                id: parsedUser._id || '',
                name: parsedUser.name || '',
                email: parsedUser.email || '',
            });
        }

    }, [])

    // handle Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputUser({ ...inputUser, [name]: value });
    }

    // User Logged in
    const userLoggedIn = () => {
        dispatch(userVerifyController());
    }

    // Get the user details
    useEffect(() => {
        userLoggedIn();
    }, [loginUserSlice]);

    // Handle Update User
    const handleUpdateUser = (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserController(inputUser)).then((res) => {
                if (res?.payload) {

                }
            })
        } catch (error) {

        }
    }

    return (
        <>
            <section className="" style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                <div className="form-box mt-5">
                    <div className="form-heading">
                        <h4>Change Profile</h4>
                    </div>
                    <form>
                        <div className="form-input">
                            <label htmlFor="email" style={{ fontWeight: "bold" }}>Name</label>
                            <input className="form-control" type="text" onChange={handleChange} name="name" value={inputUser.name}
                                placeholder="Enter Your Name" />
                        </div>

                        <div className="form-input">
                            <label htmlFor="email" style={{ fontWeight: "bold" }}>Email</label>
                            <input className="form-control" type="email" onChange={handleChange} name="email" value={inputUser.email}
                                placeholder="Enter Your Email Address" />
                        </div>
                        <button className="btn btn-primary btn1" onClick={handleUpdateUser}>Change Profile</button>

                    </form>
                </div>
            </section>
        </>
    )
}

export default ChangeProfile