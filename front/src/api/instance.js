import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        accept: 'applications/json'
    }
})

export default instance