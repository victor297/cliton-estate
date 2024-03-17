const env = {
  clinton_homes_base_url: process.env.REACT_APP_BASE_URL,
  cloudinary_cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  cloudinary_upload_preset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,

  storeUser: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },
  getUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },
  getToken: () => {
    let token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return config;
  },
  logOut: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
export default env;
