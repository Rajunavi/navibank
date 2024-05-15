import axios from "axios"


const BASE_URL = "http://localhost:8086/api/bank/"

export const axiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout:5000,
    timeoutErrorMessage:'Try after some time'
})