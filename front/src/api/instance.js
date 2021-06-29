import axios from "axios";

const instance = axios.create({
    //baseURL: 'http://localhost:3000',
    baseURL: 'http://back.std-1497.ist.mospolytech.ru',
    headers: {
        accept: 'applications/json',
        'Access-Control-Allow-Origin': '*'
    }
})

export default instance