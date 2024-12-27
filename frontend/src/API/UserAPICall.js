import { BASE_URL, Login_URL, LOGOUT_URL, product, User_Update, User_UpdateAdmin, USER_URL, UserChangePassword_URL, VerifyUser_URL } from "./API_URL";
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
    return await commonrequest("GET", `${BASE_URL}${LOGOUT_URL}`, data, header);
}

// USER List API || UPDATE
export const UpdateUserAPI = async (data, header) => {
    const updatedata = { name: data.name, email: data.email };
    return await commonrequest("PUT", `${BASE_URL}${USER_URL}/${data.id}`, updatedata, header);
}

// USER List API || UPDATE
export const UpdateUserAdminSideAPI = async (data, header) => {
    const updatedata = { name: data.name, email: data.email, userRole: data.userRole };
    return await commonrequest("PUT", `${BASE_URL}${User_UpdateAdmin}/${data.id}`, updatedata, header);
}

// USER List API || DELETE
export const DeleteUserAPI = async (data, header) => {
    return await commonrequest("DELETE", `${BASE_URL}${USER_URL}/${data.id}`, {}, header);
}

// USER List API || DELETE
export const changeuserPasswordAPI = async (data, header) => {
    return await commonrequest("PUT", `${BASE_URL}${UserChangePassword_URL}`, data, header);
}


// ----------- PRODUCT LIST ----------------------------

// Add Product || POST
export const addProductAPI = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}${product}`, data, header);
}

// GET Product || GET
export const getProductAPI = async (data, header) => {
    return await commonrequest("GET", `${BASE_URL}${product}`, "", header);
}

// DELETE Product || DELETE
export const deleteProductAPI = async (data, header) => {
    console.log("dat@@@@@@@@@@@@@@@", data);

    return await commonrequest("DELETE", `${BASE_URL}${product}/${data.id}`, {}, header);
}

// GET Product || GET
export const updateProductAPI = async (data, header) => {
    return await commonrequest("PUT", `${BASE_URL}${product}/${data.productID.id}`, data, header);
}