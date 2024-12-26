import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { addProductAPI, deleteProductAPI, DeleteUserAPI, getProductAPI, updateProductAPI, UpdateUserAPI, UserListAPI, UserLoginAPI, userLogoutAPI, UserRegisterAPI, UserVerifiedLoginAPI } from "../../API/UserAPICall";

// Add User Controller
export const addUserController = createAsyncThunk("addUserController", async (data) => {
    try {
        const response = await UserRegisterAPI(data.data, data.config);
        if (response.status === 201) {
            toast.success("User Register Successfully");
            return response.data;
        } else {
            toast.error(response.response.data.error);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
})

// Update User Controller
export const updateUserController = createAsyncThunk("updateUserController", async (data) => {
    try {
        const response = await UpdateUserAPI(data);
        if (response.status === 200) {
            toast.success("User Updated Successfully");
            localStorage.setItem("userdetails", JSON.stringify(response.data.user));
            return response.data;
        } else {
            toast.error(response.response.data.error);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
})


// Delete User Controller
export const deleteUserController = createAsyncThunk("deleteUserController", async (data) => {
    try {
        const response = await DeleteUserAPI(data);
        if (response.status === 201) {
            toast.success("User Deleted Successfully");
            return response.data;
        } else {
            toast.error(response.response.data.error);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
})

// Login User Controller
export const loginUserController = createAsyncThunk("loginUserController", async (data) => {
    try {
        const response = await UserLoginAPI(data);
        if (response.status === 200) {
            localStorage.setItem("usertoken", response.data.token);
            localStorage.setItem("userdetails", JSON.stringify(response.data.user));

            toast.success("User Login In Successfully");
            return response.data;
        } else {
            toast.error(response.response.data.error);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
});

// Logout
export const logutController = createAsyncThunk("logutController", async (thunkAPI) => {
    try {
        const response = await userLogoutAPI();
        if (response.status === 200) {
            localStorage.removeItem("usertoken");
            toast.success("user Logout Successfully");
            return response.data;
        }
    } catch (error) {
        toast.success("User Logout Done")
        localStorage.removeItem("usertoken");
        return thunkAPI.rejectWithValue("error");

    }
})

// User Verify
export const userVerifyController = createAsyncThunk("userVerifyController", async () => {
    try {
        const response = await UserVerifiedLoginAPI();
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
})

// GET User List 
export const getUserListController = createAsyncThunk("getUserListController", async () => {
    try {
        const response = await UserListAPI();
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
})

// ------------------------------------- PRODUCT------------------------------------------

// Add Product 
export const addProductController = createAsyncThunk("addProductController", async (data) => {
    try {
        const response = await addProductAPI(data.data, data.config);

        if (response.status === 201) {
            toast.success("Product Saved Successfully");
            return response.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
});

// GET Product 
export const getProductController = createAsyncThunk("getProductController", async () => {
    try {
        const response = await getProductAPI();
        if (response.status === 201) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
})

// Delete Product Controller
export const deleteProductController = createAsyncThunk("deleteProductController", async (data) => {

    try {
        const response = await deleteProductAPI(data);
        console.log("response", response);

        if (response.status === 200) {
            toast.success("Product Deleted Successfully");
            return response.data;
        } else {
            toast.error(response.response.data.error);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
})

// Update Product Controller
export const updateProductController = createAsyncThunk("updateProductController", async (data) => {

    try {
        const response = await updateProductAPI(data);
        console.log("response", response);

        if (response.status === 201) {
            toast.success("User Updated Successfully");
            return response.data;
        } else {
            toast.error(response.response.data.error);
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
})




// create reducers and actions
export const UserSlice = createSlice({
    name: "UserSlice",
    initialState: {

        // user
        addUserSlice: [],
        getUserListSlice: [],
        loginUserSlice: [],
        logoutuserSlice: [],
        userVerifySlice: [],
        updateUserSlice: [],
        deleteUserSlice: [],


        // product 
        addProductSlice: [],
        getProductSlice: [],
        deleteProductSlice: [],
        updateProductSlice: [],

        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder

            // Add Product
            .addCase(addProductController.pending, (state) => {
                state.loading = true;
            })
            .addCase(addProductController.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addProductController.fulfilled, (state, action) => {
                state.loading = false;
                state.addProductSlice = action.payload;
            })

            // GET Product
            .addCase(getProductController.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductController.rejected, (state, action) => {
                state.loading = false,
                    state.error = action;
            })
            .addCase(getProductController.fulfilled, (state, action) => {
                state.loading = false;
                state.getProductSlice = action.payload;
            })


            // DELETE Product
            .addCase(deleteProductController.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProductController.rejected, (state, action) => {
                state.loading = false,
                    state.error = action;
            })
            .addCase(deleteProductController.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteProductSlice = action.payload;
            })

            // UPDATE Product
            .addCase(updateProductController.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProductController.rejected, (state, action) => {
                state.loading = false,
                    state.error = action;
            })
            .addCase(updateProductController.fulfilled, (state, action) => {
                state.loading = false;
                state.updateProductSlice = action.payload;
            })


            // Add User
            .addCase(addUserController.pending, (state) => {
                state.status = true
            })
            .addCase(addUserController.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addUserController.fulfilled, (state, action) => {
                state.loading = false;
                state.addUserSlice = action.payload;
            })

            // GET User's list
            .addCase(getUserListController.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserListController.rejected, (state, action) => {
                state.loading = false,
                    state.error = action;
            })
            .addCase(getUserListController.fulfilled, (state, action) => {
                state.loading = false;
                state.getUserListSlice = action.payload;
            })

            // Update User
            .addCase(updateUserController.pending, (state) => {
                state.status = true
            })
            .addCase(updateUserController.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserController.fulfilled, (state, action) => {
                state.loading = false;
                state.updateUserSlice = action.payload;
            })

            // Delete User
            .addCase(deleteUserController.pending, (state) => {
                state.status = true
            })
            .addCase(deleteUserController.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUserController.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteUserSlice = action.payload;
            })

            // Login User
            .addCase(loginUserController.pending, (state) => {
                state.status = true
            })
            .addCase(loginUserController.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUserController.fulfilled, (state, action) => {
                state.loading = false;
                state.loginUserSlice = action.payload;
            })

            // Logout user
            .addCase(logutController.pending, (state) => {
                state.status = true
            })
            .addCase(logutController.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logutController.fulfilled, (state, action) => {
                state.loading = false;
                state.logoutuserSlice = [action.payload];
                state.loginUserSlice = [];
            })

            // Verify user
            .addCase(userVerifyController.pending, (state) => {
                state.status = true
            })
            .addCase(userVerifyController.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(userVerifyController.fulfilled, (state, action) => {
                state.loading = false;
                state.userVerifySlice = [action.payload];
            })
    }
})

export default UserSlice.reducer;