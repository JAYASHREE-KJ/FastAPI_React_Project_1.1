import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "access_token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

API.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;

    if (

      error.response?.status === 401 &&

      !originalRequest._retry

    ) {

      originalRequest._retry =
        true;

      try {

        const refreshToken =
          localStorage.getItem(
            "refresh_token"
          );

        const formData =
          new FormData();

        formData.append(
          "refresh_token",
          refreshToken
        );

        const response =
          await axios.post(
            "http://127.0.0.1:8000/refresh",
            formData
          );

        const newAccessToken =
          response.data
            .access_token;

        localStorage.setItem(
          "access_token",
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return API(
          originalRequest
        );

      } catch {

        localStorage.clear();

        window.location.href =
          "/login";
      }
    }

    return Promise.reject(
      error
    );
  }
);

export default API;