import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function UserProtected({ Components }) {
    const navigate = useNavigate();

    const checkuserValid = () => {
        let login = localStorage.getItem('usertoken');

        if (!login) {
            navigate('/');
        }
    };

    useEffect(() => {
        checkuserValid();
    }, [])
    return (
        <>
            <Components />
        </>
    )
}

export default UserProtected