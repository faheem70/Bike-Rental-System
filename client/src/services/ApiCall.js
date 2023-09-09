// commonrequest.js
import axios from "axios";

export const commonrequest = async (methods, url, body, header) => {
    // Check if the user is logged in and include authentication tokens or cookies in the headers
    const token = localStorage.getItem("authToken"); // Replace with your actual token storage mechanism

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the authentication token
        ...(header || {}), // Merge custom headers if provided
    };

    const config = {
        method: methods,
        url,
      headers,
      data: body,
  };

    // axios instance
    return axios(config)
        .then((data) => {
            return data;
    })
        .catch((error) => {
            return error;
        });
};
