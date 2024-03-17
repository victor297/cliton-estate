import axios from "axios";
import env from "../../env";

const http = axios.create();

const httpClient = axios.create();

const httpCloudinary = axios.create();

// sending request
http.interceptors.request.use(
  async (config) => {
    const token = window.localStorage.getItem("token");
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response
http.interceptors.response.use(
  function (response) {
    // console.log(response);
    return response;
  },
  async function (error) {
    console.log(error);
    if (error?.response?.status === 401) {
      console.log("401 error");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");

      //so you can't access page without signing in
      // window.location.href = "/";
    }
    // if(error.response.status === 400) {
    //     showNotification('error', `${error.response.status} error - Bad Request`);
    //     return;
    // }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// sending request
httpClient.interceptors.request.use(
  async (config) => {
    const token = window.localStorage.getItem("token");
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ContentType: "multipart/form-data",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response
httpClient.interceptors.response.use(
  function (response) {
    {
      /**console.log(response); */
    }
    return response;
  },
  async function (error) {
    console.log(error);
    if (error?.response?.status === 401) {
      console.log("401 error");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      // window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export { http, httpClient, httpCloudinary };
