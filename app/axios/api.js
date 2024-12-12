"use client"
import axios from "axios";

// // Base URL for API requests
// const baseURL = "http://127.0.0.1:8000/";
const baseURL2 = "https://django-backend1.azurewebsites.net/"
// const isDevelopment = process.env.NEXT_PUBLIC_MODE === 'development'
// const baseURL2 = isDevelopment ? process.env.VITE_API_BASE_URL_LOCAL : process.env.VITE_API_BASE_URL_PROD

const AxiosInstance = axios.create({
    baseURL: baseURL2,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
    },
});


export default AxiosInstance;
