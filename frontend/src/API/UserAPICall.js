import { BASE_URL, Login_URL, LOGOUT_URL, product, USER_URL, VerifyUser_URL } from "./API_URL";
import { commonrequest } from "./CommonRequest";

// Add User API || POST
export const UserRegisterAPI = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}${USER_URL}`, data, header);
}

// USER LOGIN  API || POST
export const UserLoginAPI = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}${Login_URL}`, data, header);
}

// USER List API || GET
export const UserListAPI = async (data, header) => {
    return await commonrequest("GET", `${BASE_URL}${USER_URL}`, "", header);
}


// USER Verify API || GET
export const UserVerifiedLoginAPI = async (data, header) => {
    return await commonrequest("GET", `${BASE_URL}${VerifyUser_URL}`, "", header);
}

// User Logout API || GET
export const userLogoutAPI = async (data, header) => {
    return await commonrequest("GET", `${BASE_URL}${LOGOUT_URL}`, "", header);
}

// Add Product || POST
export const addProductAPI = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}${product}`, data, header);
}

// GET Product || GET
export const getProductAPI = async (data, header) => {
    return await commonrequest("GET", `${BASE_URL}${product}`, "", header);
}