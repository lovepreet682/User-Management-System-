import axios from "axios";

export const commonrequest = async (methods, url, body, header) => {
    const userToken = localStorage.getItem("usertoken");

    //Create common funtion for the Axios
    const config = {
        method: methods,
        url: url,
        headers: {},
        data: body
    }

    config.headers.Authorization = userToken;


    if (header) {
        config.headers["Content-Type"] = "multipart/form-data";
    } else {
        config.headers["Content-Type"] = "application/json";
    }

    // Handle Error
    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}