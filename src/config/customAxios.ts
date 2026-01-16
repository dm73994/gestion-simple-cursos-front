import axios from "axios";

export const customAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:7399/api/v1",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
})