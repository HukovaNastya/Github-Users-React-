
import axios from "axios";

const request = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
    },
})

export default request